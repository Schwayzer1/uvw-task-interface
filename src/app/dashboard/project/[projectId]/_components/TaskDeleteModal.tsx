"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { deleteTask } from "@/actions/tasks/delete-task";

export default function TaskDeleteModal({
  taskDeleteModal,
  setTaskDeleteModal,
  projectId,
  taskId,
}: {
  taskDeleteModal: boolean;
  setTaskDeleteModal: Dispatch<SetStateAction<boolean>>;
  projectId: string;
  taskId: string;
}) {
  const [_error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  async function onDeleteTask() {
    try {
      setSubmitting(true);
      const result = await deleteTask(projectId, taskId);

      if (result?.success) {
        toast.success("Silme işlemi başarılı", {
          description: "Dashboard'a yönlendiriliyorsunuz...",
        });
        router.push(`/dashboard/project/${projectId}`);
        setTaskDeleteModal(false);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Bilinmeyen bir hata oluştu");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={taskDeleteModal} onOpenChange={setTaskDeleteModal}>
      <DialogContent className="flex flex-col w-full justify-center items-center gap-5">
        <DialogTitle className="text-red-600 font-bold text-2xl">
          Uyarı!
        </DialogTitle>

        <p className="text-lg font-semibold text-center">
          Bu silme işlemini gerçekten yapmak istiyor musunuz?{" "}
        </p>

        <Button
          type="button"
          disabled={submitting}
          className="w-full cursor-pointer bg-red-500 text-lg"
          onClick={() => onDeleteTask()}
        >
          Sil
          <Loader
            className={cn("animate-spin h-4 w-4 ml-2", !submitting && "hidden")}
          />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
