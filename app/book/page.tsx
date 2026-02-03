"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TestSelection } from "@/components/booking/test-selection";
import { TimeSlotPicker } from "@/components/booking/time-slot-picker";
import { AddressForm } from "@/components/booking/address-form";
import { SignInGate } from "@/components/booking/sign-in-gate";
import { BookingSummary } from "@/components/booking/booking-summary";
import { labTests, labPackages } from "@/lib/data";
import type { LabTest } from "@/lib/types";

function BookingContent() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [selectedTests, setSelectedTests] = useState<LabTest[]>([]);
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [address, setAddress] = useState({
    street: "",
    area: "",
    landmark: "",
    phone: "",
  });

  // Handle URL params for pre-selected tests/packages/search
  useEffect(() => {
    const testId = searchParams.get("test");
    const packageId = searchParams.get("package");
    const searchQuery = searchParams.get("search");

    if (testId) {
      const test = labTests.find((t) => t.id === testId);
      if (test && !selectedTests.find((t) => t.id === test.id)) {
        setSelectedTests([test]);
      }
    }

    if (packageId) {
      const pkg = labPackages.find((p) => p.id === packageId);
      if (pkg) {
        const packageTests = labTests.filter((test) =>
          pkg.tests.some((pTest) =>
            test.name.toLowerCase().includes(pTest.toLowerCase())
          )
        );
        setSelectedTests(packageTests);
      }
    }

    // If there's a search query, we'll pass it to TestSelection component
    // The component will handle filtering
  }, [searchParams, selectedTests]);

  const totalAmount = selectedTests.reduce((sum, test) => sum + test.price, 0);

  const canProceedToStep2 = selectedTests.length > 0;
  const canProceedToStep3 = selectedDate && selectedTime;
  const canProceedToStep4 = address.street && address.area && address.phone;
  const [isSignedIn, setIsSignedIn] = useState(false);

  const steps = [
    { number: 1, title: "Select Tests" },
    { number: 2, title: "Choose Time" },
    { number: 3, title: "Your Details" },
    { number: 4, title: "Sign In" },
    { number: 5, title: "Payment" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              {steps.map((s, index) => (
                <div key={s.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                        step >= s.number
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {s.number}
                    </div>
                    <span
                      className={`text-xs mt-2 text-center ${
                        step >= s.number
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-1 sm:mx-2 rounded ${
                        step > s.number ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <TestSelection
                  selectedTests={selectedTests}
                  setSelectedTests={setSelectedTests}
                  prescriptionFile={prescriptionFile}
                  setPrescriptionFile={setPrescriptionFile}
                  onContinue={() => canProceedToStep2 && setStep(2)}
                  canContinue={canProceedToStep2}
                  initialSearchQuery={searchParams.get("search") || ""}
                />
              )}

              {step === 2 && (
                <TimeSlotPicker
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  selectedTests={selectedTests}
                  onContinue={() => canProceedToStep3 && setStep(3)}
                  onBack={() => setStep(1)}
                  canContinue={!!canProceedToStep3}
                />
              )}

              {step === 3 && (
                <AddressForm
                  address={address}
                  setAddress={setAddress}
                  onContinue={() => canProceedToStep4 && setStep(4)}
                  onBack={() => setStep(2)}
                  canContinue={!!canProceedToStep4}
                />
              )}

              {step === 4 && (
                <SignInGate
                  onContinue={() => {
                    setIsSignedIn(true);
                    setStep(5);
                  }}
                  onBack={() => setStep(3)}
                />
              )}

              {step === 5 && (
                <BookingSummary
                  selectedTests={selectedTests}
                  selectedDate={selectedDate!}
                  selectedTime={selectedTime}
                  address={address}
                  totalAmount={totalAmount}
                  onBack={() => setStep(4)}
                />
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-lg text-foreground mb-4">
                  Order Summary
                </h3>

                {selectedTests.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No tests selected yet
                  </p>
                ) : (
                  <div className="space-y-3">
                    {selectedTests.map((test) => (
                      <div
                        key={test.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-muted-foreground truncate pr-2">
                          {test.name}
                        </span>
                        <span className="text-foreground font-medium whitespace-nowrap">
                          KSh {test.price.toLocaleString()}
                        </span>
                      </div>
                    ))}

                    <div className="border-t border-border pt-3 mt-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Collection Fee
                        </span>
                        <span className="text-foreground font-medium">
                          KSh 200
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-foreground">
                          Total
                        </span>
                        <span className="font-bold text-lg text-primary">
                          KSh {(totalAmount + 200).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedDate && selectedTime && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      Collection scheduled for:
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {selectedDate.toLocaleDateString("en-KE", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sm font-medium text-primary">
                      {selectedTime}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
