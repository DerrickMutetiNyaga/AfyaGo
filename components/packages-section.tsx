import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { labPackages } from "@/lib/data";
import { Check, Sparkles } from "lucide-react";

export function PackagesSection() {
  return (
    <section id="packages" className="py-16 md:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Health Packages
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Save more with our curated health packages. Comprehensive testing 
            at bundled prices.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labPackages.map((pkg) => {
            const discount = Math.round(
              ((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100
            );
            
            return (
              <div
                key={pkg.id}
                className={`relative bg-background rounded-2xl border-2 p-6 transition-all hover:shadow-xl ${
                  pkg.popular 
                    ? "border-primary shadow-lg" 
                    : "border-border hover:border-primary/30"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="gap-1 bg-primary text-primary-foreground">
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {pkg.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-bold text-foreground">
                    KSh {pkg.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    KSh {pkg.originalPrice.toLocaleString()}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    Save {discount}%
                  </Badge>
                </div>

                <div className="space-y-3 mb-6">
                  <p className="text-sm font-medium text-foreground">Includes:</p>
                  {pkg.tests.map((test) => (
                    <div key={test} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-success" />
                      </div>
                      <span className="text-sm text-muted-foreground">{test}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  asChild 
                  className="w-full"
                  variant={pkg.popular ? "default" : "outline"}
                >
                  <Link href={`/book?package=${pkg.id}`}>
                    Book Package
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
