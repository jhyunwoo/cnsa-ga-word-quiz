"use client";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type QuizType = {
  id: string;
  origin: string;
  meaningOfOrigin: string;
  word: string | null;
  meaning: string | null;
};

export default function QuizArea({
  quizData,
  originList,
  wordMeaningList,
  chapterOrigin,
  chapterId,
}: {
  quizData: QuizType[];
  originList: string[];
  wordMeaningList: string[];
  chapterOrigin: string;
  chapterId: string;
}) {
  const [quizList, setQuizlist] = useState(quizData);
  const [quizCount, setQuizCount] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<{
    result: null | boolean;
    answer: any;
  }>({ result: null, answer: "" });

  const [testResult, setTestResult] = useState<boolean[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function checkOriginAnswer() {
    const check = await fetch("/api/quiz/origin", {
      method: "PUT",
      body: JSON.stringify({ chapterId: chapterId, answer: answer }),
    });
    const checkResult = await check.json();
    setResult(checkResult);
    setTestResult((prev) => [...prev, checkResult.result]);
  }

  async function checkAnswer() {
    const check = await fetch("/api/quiz/word", {
      method: "PUT",
      body: JSON.stringify({
        question:
          quizList[quizCount - 1]?.word === null
            ? quizList[quizCount - 1].meaning
            : quizList[quizCount - 1].word,
        answer:
          quizList[quizCount - 1]?.word === null
            ? inputRef.current?.value
            : answer,
      }),
    });
    const checkResult = await check.json();
    setResult(checkResult);
    setTestResult((prev) => [...prev, checkResult.result]);
  }

  function getAccuracy(resultData: boolean[]) {
    let correctCount = 0;
    for (let i = 0; i < resultData.length; i += 1) {
      if (resultData[i] === true) {
        correctCount++;
      }
    }
    return (correctCount / resultData.length) * 100;
  }

  async function updateResult() {
    const update = await fetch("/api/test", {
      method: "POST",
      body: JSON.stringify({
        chapterId: chapterId,
        result: testResult,
        accuracy: getAccuracy(testResult),
      }),
    });
    const updateResult = await update.json();
    router.push(`/chapter/${chapterId}`);
  }

  useEffect(() => {
    console.log(quizCount);
    console.log(result);
    console.log(answer);
  }, [quizCount, result, answer]);

  return (
    <>
      {quizCount < quizData.length + 1 ? (
        <>
          {quizCount === 0 && result.result === null ? (
            <>
              <div className="w-full p-4 rounded-md bg-white ">
                <div className="text-lg font-semibold">
                  {quizCount + 1}. {chapterOrigin}의 뜻은?
                </div>
              </div>
              <div className="w-full grid grid-cols-2 gap-2 mt-12 fixed top-1/2 left-0 p-4">
                {originList.map((data, index) => (
                  <button
                    type="button"
                    onClick={() => setAnswer(data)}
                    key={index}
                    className={`w-full ring-2 ring-indigo-400 hover:ring-indigo-500 text-indigo-500 transition duration-200 p-2 text-center rounded-md ${
                      data === answer
                        ? "bg-indigo-400 hover:bg-indigo-500 text-white"
                        : "text-indigo-500"
                    }`}
                  >
                    {data}
                  </button>
                ))}
                {answer !== "" && result.result === null ? (
                  <button
                    type="submit"
                    onClick={checkOriginAnswer}
                    className="w-full col-span-2 bg-indigo-500 text-white p-2 font-semibold rounded-md mt-4 hover:bg-indigo-600 transition duration-200"
                  >
                    정답 확인
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            result.result === null && (
              <>
                <div className="w-full p-4 rounded-md bg-white ">
                  <div className="text-lg font-semibold">
                    {quizCount + 1}.{" "}
                    {quizList[quizCount - 1]?.word === null
                      ? quizList[quizCount - 1].meaning
                      : quizList[quizCount - 1].word + "의 뜻은?"}
                  </div>
                </div>
                <div className="w-full  mt-12 fixed top-1/2 left-0 p-4">
                  {quizList[quizCount - 1]?.word === null ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        checkAnswer();
                      }}
                    >
                      <input
                        ref={inputRef}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="w-full outline-none ring-2 ring-indigo-500 rounded-md p-2"
                        placeholder="영단어를 입력해주세요."
                      />
                      {answer !== "" && result.result === null ? (
                        <button
                          type="submit"
                          className="w-full col-span-2 bg-indigo-500 text-white p-2 font-semibold rounded-md mt-4 hover:bg-indigo-600 transition duration-200"
                        >
                          정답 확인
                        </button>
                      ) : (
                        <></>
                      )}
                    </form>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-2 w-full">
                        {wordMeaningList.map((data, index) => (
                          <button
                            type="button"
                            onClick={() => setAnswer(data)}
                            key={index}
                            className={`w-full ring-2 ring-indigo-400 hover:ring-indigo-500 text-indigo-500 transition duration-200 p-2 text-center rounded-md ${
                              data === answer
                                ? "bg-indigo-400 hover:bg-indigo-500 text-white"
                                : "text-indigo-500"
                            }`}
                          >
                            {data}
                          </button>
                        ))}
                      </div>
                      {answer !== "" && result.result === null ? (
                        <button
                          type="submit"
                          onClick={checkAnswer}
                          className="w-full col-span-2 bg-indigo-500 text-white p-2 font-semibold rounded-md mt-4 hover:bg-indigo-600 transition duration-200"
                        >
                          정답 확인
                        </button>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </div>
              </>
            )
          )}
          {result.result !== null && quizCount === 0 ? (
            <div className="bg-white p-2 rounded-md m-auto w-full aspect-1 max-w-sm flex justify-center items-center flex-col relative">
              <div className="flex items-center space-x-2">
                {result.result ? (
                  <CheckCircleIcon className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircleIcon className="w-10 h-10 text-red-500" />
                )}
                <div className="text-xl font-semibold">
                  정답 : {result.answer}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-2 ">
                <button
                  type="button"
                  onClick={() => {
                    setResult({ result: null, answer: "" });
                    setAnswer("");
                    setQuizCount((prev) => prev + 1);
                  }}
                  className="w-full p-2 rounded-md bg-indigo-400 hover:bg-indigo-500 transition duration-200 text-white"
                >
                  다음
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
          {result.result !== null && quizCount !== 0 ? (
            <div className="bg-white p-2 rounded-md m-auto w-full aspect-1 max-w-sm flex justify-center items-center flex-col relative">
              <div className="flex items-center space-x-2">
                {result.result ? (
                  <CheckCircleIcon className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircleIcon className="w-10 h-10 text-red-500" />
                )}
                <div className="text-xl font-semibold">
                  정답 :{" "}
                  {quizList[quizCount - 1]?.word === null
                    ? result.answer.word
                    : result.answer.meaning}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-2 ">
                <button
                  type="button"
                  onClick={() => {
                    setResult({ result: null, answer: "" });
                    setQuizCount((prev) => prev + 1);
                    setAnswer("");
                  }}
                  className="w-full p-2 rounded-md bg-indigo-400 hover:bg-indigo-500 transition duration-200 text-white"
                >
                  다음
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <div className=" p-4 w-full  fixed top-1/3 left-0">
          <div className="bg-white p-4 rounded-lg flex flex-col">
            <div className="text-xl font-bold mx-auto">태스트 완료</div>
            <div className="text-lg font-semibold mx-auto">
              정확도 {getAccuracy(testResult).toFixed(2)}%
            </div>
            <button
              onClick={updateResult}
              className="w-full p-2 bg-indigo-400 text-white font-semibold hover:bg-indigo-500 transition duration-200 rounded-lg text-center mt-4"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
}
