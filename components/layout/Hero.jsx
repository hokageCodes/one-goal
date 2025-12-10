import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10 -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          {/* Badge/Announcement */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary border border-border">
            <span className="text-xs md:text-sm font-medium text-muted-foreground">
              ✨ Focus on What Truly Matters
            </span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
            Achieve Your{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              One Goal
            </span>{" "}
            That Matters Most
          </h1>
          
          {/* Subheading */}
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Stop juggling endless tasks. Focus your energy on the single most important goal 
            and watch your productivity soar. Simple, focused, effective.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
            <Button size="lg" className="text-base px-8 py-6 h-auto" asChild>
              <Link href="/get-started">
                Get Started Free
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-base px-8 py-6 h-auto"
              asChild
            >
              <Link href="/learn-more">
                Learn More
              </Link>
            </Button>
          </div>
          
          {/* Social Proof / Stats */}
          <div className="flex flex-wrap gap-8 md:gap-12 items-center justify-center pt-8 text-sm">
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-foreground">10K+</span>
              <span className="text-muted-foreground">Active Users</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-foreground">95%</span>
              <span className="text-muted-foreground">Goal Completion</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-foreground">4.9★</span>
              <span className="text-muted-foreground">User Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
