"use client";

import { useState, useEffect } from "react";
import type { Booking, BookingStatus } from "@/lib/types";

// Active booking statuses - bookings that are still in progress
const ACTIVE_STATUSES: BookingStatus[] = [
  "confirmed",
  "collector_assigned",
  "collector_en_route",
  "sample_collected",
  "processing",
];

export function useActiveBooking() {
  const [hasActiveBooking, setHasActiveBooking] = useState(false);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for active bookings
    // In a real app, this would fetch from an API
    // For now, we'll check localStorage or use mock data
    
    // SSR safety check
    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }
    
    const checkActiveBooking = async () => {
      setIsLoading(true);
      
      try {
        // Check localStorage for active booking
        const storedBooking = localStorage.getItem("activeBooking");
        
        if (storedBooking) {
          const booking: Booking = JSON.parse(storedBooking);
          const isActive = ACTIVE_STATUSES.includes(booking.status);
          
          setHasActiveBooking(isActive);
          setActiveBooking(isActive ? booking : null);
        } else {
          // Check if user is signed in (in a real app, this would come from auth context)
          const isSignedIn = localStorage.getItem("isSignedIn") === "true";
          
          if (isSignedIn) {
            // In a real app, fetch from API
            // For demo purposes, we'll check if there's a booking ID in the URL or use mock data
            const urlParams = new URLSearchParams(window.location.search);
            const bookingId = urlParams.get("booking");
            
            if (bookingId) {
              // Simulate fetching booking
              // In production, this would be an API call
              setHasActiveBooking(true);
            } else {
              setHasActiveBooking(false);
            }
          } else {
            setHasActiveBooking(false);
          }
        }
      } catch (error) {
        console.error("Error checking active booking:", error);
        setHasActiveBooking(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkActiveBooking();

    // Listen for storage changes (when booking is created/updated)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "isSignedIn" || e.key === "activeBooking") {
        checkActiveBooking();
      }
    };

    // Custom event listener for same-tab changes
    const handleCustomStorageChange = () => {
      checkActiveBooking();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localStorageChange", handleCustomStorageChange);
    
    // Also check periodically (for real-time updates)
    const interval = setInterval(checkActiveBooking, 1000); // Check every second for better responsiveness

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageChange", handleCustomStorageChange);
      clearInterval(interval);
    };
  }, []);

  return {
    hasActiveBooking,
    activeBooking,
    isLoading,
  };
}

