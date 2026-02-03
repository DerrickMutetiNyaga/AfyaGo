"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { collectors } from "@/lib/data";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  MoreVertical,
  UserPlus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockBookings = [
  {
    id: "BK-2024-015",
    patient: "Mary Wanjiku",
    phone: "+254 712 345 678",
    tests: ["CBC", "Lipid Profile"],
    date: "2024-02-15",
    time: "09:00 AM",
    address: "123 Kenyatta Avenue, Milimani",
    status: "confirmed",
    collector: null,
    amount: 2300,
  },
  {
    id: "BK-2024-014",
    patient: "John Ochieng",
    phone: "+254 723 456 789",
    tests: ["Blood Sugar", "HbA1c"],
    date: "2024-02-15",
    time: "10:00 AM",
    address: "45 Moi Road, Section 58",
    status: "collector_assigned",
    collector: collectors[0],
    amount: 1600,
  },
  {
    id: "BK-2024-013",
    patient: "Grace Njeri",
    phone: "+254 734 567 890",
    tests: ["Thyroid Profile"],
    date: "2024-02-15",
    time: "11:00 AM",
    address: "78 Lake Road, Nakuru Town",
    status: "collector_en_route",
    collector: collectors[1],
    amount: 2500,
  },
  {
    id: "BK-2024-012",
    patient: "Peter Kamau",
    phone: "+254 745 678 901",
    tests: ["Liver Function Test", "Kidney Function Test"],
    date: "2024-02-15",
    time: "02:00 PM",
    address: "12 Stadium Road, Free Area",
    status: "sample_collected",
    collector: collectors[2],
    amount: 3800,
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

export function BookingsManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch =
      booking.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || booking.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Bookings
          </h1>
          <p className="text-muted-foreground">
            Manage and assign collectors to bookings
          </p>
        </div>
        <Button className="gap-2">
          <Calendar className="w-4 h-4" />
          New Booking
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by patient name or booking ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {["all", "confirmed", "collector_assigned", "collector_en_route", "sample_collected"].map(
            (status) => (
              <button
                key={status}
                type="button"
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-muted border border-border"
                }`}
              >
                {status === "all"
                  ? "All"
                  : statusConfig[status]?.label || status}
              </button>
            )
          )}
        </div>
      </div>

      {/* Bookings List */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">
                  Booking
                </th>
                <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">
                  Schedule
                </th>
                <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">
                  Tests
                </th>
                <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">
                  Collector
                </th>
                <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">
                  Status
                </th>
                <th className="text-right text-sm font-medium text-muted-foreground px-4 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredBookings.map((booking) => {
                const config = statusConfig[booking.status];
                return (
                  <tr key={booking.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-foreground">
                          {booking.patient}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {booking.id}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Phone className="w-3 h-3" />
                          {booking.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 text-sm text-foreground">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {new Date(booking.date).toLocaleDateString("en-KE", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {booking.time}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1 max-w-[150px] truncate">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        {booking.address}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        {booking.tests.map((test) => (
                          <Badge key={test} variant="secondary" className="text-xs mr-1">
                            {test}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm font-medium text-primary mt-1">
                        KSh {booking.amount.toLocaleString()}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      {booking.collector ? (
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">
                              {booking.collector.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {booking.collector.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {booking.collector.rating} rating
                            </p>
                          </div>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                          <UserPlus className="w-4 h-4" />
                          Assign
                        </Button>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${config.bgColor} ${config.color}`}
                      >
                        {config.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                          <DropdownMenuItem>Contact Patient</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Cancel Booking
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
