"use client";

import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PreviewGatePage() {
  const contactEmail = "lvynyambura049@gmail.com";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Logo/Brand */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center shadow-lg">
            <span className="text-primary-foreground font-bold text-3xl">A</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">AfyaGo</h1>
        </div>

        {/* Headline */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            Afyago — Private Project Preview
          </h2>
          
          {/* Body */}
          <p className="text-muted-foreground leading-relaxed text-base">
            This project is currently not publicly accessible.
            <br />
            To view the full system, flows, and design, please contact the developer.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
            <span>Contact</span>
          </div>
          
          <Button
            asChild
            variant="default"
            size="lg"
            className="w-full gap-2"
          >
            <a href={`mailto:${contactEmail}?subject=Access Request - Afyago Preview`}>
              <Mail className="w-4 h-4" />
              📩 {contactEmail}
            </a>
          </Button>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-muted-foreground">
          Designed and developed as a healthcare platform concept.
        </p>
      </div>
    </div>
  );
}

