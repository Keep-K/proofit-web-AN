import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'PROOFIT — Verified performance that accumulates',
    template: '%s — PROOFIT',
  },
  description:
    'A verification-first system where health performance is measured with integrity and retained as trusted progress.',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'PROOFIT',
    description:
      'Move from disappearing results to verified performance that accumulates.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="bg-stone-50">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}

