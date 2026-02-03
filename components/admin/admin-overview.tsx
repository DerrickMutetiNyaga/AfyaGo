"use client";

import {
  Calendar,
  Users,
  TestTube,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const stats = [
  {
    label: "Today's Bookings",
    value: "24",
    change: "+12%",
    changeType: "positive",
    icon: Calendar,
  },
  {
    label: "Active Collectors",
    value: "8",
    change: "2 available",
    changeType: "neutral",
    icon: Users,
  },
  {
    label: "Pending Results",
    value: "156",
    change: "32 urgent",
    changeType: "warning",
    icon: TestTube,
  },
  {
    label: "Revenue Today",
    value: "KSh 48,500",
    change: "+18%",
    changeType: "positive",
    icon: TrendingUp,
  },
];

const recentBookings = [
  {
    id: "BK-2024-015",
    patient: "Mary Wanjiku",
    tests: "CBC, Lipid Profile",
    time: "09:00 AM",
    status: "collector_en_route",
    collector: "James Mwangi",
  },
  {
    id: "BK-2024-014",
    patient: "John Ochieng",
    tests: "Blood Sugar, HbA1c",
    time: "10:00 AM",
    status: "confirmed",
    collector: null,
  },
  {
    id: "BK-2024-013",
    patient: "Grace Njeri",
    tests: "Thyroid Profile",
    time: "11:00 AM",
    status: "sample_collected",
    collector: "Grace Wanjiku",
  },
  {
    id: "BK-2024-012",
    patient: "Peter Kamau",
    tests: "Liver Function Test",
    time: "02:00 PM",
    status: "confirmed",
    collector: null,
  },
];

const statusConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  confirmed: { label: "Confirmed", color: "text-primary", bgColor: "bg-primary/10" },
  collector_assigned: { label: "Assigned", color: "text-accent", bgColor: "bg-accent/10" },
  collector_en_route: { label: "En Route", color: "text-warning-foreground", bgColor: "bg-warning/10" },
  sample_collected: { label: "Collected", color: "text-success", bgColor: "bg-success/10" },
  processing: { label: "Processing", color: "text-muted-foreground", bgColor: "bg-muted" },
  results_ready: { label: "Complete", color: "text-success", bgColor: "bg-success/10" },
};

export function AdminOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back. Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card rounded-xl border border-border p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.changeType === "positive"
                    ? "bg-success/10 text-success"
                    : stat.changeType === "warning"
                    ? "bg-accent/10 text-accent"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-card rounded-xl border border-border">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Today&apos;s Bookings</h2>
          <button
            type="button"
            className="text-sm text-primary font-medium hover:underline"
          >
            View All
          </button>
        </div>
        <div className="divide-y divide-border">
          {recentBookings.map((booking) => {
            const config = statusConfig[booking.status];
            return (
              <div
                key={booking.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">
                      {booking.patient}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {booking.id}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {booking.tests}
                  </p>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {booking.time}
                  </div>
                  {booking.collector ? (
                    <div className="flex items-center gap-1 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{booking.collector}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Unassigned</span>
                  )}
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${config.bgColor} ${config.color}`}
                  >
                    {config.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Alerts */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h2 className="font-semibold text-foreground mb-4">Alerts</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Critical result pending review
                </p>
                <p className="text-xs text-muted-foreground">
                  Patient: Agnes Muthoni - Kidney Function Test
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-warning/5 border border-warning/20 rounded-lg">
              <Clock className="w-5 h-5 text-warning-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  2 collectors running late
                </p>
                <p className="text-xs text-muted-foreground">
                  James (15 min), Peter (10 min)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-success/5 border border-success/20 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  All morning collections completed
                </p>
                <p className="text-xs text-muted-foreground">
                  12 samples delivered to lab
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Collector Status */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h2 className="font-semibold text-foreground mb-4">Collector Status</h2>
          <div className="space-y-3">
            {[
              { name: "James Mwangi", status: "On Route", collections: 4, color: "bg-warning" },
              { name: "Grace Wanjiku", status: "Available", collections: 3, color: "bg-success" },
              { name: "Peter Omondi", status: "Collecting", collections: 5, color: "bg-primary" },
            ].map((collector) => (
              <div
                key={collector.name}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {collector.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{collector.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {collector.collections} collections today
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${collector.color}`} />
                  <span className="text-sm text-muted-foreground">
                    {collector.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
