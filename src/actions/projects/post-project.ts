"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import projectApi from "@/lib/axios/projectApi";
import { CreateProjectFormSchemaType } from "@/schemas/createProjectFormSchema";

export async function createProject(formData: CreateProjectFormSchemaType) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.token) {
      throw new Error("Yetkisiz erişim");
    }

    const { title, description } = formData;

    await projectApi.post(
      "/",
      { title, description },
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      }
    );

    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("Proje oluşturulurken bir hata oluştu");
  }
}
