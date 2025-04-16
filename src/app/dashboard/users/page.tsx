import { getAllUser } from "@/actions/auth/get-all-user";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import UserCard from "./_components/UserCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "Admin") {
    redirect("/dashboard");
  }
  const userList = await getAllUser();

  return (
    <div className="flex flex-col w-full justify-center items-center gap-5">
      <div className="flex flex-col items-center py-10 border border-black w-full max-w-[1440px] px-5 rounded-2xl bg-gray-100 gap-5 justify-between">
        <h3 className="text-3xl font-semibold">Kayıtlı Kullanıcı Listesi</h3>
        <ScrollArea className="w-full overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="border border-black w-full grid grid-cols-4 items-center p-4 rounded-2xl gap-2">
              <p className="text-xl font-semibold">İsim</p>
              <p className="text-xl font-semibold">Mail Adresi</p>
              <p className="text-xl font-semibold">Rolü</p>
              <p className="text-xl font-semibold text-center">İşlemler</p>
            </div>
            {userList.map((user: UserResponse) => (
              <UserCard user={user} key={user._id} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
