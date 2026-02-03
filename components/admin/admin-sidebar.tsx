"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  Settings,
  LogOut,
  X,
} from "lucide-react";

type AdminView = "overview" | "bookings" | "collectors" | "results" | "settings";

interface AdminSidebarProps {
  currentView: AdminView;
  setCurrentView: (view: AdminView) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { id: "overview" as const, label: "Overview", icon: LayoutDashboard },
  { id: "bookings" as const, label: "Bookings", icon: Calendar },
  { id: "collectors" as const, label: "Collectors", icon: Users },
  { id: "results" as const, label: "Results", icon: FileText },
  { id: "settings" as const, label: "Settings", icon: Settings },
];

export function AdminSidebar({
  currentView,
  setCurrentView,
  isOpen,
  onClose,
}: AdminSidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transform transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <div>
              <span className="text-lg font-bold text-foreground">AfyaGo</span>
              <span className="text-xs text-muted-foreground block">Admin Panel</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-muted rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setCurrentView(item.id);
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                currentView === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Back to Site
          </Link>
        </div>
      </aside>
    </>
  );
}
