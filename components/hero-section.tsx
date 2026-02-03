"use client";

import React from "react"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Clock, Shield, Star } from "lucide-react";

const stats = [
  { value: "50K+", label: "Tests Done" },
  { value: "4.9", label: "Rating", icon: Star },
  { value: "2hr", label: "Avg Results" },
];

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/book?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/book");
    }
  };

  return (
    <section className="relative overflow-hidden bg-card">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <MapPin className="w-4 h-4" />
              Now serving Nakuru, Kenya
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Lab Tests at Your{" "}
              <span className="text-primary">Doorstep</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Book lab tests online, get samples collected at home by certified 
              professionals, and receive results digitally. Fast, affordable, and 
              completely hassle-free.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search tests, packages, or upload prescription..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-base bg-background"
                />
              </div>
              <Button type="submit" size="lg" className="h-14 px-8">
                Search Tests
              </Button>
            </form>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-5 h-5 text-primary" />
                <span>NACC Certified Labs</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-5 h-5 text-primary" />
                <span>Same Day Results</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-2xl md:text-3xl font-bold text-foreground">
                      {stat.value}
                    </span>
                    {stat.icon && <stat.icon className="w-5 h-5 text-accent fill-accent" />}
                  </div>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Booking Preview Card */}
          <div className="relative hidden lg:block">
            <div className="absolute -top-8 -right-8 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative bg-card border border-border rounded-2xl p-6 shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Quick Book</span>
                  <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full font-medium">
                    Available Now
                  </span>
                </div>
                
                {/* Popular Tests Preview */}
                <div className="space-y-3">
                  {[
                    { name: "Complete Blood Count", price: "KSh 800", time: "24hrs" },
                    { name: "Cholesterol Check", price: "KSh 1,500", time: "24hrs" },
                    { name: "Blood Sugar Test", price: "KSh 400", time: "12hrs" },
                    { name: "DNA & Genetic Testing", price: "KSh 15,000", time: "7-14 days" },
                  ].map((test) => (
                    <div
                      key={test.name}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                    >
                      <div>
                        <p className="font-medium text-sm text-foreground">{test.name}</p>
                        <p className="text-xs text-muted-foreground">Results in {test.time}</p>
                      </div>
                      <span className="text-sm font-semibold text-primary">{test.price}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-border">
                  <Button asChild className="w-full">
                    <a href="/book">View All Tests</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
