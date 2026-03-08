import Link from 'next/link';
import { TerminalButton } from '@/components/ui/TerminalButton';
import { GlitchText } from '@/components/ui/GlitchText';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="max-w-2xl w-full border border-cyber-border bg-cyber-surface/50 p-8 rounded-sm shadow-[0_0_15px_rgba(0,255,204,0.1)] backdrop-blur-sm">
        
        <div className="mb-8">
          <GlitchText as="h1" className="text-3xl md:text-5xl font-bold text-cyber-primary mb-4 font-mono tracking-tighter">
            IPUT System Architecture
          </GlitchText>
          <h2 className="text-xl md:text-2xl text-cyber-text font-bold tracking-widest">
            散らばったソースファイルを復元せよ
          </h2>
        </div>

        <div className="text-left space-y-4 mb-10 text-cyber-text/90 leading-relaxed text-sm md:text-base border-l-2 border-cyber-primaryDark pl-4">
          <p>
            <strong className="text-cyber-accent">SYSTEM ERROR:</strong> 新入生歓迎プログラムの一部が不正にロックされました。
          </p>
          <p>
            各ギルド（サークル）のデータに紛れ込んだ<strong className="text-cyber-primary">7つのソースコード</strong>を集め、システムを正常に再起動してください。
          </p>
          <p className="text-xs text-cyber-dim mt-2">
            ※ 隣の仲間と協力してコードを補完し合うこともシステム上で許可されています。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Link href="/challenge" className="w-full sm:w-auto">
            <TerminalButton className="w-full">
              コードを入力する
            </TerminalButton>
          </Link>
          <Link href="/hint" className="w-full sm:w-auto">
            <TerminalButton variant="secondary" className="w-full">
              アーカイブ（ヒント）
            </TerminalButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
