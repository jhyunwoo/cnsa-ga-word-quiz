import prisma from "@/lib/prisma";
import QuizArea from "./QuizArea";

export const revalidate = 10;

export default async function Practice({
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

  for (let i = 0; i < wordList.length; i += 1) {
    const randomIndex = Math.floor(Math.random() * 2);
    if (randomIndex === 0) {
      quizList.push({
        id: wordList[i].id,
        origin: wordList[i].origin,
        meaningOfOrigin: wordList[i].meaningOfOrigin,
        word: wordList[i].word,
        meaning: null,
      });
    } else {
      quizList.push({
        id: wordList[i].id,
        origin: wordList[i].origin,
        meaningOfOrigin: wordList[i].meaningOfOrigin,
        word: null,
        meaning: wordList[i].meaning,
      });
    }
  }
  const shuffledQuiz = [...quizList].sort(() => Math.random() - 0.5);

  console.log(shuffledQuiz);

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
