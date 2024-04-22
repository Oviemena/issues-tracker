"use server"
import bcrypt from 'bcryptjs';

import { getUserById, getUserByEmail } from "@/data/user"

import { currentUser } from "@/lib/use-current-user"
import prisma from "@/prisma/client"
import { SettingsSchema } from "@/schemas"
import * as z from "zod"
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/token';

export const password = async (
    values: z.infer<typeof SettingsSchema>
) => {
    const user = await currentUser()

    if (!user) {
        return { error: "Unauthorized" }
    }

    const isUserInDb = await getUserById(user.id || "")

    if (!isUserInDb) {
        return { error: "Unauthorized!" }
    }

    if (user.isOAuth) {
        values.password = undefined
        values.newPassword = undefined
    }


    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email)
        if (existingUser && existingUser.id !== user.id) {
            return { error: "Email already in use!" }
        }

        const verificationToken = await generateVerificationToken(
            values.email
        )
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )

        return { success: "verification email sent!" }
    }

    if (values.password && values.newPassword && isUserInDb.password) {
        const doesPasswordMatch = await bcrypt.compare(
            values.password,
            isUserInDb.password
        )

        if (!doesPasswordMatch) {
            return { error: "Incorrect password!" }
        }

        const hashedPassword = await bcrypt.hash(
            values.password, 10
        )

        values.password = hashedPassword
        values.newPassword = undefined


    }


    await prisma.user.update({
        where: { id: isUserInDb.id },
        data: {
            ...values,
            password: values.password

        }
    })

    return { success: "Password updated!" }

} 