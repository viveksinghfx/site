import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono, Poppins } from 'next/font/google'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-roster',
})

export const metadata: Metadata = {
  title: 'Vivek Singh | Agentic AI & GenAI Engineer',
  description:
    'I build autonomous AI systems using LLMs, RAG, and AWS. Explore my portfolio of AI agents, research tools, and production deployments.',
  openGraph: {
    title: 'Vivek Singh | Agentic AI & GenAI Engineer',
    description:
      'Building autonomous AI systems with LLMs, RAG pipelines, and multi-agent orchestration on AWS.',
    type: 'website',
    url: 'https://viveksingh.tech',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vivek Singh | Agentic AI & GenAI Engineer',
    description:
      'Building autonomous AI systems with LLMs, RAG pipelines, and multi-agent orchestration on AWS.',
  },
}

export const viewport: Viewport = {
  themeColor: '#060a12',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
