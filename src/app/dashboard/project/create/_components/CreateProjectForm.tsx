"use client";

import { createProject } from "@/actions/projects/post-project";
import { Button } from "@/components/ui/button";
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
  createProjectFormSchema,
  CreateProjectFormSchemaType,
} from "@/schemas/createProjectFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export default function CreateProjectForm() {
  const [_error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const form: UseFormReturn<CreateProjectFormSchemaType> =
    useForm<CreateProjectFormSchemaType>({
      resolver: zodResolver(createProjectFormSchema()),
      defaultValues: {
        title: "",
        description: "",
      },
    });

  async function onSubmit(values: CreateProjectFormSchemaType) {
    try {
      setSubmitting(true);
      const result = await createProject(values);

      if (result?.success) {
        toast.success("Oluşturma başarılı", {
          description: "Dashboard'a yönlendiriliyorsunuz...",
        });
        router.push("/dashboard");
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10 py-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Proje Adı"
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
                  placeholder="Proje Açıklaması"
                  type="text"
                  {...field}
                  className="bg-white"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {_error && (
          <p className="text-xs text-center text-destructive py-4">{_error}</p>
        )}

        <Button type="submit" disabled={submitting} className="w-full">
          Oluştur
          <Loader
            className={cn("animate-spin h-4 w-4 ml-2", !submitting && "hidden")}
          />
        </Button>
      </form>
    </Form>
  );
}
