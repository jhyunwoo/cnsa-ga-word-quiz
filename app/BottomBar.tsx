"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowPathIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
  Square3Stack3DIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

export default function BottomBar() {
  const pathname = usePathname();
  const { status } = useSession();
  return (
    <div
      className={`fixed bottom-0 left-0 w-full py-4 px-2 flex justify-center items-center ${
        pathname.includes("/practice") || pathname.includes("/test")
          ? "hidden"
          : ""
      }`}
    >
      <div className="bg-white rounded-full p-2 flex justify-around items-center w-full space-x-2 shadow-lg">
        <Link
          href={"/ranking"}
          className={`p-2 rounded-full  flex flex-col items-center justify-center w-full  transition duration-200 ${
            pathname.includes("/ranking")
              ? "bg-indigo-400 text-white hover:bg-indigo-500"
              : "text-indigo-500 hover:bg-indigo-100"
          }`}
        >
          <ChartBarIcon className="w-6 h-6" />
          <p className="text-xs">Ranking</p>
        </Link>
        <Link
          href={"/"}
          className={`p-2 rounded-full  flex flex-col items-center justify-center w-full  transition duration-200 ${
            pathname === "/"
              ? "bg-indigo-400 text-white hover:bg-indigo-500"
              : "text-indigo-500 hover:bg-indigo-100"
          }`}
        >
          <Square3Stack3DIcon className="w-6 h-6" />
          <p className="text-xs">Home</p>
        </Link>

        {status === "loading" ? (
          <div
            className={`p-2 rounded-full text-indigo-500 hover:bg-indigo-100 flex flex-col items-center justify-center w-full  transition duration-200 `}
          >
            <ArrowPathIcon className="w-6 h-6 animate-spin" />
            <p className="text-xs">Loading...</p>
          </div>
        ) : status === "authenticated" ? (
          <Link
            href={"/profile"}
            className={`p-2 rounded-full  flex flex-col items-center justify-center w-full  transition duration-200 ${
              pathname.includes("/profile")
                ? "bg-indigo-400 text-white hover:bg-indigo-500"
                : "text-indigo-500 hover:bg-indigo-100"
            }`}
          >
            <UserCircleIcon className="w-6 h-6" />
            <p className="text-xs">Profile</p>
          </Link>
        ) : (
          <Link
            href={"/auth/signin"}
            className={`p-2 rounded-full  flex flex-col items-center justify-center w-full  transition duration-200 ${
              pathname.includes("/auth")
                ? "bg-indigo-400 text-white hover:bg-indigo-500"
                : "text-indigo-500 hover:bg-indigo-100"
            }`}
          >
            <ArrowRightOnRectangleIcon className="w-6 h-6" />
            <p className="text-xs">Sign In</p>
          </Link>
        )}
      </div>
    </div>
  );
}
