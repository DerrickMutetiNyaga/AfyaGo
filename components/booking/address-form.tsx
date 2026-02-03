"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, MapPin, Phone, Home, Navigation, Map, Edit2 } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import map components to avoid SSR issues
const MapComponent = dynamic(() => import("./map-picker"), { ssr: false });

interface AddressFormProps {
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
  setAddress: (address: {
    street: string;
    area: string;
    landmark: string;
    phone: string;
    latitude?: number;
    longitude?: number;
    locationLabel?: string;
    directions?: string;
    useMap?: boolean;
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

// Default center for Nakuru, Kenya
const NAKURU_CENTER = {
  lat: -0.3031,
  lng: 36.0800,
};

export function AddressForm({
  address,
  setAddress,
  onContinue,
  onBack,
  canContinue,
}: AddressFormProps) {
  const [useMapMode, setUseMapMode] = useState(address.useMap ?? true);
  const [mapPosition, setMapPosition] = useState<[number, number]>(
    address.latitude && address.longitude
      ? [address.latitude, address.longitude]
      : [NAKURU_CENTER.lat, NAKURU_CENTER.lng]
  );
  const [isLocating, setIsLocating] = useState(false);
  const [locationLabel, setLocationLabel] = useState(address.locationLabel || "");
  const [directions, setDirections] = useState(address.directions || "");

  const updateField = (field: keyof typeof address, value: string | number | boolean | undefined) => {
    setAddress({ ...address, [field]: value });
  };

  const handleUseGPS = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMapPosition([latitude, longitude]);
        updateField("latitude", latitude);
        updateField("longitude", longitude);
        setIsLocating(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to get your location. Please allow location access or drag the pin on the map.");
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleMapPinChange = (lat: number, lng: number) => {
    setMapPosition([lat, lng]);
    updateField("latitude", lat);
    updateField("longitude", lng);
  };

  const handleModeSwitch = (useMap: boolean) => {
    setUseMapMode(useMap);
    updateField("useMap", useMap);
    if (useMap && address.latitude && address.longitude) {
      setMapPosition([address.latitude, address.longitude]);
    }
  };

  // Update location label and directions when they change
  useEffect(() => {
    if (useMapMode) {
      updateField("locationLabel", locationLabel);
      updateField("directions", directions);
    }
  }, [locationLabel, directions, useMapMode]);

  const canProceed = useMapMode
    ? address.latitude && address.longitude && address.phone && locationLabel
    : address.street && address.area && address.phone;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Collection Location
        </h2>
        <p className="text-muted-foreground">
          Where should we collect the samples?
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 p-1 bg-muted rounded-lg">
        <button
          type="button"
          onClick={() => handleModeSwitch(true)}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
            useMapMode
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Map className="w-4 h-4" />
          Pin on Map
        </button>
        <button
          type="button"
          onClick={() => handleModeSwitch(false)}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
            !useMapMode
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Edit2 className="w-4 h-4" />
          Manual Entry
        </button>
      </div>

      {useMapMode ? (
        /* Map Mode */
        <div className="space-y-5">
          {/* Map Container */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Select Pickup Location
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleUseGPS}
                disabled={isLocating}
                className="gap-2"
              >
                <Navigation className={`w-4 h-4 ${isLocating ? "animate-spin" : ""}`} />
                {isLocating ? "Locating..." : "Use My Location"}
              </Button>
            </div>
            <div className="h-[400px] w-full rounded-xl border border-border overflow-hidden bg-muted">
              <MapComponent
                position={mapPosition}
                onPositionChange={handleMapPinChange}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Drag the pin to your exact pickup location or use GPS to find it automatically
            </p>
          </div>

          {/* Location Label */}
          <div className="space-y-2">
            <Label htmlFor="locationLabel">
              Location Name <span className="text-muted-foreground">(e.g., Home, Office, Gate)</span>
            </Label>
            <Input
              id="locationLabel"
              placeholder="e.g., Main Gate, House Entrance, Office Reception"
              value={locationLabel}
              onChange={(e) => setLocationLabel(e.target.value)}
              className="h-12"
            />
            <p className="text-xs text-muted-foreground">
              Give this location a name to help identify it
            </p>
          </div>

          {/* Directions / Landmark */}
          <div className="space-y-2">
            <Label htmlFor="directions">
              Directions / Landmark <span className="text-muted-foreground">(Optional)</span>
            </Label>
            <Input
              id="directions"
              placeholder="e.g., Near Quickmart, gate is blue, call on arrival"
              value={directions}
              onChange={(e) => setDirections(e.target.value)}
              className="h-12"
            />
            <p className="text-xs text-muted-foreground">
              Add helpful directions to help our collector find you easily
            </p>
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
      ) : (
        /* Manual Entry Mode */
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
            disabled={!canProceed}
            size="lg"
            className="gap-2 flex-1 sm:flex-initial"
          >
            Continue to Payment
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
