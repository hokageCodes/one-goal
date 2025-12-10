"use client"

import { useState } from "react";
import Container from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Heart, MessageCircle, Target } from "lucide-react";

const sampleGoals = [
  {
    user: "Alex K.",
    avatar: "AK",
    goal: "Finish first draft of novel",
    timeframe: "Monthly",
    progress: 78,
    reactions: 24,
    comments: 5,
    anonymous: false
  },
  {
    user: "Anonymous",
    avatar: "?",
    goal: "Launch side project MVP",
    timeframe: "Weekly",
    progress: 92,
    reactions: 18,
    comments: 3,
    anonymous: true
  },
  {
    user: "Maya S.",
    avatar: "MS",
    goal: "Run 5K without stopping",
    timeframe: "Daily",
    progress: 100,
    reactions: 47,
    comments: 12,
    anonymous: false
  }
];

export default function ShareFeedSection() {
  const [activeGoal, setActiveGoal] = useState(0);

  return (
    <section className="w-full py-12 md:py-16 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <Container className="relative">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 lg:order-2">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              🔥 Community Accountability
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Public Wins.<br />
              <span className="text-muted-foreground">Public Accountability.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Share your goal publicly and watch what happens. Turns out, people care. 
              And that caring pushes you to actually finish what you started.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Post Publicly or Anonymously</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose your comfort level. Either way, the accountability works.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">React & Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Quick reactions and light comments. No overthinking, just support.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Get Nudged Forward</h3>
                  <p className="text-sm text-muted-foreground">
                    See others crushing goals. Get inspired. Get called out if you stall.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:order-1">
            {sampleGoals.map((goal, index) => (
              <Card
                key={index}
                onClick={() => setActiveGoal(index)}
                className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  activeGoal === index 
                    ? "border-primary ring-2 ring-primary/20" 
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                      goal.anonymous ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
                    }`}>
                      {goal.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{goal.user}</h4>
                      <p className="text-xs text-muted-foreground">{goal.timeframe} Goal</p>
                    </div>
                  </div>
                  {goal.progress === 100 && (
                    <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-semibold">
                      ✓ Done
                    </span>
                  )}
                </div>
                
                <p className="font-medium mb-3">{goal.goal}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-blue-600 transition-all duration-500"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Heart className="w-4 h-4" />
                    {goal.reactions}
                  </button>
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    {goal.comments}
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
