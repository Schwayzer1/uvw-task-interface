"use server";

import { RegisterFormSchemaType } from "@/schemas/registerFormSchema";
import { AxiosError } from "axios";
import apiAuth from "@/lib/api-auth";

export async function registerUser(formData: RegisterFormSchemaType) {
  try {
    const { email, password, name } = formData;

    await apiAuth.post("/auth/register", {
      email,
      password,
      name,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error("Bu e-posta adresi zaten kayıtlı");
    }
    throw new Error("Bir hata oluştu");
  }
}
