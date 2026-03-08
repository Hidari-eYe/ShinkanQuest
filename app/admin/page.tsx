'use client';

import { useState } from 'react';
import { TerminalButton } from '@/components/ui/TerminalButton';
import { ClearRecord } from '@/lib/store';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [records, setRecords] = useState<ClearRecord[] | null>(null);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (res.ok) {
        const data = await res.json();
        setRecords(data.records);
      } else {
        setError('Unauthorized');
      }
    } catch (err) {
      setError('Error connecting to server');
    }
  };

  if (records !== null) {
    return (
      <div className="min-h-screen p-6 bg-black text-cyber-text font-mono">
        <div className="max-w-4xl mx-auto border border-cyber-border bg-cyber-surface/30 p-4 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-cyber-dim pb-4 gap-4">
            <h1 className="text-2xl font-bold text-cyber-primary">ADMIN CONSOLE</h1>
            <div className="px-4 py-2 border border-cyber-primaryDark bg-cyber-primary/10 text-cyber-primary">
              Total Cleared: {records.length}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left bg-black border border-cyber-border">
              <thead>
                <tr className="border-b border-cyber-border bg-cyber-surface text-cyber-dim">
                  <th className="p-4 font-bold border-r border-cyber-border">Rank</th>
                  <th className="p-4 font-bold border-r border-cyber-border">Time</th>
                  <th className="p-4 font-bold">ID (Internal)</th>
                </tr>
              </thead>
              <tbody>
                {records.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-cyber-dim">No records found.</td>
                  </tr>
                ) : (
                  records.map(record => (
                    <tr key={record.id} className="border-b border-cyber-border hover:bg-cyber-primary/5 transition-colors">
                      <td className="p-4 text-cyber-primary font-bold border-r border-cyber-border">#{record.rank}</td>
                      <td className="p-4 border-r border-cyber-border">{new Date(record.timestamp).toLocaleString('ja-JP')}</td>
                      <td className="p-4 text-xs text-cyber-dim">{record.id}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <form onSubmit={handleLogin} className="w-full max-w-sm border border-cyber-border bg-cyber-surface p-8 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <h1 className="text-xl mb-6 font-mono text-center text-cyber-text">ADMIN ACCESS</h1>
        <div className="mb-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-black border border-cyber-dim focus:border-cyber-primary focus:outline-none text-center tracking-widest"
            placeholder="PASSWORD"
          />
        </div>
        {error && <p className="text-cyber-accent text-sm mb-4 text-center">{error}</p>}
        <TerminalButton type="submit" className="w-full">LOGIN</TerminalButton>
      </form>
    </div>
  );
}
