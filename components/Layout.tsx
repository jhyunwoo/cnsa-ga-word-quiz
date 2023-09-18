import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="pt-14 md:pt-16 p-4 w-full min-h-screen flex flex-col">
      {children}
    </div>
  );
}
