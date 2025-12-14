'use client';

import { useState, useEffect } from 'react';
import { API_URL } from '@/lib/api';
import { SkeletonStats, SkeletonCard } from '@/components/Skeleton';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/admin/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 bg-gray-200 rounded w-64 animate-pulse"></div>
        <SkeletonStats />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* User Stats */}
      <div>
        <h2 className="text-xl font-bold mb-4">User Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-4xl mb-2">👥</div>
            <div className="text-3xl font-bold mb-1">{stats?.totalUsers || 0}</div>
            <div className="text-gray-600 text-sm">Total Users</div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-4xl mb-2">👤</div>
            <div className="text-3xl font-bold mb-1">{stats?.userCount || 0}</div>
            <div className="text-gray-600 text-sm">Regular Users</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-4xl mb-2">⚙️</div>
            <div className="text-3xl font-bold mb-1">{stats?.adminCount || 0}</div>
            <div className="text-gray-600 text-sm">Admins</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-4xl mb-2">🆕</div>
            <div className="text-3xl font-bold mb-1">{stats?.recentSignups || 0}</div>
            <div className="text-gray-600 text-sm">New (7 days)</div>
          </div>
        </div>
      </div>

      {/* Goal Stats */}
      <div>
        <h2 className="text-xl font-bold mb-4">Goal Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-4xl mb-2">🎯</div>
            <div className="text-3xl font-bold mb-1">{stats?.totalGoals || 0}</div>
            <div className="text-gray-600 text-sm">Total Goals</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-4xl mb-2">✅</div>
            <div className="text-3xl font-bold mb-1">{stats?.activeGoals || 0}</div>
            <div className="text-gray-600 text-sm">Active Goals</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-4xl mb-2">🎉</div>
            <div className="text-3xl font-bold mb-1">{stats?.completedGoals || 0}</div>
            <div className="text-gray-600 text-sm">Completed</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-4xl mb-2">📦</div>
            <div className="text-3xl font-bold mb-1">{stats?.archivedGoals || 0}</div>
            <div className="text-gray-600 text-sm">Archived</div>
          </div>
        </div>
      </div>

      {/* Activity Stats */}
      <div>
        <h2 className="text-xl font-bold mb-4">Activity Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-lg shadow-lg p-8">
            <div className="text-5xl mb-4">✓</div>
            <div className="text-4xl font-bold mb-2">{stats?.totalCheckIns || 0}</div>
            <div className="text-blue-100">Total Check-ins</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-lg shadow-lg p-8">
            <div className="text-5xl mb-4">📊</div>
            <div className="text-4xl font-bold mb-2">
              {stats?.totalCheckIns && stats?.totalUsers 
                ? Math.round(stats.totalCheckIns / stats.totalUsers) 
                : 0}
            </div>
            <div className="text-green-100">Avg Check-ins per User</div>
          </div>
        </div>
      </div>
    </div>
  );
}
