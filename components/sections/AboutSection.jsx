import { Card } from "@/components/ui/card";
import Container from "@/components/ui/container";

const features = [
  {
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    title: "Crystal Clear Focus",
    description: "Eliminate decision fatigue. Know exactly what you need to work on every single day."
  },
  {
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Save Time Daily",
    description: "No more switching between tasks. Spend your energy on execution, not planning."
  },
  {
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    title: "Track Real Progress",
    description: "See measurable advancement toward your goals with intuitive progress tracking."
  },
  {
    icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Reduce Stress",
    description: "Feel the relief of focusing on one thing. No overwhelm, no guilt about unfinished tasks."
  },
  {
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    title: "Build Consistency",
    description: "Develop powerful habits through daily focus on your single most important goal."
  },
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Achieve More",
    description: "Accomplish what truly matters instead of staying busy with low-impact activities."
  }
];

export default function WhyChooseSection() {
  return (
    <section className="w-full py-12 md:py-16">
      <Container>
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Why Choose <span className="text-primary">One Goal</span>?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            A revolutionary approach to productivity that actually works
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 md:p-8 border-2 hover:border-primary/50 transition-colors">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
