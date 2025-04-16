"use server";

import { authOptions } from "@/lib/auth-options";
import taskApi from "@/lib/axios/taskApi";
import { getServerSession } from "next-auth";

export async function getTaskLogs(projectId: string, taskId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.token) {
      throw new Error("Yetkisiz erişim");
    }

    const res = await taskApi.get(
      `/projects/${projectId}/tasks/${taskId}/logs`,
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      }
    );
    return res.data;
  } catch (error: any) {
    throw new Error("Proje detayları alınırken bir hata oluştu");
  }
}
