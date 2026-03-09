import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    const adminPassword = process.env.ADMIN_PASSWORD || 'admin_secret';

    if (password === adminPassword) {
      // Prisma でデータベースから取得
      const records = await prisma.clearRecord.findMany({
        orderBy: { rank: 'desc' },
      });

      // 古いレスポンス形式に合わせるための整形
      const formattedRecords = records.map((r: { id: string; rank: number; timestamp: Date }) => ({
        id: r.id,
        rank: r.rank,
        timestamp: r.timestamp.toISOString(),
      }));

      return NextResponse.json({ success: true, records: formattedRecords });
    }

    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  } catch (error) {
    console.error('Admin API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
