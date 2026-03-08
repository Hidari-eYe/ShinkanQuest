// このファイルは JSON を扱うためのものでしたが、
// DB（Prisma）に移行したため、使わなくなりますが、
// API 側の修正を最小にするため型だけ残しておきます。
import prisma from './prisma';

export type ClearRecord = {
  id: string;
  timestamp: string;
  rank: number;
};

// 以降の処理は API (route.ts) 側で直接 Prisma を呼び出す形に変更します。
