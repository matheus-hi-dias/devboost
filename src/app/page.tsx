import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="font-inter bg-gradient-to-tl from-[hsl(var(--background))] to-[hsl(var(--muted))] min-h-screen w-full text-foreground transition-colors">
      <Header />
      <main>
        <HeroSection />
      </main>
    </div>
  );
}
