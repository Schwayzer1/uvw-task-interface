"use server";

import { authOptions } from "@/lib/auth-options";
import projectApi from "@/lib/axios/projectApi";
import { getServerSession } from "next-auth";

export async function deleteProject(projectId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.token) {
      throw new Error("Yetkisiz erişim");
    }
    await projectApi.put(
      `/${projectId}`,
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
    throw new Error("Proje ve görevler silinirken bir hata oluştu");
  }
}
