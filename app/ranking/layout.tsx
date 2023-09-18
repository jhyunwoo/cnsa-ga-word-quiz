import Layout from "@/components/Layout";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "이뿌영 퀴즈 | 랭킹",
  description: "이미지로 뿌리 뽑는 영단어 퀴즈",
  openGraph: {
    title: "이뿌영 퀴즈 | 랭킹",
    description: "이미지로 뿌리 뽑는 영단어 퀴즈",
  },
};

export default function RankingLayout({ children }: { children: ReactNode }) {
  return <Layout>{children}</Layout>;
}
