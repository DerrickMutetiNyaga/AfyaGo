"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, User, FileText, Calendar, LogOut, Package } from "lucide-react";
import { useActiveBooking } from "@/hooks/use-active-booking";

export function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { hasActiveBooking, activeBooking, isLoading } = useActiveBooking();

  // Check sign-in status on mount and when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkSignIn = () => {
        const signedIn = localStorage.getItem("isSignedIn") === "true";
        setIsSignedIn(signedIn);
      };
      
      checkSignIn();
      
      // Listen for storage changes
      window.addEventListener("storage", checkSignIn);
      
      // Also check periodically
      const interval = setInterval(checkSignIn, 1000);
      
      return () => {
        window.removeEventListener("storage", checkSignIn);
        clearInterval(interval);
      };
    }
  }, []);

  const handleSignOut = () => {
    // Clear authentication state
    if (typeof window !== "undefined") {
      localStorage.removeItem("isSignedIn");
      localStorage.removeItem("activeBooking");
      
      // Update local state immediately
      setIsSignedIn(false);
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event("localStorageChange"));
      
      // Redirect to home page
      router.push("/");
      
      // Force a page reload to update all components
      setTimeout(() => {
        window.location.reload();
      }, 50);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-foreground">AfyaGo</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/#tests"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Tests
            </Link>
            <Link
              href="/#packages"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Packages
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </Link>
            {!isSignedIn && (
              <Link
                href="/signin"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Sign In
              </Link>
            )}
            
            {/* Track Order - Prominent when active booking exists */}
            {hasActiveBooking && (
              <Link
                href={`/track${activeBooking ? `?booking=${activeBooking.id}` : ""}`}
                className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium text-sm transition-all group"
              >
                <Package className="w-4 h-4" />
                <span>Track Order</span>
                <Badge 
                  variant="secondary" 
                  className="ml-1 h-5 px-1.5 text-xs bg-primary text-primary-foreground animate-pulse"
                >
                  Active
                </Badge>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping" />
              </Link>
            )}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {/* Track Order Button - Prominent when active booking exists */}
            {hasActiveBooking ? (
              <Button 
                asChild 
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                <Link href={`/track${activeBooking ? `?booking=${activeBooking.id}` : ""}`}>
                  <Package className="w-4 h-4" />
                  Track Order
                  <Badge 
                    variant="secondary" 
                    className="ml-1 h-4 px-1.5 text-xs bg-primary-foreground text-primary"
                  >
                    Live
                  </Badge>
                </Link>
              </Button>
            ) : (
              <Button asChild variant="outline" className="gap-2">
                <Link href="/track">
                  <Package className="w-4 h-4" />
                  Track Order
                </Link>
              </Button>
            )}
            
            {isSignedIn ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <User className="w-4 h-4" />
                      <span>Account</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {hasActiveBooking && (
                      <DropdownMenuItem asChild>
                        <Link 
                          href={`/track${activeBooking ? `?booking=${activeBooking.id}` : ""}`}
                          className="flex items-center gap-2 font-medium"
                        >
                          <Package className="w-4 h-4" />
                          Track Order
                          <Badge variant="secondary" className="ml-auto text-xs">Active</Badge>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        My Bookings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/results" className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        My Results
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      variant="destructive"
                      onSelect={(e) => {
                        e.preventDefault();
                        handleSignOut();
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button asChild variant="outline" className="gap-2">
                <Link href="/signin">Sign In</Link>
              </Button>
            )}
            <Button asChild>
              <Link href="/book">Book Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-2">
              <Link
                href="/#tests"
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tests
              </Link>
              <Link
                href="/#packages"
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Packages
              </Link>
              <Link
                href="/#how-it-works"
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              
              {/* Track Order - Prominent in mobile when active */}
              {hasActiveBooking ? (
                <Link
                  href={`/track${activeBooking ? `?booking=${activeBooking.id}` : ""}`}
                  className="relative px-3 py-2.5 text-sm font-medium bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors flex items-center justify-between"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span>Track Order</span>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="h-5 px-1.5 text-xs bg-primary text-primary-foreground animate-pulse"
                  >
                    Active
                  </Badge>
                </Link>
              ) : (
                <Link
                  href="/track"
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Track Order
                </Link>
              )}
              
              <Link
                href="/dashboard"
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Bookings
              </Link>
              <Link
                href="/results"
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Results
              </Link>
              {!isSignedIn && (
                <Link
                  href="/signin"
                  className="px-3 py-2 text-sm font-medium text-primary hover:text-primary/80 hover:bg-primary/5 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
              <div className="pt-2 px-3">
                <Button asChild className="w-full">
                  <Link href="/book">Book Now</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
