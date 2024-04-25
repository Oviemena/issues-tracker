import { getAllIssues } from "@/data/issues"

export const issues = async () => {
    const allIssues = await getAllIssues()
    return allIssues
}