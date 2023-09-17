import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignOut from "./SingOut";
import Link from "next/link";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  return (
    <div className="w-full flex flex-col">
      <div className="w-full p-4 rounded-lg bg-white shadow-lg">
        <div className="text-lg font-semibold">{session?.user?.name}</div>
        <div>{session?.user?.email}</div>
      </div>
      <Link
        href={"/profile/history"}
        className="w-full p-4 rounded-lg bg-white shadow-lg text-lg font-semibold hover:bg-slate-100 transition duration-200 mt-4"
      >
        테스트 기록
      </Link>
      <div className="w-full p-4 flex justify-center items-center">
        <SignOut />
      </div>
    </div>
  );
}
