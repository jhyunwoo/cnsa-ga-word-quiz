"use client";

import { QuizType } from "@/types/quiz";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, set } from "react-hook-form";

type Inputs = {
  userAnswer: string;
};

export default function Practice({
  params,
}: {
  params: { chapterId: string };
}) {
  const [quiz, setQuiz] = useState<QuizType[]>([]);
  const [count, setCount] = useState(0);
  const [answer, setAnswer] = useState<{
    result: boolean | null;
    answer: string;
  }>({ result: null, answer: "" });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (count === 0) {
      const check = await fetch("/api/quiz/origin", {
        method: "PUT",
        body: JSON.stringify({
          chapterId: params.chapterId,
          answer: data.userAnswer,
        }),
      });
      const result = await check.json();
      setAnswer(result);
    } else {
      const check = await fetch("/api/quiz/word", {
        method: "PUT",
        body: JSON.stringify({
          question: quiz[count].question,
          answer: data.userAnswer.toLowerCase(),
          type: quiz[count].type,
        }),
      });
      const result = await check.json();
      setAnswer(result);
    }
  };

  useEffect(() => {
    async function getQuizData() {
      const res = await fetch(`/api/quiz?chapterId=${params.chapterId}`);
      const data = await res.json();
      setQuiz(data);
    }
    getQuizData();
  }, [params.chapterId]);

  function checkAnswer() {
    setAnswer({ result: null, answer: "" });
    setCount(count + 1);
    setValue("userAnswer", "");
  }

  return (
    <>
      {answer?.result !== null ? (
        <div className="w-full h-screen flex justify-center items-center p-8">
          <div className="p-4 rounded-md bg-white flex justify-center items-center w-full aspect-1 relative max-w-sm">
            <div className="flex space-x-2">
              {answer?.result ? (
                <CheckCircleIcon className="w-8 h-8 text-green-500" />
              ) : (
                <XCircleIcon className="w-8 h-8 text-red-500" />
              )}
              <div className="text-lg font-semibold">{answer?.answer}</div>
            </div>{" "}
            <div className="absolute bottom-4 left-4 right-4">
              <button
                className="w-full bg-indigo-400 hover:bg-indigo-500 text-white font-semibold rounded-md p-2 transition duration-200"
                onClick={checkAnswer}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full min-h-screen flex flex-col justify-center items-center p-4 pt-14">
          <div className="p-4 rounded-lg bg-white text-lg font-semibold shadow-md w-full my-4">
            {quiz.length > 0 ? (
              <div>
                {count + 1}. {quiz[count]?.question}
              </div>
            ) : (
              <div className="w-full bg-slate-200 animate-pulse h-8 rounded-md" />
            )}
          </div>

          {quiz.length > 0 && count < quiz.length ? (
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              {quiz[count].type === "word" ? (
                <div className="w-full p-4 rounded-md bg-white shadow-md">
                  <input
                    placeholder="정답을 입력해주세요."
                    {...register("userAnswer", { required: true })}
                    className="p-2 outline-none ring-2 ring-indigo-400 focus:ring-indigo-500 transition duration-200 rounded-md w-full"
                  />
                </div>
              ) : (
                <>
                  <input
                    {...register("userAnswer", { required: true })}
                    className="hidden"
                  />
                  <div className="grid grid-cols-1 gap-2 w-full bg-white rounded-md p-4 shadow-md">
                    {quiz[count].list.map((data, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setValue("userAnswer", data)}
                        className={`w-full ring-2 ring-indigo-400 hover:ring-indigo-500 font-semibold p-2 rounded-md transition duration-200 ${
                          watch("userAnswer") === data
                            ? "bg-indigo-400 hover:bg-indigo-500 text-white"
                            : "text-indigo-500"
                        }`}
                      >
                        {data}
                      </button>
                    ))}
                  </div>
                </>
              )}
              <button
                type="submit"
                className={`${
                  !watch("userAnswer") && "invisible"
                } w-full bg-indigo-400 hover:bg-indigo-500 text-white font-semibold rounded-md my-4 p-2`}
              >
                정답 확인
              </button>
            </form>
          ) : (
            <div className="w-full h-48 rounded-md bg-slate-200 animate-pulse" />
          )}
        </div>
      )}
      {quiz.length === count && count !== 0 ? (
        <div className="w-full h-screen flex justify-center items-center p-8 z-10 bg-slate-50 fixed top-0 left-0">
          <div className="w-full bg-white rounded-lg shadow-lg p-4 flex justify-center items-center">
            <div className="flex justify-center items-center flex-col w-full">
              <div className="text-xl font-bold py-4">학습 완료</div>
              <Link
                href={`/chapter/${params.chapterId}`}
                className="w-full text-center bg-indigo-400 hover:bg-indigo-500 transition duration-200 text-white font-semibold rounded-md p-2"
              >
                돌아가기
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
