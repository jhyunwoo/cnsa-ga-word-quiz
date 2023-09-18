import prisma from "@/lib/prisma";
import { QuizType } from "@/types/quiz";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chapterId = searchParams.get("chapterId");

  if (!chapterId)
    return NextResponse.json({ result: "wrong request" }, { status: 400 });

  const chapterInfo = await prisma.chapter.findUnique({
    where: {
      id: chapterId,
    },
    select: {
      words: true,
    },
  });
  if (!chapterInfo?.words[0].meaningOfOrigin)
    return NextResponse.json({ result: "no meaningOfOrigin" }, { status: 400 });

  const meaningOfOriginAnswer: string = chapterInfo?.words[0].meaningOfOrigin;

  const allWordsList = await prisma.chapter.findMany({
    select: {
      words: true,
    },
  });
  let meaningOfOriginList = [];
  for (let i = 0; i < allWordsList.length; i += 1) {
    meaningOfOriginList.push(allWordsList[i].words[0].meaningOfOrigin);
  }
  meaningOfOriginList = meaningOfOriginList.filter(
    (item) => item !== meaningOfOriginAnswer
  );
  meaningOfOriginList.sort(() => Math.random() - 0.5);

  let meaningOfOriginAnswerList: string[] = [];
  meaningOfOriginAnswerList.push(meaningOfOriginAnswer);
  for (let i = 0; i < 3; i += 1) {
    meaningOfOriginAnswerList.push(meaningOfOriginList[i]);
  }
  meaningOfOriginAnswerList.sort(() => Math.random() - 0.5);

  let quiz: QuizType[] = [];
  quiz.push({
    question: chapterInfo?.words[0].origin,
    type: "meaning",
    list: meaningOfOriginAnswerList,
  });

  let meaningList: string[] = [];

  for (let i = 0; i < chapterInfo.words.length; i += 1) {
    meaningList.push(chapterInfo.words[i].meaning);
  }

  chapterInfo.words.sort(() => Math.random() - 0.5);

  for (let i = 0; i < chapterInfo.words.length; i += 1) {
    let randomIndex = Math.floor(Math.random() * 2);
    const shuffledArray = [...meaningList].sort(() => Math.random() - 0.5);

    if (randomIndex === 0) {
      quiz.push({
        question: chapterInfo.words[i].word,
        type: "meaning",
        list: shuffledArray,
      });
    } else {
      quiz.push({
        question: chapterInfo.words[i].meaning,
        type: "word",
        list: [],
      });
    }
  }

  return NextResponse.json(quiz);
}
