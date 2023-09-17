import prisma from "@/lib/prisma";
import QuizArea from "./QuizArea";

export const revalidate = 10;

export default async function Test({
  params,
}: {
  params: { chapterId: string };
}) {
  const chapterInfo = await prisma.chapter.findUnique({
    where: {
      id: params.chapterId,
    },
    select: {
      words: true,
    },
  });
  const chapterOrigin = chapterInfo?.words[0].origin;

  const chapterList = await prisma.chapter.findMany({
    select: {
      id: true,
      words: {
        select: {
          meaningOfOrigin: true,
        },
      },
    },
  });

  let originList = ["", "", "", ""];
  const originAnswer = chapterList.filter(
    (data: { id: string; words: { meaningOfOrigin: string }[] }) =>
      data.id === params.chapterId
  );

  let originWrong = chapterList.filter(
    (data: { id: string; words: { meaningOfOrigin: string }[] }) =>
      data.id !== params.chapterId
  );

  originList[Math.floor(Math.random() * 4)] =
    originAnswer[0].words[0].meaningOfOrigin;

  for (let i = 0; i < 4; i += 1) {
    if (originList[i] === "") {
      const randomIndex = Math.floor(Math.random() * originWrong.length);
      originList[i] = originWrong[randomIndex].words[0].meaningOfOrigin;
      originWrong.splice(randomIndex, 1);
    }
  }

  const wordList = await prisma.word.findMany({
    where: {
      chapterId: params.chapterId,
    },
  });

  const wordMeaningList = [];
  for (let i = 0; i < wordList.length; i += 1) {
    wordMeaningList.push(wordList[i].meaning);
  }

  let quizList = [];

  while (wordList.length > 0) {
    const randomIndex = Math.floor(Math.random() * 2);
    if (randomIndex === 0) {
      quizList.push({
        id: wordList[0].id,
        origin: wordList[0].origin,
        meaningOfOrigin: wordList[0].meaningOfOrigin,
        word: wordList[0].word,
        meaning: null,
      });
      wordList.splice(0, 1);
    } else {
      quizList.push({
        id: wordList[0].id,
        origin: wordList[0].origin,
        meaningOfOrigin: wordList[0].meaningOfOrigin,
        word: null,
        meaning: wordList[0].meaning,
      });
      wordList.splice(0, 1);
    }
  }
  const shuffledQuiz = [...quizList].sort(() => Math.random() - 0.5);

  return (
    <QuizArea
      quizData={shuffledQuiz}
      originList={originList}
      wordMeaningList={wordMeaningList}
      chapterOrigin={chapterOrigin!}
      chapterId={params.chapterId}
    />
  );
}
