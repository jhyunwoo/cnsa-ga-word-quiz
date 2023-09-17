"use client";

import { loadingState } from "@/lib/recoil";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useRecoilValue } from "recoil";

export default function Loading() {
  const loading = useRecoilValue(loadingState);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen flex items-center justify-center touch-none ${
        !loading && "hidden"
      }`}
    >
      <Cog6ToothIcon className="w-12 h-12 text-slate-600 animate-spin" />
    </div>
  );
}
