"use client";

import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { Dispatch, SetStateAction } from "react";

export default function TaskDetailTable({
  setTaskModal,
  tasks,
}: {
  setTaskModal: Dispatch<SetStateAction<boolean>>;
  tasks: TaskResponse[];
}) {
  const session = useSession();
  return (
    <>
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
      {tasks.map((t) => (
        <div
          className="border-b border-black w-full grid grid-cols-6 items-center p-4 gap-2"
          key={t._id}
        >
          <p className="text-base font-semibold">{t.title}</p>
          <p className="text-base font-semibold">{t.description}</p>
          <p className="text-base font-semibold">{t.priority}</p>
          <p className="text-base font-semibold">{t.status}</p>
          <p className="text-base font-semibold">
            {t.assignedTo ? t.assignedTo.name : "Atanan Yok"}
          </p>
          <p className="text-base font-semibold text-center">
            <Trash2 className="text-center text-red-600 w-full" />
          </p>
        </div>
      ))}
    </>
  );
}
