import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const userList = await prisma.user.findMany({
    select: {
      name: true,
      results: true,
    },
  });

  let ranking = [];
  for (let i = 0; i < userList.length; i += 1) {
    let sum = 0;
    for (let j = 0; j < userList[i].results.length; j += 1) {
      sum += userList[i].results[j].accuracy;
    }
    sum = sum / userList[i].results.length;
    ranking.push({
      name: userList[i].name,
      accuracy: sum,
    });
  }

  ranking.sort(function (a, b) {
    return b.accuracy - a.accuracy;
  });

  return NextResponse.json(ranking);
}
