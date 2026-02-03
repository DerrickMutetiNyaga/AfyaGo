"use client";

import React from "react"

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { labTests, categories } from "@/lib/data";
import type { LabTest } from "@/lib/types";
import {
  Search,
  Upload,
  X,
  Plus,
  Check,
  Clock,
  FileText,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { PreparationRequirements } from "./preparation-requirements";

interface TestSelectionProps {
  selectedTests: LabTest[];
  setSelectedTests: (tests: LabTest[]) => void;
  prescriptionFile: File | null;
  setPrescriptionFile: (file: File | null) => void;
  onContinue: () => void;
  canContinue: boolean;
  initialSearchQuery?: string;
}

export function TestSelection({
  selectedTests,
  setSelectedTests,
  prescriptionFile,
  setPrescriptionFile,
  onContinue,
  canContinue,
  initialSearchQuery = "",
}: TestSelectionProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update search query when initialSearchQuery changes (from URL)
  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  const filteredTests = labTests.filter((test) => {
    const matchesSearch =
      test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || test.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleTest = (test: LabTest) => {
    if (selectedTests.find((t) => t.id === test.id)) {
      setSelectedTests(selectedTests.filter((t) => t.id !== test.id));
    } else {
      setSelectedTests([...selectedTests, test]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPrescriptionFile(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Select Your Tests
        </h2>
        <p className="text-muted-foreground">
          Choose from our catalog or upload a prescription
        </p>
      </div>

      {/* Prescription Upload */}
      <div className="bg-muted/50 rounded-xl p-4 border border-dashed border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Have a prescription?</p>
              <p className="text-sm text-muted-foreground">
                Upload it and we&apos;ll add the tests for you
              </p>
            </div>
          </div>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            {prescriptionFile ? (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="gap-1">
                  <FileText className="w-3 h-3" />
                  {prescriptionFile.name}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setPrescriptionFile(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search tests..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:bg-muted border border-border"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Selected Tests */}
      {selectedTests.length > 0 && (
        <div className="bg-success/5 border border-success/20 rounded-xl p-4">
          <p className="text-sm font-medium text-foreground mb-3">
            Selected Tests ({selectedTests.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedTests.map((test) => (
              <Badge
                key={test.id}
                variant="secondary"
                className="gap-1 pr-1 bg-success/10 text-success hover:bg-success/20"
              >
                {test.name}
                <button
                  type="button"
                  onClick={() => toggleTest(test)}
                  className="ml-1 p-0.5 hover:bg-success/20 rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Tests List */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {filteredTests.map((test) => {
          const isSelected = selectedTests.find((t) => t.id === test.id);
          return (
            <button
              key={test.id}
              type="button"
              onClick={() => toggleTest(test)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-foreground">{test.name}</h4>
                    {test.popular && (
                      <Badge variant="secondary" className="text-xs">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {test.description}
                  </p>
                  {test.requirements && test.requirements.length > 0 && (
                    <div className="mb-2 flex items-center gap-1.5 flex-wrap">
                      {test.requirements.map((req, idx) => {
                        const isFasting = req.toLowerCase().includes("fasting");
                        return (
                          <span
                            key={idx}
                            className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                              isFasting
                                ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {isFasting && (
                              <Clock className="w-3 h-3" />
                            )}
                            {req}
                          </span>
                        );
                      })}
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {test.turnaroundTime}
                    </span>
                    <span className="text-foreground font-semibold">
                      KSh {test.price.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                  }`}
                >
                  {isSelected ? (
                    <Check className="w-4 h-4 text-primary-foreground" />
                  ) : (
                    <Plus className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Preparation Requirements Summary */}
      {selectedTests.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <PreparationRequirements tests={selectedTests} compact={false} />
        </div>
      )}

      {/* Continue Button */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={onContinue}
          disabled={!canContinue}
          size="lg"
          className="gap-2"
        >
          Continue to Schedule
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
