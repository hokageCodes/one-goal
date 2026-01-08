"use client";

import ProtectedRoute from '@/components/ProtectedRoute';
import { useEffect, useState } from 'react';
import apiRequest from '@/lib/api';

export default function AdminWaitlistPage() {
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

  return (
    <ProtectedRoute adminOnly>
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Waitlist Submissions</h1>
        {loading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : waitlist.length === 0 ? (
          <div className="text-muted-foreground">No submissions yet.</div>
        ) : (
          <table className="w-full border rounded-lg overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {waitlist.map((entry, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-3">{entry.email}</td>
                  <td className="p-3">{new Date(entry.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </ProtectedRoute>
  );
}
