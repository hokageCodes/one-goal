'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function GoalPage() {
  const [activeGoal, setActiveGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [completing, setCompleting] = useState(false);

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
    if (!window.confirm('Are you sure you want to mark this goal as complete? This action cannot be undone.')) {
      return;
    }

    setCompleting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/goals/${activeGoal._id}/complete`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to complete goal');
      }

      toast.success('🎉 Goal completed! Congratulations on your achievement!');
      await loadActiveGoal();
    } catch (error) {
      toast.error(error.message || 'Failed to complete goal');
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-10 bg-muted rounded-md w-48 animate-pulse"></div>
          <div className="h-10 bg-muted rounded-md w-32 animate-pulse"></div>
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

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-heading-2xl font-bold text-foreground">My Goal</h1>
          <p className="text-body-md text-muted-foreground">Focus on what matters most</p>
        </div>
        {!activeGoal && !showForm && (
          <Button onClick={() => setShowForm(true)}>
            + Set Goal
          </Button>
        )}
      </div>

      {/* Create Form */}
      {showForm && (
        <Card>
          <CardHeader className="p-4 pb-3">
            <CardTitle className="text-heading-xl">Set Your One Goal</CardTitle>
            <CardDescription className="text-body-sm">
              Choose one meaningful goal to focus on
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-body-sm font-medium text-foreground">
                  Goal Title
                </label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-body-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="What do you want to achieve?"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-body-sm font-medium text-foreground">
                  Description (Optional)
                </label>
                <textarea
                  maxLength={500}
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-body-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                  placeholder="Describe your goal..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-body-sm font-medium text-foreground">
                  Deadline
                </label>
                <input
                  type="date"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-body-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1"
                >
                  {submitting ? 'Creating...' : 'Create Goal'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Active Goal Display */}
      {activeGoal && (
        <Card>
          <CardHeader className="p-4 pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-1">
                <CardTitle className="text-heading-xl">{activeGoal.title}</CardTitle>
                {activeGoal.description && (
                  <CardDescription className="text-body-sm mt-2">
                    {activeGoal.description}
                  </CardDescription>
                )}
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-body-xs font-semibold">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Active
              </span>
            </div>
          </CardHeader>

          <CardContent className="p-4 pt-0 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Card className="bg-secondary">
                <CardContent className="p-3 space-y-1">
                  <p className="text-body-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Deadline
                  </p>
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
                  <p className="text-body-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Progress
                  </p>
                  <p className="text-heading-md font-bold">
                    {activeGoal.progress || 0}%
                  </p>
                </CardContent>
              </Card>
            </div>

            <Button
              onClick={handleComplete}
              disabled={completing}
              className="w-full"
              variant="default"
            >
              {completing ? 'Completing...' : '✓ Mark as Complete'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* No Goal State */}
      {!activeGoal && !showForm && (
        <Card>
          <CardContent className="p-8 text-center space-y-4">
            <div className="text-6xl">🎯</div>
            <div className="space-y-2">
              <CardTitle className="text-heading-xl">No Active Goal</CardTitle>
              <CardDescription className="text-body-md">
                Set your one goal and start making progress today.
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
