"use client";

import { signIn } from "next-auth/react";

export default function KakaoSignIn() {
  return (
    <button
      className="p-2 px-4 rounded-lg  font-semibold bg-yellow-400 hover:bg-yellow-500 transition duration-200 text-white text-center"
      onClick={() => signIn("kakao")}
    >
      카카오로 로그인
    </button>
  );
}
