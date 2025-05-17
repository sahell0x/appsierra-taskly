import z from "zod";


const statusEnum = z.enum(["Pending", "In Progress", "Completed"]);

const taskType = z.object({
    title: z.string(),
    description: z.string().optional(),
    status: statusEnum.optional(),
    projectId: z.string(),
    createdAt:z.string(),
    completedAt:z.string().optional(),
});

export default taskType;
