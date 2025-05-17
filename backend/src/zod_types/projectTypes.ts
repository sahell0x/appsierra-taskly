import z from "zod";

const projectTypes = z.object({
    name: z.string(),
    createdAt:z.string(),
});

export default projectTypes;
