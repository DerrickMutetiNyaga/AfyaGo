"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSigningIn(true);

    // Validate inputs
    if (!email.includes("@") || password.length < 6) {
      setError(isNewUser 
        ? "Please enter a valid email and password (at least 6 characters)"
        : "Please enter a valid email and password"
      );
      setIsSigningIn(false);
      return;
    }

    try {
      // Simulate sign-in/up process
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Store sign-in status
      if (typeof window !== "undefined") {
        localStorage.setItem("isSignedIn", "true");
        
        // Dispatch event to update header
        window.dispatchEvent(new Event("localStorageChange"));
        
        // Redirect to dashboard or previous page
        const returnUrl = new URLSearchParams(window.location.search).get("return");
        router.push(returnUrl || "/dashboard");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsSigningIn(false);
    }
  };

  const isValid = email.includes("@") && password.length >= 6;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Back to Home Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Sign In Card */}
          <div className="bg-card rounded-2xl border border-border shadow-lg p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                {isNewUser ? "Create Account" : "Welcome Back"}
              </h1>
              <p className="text-muted-foreground">
                {isNewUser
                  ? "Sign up to book tests and track your health"
                  : "Sign in to access your bookings and results"}
              </p>
            </div>

            {/* Security Notice */}
            <div className="flex items-start gap-3 text-sm bg-primary/5 border border-primary/20 rounded-lg p-4">
              <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground mb-1">
                  Your data is protected
                </p>
                <p className="text-muted-foreground">
                  All your health information and test results are encrypted and securely stored.
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 text-sm">
                {error}
              </div>
            )}

            {/* Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {isNewUser && (
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 6 characters long
                  </p>
                )}
              </div>

              {!isNewUser && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-border"
                    />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      // Handle forgot password
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={!isValid || isSigningIn}
                  size="lg"
                  className="w-full gap-2 h-12"
                >
                  {isSigningIn ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      {isNewUser ? "Creating account..." : "Signing in..."}
                    </>
                  ) : (
                    <>
                      {isNewUser ? "Create Account" : "Sign In"}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Toggle between Sign In and Sign Up */}
            <div className="text-center text-sm">
              <p className="text-muted-foreground">
                {isNewUser ? "Already have an account? " : "Don't have an account? "}
                <button
                  type="button"
                  onClick={() => {
                    setIsNewUser(!isNewUser);
                    setError("");
                  }}
                  className="text-primary hover:underline font-medium"
                >
                  {isNewUser ? "Sign in" : "Create one"}
                </button>
              </p>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Sign In Options */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="gap-2 h-11"
                onClick={() => {
                  // Handle Google sign in
                  if (typeof window !== "undefined") {
                    localStorage.setItem("isSignedIn", "true");
                    window.dispatchEvent(new Event("localStorageChange"));
                    router.push("/dashboard");
                  }
                }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="gap-2 h-11"
                onClick={() => {
                  // Handle Apple sign in
                  if (typeof window !== "undefined") {
                    localStorage.setItem("isSignedIn", "true");
                    window.dispatchEvent(new Event("localStorageChange"));
                    router.push("/dashboard");
                  }
                }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                Apple
              </Button>
            </div>

            {/* Continue as Guest */}
            <div className="pt-4 border-t border-border">
              <p className="text-center text-sm text-muted-foreground mb-3">
                Want to book without an account?
              </p>
              <Button
                type="button"
                variant="outline"
                className="w-full gap-2"
                onClick={() => router.push("/book")}
              >
                Continue as Guest
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

