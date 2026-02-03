"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ResultCard } from "@/components/results/result-card";
import { ResultDetail } from "@/components/results/result-detail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockResults } from "@/lib/data";
import type { TestResult } from "@/lib/types";
import {
  Search,
  Shield,
  Download,
  Share2,
  Filter,
  FileText,
  Lock,
} from "lucide-react";

export default function ResultsPage() {
  const [selectedResult, setSelectedResult] = useState<TestResult | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResults = mockResults.filter(
    (result) =>
      result.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.date.includes(searchQuery)
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  My Results Vault
                </h1>
                <p className="text-muted-foreground">
                  Securely access and manage your test results
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Download className="w-4 h-4" />
                  Download All
                </Button>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Security Notice */}
            <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-lg p-3 mb-6">
              <Shield className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Your results are encrypted and stored securely. Only you can access them.
              </p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by test name or date..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </div>

          {/* Results Grid */}
          {filteredResults.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResults.map((result) => (
                <ResultCard
                  key={result.id}
                  result={result}
                  onClick={() => setSelectedResult(result)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No Results Found
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? "Try adjusting your search query"
                  : "Your test results will appear here once ready"}
              </p>
              <Button asChild>
                <a href="/book">Book a Test</a>
              </Button>
            </div>
          )}

          {/* Result Detail Modal */}
          {selectedResult && (
            <ResultDetail
              result={selectedResult}
              onClose={() => setSelectedResult(null)}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
