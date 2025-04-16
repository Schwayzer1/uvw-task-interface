import { z } from "zod";

export const createTaskFormSchema = () => {
  return z.object({
    title: z.string().min(1, { message: "Görev Adı boş bırakılamaz" }),
    description: z
      .string()
      .min(1, { message: "Görev Açıklaması boş bırakılamaz" }),
    status: z.enum(["in-progress", "completed", "pending"]),
    priority: z.enum(["high", "low", "medium"]),
    assignedTo: z.string().optional().nullable(),
  });
};

export type CreateTaskFormSchemaType = z.infer<
  ReturnType<typeof createTaskFormSchema>
>;
