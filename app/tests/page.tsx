"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { labTests, categories } from "@/lib/data";
import { Clock, Search, Flame, ArrowRight } from "lucide-react";

export default function TestsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTests = useMemo(() => {
    let filtered = labTests;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((test) => test.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (test) =>
          test.name.toLowerCase().includes(query) ||
          test.description.toLowerCase().includes(query) ||
          test.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            All Lab Tests
          </h1>
          <p className="text-muted-foreground text-lg">
            Browse our complete catalog of lab tests. Transparent pricing. No surprises.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search tests by name, description, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
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
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredTests.length} {filteredTests.length === 1 ? "test" : "tests"} found
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Tests Grid */}
        {filteredTests.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredTests.map((test) => (
              <Link
                key={test.id}
                href={`/book?test=${test.id}`}
                className="group bg-card rounded-xl border border-border p-5 hover:border-primary/50 hover:shadow-lg transition-all flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    {test.popular && (
                      <Badge variant="secondary" className="mb-2 gap-1">
                        <Flame className="w-3 h-3" />
                        Popular
                      </Badge>
                    )}
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                      {test.name}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {test.category}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
                  {test.description}
                </p>

                {test.requirements && test.requirements.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-foreground mb-1">Requirements:</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {test.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <span className="text-primary">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{test.turnaroundTime}</span>
                  </div>
                  <span className="text-lg font-bold text-primary">
                    KSh {test.price.toLocaleString()}
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-3 gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/book?test=${test.id}`;
                  }}
                >
                  Book Test
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              No tests found matching your criteria.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for?
          </p>
          <Button asChild>
            <Link href="/contact">
              Contact Us
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

