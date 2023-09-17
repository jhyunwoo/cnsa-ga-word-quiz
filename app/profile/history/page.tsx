import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function History() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/auth/signin");

  const history = await prisma.result.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      Chapter: true,
    },
    orderBy: {
      created: "desc",
    },
  });

  /** 입력받은 날짜 데이터를 XXXX년 XX월 XX일 X시로 전환 */
  function convertDate(date: Date | null | undefined | string): string {
    if (!date) return "";
    const sharedDate = new Date(date);
    sharedDate.setHours(sharedDate.getHours() + 9);
    const options: { dateStyle: "long"; timeStyle: "short" } = {
      dateStyle: "long",
      timeStyle: "short",
    };
    return Intl.DateTimeFormat("ko-KR", options).format(sharedDate);
  }

  return (
    <div>
      <Link href={"/profile"} className="flex space-x-2 group">
        <ChevronDoubleLeftIcon className="w-6 h-6 text-gray-500" />
        <div className="text-gray-600 group-hover:underline">프로필</div>
      </Link>
      <div className="text-xl font-bold py-2">테스트 기록</div>
      <div className="flex flex-col space-y-2">
        {history.map((data: any, index: number) => (
          <div
            key={index}
            className="flex text-sm bg-white p-2 rounded-md justify-between items-center"
          >
            <div className="text-lg font-semibold">{data.Chapter?.title}</div>
            <div className="flex flex-col items-end justify-center">
              <div className="font-semibold">
                정확도 : {data.accuracy.toFixed(2)}%
              </div>
              <div className="text-xs">{convertDate(data.created)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
