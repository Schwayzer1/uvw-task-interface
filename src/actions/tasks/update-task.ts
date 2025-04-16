"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { CreateTaskFormSchemaType } from "@/schemas/createTaskFormSchema";
import taskApi from "@/lib/axios/taskApi";

export async function updateTask(
  projectId: string,
  taskId: string,
  formData: CreateTaskFormSchemaType
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.token) {
      throw new Error("Yetkisiz erişim");
    }

    const { title, description, status, priority, assignedTo } = formData;

    await taskApi.put(
      `/projects/${projectId}/tasks/${taskId}`,
      { title, description, status, priority, assignedTo },
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      }
    );

    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("Görev güncellenirken bir hata oluştu");
  }
}
