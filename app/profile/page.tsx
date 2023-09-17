import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignOut from "./SingOut";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  return (
    <div className="w-full flex flex-col">
      <div className="w-full p-4 rounded-lg bg-white shadow-lg">
        <div className="text-lg font-semibold">{session?.user?.name}</div>
        <div>{session?.user?.email}</div>
      </div>
      <div className="w-full p-4 flex justify-center items-center">
        <SignOut />
      </div>
    </div>
  );
}
