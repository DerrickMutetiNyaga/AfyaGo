"use client";

import { useEffect, useState } from "react";
import type { BookingStatus } from "@/lib/types";
import {
  CheckCircle2,
  Circle,
  User,
  Navigation,
  TestTube,
  FlaskConical,
  FileCheck,
  Loader2,
} from "lucide-react";

interface TrackingTimelineProps {
  status: BookingStatus;
}

const steps = [
  {
    id: "confirmed",
    title: "Booking Confirmed",
    description: "Your appointment has been scheduled",
    icon: CheckCircle2,
  },
  {
    id: "collector_assigned",
    title: "Collector Assigned",
    description: "A certified phlebotomist is assigned to you",
    icon: User,
  },
  {
    id: "collector_en_route",
    title: "Collector En Route",
    description: "Your collector is on the way",
    icon: Navigation,
  },
  {
    id: "sample_collected",
    title: "Sample Collected",
    description: "Your samples have been collected successfully",
    icon: TestTube,
  },
  {
    id: "processing",
    title: "Processing at Lab",
    description: "Your samples are being analyzed",
    icon: FlaskConical,
  },
  {
    id: "results_ready",
    title: "Results Ready",
    description: "Your test results are available",
    icon: FileCheck,
  },
];

const statusOrder: BookingStatus[] = [
  "confirmed",
  "collector_assigned",
  "collector_en_route",
  "sample_collected",
  "processing",
  "results_ready",
];

export function TrackingTimeline({ status }: TrackingTimelineProps) {
  const [animatedStep, setAnimatedStep] = useState(-1);
  const currentStepIndex = statusOrder.indexOf(status);

  useEffect(() => {
    // Animate steps one by one
    const timer = setInterval(() => {
      setAnimatedStep((prev) => {
        if (prev < currentStepIndex) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 300);

    return () => clearInterval(timer);
  }, [currentStepIndex]);

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">
        Order Progress
      </h2>

      <div className="space-y-0">
        {steps.map((step, index) => {
          const stepIndex = statusOrder.indexOf(step.id as BookingStatus);
          const isCompleted = stepIndex < currentStepIndex;
          const isCurrent = stepIndex === currentStepIndex;
          const isAnimated = stepIndex <= animatedStep;

          return (
            <div key={step.id} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute left-[19px] top-10 w-0.5 h-16 transition-colors duration-500 ${
                    isCompleted || (isCurrent && isAnimated)
                      ? "bg-primary"
                      : "bg-border"
                  }`}
                />
              )}

              <div className="flex items-start gap-4 pb-8">
                {/* Icon */}
                <div
                  className={`relative w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                    isCompleted
                      ? "bg-primary text-primary-foreground"
                      : isCurrent
                      ? "bg-primary/20 text-primary ring-4 ring-primary/20"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCurrent ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`font-medium transition-colors ${
                        isCompleted || isCurrent
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </h3>
                    {isCurrent && (
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        Current
                      </span>
                    )}
                    {isCompleted && (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    )}
                  </div>
                  <p
                    className={`text-sm mt-1 ${
                      isCompleted || isCurrent
                        ? "text-muted-foreground"
                        : "text-muted-foreground/60"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
