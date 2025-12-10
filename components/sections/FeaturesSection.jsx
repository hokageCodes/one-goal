import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Link from "next/link";

const features = [
  {
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    title: "One Goal Per Timeframe",
    description: "Daily, weekly, or monthly—pick your focus period and commit. No endless lists allowed."
  },
  {
    icon: "M9 5l7 7-7 7",
    title: "Micro Tasks (3-5 Max)",
    description: "Break goals into bite-sized actions. Capped at 5 subtasks to keep you from overthinking."
  },
  {
    icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
    title: "Daily Intentions",
    description: "Set your mindset before the chaos starts. Daily prompts to align your focus and energy."
  },
  {
    icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
    title: "Coach PO (AI Tough Love)",
    description: "Your accountability coach who calls you out, keeps you honest, and won't let you bullshit yourself."
  },
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "GPT-Powered Reminders",
    description: "Not generic pings. Personalized, smart nudges that know your patterns and push your buttons."
  },
  {
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    title: "Share Feed",
    description: "Public wins, public accountability. Share your progress and see others crushing their goals."
  }
];

export default function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-16 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      
      <Container className="relative">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 lg:order-2">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group p-6 rounded-xl border bg-background/50 backdrop-blur-sm hover:bg-background hover:shadow-md transition-all duration-200"
              >
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:sticky lg:top-24 space-y-6 lg:order-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Everything You Need.<br />
              <span className="text-muted-foreground">Nothing You Don't.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We've carefully crafted features that help you achieve more by doing less. 
              No bloat, no distractions—just pure productivity.
            </p>
            <Button size="lg" className="mt-4" asChild>
              <Link href="/features">
                Explore All Features
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
