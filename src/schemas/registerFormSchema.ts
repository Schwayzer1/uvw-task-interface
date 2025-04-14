import { z } from "zod";

export const registerFormSchema = () => {
  return z
    .object({
      email: z.string().email({ message: "Lütfen Geçerli bir mail giriniz" }),
      password: z
        .string()
        .min(6, { message: "Şifre en az 6 karakterli olmalı" }),
      re_password: z
        .string()
        .min(6, { message: "Şifre en az 6 karakterli olmalı" }),
      name: z.string().min(3, { message: "İsim en az 3 karakterli olmalı" }),
    })
    .refine(
      ({ password }) => {
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        return hasLetter && hasNumber;
      },
      {
        message: "Şifre en az 1 harf ve 1 rakam içermeli",
        path: ["password"],
      }
    )
    .refine(
      ({ password, re_password }) => {
        if (password !== re_password) {
          return false;
        }
        return true;
      },
      {
        message: "Şifreler eşleşmiyor",
        path: ["re_password"],
      }
    );
};

export type RegisterFormSchemaType = z.infer<
  ReturnType<typeof registerFormSchema>
>;
