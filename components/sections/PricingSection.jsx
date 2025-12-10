import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "Set one goal",
      "Daily reminder",
      "Mood tracker",
      "Coach PO basic responses"
    ],
    cta: "Get Started",
    href: "/signup",
    popular: false
  },
  {
    name: "Pro",
    price: "4.99",
    period: "month",
    description: "For serious achievers",
    features: [
      "Unlimited goals per month",
      "Deeper Coach PO coaching flows",
      "Advanced analytics & tracking",
      "Archive revival",
      "Custom reminder tone"
    ],
    cta: "Start Pro Trial",
    href: "/signup?plan=pro",
    popular: true
  },
  {
    name: "Focus+",
    price: "12.99",
    period: "month",
    description: "Ultimate productivity powerhouse",
    features: [
      "All Pro features",
      "Private accountability group",
      "Early access to templates & themes",
      "Beta access to Team Mode"
    ],
    cta: "Go Premium",
    href: "/signup?plan=focus",
    popular: false
  }
];

export default function PricingSection() {
  return (
    <section className="w-full py-12 md:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <Container className="relative">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Choose Your Focus Level
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade when you're ready to unlock your full potential
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border-2 p-8 transition-all duration-300 ${
                plan.popular
                  ? "border-primary bg-primary/5 shadow-xl scale-105 md:scale-110"
                  : "border-border bg-background hover:border-primary/50 hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl md:text-5xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
                size="lg"
                asChild
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            All plans include a 14-day money-back guarantee. No questions asked.
          </p>
        </div>
      </Container>
    </section>
  );
}
