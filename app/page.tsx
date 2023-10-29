import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const chapters = await prisma.chapter.findMany({
    include: {
      words: {
        take: 1,
        select: {
          origin: true,
        },
      },
    },
  });

  return (
    <>
      <Layout>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-2 mx-auto max-w-7xl">
          {chapters?.map(
            (
              data: {
                words: {
                  origin: string;
                }[];
              } & {
                id: string;
                title: string;
              }
            ) => (
              <Link
                href={`/chapter/${data.id}`}
                key={data.id}
                className="w-full bg-white p-4 rounded-lg flex flex-col items-start justify-center hover:bg-slate-100 transition duration-200"
              >
                <div className="text-lg font-semibold">
                  {data.title} - {data?.words[0].origin}
                </div>
              </Link>
            )
          )}
        </div>
      </Layout>
      <Footer />
    </>
  );
}
