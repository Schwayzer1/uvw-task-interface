"use server";

import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";

export async function getUserProjects() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.token) {
    throw new Error("Yetkisiz erişim");
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Projeler alınamadı");
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    throw new Error("Projeler alınırken bir hata oluştu");
  }
}
