'use server'

import { issueCreationSchema } from "@/app/validationSchema"
import { getUserById } from "@/data/user"
import prisma from "@/prisma/client"
import * as z from "zod"

export const createIssue = async (id: string, data: z.infer<typeof issueCreationSchema>) => {
    const validatedFields = issueCreationSchema.safeParse(data)

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { title, description } = validatedFields.data

    const existingUser = await getUserById(id)
    if (existingUser) {
        await prisma.issue.create({
            data: {
                title,
                description,
                user: {
                    connect: { id: existingUser.id}
                }

            }
        })
    }

}