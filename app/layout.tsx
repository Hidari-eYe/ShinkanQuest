import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'IPUT System Architecture: 散らばったソースファイルを復元せよ',
  description: '新入生歓迎イベント特設サイト',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} ${firaCode.variable} scanlines min-h-screen bg-cyber-background text-cyber-text flex flex-col`}>
        <main className="flex-grow flex flex-col relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}
