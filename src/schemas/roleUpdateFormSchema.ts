import { z } from "zod";

export const roleUpdateFormSchema = () => {
  return z.object({
    role: z.enum(["Admin", "Manager", "Developer"]),
  });
};

export type RoleUpdateFormSchemaType = z.infer<
  ReturnType<typeof roleUpdateFormSchema>
>;
