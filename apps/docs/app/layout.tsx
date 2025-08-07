import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/contexts/ThemeContext';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'GraphBit Documentation - AI Framework & Platform Docs',
  description: 'Comprehensive documentation for GraphBit Framework and Cloud Platform. Learn to build AI agents, implement LLM tracing, and scale your AI applications.',
  keywords: ['GraphBit docs', 'AI framework documentation', 'LLM tracing', 'AI agents', 'GraphBit API', 'AI development'],
  openGraph: {
    title: 'GraphBit Documentation',
    description: 'Comprehensive documentation for GraphBit Framework and Cloud Platform',
    images: ['/api/og'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen" style={{ background: 'var(--gradient-background)' }}>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
