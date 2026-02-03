"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { mockBooking, mockResults } from "@/lib/data";
import {
  Calendar,
  Clock,
  MapPin,
  FileText,
  ChevronRight,
  Plus,
  TestTube,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const bookingHistory = [
  { ...mockBooking, id: "BK-2024-001", status: "results_ready" as const },
  { ...mockBooking, id: "BK-2024-002", status: "processing" as const, scheduledDate: "2024-02-10" },
  { ...mockBooking, id: "BK-2024-003", status: "results_ready" as const, scheduledDate: "2024-01-25" },
];

const statusConfig = {
  confirmed: { label: "Confirmed", color: "text-primary", bgColor: "bg-primary/10" },
  collector_assigned: { label: "Assigned", color: "text-accent", bgColor: "bg-accent/10" },
  collector_en_route: { label: "En Route", color: "text-warning-foreground", bgColor: "bg-warning/10" },
  sample_collected: { label: "Collected", color: "text-success", bgColor: "bg-success/10" },
  processing: { label: "Processing", color: "text-muted-foreground", bgColor: "bg-muted" },
  results_ready: { label: "Results Ready", color: "text-success", bgColor: "bg-success/10" },
};

export default function DashboardPage() {
  const activeBooking = mockBooking;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                My Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your bookings and view results
              </p>
            </div>
            <Button asChild className="gap-2">
              <Link href="/book">
                <Plus className="w-4 h-4" />
                Book New Test
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Active Booking */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current Booking Card */}
              {activeBooking && (
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="p-5 border-b border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TestTube className="w-5 h-5 text-primary" />
                        <h2 className="font-semibold text-foreground">
                          Active Booking
                        </h2>
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          statusConfig[activeBooking.status].bgColor
                        } ${statusConfig[activeBooking.status].color}`}
                      >
                        {statusConfig[activeBooking.status].label}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Date</p>
                          <p className="text-sm font-medium text-foreground">
                            {new Date(activeBooking.scheduledDate).toLocaleDateString(
                              "en-KE",
                              {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Time</p>
                          <p className="text-sm font-medium text-foreground">
                            {activeBooking.scheduledTime}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="text-sm font-medium text-foreground">
                          {activeBooking.address}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-2">Tests</p>
                      <div className="flex flex-wrap gap-2">
                        {activeBooking.tests.map((test) => (
                          <span
                            key={test.id}
                            className="text-xs bg-muted px-2 py-1 rounded-full text-foreground"
                          >
                            {test.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/50 border-t border-border">
                    <Button asChild className="w-full gap-2">
                      <Link href="/track">
                        Track Collection
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              )}

              {/* Booking History */}
              <div className="bg-card rounded-xl border border-border">
                <div className="p-5 border-b border-border flex items-center justify-between">
                  <h2 className="font-semibold text-foreground">
                    Booking History
                  </h2>
                  <Link
                    href="/bookings"
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    View All
                  </Link>
                </div>

                <div className="divide-y divide-border">
                  {bookingHistory.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            booking.status === "results_ready"
                              ? "bg-success/10"
                              : "bg-muted"
                          }`}
                        >
                          {booking.status === "results_ready" ? (
                            <CheckCircle2 className="w-5 h-5 text-success" />
                          ) : (
                            <Clock className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">
                            {booking.id}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(booking.scheduledDate).toLocaleDateString(
                              "en-KE",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            statusConfig[booking.status].bgColor
                          } ${statusConfig[booking.status].color}`}
                        >
                          {statusConfig[booking.status].label}
                        </span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-semibold text-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Button asChild variant="outline" className="w-full justify-start gap-2 bg-transparent">
                    <Link href="/book">
                      <Plus className="w-4 h-4" />
                      Book New Test
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start gap-2 bg-transparent">
                    <Link href="/results">
                      <FileText className="w-4 h-4" />
                      View Results
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start gap-2 bg-transparent">
                    <Link href="/track">
                      <MapPin className="w-4 h-4" />
                      Track Order
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Recent Results */}
              <div className="bg-card rounded-xl border border-border p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">
                    Recent Results
                  </h3>
                  <Link
                    href="/results"
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    View All
                  </Link>
                </div>

                <div className="space-y-3">
                  {mockResults.slice(0, 3).map((result) => (
                    <Link
                      key={result.id}
                      href="/results"
                      className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          result.status === "normal"
                            ? "bg-success/10"
                            : result.status === "abnormal"
                            ? "bg-accent/10"
                            : "bg-destructive/10"
                        }`}
                      >
                        {result.status === "normal" ? (
                          <CheckCircle2 className="w-4 h-4 text-success" />
                        ) : (
                          <AlertCircle
                            className={`w-4 h-4 ${
                              result.status === "abnormal"
                                ? "text-accent"
                                : "text-destructive"
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {result.testName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(result.date).toLocaleDateString("en-KE", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Support */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-2">
                  Need Help?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our support team is available 24/7 to assist you.
                </p>
                <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                  <a href="tel:+254700123456">Contact Support</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
