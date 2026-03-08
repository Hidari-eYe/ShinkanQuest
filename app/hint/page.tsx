import Link from 'next/link';
import { TerminalButton } from '@/components/ui/TerminalButton';

export default function HintPage() {
  const hints = [
    process.env.HINT_1 || 'ヒント1が未設定です。',
    process.env.HINT_2 || 'ヒント2が未設定です。',
    process.env.HINT_3 || 'ヒント3が未設定です。',
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-2xl border border-cyber-dim bg-cyber-surface p-8 rounded-sm">
        
        <div className="mb-8 border-b border-cyber-border pb-4">
          <h1 className="text-2xl font-mono text-cyber-text font-bold uppercase">
            <span className="text-cyber-primary mr-2">▶</span>
            System Archive / Hints
          </h1>
          <p className="text-cyber-dim text-sm mt-2">
            破損データ復元のための補助情報セクターです。
          </p>
        </div>

        <div className="space-y-6 mb-10">
          {hints.map((hint, index) => (
            <div key={index} className="bg-black/40 border-l-2 border-cyber-primary p-4 text-cyber-text text-sm md:text-base">
              <span className="text-cyber-primaryDark font-mono text-xs block mb-1">
                DECRYPTED FRAGMENT #{index + 1}:
              </span>
              {hint}
            </div>
          ))}

          <div className="mt-8 p-4 border border-dashed border-cyber-dim text-center">
            <p className="text-sm text-cyber-text/80 mb-2">どうしても修復コードが見つからない場合</p>
            <p className="text-xs text-cyber-dim">
              運営本部の受付（メインコンソール）にて、物理的な支援を受けることが可能です。
            </p>
          </div>
        </div>

        <div className="flex justify-center flex-col sm:flex-row gap-4">
          <Link href="/challenge">
            <TerminalButton variant="primary">
              コード入力に戻る
            </TerminalButton>
          </Link>
          <Link href="/">
            <TerminalButton variant="secondary">
              トップ画面へ戻る
            </TerminalButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
