import Recoil from "@/components/Recoil";
import AuthProvider from "./AuthProvider";
import BottomBar from "./BottomBar";
import Header from "./Header";
import "./globals.css";
import type { Metadata } from "next";
import Loading from "@/components/Loading";

export const metadata: Metadata = {
  title: "이뿌영 퀴즈",
  description: "이미지로 뿌리 뽑는 영단어 퀴즈",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kr">
      <body className="bg-slate-50 scrollbar-hide">
        <AuthProvider>
          <Recoil>
            <Header />
            <BottomBar />
            <Loading />
            {children}
          </Recoil>
        </AuthProvider>
      </body>
    </html>
  );
}
