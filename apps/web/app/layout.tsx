import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "GraphBit - Cloud Platform for LLM Framework",
  description: "Download and run agents, track LLM outputs with GraphBit's powerful cloud platform",
  keywords: ["LLM", "AI", "Agent", "Framework", "Cloud Platform", "GraphBit"],
  authors: [{ name: "GraphBit Team" }],
  openGraph: {
    title: "GraphBit - Cloud Platform for LLM Framework",
    description: "Download and run agents, track LLM outputs with GraphBit's powerful cloud platform",
    type: "website",
    locale: "en_US",
    siteName: "GraphBit",
  },
  twitter: {
    card: "summary_large_image",
    title: "GraphBit - Cloud Platform for LLM Framework",
    description: "Download and run agents, track LLM outputs with GraphBit's powerful cloud platform",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
