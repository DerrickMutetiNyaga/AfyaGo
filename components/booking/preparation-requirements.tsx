"use client";

import { AlertCircle, Clock, Droplet, CheckCircle2, Info } from "lucide-react";
import type { LabTest } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface PreparationRequirementsProps {
  tests: LabTest[];
  compact?: boolean;
  showTitle?: boolean;
}

export function PreparationRequirements({
  tests,
  compact = false,
  showTitle = true,
}: PreparationRequirementsProps) {
  // Extract unique requirements from all selected tests
  const allRequirements = tests.flatMap((test) => test.requirements || []);
  
  // Check for fasting requirements
  const hasFasting = allRequirements.some((req) =>
    req.toLowerCase().includes("fasting")
  );
  const fastingRequirements = allRequirements.filter((req) =>
    req.toLowerCase().includes("fasting")
  );
  
  // Other requirements
  const otherRequirements = allRequirements.filter(
    (req) => !req.toLowerCase().includes("fasting")
  );

  // Get fasting duration if specified
  const getFastingDuration = () => {
    const fastingReq = fastingRequirements[0] || "";
    const match = fastingReq.match(/(\d+)[-\s]?hour/i);
    return match ? match[1] : null;
  };

  const fastingHours = getFastingDuration();

  if (tests.length === 0) {
    return null;
  }

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        {hasFasting && (
          <Badge variant="outline" className="gap-1.5 text-xs">
            <Clock className="w-3 h-3" />
            {fastingHours ? `${fastingHours}h fast` : "Fasting required"}
          </Badge>
        )}
        {otherRequirements.slice(0, 2).map((req, idx) => (
          <Badge key={idx} variant="outline" className="text-xs">
            {req}
          </Badge>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {showTitle && (
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-primary" />
          <h4 className="font-semibold text-foreground">Preparation Required</h4>
        </div>
      )}

      {/* Fasting Requirements - Highlighted */}
      {hasFasting && (
        <div className="bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl p-4 space-y-2">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground mb-1">
                {fastingHours
                  ? `Fast for ${fastingHours} hours before collection`
                  : "Fasting Required"}
              </p>
              <p className="text-sm text-muted-foreground">
                {fastingHours
                  ? `Don't eat or drink anything (except water) for ${fastingHours} hours before your appointment. This ensures accurate test results.`
                  : "Please follow the fasting instructions for your selected tests."}
              </p>
              {fastingHours && (
                <div className="mt-2 text-xs text-muted-foreground bg-background/50 rounded-lg p-2">
                  <strong>Tip:</strong> Schedule your collection for early morning to make fasting easier!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Other Requirements */}
      {otherRequirements.length > 0 && (
        <div className="bg-muted/50 border border-border rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-primary" />
            <p className="font-medium text-sm text-foreground">Additional Instructions</p>
          </div>
          <ul className="space-y-1.5">
            {otherRequirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* General Reminders */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 space-y-1.5">
        <div className="flex items-center gap-2">
          <Droplet className="w-4 h-4 text-primary" />
          <p className="text-sm font-medium text-foreground">General Reminders</p>
        </div>
        <ul className="text-xs text-muted-foreground space-y-1 ml-6">
          <li>• Keep your ID ready for verification</li>
          <li>• Be available at your location during the time slot</li>
          <li>• Drink water to stay hydrated (unless fasting)</li>
        </ul>
      </div>
    </div>
  );
}

