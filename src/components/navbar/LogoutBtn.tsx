"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    toast.success("Başarıyla çıkış yapıldı");
    router.push("/login");
  };

  return (
    <button onClick={handleLogout} className={className}>
      Çıkış Yap
    </button>
  );
}
