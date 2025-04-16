import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import React from "react";

export default function ProjectsTable({
  allProjects,
}: {
  allProjects: ProjectResponse[];
}) {
  return (
    <div className="flex flex-col items-center py-10 border border-black w-full max-w-6xl px-5 rounded-2xl bg-indigo-50 gap-5 justify-between">
      <ScrollArea className="w-full overflow-x-auto">
        <div className="min-w-[900px]">
          <div className="border border-black w-full grid grid-cols-5 items-center p-4 rounded-2xl gap-2">
            <p className="text-xl font-semibold">Proje Adı</p>
            <p className="text-xl font-semibold">Proje Açıklaması</p>
            <p className="text-xl font-semibold">Proje Sahibi</p>
            <p className="text-xl font-semibold">Proje Baş. Tarih</p>
            <p className="text-xl font-semibold text-center">Detay</p>
          </div>
          {allProjects.map((project: any) => (
            <div
              key={project._id}
              className="border-b border-black w-full grid grid-cols-5 items-center p-4 gap-2"
            >
              <p className="text-base font-semibold">{project.title}</p>
              <p className="text-base font-semibold">{project.description}</p>
              <p className="text-base font-semibold">
                {project.createdBy.name}
              </p>
              <p className="text-base font-semibold">
                {project.createdAt.split("T")[0]}
              </p>
              <p className="text-base font-semibold text-center">
                <Link
                  href={`/dashboard/project/${project._id}`}
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-base font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                >
                  Detaya Git
                </Link>
              </p>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
