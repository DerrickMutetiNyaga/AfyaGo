"use client";

import { Suspense } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TrackingTimeline } from "@/components/tracking/tracking-timeline";
import { CollectorCard } from "@/components/tracking/collector-card";
import { BookingDetails } from "@/components/tracking/booking-details";
import { PreparationChecklist } from "@/components/tracking/preparation-checklist";
import { mockBooking } from "@/lib/data";

function TrackingContent() {
  const booking = mockBooking;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Track Your Booking
              </h1>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {booking.id}
              </span>
            </div>
            <p className="text-muted-foreground">
              Real-time updates on your sample collection
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Timeline */}
            <div className="lg:col-span-2 space-y-6">
              <TrackingTimeline status={booking.status} />
              
              {/* Preparation Checklist - Show before collection */}
              {(booking.status === "pending" ||
                booking.status === "confirmed" ||
                booking.status === "collector_assigned" ||
                booking.status === "collector_en_route") && (
                <PreparationChecklist booking={booking} />
              )}
              
              {/* Collector Card - Show when assigned */}
              {booking.collector && (
                booking.status === "collector_assigned" ||
                booking.status === "collector_en_route" ||
                booking.status === "sample_collected"
              ) && (
                <CollectorCard collector={booking.collector} status={booking.status} />
              )}
            </div>

            {/* Booking Details Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <BookingDetails booking={booking} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      }
    >
      <TrackingContent />
    </Suspense>
  );
}
