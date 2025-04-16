import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction } from "react";

export default function CreateTaskModal({
  taskModal,
  setTaskModal,
}: {
  taskModal: boolean;
  setTaskModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={taskModal} onOpenChange={setTaskModal}>
      <DialogContent className="flex flex-col w-full justify-center items-center">
        <DialogTitle>Görev Ekleme</DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
