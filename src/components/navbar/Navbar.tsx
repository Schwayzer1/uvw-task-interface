"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, Menu } from "lucide-react";
import { DialogTitle } from "../ui/dialog";
import LogoutButton from "./LogoutBtn";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 border-b bg-indigo-300 mb-5 lg:justify-start justify-between ">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-indigo-300">
          <SheetHeader className="hidden">
            <DialogTitle className="hidden"></DialogTitle>
          </SheetHeader>
          <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
            <Home className="h-6 w-6" />
          </Link>
          <div className="grid gap-2 py-6">
            {session && (
              <Link
                href="/dashboard"
                className="flex w-full items-center justify-center py-2 text-lg font-semibold hover:border-b hover:border-neutral-400"
                prefetch={false}
              >
                <SheetTrigger className="w-full cursor-pointer">
                  Admin Panel
                </SheetTrigger>
              </Link>
            )}
            {session ? (
              <SheetTrigger className="w-full cursor-pointer" asChild>
                <LogoutButton className="flex w-full items-center justify-center py-2 text-lg font-semibold hover:border-b hover:border-neutral-400" />
              </SheetTrigger>
            ) : (
              <Link
                href="/login"
                className="flex w-full items-center justify-center py-2 text-lg font-semibold hover:border-b hover:border-neutral-400"
                prefetch={false}
              >
                <SheetTrigger className="w-full cursor-pointer">
                  Giriş Yap
                </SheetTrigger>
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
        <img src="./uvw-logo-2.png" className="h-16 w-16" />
      </Link>
      <nav className="ml-auto hidden lg:flex gap-6 bg-indigo-300">
        {session && (
          <Link
            href="/dashboard"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            prefetch={false}
          >
            Admin Panel
          </Link>
        )}
        {session ? (
          <LogoutButton className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none cursor-pointer" />
        ) : (
          <Link
            href="/login"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            prefetch={false}
          >
            Giriş Yap
          </Link>
        )}
      </nav>
      <Link href="/" className="mr-6 flex lg:hidden" prefetch={false}>
        <img src="./uvw-logo-2.png" className="h-16 w-16" />
      </Link>
    </header>
  );
}
