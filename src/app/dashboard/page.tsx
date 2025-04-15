export const dynamic = "force-dynamic";
import { getAllProjects } from "@/actions/projects/get-all";
import React from "react";
import ProjectsTable from "./_components/ProjectsTable";

export default async function DashboardPage() {
  const allProjects = await getAllProjects();

  return (
    <div className="flex w-full justify-center items-start">
      <ProjectsTable allProjects={allProjects} />
    </div>
  );
}
