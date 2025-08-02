import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Zap } from 'lucide-react';
import Link from 'next/link';

export function StaticCTASection() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 xl:py-36">
      {/* Background with enhanced patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:32px_32px] opacity-10"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-4xl border border-warning/20 bg-gradient-to-br from-warning via-destructive to-accent p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 shadow-2xl hover:shadow-3xl transition-all duration-300">
          {/* Enhanced background effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/5 to-black/10"></div>
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-white/10 to-transparent rounded-full blur-3xl"></div>
          </div>

          <div className="relative mx-auto max-w-4xl text-center">
            {/* Enhanced badge */}
            <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-warning/30 bg-warning/10 px-4 py-2 sm:px-6 sm:py-3 backdrop-blur-sm">
              <div className="h-3 w-3 animate-pulse rounded-full bg-white"></div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-white">
                Start Your AI Journey Today
              </span>
            </div>

            {/* Enhanced headline */}
            <h2 className="mb-5 sm:mb-6 text-3xl font-black text-white sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              Ready to Build AI Agents
              <span className="mt-1 sm:mt-2 block bg-gradient-to-r from-warning via-destructive to-accent bg-clip-text text-transparent">
                That Actually Scale?
              </span>
            </h2>

            {/* Enhanced description */}
            <p className="mb-6 sm:mb-8 lg:mb-10 text-lg leading-relaxed text-white/90 sm:text-xl md:text-2xl px-4 sm:px-0">
              Join <span className="font-bold text-white">25,000+ developers</span> using GraphBit to create, 
              deploy, and monitor AI agents at enterprise scale. 
              <span className="block mt-2 text-white/80">Start building in under 5 minutes.</span>
            </p>

            {/* Enhanced CTA buttons */}
            <div className="mb-6 sm:mb-8 lg:mb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6 lg:gap-8 px-4 sm:px-0">
              <Link href="/marketplace">
                <Button
                  size="lg"
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-warning to-destructive px-6 py-3 text-base font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:from-warning/90 hover:to-destructive/90 sm:px-8 sm:py-4 sm:text-lg lg:px-12 lg:py-6 lg:text-xl w-full sm:w-auto touch-target"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-warning opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <span className="relative flex items-center gap-3">
                    <Zap className="h-5 w-5 text-white sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                    Start Building Free
                  </span>
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="group rounded-2xl border-2 border-warning/40 bg-warning/10 px-6 py-3 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-warning/60 hover:bg-warning/20 hover:scale-105 shadow-xl hover:shadow-2xl sm:px-8 sm:py-4 sm:text-lg lg:px-12 lg:py-6 lg:text-xl w-full sm:w-auto touch-target"
                >
                  <span className="flex items-center gap-3">
                    <ArrowRight className="h-5 w-5 text-warning transition-transform duration-300 group-hover:translate-x-1 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                    View Live Demo
                  </span>
                </Button>
              </Link>
            </div>

            {/* Enhanced trust indicators */}
            <div className="mb-6 sm:mb-8 lg:mb-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6 px-4 sm:px-0">
              <div className="flex items-center gap-2 sm:gap-3 rounded-full bg-warning/10 px-4 py-2 sm:px-6 sm:py-3 backdrop-blur-sm border border-warning/20 w-full sm:w-auto justify-center sm:justify-start">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-warning flex-shrink-0" />
                <span className="text-sm sm:text-base lg:text-lg font-semibold text-white">No credit card required</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 rounded-full bg-warning/10 px-4 py-2 sm:px-6 sm:py-3 backdrop-blur-sm border border-warning/20 w-full sm:w-auto justify-center sm:justify-start">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-warning flex-shrink-0" />
                <span className="text-sm sm:text-base lg:text-lg font-semibold text-white">14-day free trial</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 rounded-full bg-warning/10 px-4 py-2 sm:px-6 sm:py-3 backdrop-blur-sm border border-warning/20 w-full sm:w-auto justify-center sm:justify-start">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-warning flex-shrink-0" />
                <span className="text-sm sm:text-base lg:text-lg font-semibold text-white">Cancel anytime</span>
              </div>
            </div>

            {/* Security and compliance badges */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl bg-warning/10 p-3 text-center backdrop-blur-sm border border-warning/20">
                <div className="mb-1 text-xl font-bold text-white">SOC 2</div>
                <div className="text-xs text-white/80">Compliant</div>
              </div>
              <div className="rounded-xl bg-warning/10 p-3 text-center backdrop-blur-sm border border-warning/20">
                <div className="mb-1 text-xl font-bold text-white">GDPR</div>
                <div className="text-xs text-white/80">Ready</div>
              </div>
              <div className="rounded-xl bg-warning/10 p-3 text-center backdrop-blur-sm border border-warning/20">
                <div className="mb-1 text-xl font-bold text-white">99.99%</div>
                <div className="text-xs text-white/80">Uptime SLA</div>
              </div>
              <div className="rounded-xl bg-warning/10 p-3 text-center backdrop-blur-sm border border-warning/20">
                <div className="mb-1 text-xl font-bold text-white">24/7</div>
                <div className="text-xs text-white/80">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional incentive section */}
        <div className="mt-12 text-center">
          <div className="mx-auto max-w-2xl rounded-2xl border border-warning/20 bg-gradient-to-r from-background/95 to-warning/5 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm">
            <h3 className="mb-3 text-xl font-bold text-foreground">
              🚀 Limited Time: Early Adopter Bonus
            </h3>
            <p className="mb-4 text-base text-muted-foreground">
              Sign up this month and get <span className="font-bold bg-gradient-to-r from-warning to-destructive bg-clip-text text-transparent">3 months free</span> on any paid plan,
              plus priority access to new features and dedicated onboarding support.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 animate-pulse rounded-full bg-warning"></div>
              <span>Only 47 spots remaining this month</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}