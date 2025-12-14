'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '@/lib/api';

export default function SystemPage() {
  const [loading, setLoading] = useState(false);
  const [frontendUrl, setFrontendUrl] = useState('');

  useEffect(() => {
    // Only access window in the browser
    setFrontendUrl(window.location.origin);
  }, []);

  const testNotification = async (type) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/notifications/test/${type}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
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
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">System Settings</h1>

      {/* Notification Testing */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">🔔 Notification System</h2>
        <p className="text-gray-600">Test notification emails to verify the system is working correctly.</p>

        <div className="space-y-4 mt-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-semibold">⏰ Check-In Reminders</h3>
              <p className="text-sm text-gray-600">Sends reminders to users who haven't checked in today</p>
            </div>
            <button
              onClick={() => testNotification('check-in')}
              disabled={loading}
              className="px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400"
            >
              Test
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-semibold">🔥 Streak Milestones</h3>
              <p className="text-sm text-gray-600">Celebrates users reaching 3, 7, 30, 100+ day streaks</p>
            </div>
            <button
              onClick={() => testNotification('streak')}
              disabled={loading}
              className="px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400"
            >
              Test
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-semibold">⚠️ Deadline Warnings</h3>
              <p className="text-sm text-gray-600">Alerts users when goals are due in 1, 3, or 7 days</p>
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

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">📅 Scheduled Times (UTC)</h3>
          <ul className="text-sm space-y-1 text-gray-700">
            <li>• Check-in reminders: Daily at 8:00 PM (20:00)</li>
            <li>• Streak milestones: Daily at 11:00 PM (23:00)</li>
            <li>• Deadline warnings: Daily at 9:00 AM (09:00)</li>
          </ul>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">ℹ️ System Information</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-semibold">Environment</span>
            <span className="text-gray-600">{process.env.NODE_ENV || 'development'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">API URL</span>
            <span className="text-gray-600">{API_URL}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Frontend URL</span>
            <span className="text-gray-600">{frontendUrl || 'Loading...'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}