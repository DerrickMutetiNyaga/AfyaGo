"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { labTests, categories } from "@/lib/data";
import { Clock, ChevronRight, Flame } from "lucide-react";

export function TestsGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const filteredTests = selectedCategory === "All" 
    ? labTests.slice(0, 8)
    : labTests.filter(test => test.category === selectedCategory).slice(0, 8);

  return (
    <section id="tests" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Popular Lab Tests
            </h2>
            <p className="text-muted-foreground">
              Transparent pricing. No surprises.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/book" className="gap-2">
              View All Tests
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.slice(0, 7).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted border border-border"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tests Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredTests.map((test) => (
            <Link
              key={test.id}
              href={`/book?test=${test.id}`}
              className="group bg-card rounded-xl border border-border p-5 hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  {test.popular && (
                    <Badge variant="secondary" className="mb-2 gap-1">
                      <Flame className="w-3 h-3" />
                      Popular
                    </Badge>
                  )}
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {test.name}
                  </h3>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {test.description}
              </p>
              
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{test.turnaroundTime}</span>
                </div>
                <span className="text-lg font-bold text-primary">
                  KSh {test.price.toLocaleString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
