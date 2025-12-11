'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '@/lib/api';
import { SkeletonCard } from '@/components/Skeleton';

export default function GoalPage() {
  const [activeGoal, setActiveGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/goals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, description, deadline })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create goal');
      }

      toast.success('Goal created! 🎯');
      setTitle('');
      setDescription('');
      setDeadline('');
      setShowForm(false);
      loadActiveGoal();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleComplete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/goals/${activeGoal._id}/complete`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to complete goal');

      toast.success('Goal completed! 🎉');
      loadActiveGoal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-10 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Goal</h1>
        {!activeGoal && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800"
          >
            + Set Goal
          </button>
        )}
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Set Your One Goal</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Goal Title</label>
              <input
                type="text"
                required
                maxLength={100}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                placeholder="What do you want to achieve?"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Description (Optional)</label>
              <textarea
                maxLength={500}
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                placeholder="Describe your goal..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Deadline</label>
              <input
                type="date"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400"
              >
                {submitting ? 'Creating...' : 'Create Goal'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Active Goal Display */}
      {activeGoal && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-3">{activeGoal.title}</h2>
              {activeGoal.description && (
                <p className="text-gray-600 text-lg">{activeGoal.description}</p>
              )}
            </div>
            <span className="px-4 py-2 bg-green-100 text-green-800 font-semibold rounded-full">
              Active
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 font-medium">Deadline</p>
              <p className="text-xl font-bold mt-1">
                {new Date(activeGoal.deadline).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 font-medium">Progress</p>
              <p className="text-xl font-bold mt-1">{activeGoal.progress || 0}%</p>
            </div>
          </div>

          <button
            onClick={handleComplete}
            className="w-full px-6 py-4 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700"
          >
            ✓ Mark as Complete
          </button>
        </div>
      )}

      {/* No Goal State */}
      {!activeGoal && !showForm && (
        <div className="bg-white rounded-lg shadow-lg p-16 text-center">
          <div className="text-8xl mb-6">🎯</div>
          <h2 className="text-3xl font-bold mb-3">No Active Goal</h2>
          <p className="text-gray-600 text-lg">
            Set your one goal and start making progress today.
          </p>
        </div>
      )}
    </div>
  );
}
