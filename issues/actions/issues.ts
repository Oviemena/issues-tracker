'use server'

import { issueCreationSchema } from "@/app/validationSchema"
import { getUserById } from "@/data/user"
import prisma from "@/prisma/client"
import * as z from "zod"

export const createIssue = async ( data: z.infer<typeof issueCreationSchema>) => {
    const validatedFields = issueCreationSchema.safeParse(data)

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { title, description } = validatedFields.data
    await prisma.issue.create({
        data: {
            title,
            description,

        }
    })
}