import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-[80dvh]">
      <Card className="bg-indigo-300 p-4">
        <CardContent className="flex flex-col w-full h-full justify-center items-center">
          <img src="./uvw-logo-2.png" className="w-full h-full" />
          <p className="text-4xl text-white pt-10 pb-5">
            Admin Paneline Hoş Geldiniz
          </p>
          <Link
            href="/login"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            prefetch={false}
          >
            Giriş Yap
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
