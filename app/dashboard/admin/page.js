"use client";
import React, { useEffect, useState } from "react";
import apiRequest from '@/lib/api';
import { Users, TrendingUp, Calendar, Mail } from 'lucide-react';

export default function AdminOverviewPage() {
  const [waitlist, setWaitlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWaitlist();
  }, []);

  const fetchWaitlist = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiRequest('/api/waitlist', { method: 'GET' });
      setWaitlist(data.waitlist || []);
    } catch (err) {
      setError(err.message || "Failed to load waitlist.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats
  const today = new Date();
  const last7Days = waitlist.filter(entry => {
    const entryDate = new Date(entry.date);
    const diffTime = today - entryDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  }).length;

  const last30Days = waitlist.filter(entry => {
    const entryDate = new Date(entry.date);
    const diffTime = today - entryDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
  }).length;

  const todaySignups = waitlist.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate.toDateString() === today.toDateString();
  }).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Overview</h1>
          <p className="text-gray-600">Monitor your waitlist performance and recent activity</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Signups */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {loading ? '...' : waitlist.length}
            </div>
            <div className="text-sm text-gray-600">Total Signups</div>
          </div>

          {/* Today's Signups */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {loading ? '...' : todaySignups}
            </div>
            <div className="text-sm text-gray-600">Today</div>
          </div>

          {/* Last 7 Days */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {loading ? '...' : last7Days}
            </div>
            <div className="text-sm text-gray-600">Last 7 Days</div>
          </div>

          {/* Last 30 Days */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {loading ? '...' : last30Days}
            </div>
            <div className="text-sm text-gray-600">Last 30 Days</div>
          </div>
        </div>

        {/* Recent Entries Table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">Recent Waitlist Entries</h2>
            <p className="text-sm text-gray-600 mt-1">Latest 10 signups</p>
          </div>
          
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-gray-500">Loading...</div>
              </div>
            ) : error ? (
              <div className="px-6 py-4">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              </div>
            ) : waitlist.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <div className="text-gray-400 mb-2">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                </div>
                <p className="text-gray-600">No waitlist entries yet.</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {waitlist.slice(-10).reverse().map((entry, idx) => {
                    const entryDate = new Date(entry.date);
                    const isToday = entryDate.toDateString() === today.toDateString();
                    
                    return (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.name || <span className="italic text-gray-400">Not provided</span>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {entry.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {entryDate.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {isToday ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              New
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Pending
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {!loading && !error && waitlist.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {Math.min(10, waitlist.length)} of {waitlist.length} total entries
                </p>
                <button 
                  onClick={() => window.location.href = '/admin/waitlist'}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  View all →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}