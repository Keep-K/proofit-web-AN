import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'PROOFIT — Verified performance that accumulates',
    template: '%s — PROOFIT',
  },
  description:
    'A verification-first system where health performance is measured with integrity and retained as trusted progress.',
  keywords: [
    'health performance',
    'verification',
    'integrity',
    'fitness tracking',
    'verified execution',
    'performance measurement',
  ],
  authors: [{ name: 'PROOFIT' }],
  creator: 'PROOFIT',
  publisher: 'PROOFIT',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://proofit-web.web.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'PROOFIT — Verified performance that accumulates',
    description:
      'Move from disappearing results to verified performance that accumulates.',
    url: '/',
    siteName: 'PROOFIT',
    type: 'website',
    locale: 'ko_KR',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PROOFIT — Verified performance that accumulates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PROOFIT — Verified performance that accumulates',
    description:
      'Move from disappearing results to verified performance that accumulates.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="bg-bg">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}

