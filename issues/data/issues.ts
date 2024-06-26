export const dynamic = 'force-dynamic'

import { prisma } from "@/prisma/client"
import { Status } from "@prisma/client"

export const getAllIssues = async () => {
    try {
        const issues = await prisma.issue.findMany({
            include: {
                user: true
            }
        })
        return issues
    } catch (error) {
        return null
    }
}

export const getAllIssuesByStatus = async (status: Status) => {
    try {
        const issues = await prisma.issue.findMany({
            where: {
                status
            },
            include: {
                user: true
            },
        })
        return issues
    } catch (error) {
        return null
    }
}

export const deleteIssueById = async (id: number) => {
    try {
        const deletedIssue = await prisma.issue.delete({
            where: {
                id: id
            },
        });

        return deletedIssue;
    } catch (error) {
        return error
    }
}

export const deleteIssuesByIds = async (id: number[]) => {
    try {
        const deletedIssues = await prisma.issue.deleteMany({
            where: {
                id: {
                    in: id
                }
            },
        });

        return deletedIssues;
    } catch (error) {
        return null
    }
}