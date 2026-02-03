"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { Collector, BookingStatus } from "@/lib/types";
import { Phone, MessageCircle, Star, Navigation, MapPin, Clock } from "lucide-react";

interface CollectorCardProps {
  collector: Collector;
  status: BookingStatus;
}

export function CollectorCard({ collector, status }: CollectorCardProps) {
  const [eta, setEta] = useState(collector.eta || "15 mins");

  // Simulate ETA countdown
  useEffect(() => {
    if (status !== "collector_en_route") return;

    const interval = setInterval(() => {
      setEta((prev) => {
        const mins = Number.parseInt(prev);
        if (mins > 1) {
          return `${mins - 1} mins`;
        }
        return "Arriving now";
      });
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [status]);

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Map Placeholder */}
      <div className="relative h-48 bg-muted">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
              <Navigation className="w-8 h-8 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Live tracking map</p>
          </div>
        </div>
        
        {/* ETA Badge */}
        {status === "collector_en_route" && (
          <div className="absolute top-4 left-4 bg-card shadow-lg rounded-lg px-3 py-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Arriving in</p>
                <p className="text-sm font-bold text-foreground">{eta}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Collector Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-bold text-primary">
                {collector.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{collector.name}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span>{collector.rating} rating</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">
              {status === "collector_en_route"
                ? "On the way"
                : status === "sample_collected"
                ? "Completed"
                : "Assigned"}
            </p>
          </div>
        </div>

        {/* Status Message */}
        {status === "collector_en_route" && (
          <div className="mb-4 p-3 bg-primary/5 rounded-lg">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <p className="text-sm text-foreground">
                <span className="font-medium">{collector.name}</span> is heading
                to your location
              </p>
            </div>
          </div>
        )}

        {status === "sample_collected" && (
          <div className="mb-4 p-3 bg-success/5 rounded-lg border border-success/20">
            <p className="text-sm text-foreground">
              Sample collected successfully. On the way to the lab.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 gap-2 bg-transparent" asChild>
            <a href={`tel:${collector.phone}`}>
              <Phone className="w-4 h-4" />
              Call
            </a>
          </Button>
          <Button variant="outline" className="flex-1 gap-2 bg-transparent" asChild>
            <a href={`sms:${collector.phone}`}>
              <MessageCircle className="w-4 h-4" />
              Message
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
