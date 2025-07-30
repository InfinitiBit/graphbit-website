import AuthProvider from '@/components/auth/AuthProvider';
import { Footer } from '@/components/footer';
import { Navigation } from '@/components/navbar';
import { ClerkProvider } from '@clerk/nextjs';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GraphBit - Cloud Platform for LLM Framework',
  description: "Download and run agents, track LLM outputs with GraphBit's powerful cloud platform",
  keywords: ['LLM', 'AI', 'Agent', 'Framework', 'Cloud Platform', 'GraphBit'],
  authors: [{ name: 'GraphBit Team' }],
  openGraph: {
    title: 'GraphBit - Cloud Platform for LLM Framework',
    description:
      "Download and run agents, track LLM outputs with GraphBit's powerful cloud platform",
    type: 'website',
    locale: 'en_US',
    siteName: 'GraphBit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GraphBit - Cloud Platform for LLM Framework',
    description:
      "Download and run agents, track LLM outputs with GraphBit's powerful cloud platform",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${GeistSans.variable} ${GeistMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen antialiased">
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-link" tabIndex={1}>
          Skip to main content
        </a>
        <div id="main-content">
          <ClerkProvider>
            <AuthProvider>
              <Navigation />
              <div className="dev-border flex w-full pt-16">{children}</div>
              <Footer />
            </AuthProvider>
          </ClerkProvider>
        </div>
      </body>
    </html>
  );
}
