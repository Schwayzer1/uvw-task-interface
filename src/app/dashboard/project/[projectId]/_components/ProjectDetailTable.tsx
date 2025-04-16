"use client";

import React, { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Trash2 } from "lucide-react";
import CreateTaskModal from "./CreateTaskModal";
import TaskDetailTable from "./TaskDetailTable";

export default function ProjectDetailTable({
  project,
  projectId,
  tasks,
}: {
  project: ProjectResponse;
  projectId: string;
  tasks: TaskResponse[];
}) {
  const [taskModal, setTaskModal] = useState(false);
  useEffect(() => {}, [tasks]);

  return (
    <>
      <div className="flex flex-col items-center py-10 border border-black w-full max-w-[1440px] px-5 rounded-2xl bg-gray-100 gap-5 justify-between">
        <ScrollArea className="w-full overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="border border-black w-full grid grid-cols-5 items-center p-4 rounded-2xl gap-2">
              <p className="text-xl font-semibold">Proje Adı</p>
              <p className="text-xl font-semibold">Proje Açıklaması</p>
              <p className="text-xl font-semibold">Proje Sahibi</p>
              <p className="text-xl font-semibold">Proje Baş. Tarih</p>
              <p className="text-xl font-semibold text-center">İşlemler</p>
            </div>

            <div className="border-b border-black w-full grid grid-cols-5 items-center p-4 gap-2">
              <p className="text-base font-semibold">{project.title}</p>
              <p className="text-base font-semibold">{project.description}</p>
              <p className="text-base font-semibold">
                {project.createdBy.name}
              </p>
              <p className="text-base font-semibold">
                {project.createdAt.split("T")[0]}
              </p>
              <p className="text-base font-semibold text-center">
                <Trash2 className="w-full text-red-600" />
              </p>
            </div>
            <TaskDetailTable setTaskModal={setTaskModal} tasks={tasks} />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <CreateTaskModal
        taskModal={taskModal}
        setTaskModal={setTaskModal}
        projectId={projectId}
      />
    </>
  );
}
