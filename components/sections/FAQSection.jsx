"use client"

import { useState } from "react";
import Container from "@/components/ui/container";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How is One Goal different from other task managers?",
    answer: "Unlike traditional task managers that overwhelm you with endless lists, One Goal helps you focus on just one primary goal at a time. This singular focus eliminates decision fatigue and maximizes your productivity."
  },
  {
    question: "Can I really only set one goal?",
    answer: "On the Free plan, yes—one goal at a time. Pro users can set unlimited goals per month, but you still focus on one goal per timeframe. This intentional constraint is what makes One Goal so effective."
  },
  {
    question: "What is Coach PO?",
    answer: "Coach PO is your AI-powered productivity coach. It provides personalized guidance, motivation, and accountability to help you stay on track. Pro users get access to deeper coaching flows with more advanced insights."
  },
  {
    question: "How do reminders work?",
    answer: "We send smart, context-aware daily reminders to keep your goal top of mind. Pro users can customize their reminder tone—choose between encouraging support or playful roasting to match your motivation style."
  },
  {
    question: "What happens if I don't complete my goal?",
    answer: "Goals aren't deleted—they're archived. Pro users can revive archived goals with our Archive Revival feature, learning from past attempts to improve future success."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Absolutely! All paid plans can be canceled anytime with no questions asked. We also offer a 14-day money-back guarantee if you're not satisfied."
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
              Frequently Asked Questions
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Everything you need to know about One Goal
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
