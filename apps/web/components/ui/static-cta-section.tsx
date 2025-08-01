import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Zap } from 'lucide-react';
import Link from 'next/link';

export function StaticCTASection() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="container-responsive">
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-secondary via-muted-dark to-secondary p-8 shadow-2xl lg:p-16">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-success/10" />

          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Ready to build the future of AI?
            </h2>
            <p className="mb-8 text-lg text-white/80 sm:text-xl">
              Join thousands of developers using GraphBit to create, deploy, and monitor AI
              agents at scale. Start your free trial today.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/marketplace">
                <Button
                  size="lg"
                  className="bg-white px-8 py-4 text-lg font-semibold text-secondary transition-all duration-300 hover:scale-105 hover:bg-white/95 hover:shadow-xl"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/20 bg-transparent px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                >
                  <ArrowRight className="mr-2 h-5 w-5" />
                  View Dashboard
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute left-4 top-4 h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-xl" />
          <div className="absolute bottom-4 right-4 h-32 w-32 rounded-full bg-gradient-to-br from-accent/20 to-success/20 blur-xl" />
        </div>
      </div>
    </section>
  );
}