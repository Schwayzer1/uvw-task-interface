import { getAllUser } from "@/actions/auth/get-all-user";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "Admin") {
    redirect("/dashboard");
  }
  const userList = await getAllUser();
  console.log(userList, "listtttt");
  return (
    <>
      <div>page</div>
    </>
  );
}
