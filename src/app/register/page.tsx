export const dynamic = "force-dynamic";
import React from "react";
import RegisterForm from "./_components/RegisterForm";
import { Card, CardHeader } from "@/components/ui/card";

export default async function RegisterPage() {
  return (
    <div className="w-full min-h-[80dvh] flex justify-center items-center  ">
      <Card className="bg-indigo-300 lg:w-1/2 w-2/3 p-10 shadow-md h-full ">
        <CardHeader className="text-2xl font-semibold text-center py-0 my-0">
          Admin Panel Kayıt
        </CardHeader>
        <RegisterForm />
      </Card>
    </div>
  );
}
