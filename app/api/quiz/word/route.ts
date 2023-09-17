import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const requestData = await request.json();
  const { question, answer }: { question: string; answer: string } =
    requestData;

  const checkAnswer = await prisma.word.findFirst({
    where: {
      OR: [
        {
          word: question,
        },
        {
          meaning: question,
        },
      ],
    },
  });

  if (!checkAnswer) return NextResponse.json({ request: false, answer: null });

  if (checkAnswer.word === answer || checkAnswer.meaning === answer) {
    return NextResponse.json({
      result: true,
      answer: checkAnswer,
    });
  } else {
    return NextResponse.json({
      result: false,
      answer: checkAnswer,
    });
  }
}
