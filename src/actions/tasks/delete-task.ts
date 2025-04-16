"use server";

import { authOptions } from "@/lib/auth-options";
import taskApi from "@/lib/axios/taskApi";
import { getServerSession } from "next-auth";

export async function deleteTask(projectId: string, taskId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.token) {
      throw new Error("Yetkisiz erişim");
    }
    await taskApi.put(
      `/projects/${projectId}/tasks/${taskId}/delete`,
      {},
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      }
    );
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("Görev silinirken bir hata oluştu");
  }
}
