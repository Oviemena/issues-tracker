import { deleteIssueById } from '@/data/issues';

export const deleteIssueIdById = async (id: number) => {
    const deletedIssue = await deleteIssueById(id)
    return deletedIssue
}