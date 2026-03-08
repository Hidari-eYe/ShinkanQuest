'use client';

import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { TerminalButton } from '@/components/ui/TerminalButton';
import { GlitchText } from '@/components/ui/GlitchText';

export default function ChallengePage() {
  const [code, setCode] = useState<string[]>(Array(7).fill(''));
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handleInput = (index: number, value: string) => {
    const val = value.slice(-1);
    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);
    setError(false);

    if (val && index < 6) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\s+/g, '').slice(0, 7);
    const newCode = [...code];
    for(let i=0; i<pastedData.length; i++) {
       if(i < 7) newCode[i] = pastedData[i];
    }
    setCode(newCode);
    if(pastedData.length > 0 && pastedData.length <= 7) {
      inputRefs.current[pastedData.length - 1]?.focus();
    } else if (pastedData.length > 7) {
      inputRefs.current[6]?.focus();
    }
  };

  const handleSubmit = async () => {
    const keyword = code.join('');
    if (keyword.length < 7) {
      setError(true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword })
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/success?rank=${data.rank}&url=${encodeURIComponent(data.enqueteUrl)}`);
      } else {
        router.push('/failure');
      }
    } catch (err) {
      console.error(err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <GlitchText as="h1" className="text-2xl font-mono text-cyber-primary mb-2">
            システム復元コンソール
          </GlitchText>
          <p className="text-cyber-dim text-sm">7つのソースコードを入力してください</p>
        </div>

        <div className="flex justify-center gap-1 sm:gap-2 mb-8" onPaste={handlePaste}>
          {code.map((char, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              type="text"
              className={`w-10 h-14 sm:w-12 sm:h-16 text-center text-xl sm:text-2xl font-mono bg-cyber-background border-2 transition-colors focus:outline-none uppercase ${
                error ? 'border-cyber-accent text-cyber-accent' : 'border-cyber-dim text-cyber-primary focus:border-cyber-primary'
              }`}
              value={char}
              onChange={(e) => handleInput(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              maxLength={1}
            />
          ))}
        </div>

        {error && (
          <p className="text-cyber-accent text-center mb-6 animate-pulse text-sm">
            ERROR: コードが不足しているか、不正な形式です。
          </p>
        )}

        <div className="flex justify-center">
          <TerminalButton onClick={handleSubmit} disabled={loading} className="w-full max-w-xs">
            {loading ? 'VERIFYING...' : '復元シーケンス起動'}
          </TerminalButton>
        </div>
      </div>
    </div>
  );
}
