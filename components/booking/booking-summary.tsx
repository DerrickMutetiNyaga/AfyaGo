"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LabTest, Booking } from "@/lib/types";
import {
  ChevronLeft,
  CreditCard,
  Smartphone,
  Check,
  Shield,
  Lock,
  Loader2,
  Bell,
} from "lucide-react";
import { PreparationRequirements } from "./preparation-requirements";
import { SignInGate } from "./sign-in-gate";

interface BookingSummaryProps {
  selectedTests: LabTest[];
  selectedDate: Date;
  selectedTime: string;
  address: {
    street: string;
    area: string;
    landmark: string;
    phone: string;
    latitude?: number;
    longitude?: number;
    locationLabel?: string;
    directions?: string;
    useMap?: boolean;
  };
  totalAmount: number;
  onBack: () => void;
  isSignedIn?: boolean;
  setIsSignedIn?: (value: boolean) => void;
}

export function BookingSummary({
  selectedTests,
  selectedDate,
  selectedTime,
  address,
  totalAmount,
  onBack,
  isSignedIn = false,
  setIsSignedIn,
}: BookingSummaryProps) {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card">("mpesa");
  const [mpesaPhone, setMpesaPhone] = useState(address.phone);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSignIn, setShowSignIn] = useState(!isSignedIn);

  // Check if user is signed in on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const signedIn = localStorage.getItem("isSignedIn") === "true";
      if (signedIn) {
        setShowSignIn(false);
        if (setIsSignedIn) setIsSignedIn(true);
      }
    }
  }, [setIsSignedIn]);

  const collectionFee = 200;
  const grandTotal = totalAmount + collectionFee;

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Create booking object and store in localStorage for header detection
    const bookingId = `BK-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    const booking = {
      id: bookingId,
      userId: 'user-1',
      tests: selectedTests,
      status: 'confirmed' as const,
      scheduledDate: selectedDate.toISOString().split('T')[0],
      scheduledTime: selectedTime,
      address: address.useMap
        ? `${address.locationLabel || "Location"}${address.directions ? ` - ${address.directions}` : ""}${address.latitude && address.longitude ? ` (${address.latitude.toFixed(6)}, ${address.longitude.toFixed(6)})` : ""}`
        : `${address.street}, ${address.area}${address.landmark ? ` (${address.landmark})` : ''}`,
      paymentMethod: paymentMethod,
      paymentStatus: 'completed' as const,
      totalAmount: grandTotal,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Store in localStorage so header can detect it
    localStorage.setItem("activeBooking", JSON.stringify(booking));
    localStorage.setItem("isSignedIn", "true");
    
    // Redirect to tracking page
    router.push(`/track?booking=${bookingId}`);
  };

  // If not signed in, show sign-in gate first
  if (showSignIn) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Sign in to complete your booking
          </h2>
          <p className="text-muted-foreground">
            Create an account or sign in to securely complete your payment and receive your results.
          </p>
        </div>
        <SignInGate
          onContinue={() => {
            setShowSignIn(false);
            if (setIsSignedIn) setIsSignedIn(true);
            if (typeof window !== "undefined") {
              localStorage.setItem("isSignedIn", "true");
            }
          }}
          onBack={onBack}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Review & Pay
        </h2>
        <p className="text-muted-foreground">
          Confirm your booking details and complete payment
        </p>
      </div>

      {/* Booking Summary */}
      <div className="bg-card rounded-xl border border-border p-5 space-y-4">
        <h3 className="font-semibold text-foreground">Booking Details</h3>

        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Collection Date</p>
            <p className="font-medium text-foreground">
              {selectedDate.toLocaleDateString("en-KE", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Time Slot</p>
            <p className="font-medium text-foreground">{selectedTime}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-muted-foreground">Collection Address</p>
            <p className="font-medium text-foreground">
              {address.useMap
                ? address.locationLabel
                  ? `${address.locationLabel}${address.directions ? ` - ${address.directions}` : ""}`
                  : "Location on map"
                : `${address.street}, ${address.area}${address.landmark ? ` (${address.landmark})` : ""}`}
            </p>
            {address.useMap && address.latitude && address.longitude && (
              <p className="text-xs text-muted-foreground mt-1">
                Coordinates: {address.latitude.toFixed(6)}, {address.longitude.toFixed(6)}
              </p>
            )}
          </div>
          <div>
            <p className="text-muted-foreground">Contact Number</p>
            <p className="font-medium text-foreground">+254 {address.phone}</p>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <p className="text-muted-foreground mb-2">Selected Tests</p>
          <div className="space-y-2">
            {selectedTests.map((test) => (
              <div key={test.id} className="flex justify-between text-sm">
                <span className="text-foreground">{test.name}</span>
                <span className="font-medium">
                  KSh {test.price.toLocaleString()}
                </span>
              </div>
            ))}
            <div className="flex justify-between text-sm pt-2 border-t border-border">
              <span className="text-muted-foreground">Collection Fee</span>
              <span className="font-medium">
                KSh {collectionFee.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-base pt-2 border-t border-border">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold text-primary">
                KSh {grandTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Payment Method</h3>

        <div className="grid sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setPaymentMethod("mpesa")}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              paymentMethod === "mpesa"
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#00A651] rounded-lg flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-foreground">M-PESA</p>
                <p className="text-sm text-muted-foreground">
                  Pay via mobile money
                </p>
              </div>
              {paymentMethod === "mpesa" && (
                <Check className="w-5 h-5 text-primary ml-auto" />
              )}
            </div>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod("card")}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              paymentMethod === "card"
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-foreground rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-background" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Card Payment</p>
                <p className="text-sm text-muted-foreground">Visa, Mastercard</p>
              </div>
              {paymentMethod === "card" && (
                <Check className="w-5 h-5 text-primary ml-auto" />
              )}
            </div>
          </button>
        </div>

        {/* M-PESA Form */}
        {paymentMethod === "mpesa" && (
          <div className="bg-[#00A651]/5 border border-[#00A651]/20 rounded-xl p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mpesa-phone">M-PESA Phone Number</Label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 bg-muted border border-border rounded-lg text-sm text-muted-foreground">
                  +254
                </div>
                <Input
                  id="mpesa-phone"
                  type="tel"
                  placeholder="712 345 678"
                  value={mpesaPhone}
                  onChange={(e) => setMpesaPhone(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              You will receive an M-PESA prompt on this number to complete the
              payment.
            </p>
          </div>
        )}

        {/* Card Form Placeholder */}
        {paymentMethod === "card" && (
          <div className="bg-muted/50 border border-border rounded-xl p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                className="font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" maxLength={4} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Preparation Requirements Summary */}
      <div className="bg-card rounded-xl border border-border p-5 space-y-4">
        <PreparationRequirements tests={selectedTests} compact={false} />
        
        {/* Reminder Notice */}
        <div className="flex items-start gap-3 text-sm bg-primary/5 border border-primary/20 rounded-lg p-3 mt-4">
          <Bell className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-foreground mb-1">
              We'll remind you!
            </p>
            <p className="text-muted-foreground">
              You'll receive SMS and WhatsApp reminders 24 hours and 2 hours before your appointment with all preparation instructions.
            </p>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="flex items-center gap-3 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
        <Lock className="w-5 h-5 text-primary flex-shrink-0" />
        <p>
          Your payment is secured with 256-bit encryption. We never store your
          card details.
        </p>
      </div>

      {/* Sticky Action Buttons */}
      <div className="sticky bottom-0 left-0 right-0 bg-background border-t border-border p-4 -mx-4 sm:-mx-6 lg:-mx-8 mt-6 shadow-lg z-10">
        <div className="max-w-7xl mx-auto flex justify-between gap-4">
          <Button variant="outline" onClick={onBack} className="gap-2 bg-transparent">
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            size="lg"
            className="gap-2 flex-1 sm:flex-initial min-w-[200px]"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4" />
                Pay KSh {grandTotal.toLocaleString()}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
