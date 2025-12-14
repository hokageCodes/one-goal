'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '@/lib/api';

export default function SystemPage() {
  const [loading, setLoading] = useState(false);

  const testNotification = async (type) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/notifications/test/${type}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      toast.success(`${type} notifications triggered!`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">System Settings</h1>

      {/* Notification Testing */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Notification System</h2>
        <p className="text-gray-600 mb-6">
          Test notification emails to verify the system is working correctly.
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-semibold mb-1">Check-In Reminders</h3>
              <p className="text-sm text-gray-600">
                Sends reminders to users who haven't checked in today
              </p>
            </div>
            <button
              onClick={() => testNotification('check-in')}
              disabled={loading}
              className="px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400"
            >
              Test
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-semibold mb-1">Streak Milestones</h3>
              <p className="text-sm text-gray-600">
                Celebrates users reaching 3, 7, 30, 100+ day streaks
              </p>
            </div>
            <button
              onClick={() => testNotification('streak')}
              disabled={loading}
              className="px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400"
            >
              Test
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-semibold mb-1">Deadline Warnings</h3>
              <p className="text-sm text-gray-600">
                Alerts users when goals are due in 1, 3, or 7 days
              </p>
            </div>
            <button
              onClick={() => testNotification('deadline')}
              disabled={loading}
              className="px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400"
            >
              Test
            </button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">📅 Scheduled Times (UTC)</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Check-in reminders: Daily at 8:00 PM (20:00)</li>
            <li>• Streak milestones: Daily at 11:00 PM (23:00)</li>
            <li>• Deadline warnings: Daily at 9:00 AM (09:00)</li>
          </ul>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">System Information</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Environment</span>
            <span className="font-semibold">{process.env.NODE_ENV || 'development'}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">API URL</span>
            <span className="font-semibold">{API_URL}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Frontend URL</span>
            <span className="font-semibold">{window.location.origin}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
