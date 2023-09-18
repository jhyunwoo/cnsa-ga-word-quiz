import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignOut from "./SingOut";
import Link from "next/link";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="w-full p-4 rounded-lg bg-white shadow-lg">
        <div className="text-lg font-semibold">{session?.user?.name}</div>
        <div>{session?.user?.email}</div>
      </div>
      <Link
        href={"/profile/history"}
        className="w-full p-4 rounded-lg flex justify-center items-center bg-white shadow-lg text-lg font-semibold hover:bg-slate-100 transition duration-200 mt-4 md:mt-0 md:text-center"
      >
        <div>테스트 기록</div>
      </Link>
      <div className="w-full p-4 flex justify-center items-center">
        <SignOut />
      </div>
    </div>
  );
}
