'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { TerminalButton } from '@/components/ui/TerminalButton';
import { GlitchText } from '@/components/ui/GlitchText';

function SuccessContent() {
  const searchParams = useSearchParams();
  const rank = searchParams.get('rank') || '???';
  const url = searchParams.get('url') || '#';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center animate-fade-in relative overflow-hidden">
      {/* Lightweight glowing orb effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyber-primary/20 blur-[100px] rounded-full z-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-xl border-2 border-cyber-primary bg-cyber-surface/80 p-8 rounded-sm shadow-[0_0_30px_rgba(0,255,204,0.3)] backdrop-blur-md">
        
        <GlitchText as="h1" className="text-3xl md:text-5xl font-bold text-cyber-primary mb-6 font-mono">
          SYSTEM RESTORED
        </GlitchText>
        
        <div className="text-xl md:text-2xl text-white mb-8 border-b border-cyber-border pb-6">
          <p>プログラムの復元に成功しました。</p>
        </div>

        <div className="mb-10 p-6 bg-black/50 border border-cyber-dim rounded">
          <p className="text-cyber-dim text-sm uppercase mb-2">ACCESS RECORD</p>
          <p className="text-lg md:text-xl">
            あなたは <strong className="text-3xl text-cyber-primary mx-2 font-mono">{rank}</strong> 番目の復元者です。
          </p>
        </div>

        <div className="space-y-6">
          <p className="text-sm text-cyber-text/80">
            ご協力ありがとうございました。<br />
            最後に、以下の端末からイベントのフィードバックデータを送信してください。
          </p>
          
          <a href={decodeURIComponent(url)} target="_blank" rel="noopener noreferrer" className="block w-full">
            <TerminalButton className="w-full h-16 text-lg animate-pulse" variant="primary">
              アンケート（フィードバック）に回答する
            </TerminalButton>
          </a>
          
          <Link href="/" className="block w-full mt-4">
            <TerminalButton variant="secondary" className="w-full">
              システムトップへ戻る
            </TerminalButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-cyber-primary">LOADING...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
