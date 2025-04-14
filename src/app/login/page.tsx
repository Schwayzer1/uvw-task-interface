import React from "react";
import LoginForm from "./_components/LoginForm";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="w-full min-h-[80dvh] flex justify-center items-center  ">
      <Card className="bg-indigo-300 w-1/2 p-10 shadow-md h-full ">
        <LoginForm />
      </Card>
    </div>
  );
}
