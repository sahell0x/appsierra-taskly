import z from "zod";

const statusEnum = z.enum(["Pending", "In Progress", "Completed"]);

const updateTaskType = z.object({
    title: z.string(),
    description: z.string(),
    status: statusEnum.optional(),
    completedAt:z.string().optional(),
});

export default updateTaskType;
