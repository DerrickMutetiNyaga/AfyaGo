"use client";

import { Button } from "@/components/ui/button";
import type { TestResult } from "@/lib/types";
import {
  X,
  Download,
  Share2,
  Printer,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  Calendar,
  User,
  Building,
  FileText,
} from "lucide-react";

interface ResultDetailProps {
  result: TestResult;
  onClose: () => void;
}

export function ResultDetail({ result, onClose }: ResultDetailProps) {
  const statusConfig = {
    normal: {
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
      label: "Normal Range",
      description: "Your results are within the normal range.",
    },
    abnormal: {
      icon: AlertTriangle,
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
      label: "Review Recommended",
      description: "Some values are outside normal range. Consider consulting a doctor.",
    },
    critical: {
      icon: AlertCircle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/20",
      label: "Requires Attention",
      description: "Please consult a healthcare provider immediately.",
    },
  };

  const config = statusConfig[result.status];
  const StatusIcon = config.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">{result.testName}</h2>
              <p className="text-sm text-muted-foreground">Test Report</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Banner */}
          <div
            className={`flex items-start gap-3 p-4 rounded-xl ${config.bgColor} border ${config.borderColor}`}
          >
            <StatusIcon className={`w-6 h-6 ${config.color} flex-shrink-0 mt-0.5`} />
            <div>
              <h3 className={`font-semibold ${config.color}`}>{config.label}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {config.description}
              </p>
            </div>
          </div>

          {/* Result Details */}
          <div className="bg-muted/50 rounded-xl p-5">
            <h4 className="font-medium text-foreground mb-4">Test Results</h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Result</p>
                <p className="font-mono text-foreground bg-card p-3 rounded-lg border border-border">
                  {result.result}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Normal Range</p>
                <p className="font-mono text-muted-foreground bg-card p-3 rounded-lg border border-border">
                  {result.normalRange}
                </p>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Test Date</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(result.date).toLocaleDateString("en-KE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Laboratory</p>
                <p className="text-sm font-medium text-foreground">
                  {result.labName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:col-span-2">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Verified By</p>
                <p className="text-sm font-medium text-foreground">
                  {result.verifiedBy}
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <strong>Disclaimer:</strong> This report is for informational purposes only 
            and does not constitute medical advice. Please consult a qualified healthcare 
            provider for interpretation of these results.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-card border-t border-border p-4 flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2 flex-1 sm:flex-none bg-transparent">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
          <Button variant="outline" className="gap-2 flex-1 sm:flex-none bg-transparent">
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Button className="gap-2 flex-1 sm:flex-none">
            <Share2 className="w-4 h-4" />
            Share with Doctor
          </Button>
        </div>
      </div>
    </div>
  );
}
