import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      { text: "Set one goal", included: true },
      { text: "Daily reminder", included: true },
      { text: "Mood tracker", included: true },
      { text: "Coach PO basic responses", included: true },
      { text: "Unlimited goals per month", included: false },
      { text: "Advanced analytics", included: false },
      { text: "Archive revival", included: false },
      { text: "Custom reminder tone", included: false },
      { text: "Private accountability group", included: false }
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
      { text: "Everything in Free", included: true },
      { text: "Unlimited goals per month", included: true },
      { text: "Deeper Coach PO coaching flows", included: true },
      { text: "Advanced analytics & tracking", included: true },
      { text: "Archive revival", included: true },
      { text: "Custom reminder tone", included: true },
      { text: "Private accountability group", included: false },
      { text: "Early access to features", included: false },
      { text: "Beta access to Team Mode", included: false }
    ],
    cta: "Start Pro Trial",
    href: "/signup?plan=pro",
    popular: true
  },
  {
    name: "Focus+",
    price: "12.99",
    period: "month",
    description: "Maximum discipline. Zero excuses.",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Private accountability group", included: true },
      { text: "Early access to new features", included: true },
      { text: "Beta access to Team Mode", included: true },
      { text: "Priority support", included: true }
    ],
    cta: "Go All In",
    href: "/signup?plan=focus",
    popular: false
  }
];

const faqs = [
  {
    question: "Can I switch plans anytime?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and Apple Pay for your convenience."
  },
  {
    question: "Is there a free trial for paid plans?",
    answer: "Yes, Pro and Focus+ plans come with a 14-day free trial. No credit card required to start."
  },
  {
    question: "What's your refund policy?",
    answer: "We offer a 14-day money-back guarantee on all paid plans. No questions asked."
  }
];

export default function PricingPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background -z-10" />
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Pick Your <span className="text-primary">Discipline Level</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Start free. Upgrade when you're serious. Cancel if you're not. No games.
            </p>
          </div>
        </Container>
      </section>

      {/* Pricing Cards */}
      <section className="w-full pb-12 md:pb-16">
        <Container>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl border-2 p-8 transition-all ${
                  plan.popular
                    ? "border-primary bg-primary/5 shadow-xl md:scale-105"
                    : "border-border bg-background hover:border-primary/50 hover:shadow-lg"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground/40 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={`text-sm ${!feature.included && "text-muted-foreground/60"}`}>
                        {feature.text}
                      </span>
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
              All plans include a 14-day money-back guarantee • Cancel anytime
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-16 bg-secondary/20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-center">
              Pricing Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-background rounded-xl border p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Ready to Achieve Your Goals?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands who've transformed their productivity with One Goal.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">Start Free Today</Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
