"use client"

import { useState } from "react";
import Container from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Product Designer",
    avatar: "SM",
    rating: 5,
    text: "One Goal completely changed how I approach my work. I went from feeling overwhelmed by endless tasks to actually finishing what matters. My productivity has never been higher."
  },
  {
    name: "Marcus Chen",
    role: "Startup Founder",
    avatar: "MC",
    rating: 5,
    text: "As a founder, I'm pulled in a million directions. One Goal forces me to prioritize ruthlessly. It's uncomfortable at first, but the results speak for themselves."
  },
  {
    name: "Emily Rodriguez",
    role: "Content Creator",
    avatar: "ER",
    rating: 5,
    text: "The Coach PO feature is like having a personal accountability partner. The roast mode keeps me honest and motivated. I've completed more goals in 3 months than I did all last year."
  }
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full py-12 md:py-16 relative overflow-hidden bg-secondary/20">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      
      <Container className="relative">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-primary text-primary" />
            ))}
            <span className="ml-2 text-sm font-semibold">4.9/5 from 1,200+ users</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Loved by Achievers Worldwide
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from people who transformed their productivity with One Goal
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="p-8 md:p-12 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden">
            <Quote className="absolute top-6 right-6 w-16 h-16 text-primary/10" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                  {testimonials[activeIndex].avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{testimonials[activeIndex].name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonials[activeIndex].role}</p>
                </div>
              </div>
              <p className="text-lg md:text-xl leading-relaxed mb-4">
                "{testimonials[activeIndex].text}"
              </p>
              <div className="flex items-center gap-1">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                activeIndex === index 
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground truncate">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                {testimonial.text}
              </p>
              <div className="flex items-center gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
