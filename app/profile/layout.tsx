import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Layout from "@/components/Layout";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "이뿌영 퀴즈 | 프로필",
  description: "이미지로 뿌리 뽑는 영단어 퀴즈",
  openGraph: {
    title: "이뿌영 퀴즈 | 프로필",
    description: "이미지로 뿌리 뽑는 영단어 퀴즈",
  },
};

export default async function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/auth/signin");

  return (
    <>
      <Layout>{children}</Layout>
      <Footer />
    </>
  );
}
