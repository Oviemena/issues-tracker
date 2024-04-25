import { Status } from '@prisma/client';
import { z } from 'zod';

export const issueCreationSchema = z.object({
    title: z.string().min(1, { message: 'Please provide a title!' }).max(255),
    description: z.string().min(1, { message: 'Please Provide a description!' }),
    status: z.enum([Status.OPEN, Status.IN_PROGRESS, Status.COMPLETED])
});


export const issueSchema = z.object({
    id: z.number(),
    title: z.string().min(1),
    description: z.string().min(1),
    status: z.enum([Status.OPEN, Status.IN_PROGRESS, Status.COMPLETED]),
    email: z.string().email(),
    createdAt: z.date(),
    updatedAt: z.date()

})