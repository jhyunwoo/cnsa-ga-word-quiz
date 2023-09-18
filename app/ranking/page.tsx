"use client";

import {
  ExclamationTriangleIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Ranking() {
  const { data, error, isLoading } = useSWR("/api/ranking", fetcher);

  return (
    <>
      <div className="text-xl font-bold py-4 flex space-x-2">
        <TrophyIcon className="w-8 h-8 text-yellow-400" />
        <h1>Ranking</h1>
      </div>
      {isLoading && (
        <div className="w-full h-96 rounded-md bg-slate-200 animate-pulse" />
      )}
      {error && (
        <div className="flex items-center justify-center p-4">
          <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
          <div>랭킹을 불러올 수 없습니다.</div>
        </div>
      )}
      {data && (
        <div className="w-full flex flex-col space-y-2">
          {data.map((user: any, index: number) => (
            <div
              key={index}
              className="w-full bg-white p-2 rounded-md flex justify-between items-center shadow-lg"
            >
              <div className="font-semibold text-lg">
                {index + 1}위 {user.name}
              </div>
              <div>정확도 {user.accuracy ? user.accuracy?.toFixed(2) : 0}%</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
