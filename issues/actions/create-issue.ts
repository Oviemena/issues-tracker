'use server'

import { issueCreationSchema } from "@/app/validationSchema"
import { auth } from "@/auth"
import prisma from "@/prisma/client"
import * as z from "zod"

export const createIssue = async (values: z.infer<typeof issueCreationSchema>) => {
    const validatedFields = issueCreationSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { title, description } = validatedFields.data

    const session = await auth()
    const existingUserId = session?.user.id

    if (existingUserId) {
        await prisma.issue.create({
            data: {
                ...values,

                user: {
                    connect: { id: existingUserId }
                }

            }
        })
    }

    return { success: "Issue created!" }

}