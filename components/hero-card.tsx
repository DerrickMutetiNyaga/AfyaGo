"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroCard() {
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is signed in
    if (typeof window !== "undefined") {
      const signedIn = localStorage.getItem("isSignedIn") === "true";
      setIsSignedIn(signedIn);
      setIsLoading(false);
    }
  }, []);

  const handleClick = () => {
    if (isSignedIn) {
      // If signed in, go to dashboard
      router.push("/dashboard");
    } else {
      // If not signed in, go to booking page (sign-in gate will appear at step 4)
      router.push("/book");
    }
  };

  return (
    <section className="relative py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contained Hero Card with High Radius */}
        <div className="relative bg-gradient-to-br from-amber-50/50 via-stone-50/30 to-stone-50/50 dark:from-amber-950/20 dark:via-stone-950/10 dark:to-stone-950/20 rounded-[2.5rem] md:rounded-[3rem] lg:rounded-[3.5rem] border border-amber-100/50 dark:border-amber-900/30 shadow-lg overflow-hidden">
          {/* Subtle background texture */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
            <div 
              className="absolute inset-0" 
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                backgroundSize: '32px 32px'
              }} 
            />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-8 md:p-12 lg:p-16">
            {/* Left Column - Primary Messaging */}
            <div className="space-y-6 lg:space-y-8">
              {/* Value-Oriented Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight tracking-tight">
                Helping people make confident health decisions
              </h1>

              {/* Explanatory Paragraph */}
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Experience healthcare on your terms. Our certified professionals come to your home for sample collection, 
                handle everything with care and precision, and deliver your results securely through your personal dashboard. 
                Simple, trustworthy, and designed around your comfort.
              </p>

              {/* Single High-Contrast CTA */}
              <div className="pt-2">
                <Button 
                  onClick={handleClick}
                  size="lg" 
                  className="h-12 md:h-14 px-8 md:px-10 text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Loading..."
                  ) : isSignedIn ? (
                    <>
                      Get started
                      <ArrowRight className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      Get Started
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Right Column - Supporting Imagery */}
            <div className="relative hidden lg:block">
              {/* Human Context Image */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-amber-200/30 dark:border-amber-800/20 shadow-lg">
                <Image
                  src="/IMG-1.jpg"
                  alt="Professional care in the comfort of your home"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Mobile Image */}
            <div className="relative lg:hidden aspect-[16/10] rounded-2xl overflow-hidden border border-amber-200/30 dark:border-amber-800/20 shadow-lg">
              <Image
                src="/IMG-1.jpg"
                alt="Professional care in the comfort of your home"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

