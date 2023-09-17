"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function TestButton({ chapterId }: { chapterId: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  function handelTestButton() {
    if (session) {
      router.push(`/chapter/${chapterId}/test`);
    } else {
      router.push(`/auth/signin`);
    }
  }

  return (
    <button
      type="button"
      onClick={() => handelTestButton()}
      className="p-2 px-4 text-center rounded-md ring-2 ring-indigo-400 hover:ring-indigo-500  text-lg font-semibold text-indigo-500 w-full transition duration-200"
    >
      시험보기
    </button>
  );
}
