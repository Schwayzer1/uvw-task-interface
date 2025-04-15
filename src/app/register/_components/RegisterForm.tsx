"use client";

import { registerUser } from "@/actions/auth/register";
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
  registerFormSchema,
  RegisterFormSchemaType,
} from "@/schemas/registerFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterForm() {
  const [_error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const form: UseFormReturn<RegisterFormSchemaType> =
    useForm<RegisterFormSchemaType>({
      resolver: zodResolver(registerFormSchema()),
      defaultValues: {
        email: "",
        password: "",
        re_password: "",
        name: "",
      },
    });

  async function onSubmit(values: RegisterFormSchemaType) {
    try {
      setSubmitting(true);
      const result = await registerUser(values);

      if (result?.success) {
        const loginRes = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (loginRes?.error) {
          setError("Otomatik giriş başarısız");
        } else {
          toast.success("Kayıt başarılı", {
            description: "Dashboard'a yönlendiriliyorsunuz...",
          });
          router.push("/dashboard");
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Bilinmeyen bir hata oluştu");
      }
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
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="İsminiz"
                  type="text"
                  autoComplete="name"
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
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder={"Email"}
                  {...field}
                  className="bg-white"
                  type="email"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="relative">
                  <Input
                    className="bg-white"
                    placeholder={"Şifre"}
                    {...field}
                    type={showPass ? "text" : "password"}
                  />
                  {!showPass ? (
                    <Eye
                      className="absolute w-4 h-4 top-1/2 -translate-y-1/2 right-3 !mt-0 opacity-70 cursor-pointer"
                      onClick={() => setShowPass(!showPass)}
                    />
                  ) : (
                    <EyeOff
                      className="absolute w-4 h-4 top-1/2 -translate-y-1/2 right-3 !mt-0 opacity-70 cursor-pointer"
                      onClick={() => setShowPass(!showPass)}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="re_password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="relative">
                  <Input
                    className="bg-white"
                    placeholder={"Şifre"}
                    {...field}
                    type={showPass ? "text" : "password"}
                  />
                  {!showPass ? (
                    <Eye
                      className="absolute w-4 h-4 top-1/2 -translate-y-1/2 right-3 !mt-0 opacity-70 cursor-pointer"
                      onClick={() => setShowPass(!showPass)}
                    />
                  ) : (
                    <EyeOff
                      className="absolute w-4 h-4 top-1/2 -translate-y-1/2 right-3 !mt-0 opacity-70 cursor-pointer"
                      onClick={() => setShowPass(!showPass)}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {_error && (
          <p className="text-xs text-center text-destructive py-4">{_error}</p>
        )}

        <Button type="submit" disabled={submitting} className="w-full">
          Kayıt Ol
          <Loader
            className={cn("animate-spin h-4 w-4 ml-2", !submitting && "hidden")}
          />
        </Button>
      </form>
    </Form>
  );
}
