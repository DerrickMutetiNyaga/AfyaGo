"use client";

import { Button } from "@/components/ui/button";
import { timeSlots } from "@/lib/data";
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react";
import { PreparationRequirements } from "./preparation-requirements";
import type { LabTest } from "@/lib/types";

interface TimeSlotPickerProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  selectedTests: LabTest[];
  onContinue: () => void;
  onBack: () => void;
  canContinue: boolean;
}

export function TimeSlotPicker({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  selectedTests,
  onContinue,
  onBack,
  canContinue,
}: TimeSlotPickerProps) {
  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const formatDay = (date: Date) => {
    if (date.toDateString() === new Date().toDateString()) return "Today";
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    return date.toLocaleDateString("en-KE", { weekday: "short" });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-KE", { day: "numeric", month: "short" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Schedule Collection
        </h2>
        <p className="text-muted-foreground">
          Pick a convenient date and time for home sample collection
        </p>
      </div>

      {/* Date Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Select Date</h3>
        </div>
        
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {dates.map((date) => {
            const isSelected =
              selectedDate?.toDateString() === date.toDateString();
            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <button
                key={date.toISOString()}
                type="button"
                onClick={() => setSelectedDate(date)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div
                  className={`text-xs mb-1 ${
                    isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}
                >
                  {formatDay(date)}
                </div>
                <div className="text-sm font-semibold">{formatDate(date)}</div>
                {isToday && !isSelected && (
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mx-auto mt-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Select Time Slot</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {timeSlots.map((slot) => {
            const isSelected = selectedTime === slot.time;
            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => slot.available && setSelectedTime(slot.time)}
                disabled={!slot.available}
                className={`p-3 rounded-xl border text-center transition-all ${
                  !slot.available
                    ? "border-border bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                    : isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className="text-sm font-medium">{slot.time}</div>
                {!slot.available && (
                  <div className="text-xs mt-1">Unavailable</div>
                )}
              </button>
            );
          })}
        </div>

        <p className="text-sm text-muted-foreground">
          A phlebotomist will arrive within 30 minutes of your selected time.
        </p>
      </div>

      {/* Preparation Requirements */}
      {selectedTests.length > 0 && (
        <div className="bg-muted/50 rounded-xl p-4 border border-border">
          <PreparationRequirements tests={selectedTests} compact={false} />
        </div>
      )}

      {/* Sticky Navigation Buttons */}
      <div className="sticky bottom-0 left-0 right-0 bg-background border-t border-border p-4 -mx-4 sm:-mx-6 lg:-mx-8 mt-6 shadow-lg z-10">
        <div className="max-w-7xl mx-auto flex justify-between gap-4">
          <Button variant="outline" onClick={onBack} className="gap-2 bg-transparent">
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            onClick={onContinue}
            disabled={!canContinue}
            size="lg"
            className="gap-2 flex-1 sm:flex-initial"
          >
            Continue
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
