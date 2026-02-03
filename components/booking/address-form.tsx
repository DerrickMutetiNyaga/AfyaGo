"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, MapPin, Phone, Home } from "lucide-react";

interface AddressFormProps {
  address: {
    street: string;
    area: string;
    landmark: string;
    phone: string;
  };
  setAddress: (address: {
    street: string;
    area: string;
    landmark: string;
    phone: string;
  }) => void;
  onContinue: () => void;
  onBack: () => void;
  canContinue: boolean;
}

const nakuruAreas = [
  "Milimani",
  "Section 58",
  "Free Area",
  "London",
  "Lanet",
  "Nakuru Town",
  "Shabab",
  "Kiamunyi",
  "Pipeline",
  "Flamingo",
];

export function AddressForm({
  address,
  setAddress,
  onContinue,
  onBack,
  canContinue,
}: AddressFormProps) {
  const updateField = (field: keyof typeof address, value: string) => {
    setAddress({ ...address, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Collection Address
        </h2>
        <p className="text-muted-foreground">
          Where should we collect the samples?
        </p>
      </div>

      <div className="space-y-5">
        {/* Street Address */}
        <div className="space-y-2">
          <Label htmlFor="street" className="flex items-center gap-2">
            <Home className="w-4 h-4 text-primary" />
            Street Address
          </Label>
          <Input
            id="street"
            placeholder="e.g., House 123, Acacia Road"
            value={address.street}
            onChange={(e) => updateField("street", e.target.value)}
            className="h-12"
          />
        </div>

        {/* Area Selection */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Area / Estate
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {nakuruAreas.map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => updateField("area", area)}
                className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                  address.area === area
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                {area}
              </button>
            ))}
          </div>
          <Input
            placeholder="Or type your area..."
            value={nakuruAreas.includes(address.area) ? "" : address.area}
            onChange={(e) => updateField("area", e.target.value)}
            className="h-10 mt-2"
          />
        </div>

        {/* Landmark */}
        <div className="space-y-2">
          <Label htmlFor="landmark">Landmark (Optional)</Label>
          <Input
            id="landmark"
            placeholder="e.g., Near Total Petrol Station"
            value={address.landmark}
            onChange={(e) => updateField("landmark", e.target.value)}
            className="h-12"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" />
            Phone Number
          </Label>
          <div className="flex gap-2">
            <div className="flex items-center px-3 bg-muted border border-border rounded-lg text-sm text-muted-foreground">
              +254
            </div>
            <Input
              id="phone"
              type="tel"
              placeholder="712 345 678"
              value={address.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="h-12 flex-1"
              maxLength={10}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            We&apos;ll use this number to contact you about your collection
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} className="gap-2 bg-transparent">
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
        <Button
          onClick={onContinue}
          disabled={!canContinue}
          size="lg"
          className="gap-2"
        >
          Continue to Payment
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
