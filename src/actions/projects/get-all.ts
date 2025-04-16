"use server";

import projectApi from "@/lib/axios/projectApi";

export async function getAllProjects() {
  try {
    const res = await projectApi.get("/all");
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Projeler alınırken bir hata oluştu");
  }
}
