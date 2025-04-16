import { Card, CardHeader } from "@/components/ui/card";
import React from "react";
import CreateProjectForm from "./_components/CreateProjectForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";

export default async function ProjeCreatePage() {
  const session = await getServerSession(authOptions);

  if (session?.user.role === "Developer") {
    redirect("/dashboard"); // <-- SSR bozulmadan yönlendirme
  }

  return (
    <div className="w-full min-h-[80dvh] flex justify-center items-center  ">
      <Card className="bg-indigo-300 lg:w-1/2 w-2/3 p-10 shadow-md h-full ">
        <CardHeader className="text-2xl font-semibold text-center py-0 my-0">
          Proje Oluşturma
        </CardHeader>
        <CreateProjectForm />
      </Card>
    </div>
  );
}
