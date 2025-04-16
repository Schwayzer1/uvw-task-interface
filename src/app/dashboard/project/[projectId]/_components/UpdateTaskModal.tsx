"use client";
import { createTask } from "@/actions/tasks/post-task-projectId";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  createTaskFormSchema,
  CreateTaskFormSchemaType,
} from "@/schemas/createTaskFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateTask } from "@/actions/tasks/update-task";

export default function UpdateTaskModal({
  projectId,
  setTaskUpdateModal,
  task,
  taskUpdateModal,
  userList,
}: {
  taskUpdateModal: boolean;
  setTaskUpdateModal: Dispatch<SetStateAction<boolean>>;
  projectId: string;
  task: TaskResponse;
  userList: UserResponse[];
}) {
  const [_error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const form: UseFormReturn<CreateTaskFormSchemaType> =
    useForm<CreateTaskFormSchemaType>({
      resolver: zodResolver(createTaskFormSchema()),
      defaultValues: {
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        assignedTo: task.assignedTo?._id,
      },
    });

  async function onSubmit(values: CreateTaskFormSchemaType) {
    try {
      setSubmitting(true);
      const result = await updateTask(projectId, task._id, values);

      if (result?.success) {
        toast.success("Güncelleme başarılı");
        router.push(`/dashboard/project/${projectId}`);
        setTaskUpdateModal(false);
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
    <Dialog open={taskUpdateModal} onOpenChange={setTaskUpdateModal}>
      <DialogContent className="flex flex-col w-full justify-center items-center">
        <DialogTitle>Görev Ekleme</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-10 py-10 w-full"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Görev Adı"
                      type="text"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Görev Açıklaması"
                      type="text"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <div className="flex justify-center items-center gap-2 w-full">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Öncelik Seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Düşük</SelectItem>
                          <SelectItem value="medium">Orta</SelectItem>
                          <SelectItem value="high">Yüksek</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Öncelik Seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Yapılacak</SelectItem>
                          <SelectItem value="in-progress">
                            Devam Ediyor
                          </SelectItem>
                          <SelectItem value="completed">Tamamlandı</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="assignedTo"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || ""}
                    >
                      <SelectTrigger className="bg-white w-full">
                        <SelectValue placeholder="Kullanıcı Seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {userList.map((user) => (
                          <SelectItem key={user._id} value={user._id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {_error && (
              <p className="text-xs text-center text-destructive py-4">
                {_error}
              </p>
            )}

            <Button type="submit" disabled={submitting} className="w-full">
              Güncelle
              <Loader
                className={cn(
                  "animate-spin h-4 w-4 ml-2",
                  !submitting && "hidden"
                )}
              />
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
