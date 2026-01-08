"use client";


import ProtectedRoute from '@/components/ProtectedRoute';
import { useEffect, useState } from 'react';
import apiRequest from '@/lib/api';

export default function AdminWaitlistPage() {
  const [waitlist, setWaitlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);

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

  const handleDelete = async (email) => {
    if (!window.confirm('Delete this entry?')) return;
    setDeleting(email);
    try {
      await apiRequest(`/api/waitlist/${encodeURIComponent(email)}`, { method: 'DELETE' });
      setWaitlist((prev) => prev.filter((entry) => entry.email !== email));
    } catch (err) {
      alert(err.message || 'Failed to delete entry.');
    } finally {
      setDeleting(null);
    }
  };

  // Export helpers
  const exportCSV = () => {
    const header = ['Name', 'Email', 'Date Submitted'];
    const rows = waitlist.map(entry => [
      `"${(entry.name || '').replace(/"/g, '""')}"`,
      `"${entry.email.replace(/"/g, '""')}"`,
      `"${new Date(entry.date).toLocaleString()}"`
    ]);
    const csv = [header.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'waitlist.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(waitlist, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'waitlist.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ProtectedRoute adminOnly>
      <div className="max-w-7xl mx-auto py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Waitlist Submissions</h1>
            <p className="text-gray-600">View and manage all waitlist signups</p>
          </div>
          <div className="flex gap-2">
            <button onClick={exportCSV} className="px-4 py-2 rounded bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">Export CSV</button>
            <button onClick={exportJSON} className="px-4 py-2 rounded bg-gray-700 text-white text-sm font-semibold hover:bg-gray-800">Export JSON</button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : waitlist.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg px-6 py-12 text-center">
            <p className="text-gray-600">No submissions yet.</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Submitted</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {waitlist.map((entry, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {entry.name || <span className="italic text-gray-400">—</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {entry.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(entry.date).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          className="text-red-600 hover:underline disabled:opacity-50"
                          onClick={() => handleDelete(entry.email)}
                          disabled={deleting === entry.email}
                        >
                          {deleting === entry.email ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Total submissions: <span className="font-medium">{waitlist.length}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}