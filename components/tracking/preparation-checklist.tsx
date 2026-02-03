"use client";

import { Circle, Clock, AlertCircle, Bell } from "lucide-react";
import type { LabTest, Booking } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface PreparationChecklistProps {
  booking: Booking;
}

export function PreparationChecklist({ booking }: PreparationChecklistProps) {
  const tests = booking.tests || [];
  
  // Extract requirements
  const allRequirements = tests.flatMap((test) => test.requirements || []);
  const hasFasting = allRequirements.some((req) =>
    req.toLowerCase().includes("fasting")
  );
  const fastingHours = hasFasting
    ? allRequirements
        .find((req) => req.toLowerCase().includes("fasting"))
        ?.match(/(\d+)[-\s]?hour/i)?.[1]
    : null;

  // Calculate when fasting should start
  const getFastingStartTime = () => {
    if (!hasFasting || !fastingHours || !booking.scheduledDate || !booking.scheduledTime) {
      return null;
    }
    
    const [time, period] = booking.scheduledTime.split(" ");
    const [hours, minutes] = time.split(":").map(Number);
    let scheduledHour = hours;
    if (period === "PM" && hours !== 12) scheduledHour += 12;
    if (period === "AM" && hours === 12) scheduledHour = 0;

    const scheduledDate = new Date(booking.scheduledDate);
    scheduledDate.setHours(scheduledHour, minutes, 0, 0);
    
    const fastingStart = new Date(scheduledDate);
    fastingStart.setHours(fastingStart.getHours() - parseInt(fastingHours));
    
    return fastingStart;
  };

  const fastingStartTime = getFastingStartTime();

  const checklistItems = [
    {
      id: "fasting",
      label: hasFasting
        ? `Fast for ${fastingHours} hours (no food or drinks except water)`
        : "No fasting required",
      required: hasFasting,
      timeInfo: fastingStartTime
        ? `Start fasting at ${fastingStartTime.toLocaleTimeString("en-KE", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}`
        : null,
      icon: Clock,
    },
    {
      id: "id",
      label: "Have your ID ready for verification",
      required: true,
      icon: AlertCircle,
    },
    {
      id: "location",
      label: "Be available at your collection address",
      required: true,
      icon: AlertCircle,
    },
    {
      id: "water",
      label: hasFasting ? "Drink water to stay hydrated" : "Stay hydrated",
      required: false,
      icon: Circle,
    },
  ];

  // Filter out non-fasting items if no fasting required
  const displayItems = hasFasting
    ? checklistItems
    : checklistItems.filter((item) => item.id !== "fasting");

  return (
    <div className="bg-card rounded-xl border border-border p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Preparation Checklist</h3>
        </div>
        {hasFasting && (
          <Badge variant="outline" className="gap-1.5 text-xs bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <Clock className="w-3 h-3" />
            Fasting Required
          </Badge>
        )}
      </div>

      <div className="space-y-3">
        {displayItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`flex items-start gap-3 p-3 rounded-lg border ${
                item.required && item.id === "fasting"
                  ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800"
                  : "bg-muted/30 border-border"
              }`}
            >
              <div className="mt-0.5">
                <Icon className={`w-5 h-5 ${item.required ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <div className="flex-1">
                <p
                  className={`text-sm ${
                    item.required
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </p>
                {item.timeInfo && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.timeInfo}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Reminder Notice */}
      <div className="flex items-start gap-2 text-xs bg-primary/5 border border-primary/20 rounded-lg p-3">
        <Bell className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-muted-foreground">
          <strong className="text-foreground">Reminder:</strong> You'll receive SMS and WhatsApp reminders 24 hours and 2 hours before your appointment with all preparation instructions.
        </p>
      </div>
    </div>
  );
}

