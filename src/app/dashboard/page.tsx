export const dynamic = "force-dynamic";
import { getAllProjects } from "@/actions/projects/get-all";
import React from "react";
import ProjectsTable from "./_components/ProjectsTable";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export default async function DashboardPage() {
  const allProjects = await getAllProjects();
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col w-full justify-center items-center gap-5">
      {(session?.user.role === "Admin" || session?.user.role === "Manager") && (
        <Link
          href={"/dashboard/project/create"}
          className="flex justify-center items-center gap-2 group h-9 w-max rounded-md bg-green-200 px-4 py-2 text-base font-medium transition-colors hover:bg-green-50 hover:text-green-900"
        >
          <span className="text-lg font-semibold">Yeni Proje Ekle</span>
          <Plus />
        </Link>
      )}
      <ProjectsTable allProjects={allProjects} />
    </div>
  );
}
