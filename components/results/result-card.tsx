'use client';

import type { TestResult } from "@/lib/types";
import { FileText, Calendar, AlertCircle, CheckCircle, AlertTriangle, ChevronRight } from "lucide-react";

interface ResultCardProps {
  result: TestResult;
  onClick: () => void;
}

export function ResultCard({ result, onClick }: ResultCardProps) {
  const statusConfig = {
    normal: {
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10",
      label: "Normal",
    },
    abnormal: {
      icon: AlertTriangle,
      color: "text-accent",
      bgColor: "bg-accent/10",
      label: "Review Needed",
    },
    critical: {
      icon: AlertCircle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      label: "Critical",
    },
  };

  const config = statusConfig[result.status];
  const StatusIcon = config.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left bg-card rounded-xl border border-border p-5 hover:border-primary/50 hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.color}`}
        >
          <StatusIcon className="w-3 h-3" />
          <span>{config.label}</span>
        </div>
      </div>

      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
        {result.testName}
      </h3>

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
        <Calendar className="w-4 h-4" />
        <span>
          {new Date(result.date).toLocaleDateString("en-KE", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-xs text-muted-foreground">{result.labName}</span>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </button>
  );
}
