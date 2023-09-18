import { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "이뿌영 퀴즈 | 학습",
  description: "이미지로 뿌리 뽑는 영단어 퀴즈",
  openGraph: {
    title: "이뿌영 퀴즈 | 학습",
    description: "이미지로 뿌리 뽑는 영단어 퀴즈",
  },
};

export default async function TestLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
