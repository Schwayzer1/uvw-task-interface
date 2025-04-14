import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
