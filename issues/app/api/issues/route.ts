import { NextResponse } from "next/server";
import {z} from 'zod'
import prisma from "@/prisma/client";
import { PiSmileyAngry } from "react-icons/pi";

const issueCreationSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
})
export async function POST (request: NextResponse) {
    const body = await request.json()
    const checkValidation = issueCreationSchema.safeParse(body)
    if (!checkValidation.success) return NextResponse.json(checkValidation.error.errors, {status: 400})
    

    const newIssue = await prisma.issue.create ({
        data: { title: body.title, description: body.description}
    })
    return NextResponse.json(newIssue, {status: 201})
}