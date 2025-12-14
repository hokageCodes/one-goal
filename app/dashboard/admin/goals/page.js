'use client';

import { useState, useEffect } from 'react';
import { API_URL } from '@/lib/api';
import { SkeletonList } from '@/components/Skeleton';

export default function GoalsOverview() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadGoals();
  }, [statusFilter]);

  const loadGoals = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);

      const response = await fetch(`${API_URL}/api/admin/goals?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setGoals(data.goals);
      }
    } catch (error) {
      console.error('Error loading goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      archived: 'bg-gray-100 text-gray-800',
    };
    return styles[status] || styles.active;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 bg-gray-200 rounded w-48 animate-pulse"></div>
        <SkeletonList />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Goals Overview</h1>
        <div className="text-gray-600">{goals.length} goals</div>
      </div>

      {/* Filter */}
      <div className="flex gap-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Goals List */}
      <div className="bg-white rounded-lg shadow">
        <div className="divide-y divide-gray-200">
          {goals.map((goal) => (
            <div key={goal._id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">{goal.title}</h3>
                  {goal.description && (
                    <p className="text-gray-600 text-sm mb-2">{goal.description}</p>
                  )}
                  <div className="text-sm text-gray-500">
                    by <span className="font-semibold">{goal.user?.name}</span> ({goal.user?.email})
                  </div>
                </div>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadge(goal.status)}`}>
                  {goal.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Deadline: </span>
                  <span className="font-semibold">
                    {new Date(goal.deadline).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Progress: </span>
                  <span className="font-semibold">{goal.progress}%</span>
                </div>
                <div>
                  <span className="text-gray-500">Created: </span>
                  <span className="font-semibold">
                    {new Date(goal.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-black h-2 rounded-full"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {goals.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No goals found
          </div>
        )}
      </div>
    </div>
  );
}
