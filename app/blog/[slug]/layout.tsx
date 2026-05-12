import type { ReactNode } from "react";
import { Fragment_Mono } from "next/font/google";

const fragmentMono = Fragment_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fragment-mono",
  display: "swap",
});

export default function BlogPostLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <div className={fragmentMono.variable}>{children}</div>;
}
