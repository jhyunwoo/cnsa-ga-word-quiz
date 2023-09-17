import Layout from "@/components/Layout";
import { ReactNode } from "react";

export default async function ChapterLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
