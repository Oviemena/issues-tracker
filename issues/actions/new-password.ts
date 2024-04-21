"use server"

import bcrypt from 'bcryptjs';
import * as z from "zod"

import { NewPasswordSchema } from "@/schemas"
import { getPasswordResetTokenByToken } from "@/data/password-reset-token"
import { getUserByEmail } from "@/data/user"
import prisma from '@/prisma/client';

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null ) => {
    if (!token) {
        return { error: "Missing token!" }
    }

    const validatedField = NewPasswordSchema.safeParse(values)
    if (!validatedField.success) {
        return { error: "Invalid field!" }
    }

    const { password } = validatedField.data

    const existingToken = await getPasswordResetTokenByToken(token)

    if (!existingToken) {
        return { error: "Invalid token!" }
    }

    const isExpired = new Date(existingToken.expires) < new Date()

    if (!isExpired) {
        return { errror: 'Token has expired!' }
    }

    const existingUser = await getUserByEmail(existingToken.email)
    if (!existingUser) {
        return { error: "Email does not exist!" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.update({
        where: { id: existingUser.id },
        data: {
            password: hashedPassword
        }
    })

    await prisma.passwordResetToken.delete({
        where: { id: existingToken.id }
    })
    return { success: "Password updated!" }
}