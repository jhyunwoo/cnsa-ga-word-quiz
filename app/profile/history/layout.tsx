import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "이뿌영 퀴즈 | 테스트 기록",
  description: "이미지로 뿌리 뽑는 영단어 퀴즈",
  openGraph: {
    title: "이뿌영 퀴즈 | 테스트 기록",
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

  return <>{children}</>;
}
