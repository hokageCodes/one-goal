'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { API_URL } from '@/lib/api';
import { SkeletonCard, SkeletonText } from '@/components/Skeleton';

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
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <div className="h-10 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
          <div className="bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg p-8 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-32 ml-auto"></div>
          </div>
          <SkeletonCard />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Welcome Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600 text-lg">Track your progress and stay focused</p>
        </div>

        {/* Motivational Quote */}
        <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-lg p-8">
          <div className="text-2xl font-light italic mb-2">"{quote.text}"</div>
          <div className="text-right text-gray-300">— {quote.author}</div>
        </div>

        {activeGoal ? (
          <>
            {/* Active Goal Card */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Your Current Goal</h2>
                <span className="px-4 py-2 bg-green-100 text-green-800 font-semibold rounded-full">
                  Active
                </span>
              </div>
              
              <h3 className="text-3xl font-bold mb-4">{activeGoal.title}</h3>
              {activeGoal.description && (
                <p className="text-gray-600 text-lg mb-6">{activeGoal.description}</p>
              )}

              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 font-medium mb-1">Deadline</p>
                  <p className="text-xl font-bold">
                    {new Date(activeGoal.deadline).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 font-medium mb-1">Days Left</p>
                  <p className="text-xl font-bold">
                    {getDaysRemaining(activeGoal.deadline)} days
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 font-medium mb-1">Progress</p>
                  <p className="text-xl font-bold">{activeGoal.progress || 0}%</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-black h-3 rounded-full transition-all duration-300"
                    style={{ width: `${activeGoal.progress || 0}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => router.push('/dashboard/goal')}
                className="w-full px-6 py-3 border-2 border-black rounded-lg font-semibold hover:bg-gray-50"
              >
                Manage Goal
              </button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => router.push('/dashboard/progress')}
                className="bg-white rounded-lg shadow-lg p-8 text-left hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-bold mb-2">Daily Check-In</h3>
                <p className="text-gray-600">Log your progress and keep your streak alive</p>
              </button>

              <button
                onClick={() => router.push('/dashboard/goal')}
                className="bg-white rounded-lg shadow-lg p-8 text-left hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold mb-2">View Progress</h3>
                <p className="text-gray-600">See your check-in history and track trends</p>
              </button>
            </div>
          </>
        ) : (
          /* No Goal State */
          <div className="bg-white rounded-lg shadow-lg p-16 text-center">
            <div className="text-8xl mb-6">🎯</div>
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-gray-600 text-lg mb-8">
              Set your one goal and start making progress today.
            </p>
            <button
              onClick={() => router.push('/dashboard/goal')}
              className="px-8 py-4 bg-black text-white rounded-lg font-semibold text-lg hover:bg-gray-800"
            >
              Set Your Goal
            </button>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
