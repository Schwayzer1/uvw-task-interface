"use server";

import projectApi from "@/lib/axios/projectApi";

export async function getProjectById(projectId: string) {
  try {
    const res = await projectApi.get(`/${projectId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Proje detayları alınırken bir hata oluştu");
  }
}
