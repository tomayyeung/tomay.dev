import type { Metadata } from "next";
import { Lato } from "next/font/google";

import { ViewProvider } from "@/context/ViewContext";
import { Settings } from "@/components/Settings";

import "./globals.css";

const lato = Lato({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "tomay.dev",
  description: "personal website of thomas yeung, usfca cs student",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${lato.className}`}>
        <ViewProvider>
          <Settings />
          {children}
        </ViewProvider>
      </body>
    </html>
  );
}
