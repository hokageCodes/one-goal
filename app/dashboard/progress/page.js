'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '@/lib/api';
import { SkeletonStats, SkeletonCard, SkeletonList } from '@/components/Skeleton';

export default function ProgressPage() {
  const [activeGoal, setActiveGoal] = useState(null);
  const [todayCheckIn, setTodayCheckIn] = useState(null);
  const [checkIns, setCheckIns] = useState([]);
  const [streak, setStreak] = useState(0);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  
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
      const [goalRes, todayRes, streakRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/api/goals/active`, { headers }),
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
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <div className="h-10 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-96 animate-pulse"></div>
        </div>
        <SkeletonStats />
        <SkeletonCard />
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
          <SkeletonList />
        </div>
      </div>
    );
  }

  if (!activeGoal) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-16 text-center">
          <div className="text-8xl mb-6">🎯</div>
          <h2 className="text-3xl font-bold mb-4">No Active Goal</h2>
          <p className="text-gray-600 text-lg">
            Set a goal first to start tracking your progress.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Progress Tracking</h1>
        <p className="text-gray-600 text-lg">Track your daily progress on: <span className="font-semibold">{activeGoal.title}</span></p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Streak */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-lg shadow-lg p-6">
          <div className="text-5xl mb-2">🔥</div>
          <div className="text-4xl font-bold mb-1">{streak}</div>
          <div className="text-orange-100">Day Streak</div>
        </div>

        {/* Total Check-ins */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-lg shadow-lg p-6">
          <div className="text-5xl mb-2">✓</div>
          <div className="text-4xl font-bold mb-1">{stats?.totalCheckIns || 0}</div>
          <div className="text-blue-100">Total Check-ins</div>
        </div>

        {/* Average Progress */}
        <div className="bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-lg shadow-lg p-6">
          <div className="text-5xl mb-2">📈</div>
          <div className="text-4xl font-bold mb-1">{stats?.avgProgress || 0}%</div>
          <div className="text-green-100">Avg Progress</div>
        </div>
      </div>

      {/* Daily Check-in Form */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Today's Check-In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Progress Slider */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Progress: {progress}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Mood Selection */}
          <div>
            <label className="block text-sm font-semibold mb-3">How are you feeling?</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(moodEmojis).map(([moodValue, emoji]) => (
                <button
                  key={moodValue}
                  type="button"
                  onClick={() => setMood(moodValue)}
                  className={`p-4 border-2 rounded-lg text-center transition-all touch-manipulation ${
                    mood === moodValue
                      ? 'border-black bg-gray-50 scale-105'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-3xl mb-1">{emoji}</div>
                  <div className="text-xs font-medium capitalize">{moodValue}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-semibold mb-2">Notes (Optional)</label>
            <textarea
              rows={3}
              maxLength={500}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              placeholder="What did you accomplish today? Any challenges?"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full px-6 py-4 bg-black text-white rounded-lg font-semibold text-lg hover:bg-gray-800 disabled:bg-gray-400"
          >
            {submitting ? 'Saving...' : todayCheckIn ? 'Update Check-In' : 'Save Check-In'}
          </button>
        </form>
      </div>

      {/* Check-in History */}
      {checkIns.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Check-In History</h2>
          <div className="space-y-4">
            {checkIns.map((checkIn) => (
              <div
                key={checkIn._id}
                className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                {/* Date */}
                <div className="flex-shrink-0 text-center">
                  <div className="text-2xl font-bold">
                    {new Date(checkIn.date).getDate()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(checkIn.date).toLocaleDateString('en-US', { month: 'short' })}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-lg font-bold">{checkIn.progress}%</div>
                    {checkIn.mood && (
                      <span className="text-2xl">{moodEmojis[checkIn.mood]}</span>
                    )}
                  </div>
                  {checkIn.note && (
                    <p className="text-gray-600 text-sm">{checkIn.note}</p>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="flex-shrink-0 w-32">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-black h-2 rounded-full"
                      style={{ width: `${checkIn.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
