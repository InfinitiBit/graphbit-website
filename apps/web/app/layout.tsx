import AuthProvider from '@/components/auth/AuthProvider';
import { Footer } from '@/components/footer';
import { Navigation } from '@/components/navbar';
import { ThemeStoreProvider } from '@/components/providers/ThemeStoreProvider';
import { AppProvider } from '@/contexts/AppContext';
import { LoadingProvider } from '@/contexts/ThemeContext';
import { ClerkProvider } from '@clerk/nextjs';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://graphbit.ai'),
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
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen antialiased overflow-x-hidden">
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-link" tabIndex={1}>
          Skip to main content
        </a>
        <div id="main-content" className="relative">
          <ThemeStoreProvider>
            <LoadingProvider>
              <ClerkProvider>
                <AuthProvider>
                  <AppProvider>
                    <Navigation />
                    <div className="flex min-h-screen w-full flex-col">{children}</div>
                    <Footer />
                  </AppProvider>
                </AuthProvider>
              </ClerkProvider>
            </LoadingProvider>
          </ThemeStoreProvider>
        </div>
      </body>
    </html>
  );
}
