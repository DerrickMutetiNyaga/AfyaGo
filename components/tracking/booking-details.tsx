import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Booking } from "@/lib/types";
import { Calendar, Clock, MapPin, CreditCard, FileText, ChevronRight } from "lucide-react";

interface BookingDetailsProps {
  booking: Booking;
}

export function BookingDetails({ booking }: BookingDetailsProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-5 sticky top-24">
      <h3 className="font-semibold text-foreground mb-4">Booking Details</h3>

      <div className="space-y-4">
        {/* Date & Time */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Calendar className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Date & Time</p>
            <p className="text-sm font-medium text-foreground">
              {new Date(booking.scheduledDate).toLocaleDateString("en-KE", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </p>
            <p className="text-sm font-medium text-primary">
              {booking.scheduledTime}
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Collection Address</p>
            <p className="text-sm font-medium text-foreground">
              {booking.address}
            </p>
          </div>
        </div>

        {/* Payment Status */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Payment</p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">
                KSh {booking.totalAmount.toLocaleString()}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  booking.paymentStatus === "completed"
                    ? "bg-success/10 text-success"
                    : booking.paymentStatus === "pending"
                    ? "bg-warning/10 text-warning-foreground"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {booking.paymentStatus === "completed"
                  ? "Paid"
                  : booking.paymentStatus === "pending"
                  ? "Pending"
                  : "Failed"}
              </span>
            </div>
          </div>
        </div>

        {/* Tests */}
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">Tests Ordered</p>
          <div className="space-y-2">
            {booking.tests.map((test) => (
              <div
                key={test.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-foreground">{test.name}</span>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">{test.turnaroundTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        {booking.status === "results_ready" && (
          <div className="pt-4 border-t border-border">
            <Button asChild className="w-full gap-2">
              <Link href="/results">
                <FileText className="w-4 h-4" />
                View Results
                <ChevronRight className="w-4 h-4 ml-auto" />
              </Link>
            </Button>
          </div>
        )}

        {/* Help */}
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">Need help?</p>
          <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
            <a href="tel:+254700123456">Contact Support</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
