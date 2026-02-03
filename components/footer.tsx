import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold">AfyaGo</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Quality lab testing made accessible. Your health, your convenience.
            </p>
            <div className="space-y-2 text-sm">
              <a href="tel:+254700123456" className="flex items-center gap-2 text-muted-foreground hover:text-background transition-colors">
                <Phone className="w-4 h-4" />
                +254 700 123 456
              </a>
              <a href="mailto:support@afyago.co.ke" className="flex items-center gap-2 text-muted-foreground hover:text-background transition-colors">
                <Mail className="w-4 h-4" />
                support@afyago.co.ke
              </a>
              <p className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Nakuru, Kenya
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/book" className="text-muted-foreground hover:text-background transition-colors">
                  Book a Test
                </Link>
              </li>
              <li>
                <Link href="/#packages" className="text-muted-foreground hover:text-background transition-colors">
                  Health Packages
                </Link>
              </li>
              <li>
                <Link href="/track" className="text-muted-foreground hover:text-background transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/results" className="text-muted-foreground hover:text-background transition-colors">
                  View Results
                </Link>
              </li>
            </ul>
          </div>

          {/* Tests */}
          <div>
            <h4 className="font-semibold mb-4">Popular Tests</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/book?test=1" className="text-muted-foreground hover:text-background transition-colors">
                  Complete Blood Count
                </Link>
              </li>
              <li>
                <Link href="/book?test=2" className="text-muted-foreground hover:text-background transition-colors">
                  Cholesterol Check
                </Link>
              </li>
              <li>
                <Link href="/book?test=6" className="text-muted-foreground hover:text-background transition-colors">
                  Thyroid Function Test
                </Link>
              </li>
              <li>
                <Link href="/book?test=3" className="text-muted-foreground hover:text-background transition-colors">
                  Blood Sugar Test
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-background transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-background transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-background transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-background transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            2024 AfyaGo. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">Accepted Payments:</span>
            <div className="flex items-center gap-2">
              <div className="bg-[#00A651] text-white px-2 py-1 rounded text-xs font-bold">
                M-PESA
              </div>
              <div className="bg-background text-foreground px-2 py-1 rounded text-xs font-bold">
                VISA
              </div>
              <div className="bg-background text-foreground px-2 py-1 rounded text-xs font-bold">
                MC
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
