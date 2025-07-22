import {
  ContactSection,
  CoursesSection,
  Header,
  HeroSection,
  PlansSection,
} from "@/components";

export default function Home() {
  return (
    <div className="font-inter bg-gradient-to-tl from-[hsl(var(--background))] to-[hsl(var(--muted))] min-h-screen w-full text-foreground transition-colors">
      <Header />
      <main>
        <HeroSection />
        <CoursesSection />
        <PlansSection />
        <ContactSection />
      </main>
    </div>
  );
}
