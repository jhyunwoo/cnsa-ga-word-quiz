import Layout from "@/components/Layout";
import { ReactNode } from "react";

export default function RankingLayout({ children }: { children: ReactNode }) {
  return <Layout>{children}</Layout>;
}
