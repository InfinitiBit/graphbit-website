import { PricingSection } from '@/components/ui/pricing-section';
import { NeuralNetworkBackground } from '@/components/ui/neural-network-background';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - GraphBit AI Platform',
  description: 'Simple, transparent pricing for GraphBit\'s AI agent platform. Start free, scale as you grow. No hidden fees, no vendor lock-in.',
  keywords: ['AI pricing', 'LLM platform pricing', 'AI agents cost', 'GraphBit pricing', 'AI development platform'],
  openGraph: {
    title: 'Pricing - GraphBit AI Platform',
    description: 'Simple, transparent pricing for GraphBit\'s AI agent platform. Start free, scale as you grow.',
    images: ['/api/og?title=Pricing'],
  },
};

export default function PricingPage() {
  return (
    <>
      {/* Neural network background */}
      <NeuralNetworkBackground />
      
      <main className="relative w-full min-h-screen flex-1 pt-20">
        <PricingSection 
          showHeader={true}
          showAddOns={true}
          showTestimonials={true}
        />
      </main>
    </>
  );
}