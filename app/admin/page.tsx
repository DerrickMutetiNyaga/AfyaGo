"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminOverview } from "@/components/admin/admin-overview";
import { BookingsManagement } from "@/components/admin/bookings-management";
import { CollectorsManagement } from "@/components/admin/collectors-management";
import { Menu, X } from "lucide-react";

type AdminView = "overview" | "bookings" | "collectors" | "results" | "settings";

export default function AdminPage() {
  const [currentView, setCurrentView] = useState<AdminView>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-card border-b border-border">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-foreground">Admin</span>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar
          currentView={currentView}
          setCurrentView={setCurrentView}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          <div className="p-4 sm:p-6 lg:p-8">
            {currentView === "overview" && <AdminOverview />}
            {currentView === "bookings" && <BookingsManagement />}
            {currentView === "collectors" && <CollectorsManagement />}
            {currentView === "results" && (
              <div className="text-center py-16">
                <h2 className="text-xl font-semibold text-foreground">Results Management</h2>
                <p className="text-muted-foreground mt-2">Coming soon</p>
              </div>
            )}
            {currentView === "settings" && (
              <div className="text-center py-16">
                <h2 className="text-xl font-semibold text-foreground">Settings</h2>
                <p className="text-muted-foreground mt-2">Coming soon</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
