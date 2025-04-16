"use server";

import { authOptions } from "@/lib/auth-options";
import taskApi from "@/lib/axios/taskApi";
import { RoleUpdateFormSchemaType } from "@/schemas/roleUpdateFormSchema";
import { getServerSession } from "next-auth";

export async function updateUserRole(
  values: RoleUpdateFormSchemaType,
  userId: string
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.token) {
      throw new Error("Yetkisiz erişim");
    }
    await taskApi.put(
      `/auth/${userId}/role`,
      { role: values.role },
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      }
    );
    return { success: true };
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Rol değiştirilken hata oluştu");
  }
}
