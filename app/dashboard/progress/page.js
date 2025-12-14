'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ProgressPage() {
  const [activeGoal, setActiveGoal] = useState(null);
  const [todayCheckIn, setTodayCheckIn] = useState(null);
  const [checkIns, setCheckIns] = useState([]);
  const [completedGoals, setCompletedGoals] = useState([]);
  const [streak, setStreak] = useState(0);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  
  // Form state
  const [progress, setProgress] = useState(0);
  const [note, setNote] = useState('');
  const [mood, setMood] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };

      // Load all data in parallel
      const [goalRes, allGoalsRes, todayRes, streakRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/api/goals/active`, { headers }),
        fetch(`${API_URL}/api/goals`, { headers }),
        fetch(`${API_URL}/api/checkins/today`, { headers }),
        fetch(`${API_URL}/api/checkins/streak`, { headers }),
        fetch(`${API_URL}/api/checkins/stats`, { headers }),
      ]);

      if (goalRes.ok) {
        const goalData = await goalRes.json();
        setActiveGoal(goalData.goal);

        // Load check-ins for this goal
        if (goalData.goal) {
          const checkInsRes = await fetch(`${API_URL}/api/checkins/${goalData.goal._id}`, { headers });
          if (checkInsRes.ok) {
            const checkInsData = await checkInsRes.json();
            setCheckIns(checkInsData.checkIns || []);
          }
        }
      }

      if (allGoalsRes.ok) {
        const allGoalsData = await allGoalsRes.json();
        const completed = allGoalsData.goals?.filter(g => g.status === 'completed') || [];
        setCompletedGoals(completed);
      }

      if (todayRes.ok) {
        const todayData = await todayRes.json();
        if (todayData.checkIn) {
          setTodayCheckIn(todayData.checkIn);
          setProgress(todayData.checkIn.progress);
          setNote(todayData.checkIn.note || '');
          setMood(todayData.checkIn.mood || '');
        }
      }

      if (streakRes.ok) {
        const streakData = await streakRes.json();
        setStreak(streakData.streak);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!activeGoal) {
      toast.error('No active goal found');
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/checkins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          goalId: activeGoal._id,
          progress: parseInt(progress),
          note,
          mood: mood || undefined
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to save check-in');
      }

      toast.success('Progress updated! 🎉');
      loadData(); // Reload all data
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const moodEmojis = {
    great: '😄',
    good: '🙂',
    okay: '😐',
    struggling: '😔'
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-muted rounded-md w-64 mb-2 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Card><CardContent className="p-4 h-24 bg-muted animate-pulse"></CardContent></Card>
          <Card><CardContent className="p-4 h-24 bg-muted animate-pulse"></CardContent></Card>
          <Card><CardContent className="p-4 h-24 bg-muted animate-pulse"></CardContent></Card>
        </div>
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="h-4 bg-muted animate-pulse rounded"></div>
            <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!activeGoal) {
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-heading-2xl font-bold text-foreground">Progress Tracking</h1>
          <p className="text-body-md text-muted-foreground">Track your daily progress</p>
        </div>
        <Card>
          <CardContent className="p-8 text-center space-y-4">
            <div className="text-6xl">🎯</div>
            <div className="space-y-2">
              <CardTitle className="text-heading-xl">No Active Goal</CardTitle>
              <CardDescription className="text-body-md">
                Set a goal first to start tracking your progress.
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-heading-2xl font-bold text-foreground">Progress Tracking</h1>
          <p className="text-body-md text-muted-foreground">
            {activeGoal.title}
          </p>
        </div>
        {completedGoals.length > 0 && (
          <Button variant="outline" onClick={() => setShowHistory(!showHistory)}>
            {showHistory ? 'Hide' : 'Show'} History
          </Button>
        )}
      </div>

      {/* Completed Goals History */}
      {showHistory && completedGoals.length > 0 && (
        <Card>
          <CardHeader className="p-4 pb-3">
            <CardTitle className="text-heading-lg">Completed Goals</CardTitle>
            <CardDescription className="text-body-sm">
              Your achievements and milestones
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-3">
            {completedGoals.map((goal) => (
              <Card key={goal._id} className="bg-secondary">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="text-body-md font-semibold text-foreground">{goal.title}</h3>
                      {goal.description && (
                        <p className="text-body-sm text-muted-foreground mt-1">{goal.description}</p>
                      )}
                      <div className="flex items-center gap-3 mt-2 text-body-xs text-muted-foreground">
                        <span>Completed: {new Date(goal.completedAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{goal.progress}% Progress</span>
                      </div>
                    </div>
                    <span className="text-2xl">🎉</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0">
          <CardContent className="p-4">
            <div className="text-4xl mb-2">🔥</div>
            <div className="text-display-sm font-bold mb-1">{streak}</div>
            <div className="text-body-sm opacity-90">Day Streak</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white border-0">
          <CardContent className="p-4">
            <div className="text-4xl mb-2">✓</div>
            <div className="text-display-sm font-bold mb-1">{stats?.totalCheckIns || 0}</div>
            <div className="text-body-sm opacity-90">Total Check-ins</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-teal-500 text-white border-0">
          <CardContent className="p-4">
            <div className="text-4xl mb-2">📈</div>
            <div className="text-display-sm font-bold mb-1">{stats?.avgProgress || 0}%</div>
            <div className="text-body-sm opacity-90">Avg Progress</div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Check-in Form */}
      <Card>
        <CardHeader className="p-4 pb-3">
          <CardTitle className="text-heading-lg">Today's Check-In</CardTitle>
          <CardDescription className="text-body-sm">
            Log your daily progress and keep your streak alive
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Progress Slider */}
            <div className="space-y-2">
              <label className="block text-body-sm font-medium text-foreground">
                Progress: {progress}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-body-xs text-muted-foreground">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Mood Selection */}
            <div className="space-y-2">
              <label className="block text-body-sm font-medium text-foreground">
                How are you feeling?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(moodEmojis).map(([moodValue, emoji]) => (
                  <button
                    key={moodValue}
                    type="button"
                    onClick={() => setMood(moodValue)}
                    className={`p-3 border rounded-md text-center transition-all ${
                      mood === moodValue
                        ? 'border-primary bg-primary/10 scale-105'
                        : 'border-input hover:border-primary/50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{emoji}</div>
                    <div className="text-body-xs font-medium capitalize">{moodValue}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="space-y-2">
              <label className="block text-body-sm font-medium text-foreground">
                Notes (Optional)
              </label>
              <textarea
                rows={3}
                maxLength={500}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-body-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                placeholder="What did you accomplish today? Any challenges?"
              />
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full"
            >
              {submitting ? 'Saving...' : todayCheckIn ? 'Update Check-In' : 'Save Check-In'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Check-in History */}
      {checkIns.length > 0 && (
        <Card>
          <CardHeader className="p-4 pb-3">
            <CardTitle className="text-heading-lg">Check-In History</CardTitle>
            <CardDescription className="text-body-sm">
              Your progress over time
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-3">
            {checkIns.map((checkIn) => (
              <Card key={checkIn._id} className="bg-secondary hover:bg-accent transition-colors">
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    {/* Date */}
                    <div className="flex-shrink-0 text-center min-w-[3rem]">
                      <div className="text-heading-md font-bold">
                        {new Date(checkIn.date).getDate()}
                      </div>
                      <div className="text-body-xs text-muted-foreground">
                        {new Date(checkIn.date).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-body-md font-bold">{checkIn.progress}%</div>
                        {checkIn.mood && (
                          <span className="text-xl">{moodEmojis[checkIn.mood]}</span>
                        )}
                      </div>
                      {checkIn.note && (
                        <p className="text-body-sm text-muted-foreground">{checkIn.note}</p>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="flex-shrink-0 w-24 sm:w-32">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${checkIn.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
