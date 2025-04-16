"use client";

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
import { Eye, EyeOff, Loader } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [_error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const formSchema = z.object({
    email: z.string().email({ message: "Lütfen geçerli bir mail giriniz" }),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setSubmitting(true);
      setError("");

      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (res?.error) {
        setError("Geçersiz email veya şifre");
        toast.error("Giriş başarısız", {
          description: "Lütfen bilgilerinizi kontrol edin.",
        });
      } else {
        toast.success("Giriş başarılı", {
          description: "Dashboard'a yönlendiriliyorsunuz...",
        });
        router.push("/dashboard");
      }
    } catch (error) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      toast.error("Sunucu hatası", {
        description: "Lütfen daha sonra tekrar deneyin.",
      });
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
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder={"Email"} {...field} className="bg-white" />
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

        {_error && (
          <p className="text-xs text-center text-destructive py-4">{_error}</p>
        )}

        <Button type="submit" disabled={submitting} className="w-full">
          Giriş Yap
          <Loader
            className={cn("animate-spin h-4 w-4 ml-2", !submitting && "hidden")}
          />
        </Button>
      </form>
    </Form>
  );
}
