"use server";

import { authOptions } from "@/lib/auth-options";
import taskApi from "@/lib/axios/taskApi";
import { getServerSession } from "next-auth";

export async function getTasksByProjectId(projectId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.token) {
      throw new Error("Yetkisiz erişim");
    }

    const res = await taskApi.get(`/projects/${projectId}/tasks`, {
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Proje taskları alınırken bir hata oluştu");
  }
}
