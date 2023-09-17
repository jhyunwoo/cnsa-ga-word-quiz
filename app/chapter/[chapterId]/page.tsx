import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Chapter({
  params,
}: {
  params: { chapterId: string };
}) {
  const chapterInfo = await prisma.chapter.findUnique({
    where: {
      id: params.chapterId,
    },
    select: {
      title: true,
      words: true,
    },
  });

  return (
    <>
      <div className="p-4 rounded-md bg-white shadow-md aspect-1 flex flex-col justify-center items-center w-full mx-auto max-w-sm">
        <div className="flex flex-col items-start justify-center">
          <div className="text-3xl font-bold border-b-2 py-4 mb-1">
            {chapterInfo?.title} - {chapterInfo?.words[0].origin}
          </div>
          <div>단어 수 : {chapterInfo?.words.length}</div>
        </div>
      </div>
      <div className="flex space-x-2 w-full mt-8 justify-around">
        <Link
          href={`/chapter/${params.chapterId}/practice`}
          className="p-2 px-4 text-center rounded-md ring-2 ring-indigo-400 hover:ring-indigo-500 bg-indigo-400 hover:bg-indigo-500 text-lg font-semibold text-white w-full transition duration-200"
        >
          연습하기
        </Link>
        <Link
          href={`/chapter/${params.chapterId}/test`}
          className="p-2 px-4 text-center rounded-md ring-2 ring-indigo-400 hover:ring-indigo-500  text-lg font-semibold text-indigo-500 w-full transition duration-200"
        >
          시험보기
        </Link>
      </div>
    </>
  );
}
