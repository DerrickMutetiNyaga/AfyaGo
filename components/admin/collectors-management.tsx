"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Star,
  Phone,
  MapPin,
  Clock,
  MoreVertical,
  Calendar,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockCollectors = [
  {
    id: "col-1",
    name: "James Mwangi",
    phone: "+254 712 345 678",
    email: "james@afyago.co.ke",
    status: "on_route",
    rating: 4.9,
    totalCollections: 1245,
    todayCollections: 4,
    currentLocation: "Milimani",
    joinedDate: "2023-06-15",
    certifications: ["Phlebotomy", "First Aid"],
  },
  {
    id: "col-2",
    name: "Grace Wanjiku",
    phone: "+254 723 456 789",
    email: "grace@afyago.co.ke",
    status: "available",
    rating: 4.8,
    totalCollections: 987,
    todayCollections: 3,
    currentLocation: "Section 58",
    joinedDate: "2023-08-20",
    certifications: ["Phlebotomy"],
  },
  {
    id: "col-3",
    name: "Peter Omondi",
    phone: "+254 734 567 890",
    email: "peter@afyago.co.ke",
    status: "collecting",
    rating: 4.7,
    totalCollections: 756,
    todayCollections: 5,
    currentLocation: "Free Area",
    joinedDate: "2023-10-10",
    certifications: ["Phlebotomy", "Lab Technician"],
  },
  {
    id: "col-4",
    name: "Sarah Achieng",
    phone: "+254 745 678 901",
    email: "sarah@afyago.co.ke",
    status: "offline",
    rating: 4.6,
    totalCollections: 432,
    todayCollections: 0,
    currentLocation: "-",
    joinedDate: "2024-01-05",
    certifications: ["Phlebotomy"],
  },
];

const statusConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  available: { label: "Available", color: "text-success", bgColor: "bg-success/10" },
  on_route: { label: "On Route", color: "text-warning-foreground", bgColor: "bg-warning/10" },
  collecting: { label: "Collecting", color: "text-primary", bgColor: "bg-primary/10" },
  offline: { label: "Offline", color: "text-muted-foreground", bgColor: "bg-muted" },
};

export function CollectorsManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredCollectors = mockCollectors.filter((collector) => {
    const matchesSearch =
      collector.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collector.phone.includes(searchQuery);
    const matchesStatus =
      selectedStatus === "all" || collector.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Collectors
          </h1>
          <p className="text-muted-foreground">
            Manage your phlebotomist team
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Collector
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", "available", "on_route", "collecting", "offline"].map(
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

      {/* Collectors Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredCollectors.map((collector) => {
          const config = statusConfig[collector.status];
          return (
            <div
              key={collector.id}
              className="bg-card rounded-xl border border-border p-5 hover:border-primary/30 transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {collector.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {collector.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <span>{collector.rating}</span>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Assign Booking</DropdownMenuItem>
                    <DropdownMenuItem>View Schedule</DropdownMenuItem>
                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Status Badge */}
              <div className="mb-4">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${config.bgColor} ${config.color}`}
                >
                  {config.label}
                </span>
              </div>

              {/* Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{collector.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {collector.currentLocation}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Joined {new Date(collector.joinedDate).toLocaleDateString("en-KE", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Certifications */}
              <div className="flex flex-wrap gap-1 mb-4">
                {collector.certifications.map((cert) => (
                  <Badge key={cert} variant="secondary" className="text-xs">
                    {cert}
                  </Badge>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">
                    {collector.todayCollections}
                  </p>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">
                    {collector.totalCollections.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
