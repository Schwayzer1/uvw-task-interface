"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
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
import {
  roleUpdateFormSchema,
  RoleUpdateFormSchemaType,
} from "@/schemas/roleUpdateFormSchema";
import { updateUserRole } from "@/actions/auth/update-user-role";

export default function UserUpdateModal({
  roleUpdateModal,
  setRoleUpdateModal,
  user,
}: {
  roleUpdateModal: boolean;
  setRoleUpdateModal: Dispatch<SetStateAction<boolean>>;
  user: UserResponse;
}) {
  const [_error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const form: UseFormReturn<RoleUpdateFormSchemaType> =
    useForm<RoleUpdateFormSchemaType>({
      resolver: zodResolver(roleUpdateFormSchema()),
      defaultValues: {
        role: user.role,
      },
    });

  async function onSubmit(values: RoleUpdateFormSchemaType) {
    try {
      setSubmitting(true);
      const result = await updateUserRole(values, user._id);

      if (result?.success) {
        toast.success("Değişim başarılı");
        router.push(`/dashboard/users`);
        setRoleUpdateModal(false);
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
    <Dialog open={roleUpdateModal} onOpenChange={setRoleUpdateModal}>
      <DialogContent className="flex flex-col w-full justify-center items-center">
        <DialogTitle>Görev Ekleme</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-10 py-10 w-full justify-center items-center"
          >
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-2/3 flex justify-center items-center">
                  <FormControl className="w-full">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="bg-white w-full text-center justify-center">
                        <SelectValue placeholder="Öncelik Seçin" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                        <SelectItem value="Developer">Developer</SelectItem>
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
              Değiştir
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
