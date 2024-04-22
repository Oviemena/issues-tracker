"use server"


import { getUserById } from "@/data/user"

import { currentUser } from "@/lib/use-current-user"
import prisma from "@/prisma/client"
import { SettingsSchema } from "@/schemas"
import * as z from "zod"

export const TwoFactor = async (
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
        values.isTwoFactorAuthEnabled = undefined
    }

    await prisma.user.update({
        where: { id: isUserInDb.id },
        data: {
            ...values,
            isTwoFactorAuthEnabled: values.isTwoFactorAuthEnabled
        }
    })

    const successMessage = values.isTwoFactorAuthEnabled
        ? "Two Factor Authentication enabled!"
        : "Two Factor Authentication disabled!";

    return { success: successMessage };
}
