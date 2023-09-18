import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const requestData = await request.json();
  const {
    question,
    answer,
    type,
  }: { question: string; answer: string; type: "word" | "meaning" } =
    requestData;

  if (type === "meaning") {
    const findWord = await prisma.word.findFirst({
      where: {
        word: question,
      },
    });
    if (findWord?.meaning === answer) {
      return NextResponse.json({ result: true, answer: findWord.meaning });
    } else {
      return NextResponse.json({ result: false, answer: findWord?.meaning });
    }
  } else {
    const findWord = await prisma.word.findFirst({
      where: {
        meaning: question,
      },
    });
    if (findWord?.word === answer) {
      return NextResponse.json({ result: true, answer: findWord.word });
    } else {
      return NextResponse.json({ result: false, answer: findWord?.word });
    }
  }
}
