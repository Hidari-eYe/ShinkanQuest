import Link from 'next/link';
import { TerminalButton } from '@/components/ui/TerminalButton';
import { GlitchText } from '@/components/ui/GlitchText';

export default function FailurePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="w-full max-w-lg border-2 border-cyber-accent bg-cyber-surface/50 p-8 rounded-sm shadow-[0_0_20px_rgba(255,0,60,0.2)]">
        
        <GlitchText as="h1" className="text-3xl md:text-4xl font-bold text-cyber-accent mb-4 font-mono">
          ACCESS DENIED
        </GlitchText>
        
        <div className="text-lg text-cyber-text mb-8">
          <p>入力されたソースコードが一致しません。</p>
          <p className="text-sm text-cyber-dim mt-2">
            システムは引き続きロックされています。もう一度各ギルドのデータを調査するか、アーカイブ（ヒント）を確認してください。
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Link href="/challenge" className="w-full">
            <TerminalButton variant="danger" className="w-full">
              再度コードを入力する
            </TerminalButton>
          </Link>
          <Link href="/hint" className="w-full">
            <TerminalButton variant="secondary" className="w-full">
              システムアーカイブ（ヒント）へ
            </TerminalButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
