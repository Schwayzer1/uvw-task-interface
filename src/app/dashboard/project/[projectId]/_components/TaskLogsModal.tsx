"use client";

import { getTaskLogs } from "@/actions/taskLogs/get-task-logs";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";

export default function TaskLogsModal({
  projectId,
  setTaskLogsModal,
  taskId,
  taskLogsModal,
}: {
  taskLogsModal: boolean;
  setTaskLogsModal: () => void;
  projectId: string;
  taskId: string;
}) {
  const [logs, setLogs] = useState<TaskLogResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (taskLogsModal) {
      setLoading(true);
      getTaskLogs(projectId, taskId)
        .then((data) => setLogs(data))
        .catch((e) => console.error("Log verileri alınamadı:", e))
        .finally(() => setLoading(false));
    }
  }, [taskLogsModal, projectId, taskId]);

  return (
    <Dialog open={taskLogsModal} onOpenChange={setTaskLogsModal}>
      <DialogContent className="flex flex-col w-full max-w-lg">
        <DialogTitle>Görev Günlükleri</DialogTitle>
        {loading ? (
          <p>Yükleniyor...</p>
        ) : logs.length === 0 ? (
          <p>Herhangi bir log kaydı bulunamadı.</p>
        ) : (
          <ul className="space-y-2 mt-4">
            {logs.map((log: TaskLogResponse) => (
              <li key={log._id} className="border p-2 rounded bg-gray-100">
                <p className="text-sm">
                  <strong>Güncelleyen : {log.updatedBy.name}</strong> -{" "}
                  {new Date(log.updatedAt).toLocaleString()}
                </p>
                <p className="text-xs text-gray-700">
                  Eski Durumu : {log.oldStatus}
                </p>
                <p className="text-xs text-gray-700">
                  Yeni Durumu : {log.newStatus}
                </p>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}
