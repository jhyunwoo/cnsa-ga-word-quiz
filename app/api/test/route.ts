import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestData = await request.json();
  const {
    chapterId,
    result,
    accuracy,
  }: { chapterId: string; result: boolean[]; accuracy: number } = requestData;

  const session = await getServerSession(authOptions);

  if (!session?.user)
    return NextResponse.json({ error: "not logged in" }, { status: 401 });

  const createResult = await prisma.result.create({
    data: {
      userId: session.user.id,
      chapterId: chapterId,
      results: result,
      accuracy: accuracy,
    },
  });

  return NextResponse.json(createResult);
}
