import { z } from "zod";

export const createProjectFormSchema = () => {
  return z.object({
    title: z.string().min(1, { message: "Proje Adı boş bırakılamaz" }),
    description: z
      .string()
      .min(1, { message: "Proje Açıklaması boş bırakılamaz" }),
  });
};

export type CreateProjectFormSchemaType = z.infer<
  ReturnType<typeof createProjectFormSchema>
>;
