import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Layout from "@/components/Layout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function TestLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");

  return <Layout>{children}</Layout>;
}
