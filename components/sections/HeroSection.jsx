import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Link from "next/link";

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "95%", label: "Goal Completion" },
  { value: "4.9★", label: "User Rating" }
];

export default function HeroSection() {
  return (
    <section className="relative w-full py-12 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10 -z-10" />
    
      <Container>
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
            Achieve Your{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              One Goal
            </span>{" "}
            That Matters Most
          </h1>
          
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Stop juggling endless tasks. Focus your energy on the single most important goal 
            and watch your productivity soar. Simple, focused, effective.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
            <Button size="lg" className="text-base px-8 py-6 h-auto" asChild>
              <Link href="/get-started">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 py-6 h-auto" asChild>
              <Link href="/learn-more">Learn More</Link>
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-8 md:gap-12 items-center justify-center pt-8 text-sm">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</span>
                <span className="text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
