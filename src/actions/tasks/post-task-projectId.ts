"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { CreateTaskFormSchemaType } from "@/schemas/createTaskFormSchema";
import taskApi from "@/lib/axios/taskApi";

export async function createTask(
  projectId: string,
  formData: CreateTaskFormSchemaType
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.token) {
      throw new Error("Yetkisiz erişim");
    }

    const { title, description, status, priority, assignedTo } = formData;

    await taskApi.post(
      `/projects/${projectId}/tasks`,
      { title, description, status, priority, assignedTo },
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      }
    );

    return { success: true };
  } catch (error: any) {
    console.error("Görev oluşturma hatası:", error.message);
    throw new Error("Görev oluşturulurken bir hata oluştu");
  }
}
