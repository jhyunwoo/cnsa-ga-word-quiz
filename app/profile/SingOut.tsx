"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      onClick={() => signOut()}
      className="text-red-500 text-sm hover:text-red-600 transition duration-200 hover:underline"
    >
      로그아웃
    </button>
  );
}
