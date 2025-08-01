import { HeroSection } from '@/components/ui/hero-section';
import { ProblemStatementSection } from '@/components/ui/problem-statement-section';
import { SolutionOverviewSection } from '@/components/ui/solution-overview-section';
import { StaticFeaturesSection } from '@/components/ui/static-features-section';
import { StaticCTASection } from '@/components/ui/static-cta-section';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GraphBit - Build AI Agents That Actually Work',
  description: 'Download production-ready AI agents, track every LLM interaction, and scale your AI applications with confidence. Join 10k+ developers building the future.',
  keywords: ['AI agents', 'LLM tracing', 'AI development platform', 'machine learning', 'artificial intelligence'],
  openGraph: {
    title: 'GraphBit - Build AI Agents That Actually Work',
    description: 'Download production-ready AI agents, track every LLM interaction, and scale your AI applications with confidence.',
    images: ['/api/og'],
  },
};

export default function Home() {
  return (
    <>
      <main className="relative w-full h-full">
        {/* Client-side Interactive Hero Section */}
        <HeroSection />

        {/* Client-side Interactive Problem Statement Section */}
        <ProblemStatementSection />

        {/* Client-side Interactive Solution Overview Section */}
        <SolutionOverviewSection />

        {/* Server-side Static Features, Stats, Testimonials, CTA */}
        <StaticFeaturesSection />
        <StaticCTASection />
      </main>
    </>
  );
}
