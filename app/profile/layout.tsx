import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Layout from "@/components/Layout";

export default async function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/auth/signin");

  return <Layout>{children}</Layout>;
}
