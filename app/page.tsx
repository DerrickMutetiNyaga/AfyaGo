import { Header } from "@/components/header";
import { HeroCard } from "@/components/hero-card";
import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { TestsGrid } from "@/components/tests-grid";
import { PackagesSection } from "@/components/packages-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HeroCard />
        <HowItWorks />
        <TestsGrid />
        <PackagesSection />
      </main>
      <Footer />
    </div>
  );
}
