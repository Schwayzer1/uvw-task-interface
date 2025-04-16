"use server";

import apiAuth from "@/lib/api-auth";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";

export async function getAllUser() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.token) {
      throw new Error("Yetkisiz erişim");
    }
    const res = await apiAuth.get("/auth/users", {
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Kullanıcılar alınırken bir hata oluştu");
  }
}
