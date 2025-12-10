import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/ui/feature-card";
import Link from "next/link";

const features = [
  {
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    title: "One Goal Per Timeframe",
    description: "Choose daily, weekly, or monthly focus periods. Free users get one total goal. Pro users can set unlimited goals across all timeframes.",
    benefits: [
      "Daily, weekly, or monthly timeframes",
      "Single-goal constraint forces clarity",
      "Status tracking: In Progress, Completed, Failed, Restarting",
      "Clean dashboard with zero clutter"
    ]
  },
  {
    icon: "M9 5l7 7-7 7",
    title: "Micro Tasks (3-5 Max)",
    description: "Break your goal into actionable steps—but we cap it at 5 to prevent analysis paralysis and endless subtask sprawl.",
    benefits: [
      "Maximum 5 subtasks per goal",
      "Quick checkbox completion",
      "Keeps you from overthinking",
      "Avoids task manager bloat"
    ]
  },
  {
    icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
    title: "Daily Intentions",
    description: "Start each day with a mindset prompt. Like the @PelumiOlawole daily messages—never repeats, always hits different.",
    benefits: [
      "Unique inspirational messages daily",
      "Mindset alignment before chaos",
      "Reflection on discipline and focus",
      "Optional, never mandatory"
    ]
  },
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "GPT-Powered Reminders",
    description: "AI-generated lock screen reminders with humor and tough love. Never the same message twice. Actually makes you want to check in.",
    benefits: [
      "Personalized, context-aware nudges",
      "Humor + discipline tone",
      "Adapts to your patterns",
      "Lock screen integration"
    ]
  },
  {
    icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
    title: "Coach PO (AI Coaching)",
    description: "Your AI accountability coach who offers smart encouragement, realignment suggestions, and the occasional roast when you need it.",
    benefits: [
      "Basic responses on Free, deeper flows on Pro",
      "Roast mode for tough love",
      "Goal refinement suggestions",
      "Keeps you honest with yourself"
    ]
  },
  {
    icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Mood Tracker",
    description: "Quick daily mood check-ins with emojis and word tags. Track emotional patterns and see how they correlate with productivity.",
    benefits: [
      "Emoji + word-based mood logging",
      "Emotional pattern insights",
      "Optional, not forced",
      "Links mood to goal progress"
    ]
  },
  {
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    title: "Share Feed",
    description: "Post your goal publicly for accountability. See others crushing their goals. React, comment, nudge each other forward.",
    benefits: [
      "Public or anonymous sharing",
      "Community reactions and support",
      "Light comments and nudges",
      "Accountability through visibility"
    ]
  },
  {
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    title: "Analytics & Trends",
    description: "Visual history of your performance. Track completion rates, failure points, consistency streaks, and weekly summaries.",
    benefits: [
      "Goal completion rates",
      "Failure pattern analysis",
      "Consistency streak tracking",
      "Weekly performance summaries"
    ]
  },
  {
    icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4",
    title: "Archive Revival",
    description: "Failed goals aren't deleted—they're lessons. Revive archived goals, learn from past attempts, and iterate smarter.",
    benefits: [
      "Goal history preservation",
      "One-click goal revival",
      "Reflection prompts on failures",
      "Success pattern identification"
    ]
  }
];

export default function FeaturesPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10 -z-10" />
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Just Enough to <span className="text-primary">Get Shit Done.</span><br />
              Nothing More.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              We didn't add features because they're cool. Every tool here serves one purpose: 
              Help you finish your one goal without distraction.
            </p>
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="w-full pb-12 md:pb-16">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-16 bg-secondary/20">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Ready to Stop Procrastinating?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands who've stopped planning and started finishing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link href="/signup">Start Finishing Things</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">See Pricing</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
