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

export default function Navbar() {
  return (
    <header className="flex h-16 w-full shrink-0 items-center px-4 md:px-6 border-b bg-neutral-200 mb-5">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-neutral-200">
          <SheetHeader className="hidden">
            <DialogTitle className="hidden"></DialogTitle>
          </SheetHeader>
          <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
            <Home className="h-6 w-6" />
          </Link>
          <div className="grid gap-2 py-6">
            <Link
              href="/login"
              className="flex w-full items-center justify-center py-2 text-lg font-semibold hover:border-b hover:border-neutral-400"
              prefetch={false}
            >
              <SheetTrigger className="w-full cursor-pointer">
                Login
              </SheetTrigger>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
        <Home className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-6 bg-neutral-200">
        <Link
          href="/login"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
