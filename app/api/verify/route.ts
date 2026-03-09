import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { keyword } = body;

    const correctWord = process.env.CORRECT_WORD || 'IPUT2026';

    // Normalize input: remove spaces, convert to uppercase
    const normalize = (str: string) => str.replace(/\s+/g, '').toUpperCase();
    const toHalfWidth = (str: string) => {
      return str.replace(/[！-～]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0));
    };

    const normalizedInput = normalize(toHalfWidth(keyword || ''));
    const normalizedCorrect = normalize(toHalfWidth(correctWord));

    if (normalizedInput === normalizedCorrect) {
      // Prisma: トランザクションで現在の人数を取得し、+1 して登録する
      const record = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        const currentCount = await tx.clearRecord.count();
        const newRank = currentCount + 1;
        return tx.clearRecord.create({
          data: {
            rank: newRank,
          },
        });
      });
      
      return NextResponse.json({
        success: true,
        rank: record.rank,
        timestamp: record.timestamp.toISOString(),
        enqueteUrl: process.env.ENQUETE_URL || 'https://example.com'
      });
    }

    return NextResponse.json({ success: false }, { status: 400 });

  } catch (error) {
    console.error('Verify API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
