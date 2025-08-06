import { HeroSection } from '@/components/ui/hero-section';
import { ProblemStatementSection } from '@/components/ui/problem-statement-section';
import { SolutionOverviewSection } from '@/components/ui/solution-overview-section';
import { StaticFeaturesSection } from '@/components/ui/static-features-section';
import { PricingSection } from '@/components/ui/pricing-section';
import { StaticCTASection } from '@/components/ui/static-cta-section';
import { NeuralNetworkBackground } from '@/components/ui/neural-network-background';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GraphBit - The Open-Source Framework That Powers AI Excellence',
  description: 'GraphBit Framework eliminates the complexity of building AI agents. Our cloud platform is built on this proven foundation, trusted by developers worldwide.',
  keywords: ['AI agents', 'LLM tracing', 'AI framework', 'open source', 'GraphBit', 'AI development platform', 'machine learning', 'artificial intelligence'],
  openGraph: {
    title: 'GraphBit - The Open-Source Framework That Powers AI Excellence',
    description: 'GraphBit Framework eliminates the complexity of building AI agents. Start with the framework, scale with the cloud.',
    images: ['/api/og'],
  },
};

export default function Home() {
  return (
    <>
      {/* Neural network background across the entire landing page */}
      <NeuralNetworkBackground />
      
      <main className="relative w-full min-h-screen flex-1">
        {/* Client-side Interactive Hero Section */}
        <HeroSection />

        {/* Client-side Interactive Problem Statement Section */}
        <ProblemStatementSection />

        {/* Client-side Interactive Solution Overview Section */}
        <SolutionOverviewSection />

        {/* Server-side Static Features, Stats, Testimonials, CTA */}
        <StaticFeaturesSection />
        
        {/* Pricing Section */}
        <PricingSection 
          showHeader={true}
          showAddOns={false}
          showTestimonials={false}
        />
        
        <StaticCTASection />
      </main>
    </>
  );
}
