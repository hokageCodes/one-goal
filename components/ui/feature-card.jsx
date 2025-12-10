import { Card } from "@/components/ui/card";

export default function FeatureCard({ feature }) {
  return (
    <Card className="p-8 hover:shadow-lg transition-shadow">
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
        </svg>
      </div>
      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
      <p className="text-muted-foreground mb-6 leading-relaxed">{feature.description}</p>
      <ul className="space-y-2">
        {feature.benefits.map((benefit, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
