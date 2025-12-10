import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Target, Heart, Users, Zap } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Laser Focus",
    description: "We believe in the power of singular focus. One goal at a time leads to extraordinary results."
  },
  {
    icon: Heart,
    title: "Simplicity First",
    description: "Less is more. We strip away complexity to help you concentrate on what truly matters."
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Your feedback shapes our product. We build features that real users actually need."
  },
  {
    icon: Zap,
    title: "Action Oriented",
    description: "Planning is good, but doing is better. We help you take consistent action every single day."
  }
];

const team = [
  {
    name: "Sarah Chen",
    role: "Founder & CEO",
    bio: "Former productivity coach who got tired of overcomplicated goal-tracking apps."
  },
  {
    name: "Marcus Thompson",
    role: "Head of Product",
    bio: "Believes the best software is invisible. Obsessed with user experience and simplicity."
  },
  {
    name: "Aisha Patel",
    role: "Lead Engineer",
    bio: "Builds fast, focused tools. Hates bloat in code and in life."
  }
];

const stats = [
  { value: "50k+", label: "Active Users" },
  { value: "100k+", label: "Goals Achieved" },
  { value: "4.9/5", label: "User Rating" },
  { value: "2023", label: "Founded" }
];

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background -z-10" />
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              We're Not Another{" "}
              <span className="text-primary">Productivity App.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              We're a philosophy shift. Most apps drown you in features and tabs. We force clarity: 
              One goal. One timeframe. Zero bullshit.
            </p>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="w-full pb-12 md:pb-16">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Story Section */}
      <section className="w-full py-12 md:py-16 bg-secondary/20">
        <Container>
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                One Goal was born from rage. We watched people (ourselves included) drown in Notion boards, 
                Todoist lists, and ClickUp chaos. Hundreds of features. Zero results. Just tab-hopping and guilt.
              </p>
              <p>
                Then we had a revelation: <strong className="text-foreground">The problem isn't execution—it's decision paralysis</strong>. 
                When everything is important, nothing is. You don't need more tools. You need constraints.
              </p>
              <p>
                So we built One Goal with a single rule: Pick one thing per timeframe and finish it. No feature bloat. 
                No endless lists. Just clarity, discipline, and a Coach who won't let you bullshit yourself. 
                Turns out, people finish things when they stop juggling everything.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="w-full py-12 md:py-16">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-center">
            What We Believe
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-xl border bg-background hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="w-full py-12 md:py-16 bg-secondary/20">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-center">
            Meet the Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 mx-auto flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-sm text-primary mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Ready to Focus on What Matters?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands who've discovered the power of one goal at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/signup">Start Free Today</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/features">Explore Features</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
