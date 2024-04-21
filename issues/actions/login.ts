'use server'


import * as z from 'zod'
import { LoginSchema } from '@/schemas'
import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'
import { getUserByEmail } from '@/data/user'
import { generateTwoFactorToken, generateVerificationToken } from '@/lib/token'
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/lib/mail'
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'
import prisma from '@/prisma/client'
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation'


export const login = async (values: z.infer<typeof LoginSchema>) => {
   const validatedFields = LoginSchema.safeParse(values)

   if (!validatedFields.success) {
      return { error: "Invalid fields!" }
   }

   const { email, password, code } = validatedFields.data

   const existingUser = await getUserByEmail(email)
   if (!existingUser || !existingUser.email || !existingUser.password) {
      return { error: "Email does not exist!" }
   }

   if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(existingUser.email)

      await sendVerificationEmail(
         verificationToken.email,
         verificationToken.token
      )

      return { success: "Confirmation email sent!" }
   }

   if (existingUser?.isTwoFactorAuthEnabled && existingUser.email) {
      if (code) {
         const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)
         if (!twoFactorToken) {
            return { error: "Invalid code!" }
         }

         if (twoFactorToken.token !== code) {
            return { error: "Invalid code!" }
         }

         const isExpired = new Date(twoFactorToken.expires) < new Date()

         if (isExpired) {
            return { error: "Code expired!" }
         }

         await prisma.twoFactorToken.delete({
            where: { id: twoFactorToken.id }
         })

         const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

         if (existingConfirmation) {
            await prisma.twoFactorConfirmation.delete({
               where: {
                  id: existingConfirmation.id
               }
            })
         }

         await prisma.twoFactorConfirmation.create({
            data: {
               userId: existingUser.id
            }
         })
      } else {
         const twoFactorToken = await generateTwoFactorToken(existingUser.email)
         await sendTwoFactorTokenEmail(
            twoFactorToken.email,
            twoFactorToken.token
         )

         return {
            twoFactor: true,
            
         }


      }
   }

   // Regular login for users without 2FA
   try {
      await signIn("credentials", {
         email,
         password,
         redirectTo: DEFAULT_LOGIN_REDIRECT,
      })
   } catch (error) {
      if (error instanceof AuthError) {
         switch (error.type) {
            case "CredentialsSignin":
               return { error: "Invalid credentials!" }
            default:
               return { error: "Something went wrong!" }
         }
      }
      throw error
   }
}



