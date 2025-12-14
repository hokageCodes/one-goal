'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { API_URL } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const router = useRouter();
  const [activeGoal, setActiveGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quote] = useState({
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  });

  useEffect(() => {
    loadActiveGoal();
  }, []);

  const loadActiveGoal = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/goals/active`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setActiveGoal(data.goal);
      }
    } catch (error) {
      console.error('Error loading goal:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysRemaining = (deadline) => {
    const now = new Date();
    const end = new Date(deadline);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="space-y-4">
          <div className="h-10 bg-muted animate-pulse rounded-md w-48"></div>
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="h-4 bg-muted animate-pulse rounded"></div>
              <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
            </CardContent>
          </Card>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-display-md font-bold text-foreground">Dashboard</h1>
          <p className="text-body-md text-muted-foreground">Track your progress and stay focused</p>
        </div>

        {/* Motivational Quote */}
        <Card className="bg-primary text-primary-foreground border-0">
          <CardContent className="p-4">
            <blockquote className="space-y-2">
              <p className="text-body-lg italic">"{quote.text}"</p>
              <footer className="text-body-sm text-right opacity-90">— {quote.author}</footer>
            </blockquote>
          </CardContent>
        </Card>

        {activeGoal ? (
          <>
            {/* Active Goal Card */}
            <Card>
              <CardHeader className="p-4 pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <CardDescription className="text-body-xs uppercase font-semibold tracking-wide">Current Goal</CardDescription>
                    <CardTitle className="text-heading-xl">{activeGoal.title}</CardTitle>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-body-xs font-semibold">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    Active
                  </span>
                </div>
                {activeGoal.description && (
                  <CardDescription className="text-body-sm mt-2">{activeGoal.description}</CardDescription>
                )}
              </CardHeader>

              <CardContent className="p-4 pt-0 space-y-4">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Card className="bg-secondary">
                    <CardContent className="p-3 space-y-1">
                      <p className="text-body-xs font-semibold text-muted-foreground uppercase tracking-wide">Deadline</p>
                      <p className="text-heading-md font-bold">
                        {new Date(activeGoal.deadline).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary">
                    <CardContent className="p-3 space-y-1">
                      <p className="text-body-xs font-semibold text-muted-foreground uppercase tracking-wide">Days Left</p>
                      <p className="text-heading-md font-bold">{getDaysRemaining(activeGoal.deadline)} days</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-secondary">
                    <CardContent className="p-3 space-y-1">
                      <p className="text-body-xs font-semibold text-muted-foreground uppercase tracking-wide">Progress</p>
                      <p className="text-heading-md font-bold">{activeGoal.progress || 0}%</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-body-sm font-semibold text-muted-foreground">Overall Progress</p>
                    <p className="text-body-sm font-bold">{activeGoal.progress || 0}%</p>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${activeGoal.progress || 0}%` }}
                    />
                  </div>
                </div>

                <Button
                  onClick={() => router.push('/dashboard/goal')}
                  className="w-full"
                >
                  Manage Goal
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Card
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => router.push('/dashboard/progress')}
              >
                <CardContent className="p-4 space-y-2">
                  <div className="text-2xl">✓</div>
                  <CardTitle className="text-heading-md">Daily Check-In</CardTitle>
                  <CardDescription className="text-body-sm">Log your progress and keep your streak alive</CardDescription>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => router.push('/dashboard/progress')}
              >
                <CardContent className="p-4 space-y-2">
                  <div className="text-2xl">📊</div>
                  <CardTitle className="text-heading-md">View Progress</CardTitle>
                  <CardDescription className="text-body-sm">See your check-in history and track trends</CardDescription>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          /* No Goal State */
          <Card>
            <CardContent className="p-8 text-center space-y-4">
              <div className="text-6xl">🎯</div>
              <div className="space-y-2">
                <CardTitle className="text-heading-xl">Ready to get started?</CardTitle>
                <CardDescription className="text-body-md">Set your one goal and start making progress today.</CardDescription>
              </div>
              <Button
                onClick={() => router.push('/dashboard/goal')}
                size="lg"
              >
                Set Your Goal
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </ProtectedRoute>
  );
}
