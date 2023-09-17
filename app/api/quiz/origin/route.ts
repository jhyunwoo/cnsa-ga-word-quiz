import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const requestData = await request.json();

  const { chapterId, answer }: { chapterId: string; answer: string } =
    requestData;

  const checkAnswer = await prisma.chapter.findUnique({
    where: {
      id: chapterId,
    },
    select: {
      words: true,
    },
  });

  if (!checkAnswer) return NextResponse.json({ request: false, answer: null });

  if (checkAnswer.words[0].meaningOfOrigin === answer) {
    return NextResponse.json({
      result: true,
      answer: checkAnswer.words[0].meaningOfOrigin,
    });
  } else {
    return NextResponse.json({
      result: false,
      answer: checkAnswer.words[0].meaningOfOrigin,
    });
  }
}
