import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/ui/feature-card";
import Link from "next/link";

const features = [
  {
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    title: "Simple Goal Tracking",
    description: "Set your one goal and track progress with an intuitive, distraction-free interface that keeps you focused.",
    benefits: [
      "Clean, minimalist dashboard",
      "Quick goal setup in seconds",
      "Visual progress indicators",
      "Milestone celebrations"
    ]
  },
  {
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Daily Reminders",
    description: "Stay on track with smart, context-aware reminders that keep your goal top of mind without being intrusive.",
    benefits: [
      "Customizable reminder times",
      "Smart scheduling based on your habits",
      "Multiple reminder channels",
      "Snooze and reschedule options"
    ]
  },
  {
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    title: "Progress Analytics",
    description: "Visualize your journey with powerful insights and completion metrics that help you understand your productivity patterns.",
    benefits: [
      "Daily, weekly, monthly views",
      "Streak tracking and rewards",
      "Performance trends",
      "Completion rate analysis"
    ]
  },
  {
    icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z",
    title: "Focus Timer",
    description: "Built-in Pomodoro timer to maximize concentration on your one goal with proven time-management techniques.",
    benefits: [
      "25-minute focus sessions",
      "Automatic break reminders",
      "Session history tracking",
      "Customizable timer duration"
    ]
  },
  {
    icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
    title: "Coach PO",
    description: "Your AI-powered productivity coach providing personalized guidance, motivation, and accountability.",
    benefits: [
      "Personalized coaching insights",
      "Motivational check-ins",
      "Goal refinement suggestions",
      "Roast mode for tough love"
    ]
  },
  {
    icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
    title: "Smart Notifications",
    description: "Context-aware alerts that motivate without overwhelming, delivered at the perfect moment.",
    benefits: [
      "Intelligent timing based on activity",
      "Do Not Disturb integration",
      "Priority-based alerts",
      "Cross-platform sync"
    ]
  },
  {
    icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Mood Tracker",
    description: "Track how you feel as you work toward your goals and identify patterns in your emotional journey.",
    benefits: [
      "Quick daily mood logging",
      "Emotional pattern insights",
      "Correlation with productivity",
      "Mood-based recommendations"
    ]
  },
  {
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    title: "Accountability Partners",
    description: "Share progress with friends and stay motivated together through our private accountability groups.",
    benefits: [
      "Private group creation",
      "Shared progress updates",
      "Group challenges and rewards",
      "Peer support and encouragement"
    ]
  },
  {
    icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4",
    title: "Archive Revival",
    description: "Never lose track of incomplete goals. Revive and learn from archived goals to improve future success.",
    benefits: [
      "Goal history preservation",
      "One-click goal revival",
      "Learn from past attempts",
      "Success pattern analysis"
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
              Features Built for <span className="text-primary">Focus</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Everything you need to achieve your goals, nothing you don't. 
              Discover how One Goal helps you stay focused and productive.
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
              Ready to Focus on What Matters?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of achievers who've transformed their productivity with One Goal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link href="/signup">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
