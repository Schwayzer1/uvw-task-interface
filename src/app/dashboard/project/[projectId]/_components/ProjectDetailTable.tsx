"use client";

import React, { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Plus, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import CreateTaskModal from "./CreateTaskModal";

export default function ProjectDetailTable({
  project,
}: {
  project: ProjectResponse;
}) {
  const session = useSession();
  const [taskModal, setTaskModal] = useState(false);

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
            <h3 className="text-xl font-semibold text-center py-4">
              Proje Görevleri
            </h3>
            {(session?.data?.user.role === "Admin" ||
              session?.data?.user.role === "Manager") && (
              <Button
                onClick={() => setTaskModal(true)}
                className="flex justify-center items-center gap-2 group h-9 w-max rounded-md bg-green-200 px-4 py-2 text-base font-medium transition-colors hover:bg-green-50 hover:text-green-900 text-black cursor-pointer"
              >
                <span className="text-lg font-semibold">Yeni Görev Ekle</span>
                <Plus />
              </Button>
            )}
            <div className="border-b border-black w-full grid grid-cols-6 items-center p-4 gap-2">
              <p className="text-xl font-semibold">Görev Adı</p>
              <p className="text-xl font-semibold">Görev Açıklaması</p>
              <p className="text-xl font-semibold">Görev Önemi</p>
              <p className="text-xl font-semibold">Görev Durumu</p>
              <p className="text-xl font-semibold">Atanan Kişi</p>
              <p className="text-xl font-semibold text-center">İşlemler</p>
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <CreateTaskModal taskModal={taskModal} setTaskModal={setTaskModal} />
    </>
  );
}
