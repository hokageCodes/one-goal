"use client"

import { useState } from "react";
import Container from "@/components/ui/container";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Why only ONE goal? That seems limiting.",
    answer: "That's the point. Limiting is liberating. Free plan: one goal total. Pro plan: one goal per timeframe (daily, weekly, monthly)—so you can have three active goals simultaneously. The constraint kills decision paralysis and forces you to pick what actually matters."
  },
  {
    question: "What are timeframes and how do they work?",
    answer: "Daily goal: complete today. Weekly goal: done by Sunday. Monthly goal: finish by the 30th. Free users pick ONE timeframe and get one goal. Pro users can run all three simultaneously—but still just one per timeframe. No endless lists allowed."
  },
  {
    question: "What's this 'Coach PO roast mode' everyone talks about?",
    answer: "Coach PO has two modes: encouraging (default) and roast mode (Pro tier). Roast mode doesn't coddle you. If you're procrastinating, it calls you out. Some people need hugs, others need honesty. We give you both options."
  },
  {
    question: "Can I change my goal mid-timeframe?",
    answer: "Yes, but we'll ask you why. Changing goals constantly defeats the purpose. If you realize you picked wrong, fine—switch it. But if you're just scared of commitment, Coach PO will notice."
  },
  {
    question: "What happens to goals I don't finish?",
    answer: "They're archived, not deleted. Pro users can revive them later and see patterns in what stalled them. Failure data is useful—it shows you where you bullshit yourself the most."
  },
  {
    question: "Is there a refund policy?",
    answer: "14-day money-back guarantee. No games, no questions. If you don't finish more goals with One Goal than without it, get your money back."
  }
];

function FAQItem({ faq, isOpen, onClick }) {
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={onClick}
        className="w-full py-5 flex items-start justify-between gap-4 text-left hover:text-primary transition-colors"
      >
        <span className="font-semibold text-base md:text-lg pr-4">{faq.question}</span>
        <ChevronDown 
          className={`w-5 h-5 flex-shrink-0 mt-1 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-muted-foreground leading-relaxed pr-8">{faq.answer}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="w-full py-12 md:py-16">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Questions? Answers.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              No fluff. Just what you actually want to know.
            </p>
          </div>

          <div className="bg-card rounded-2xl border p-6 md:p-8">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-2">Still have questions?</p>
            <a href="mailto:support@onegoal.com" className="text-primary hover:underline font-medium">
              Contact our support team
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
