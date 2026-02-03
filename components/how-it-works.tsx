import { Search, Calendar, Home, FileText } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search & Select",
    description: "Browse our catalog of 100+ lab tests or upload your prescription. Clear pricing, no hidden fees.",
  },
  {
    icon: Calendar,
    title: "Schedule Collection",
    description: "Pick a convenient time slot for home sample collection. Morning, afternoon, or evening.",
  },
  {
    icon: Home,
    title: "Home Collection",
    description: "A certified phlebotomist arrives at your doorstep. Track them in real-time like an Uber ride.",
  },
  {
    icon: FileText,
    title: "Get Results",
    description: "Receive digital results in your secure vault. Download, print, or share directly with your doctor.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            How AfyaGo Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting your lab tests done has never been easier. Four simple steps 
            to better health monitoring.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-border" />
              )}
              
              <div className="relative bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors">
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
