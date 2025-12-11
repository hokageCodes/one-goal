'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate passwords match
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password strength
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      toast.error('Password must contain uppercase, lowercase, and number');
      setLoading(false);
      return;
    }

    if (!token) {
      toast.error('Reset token is missing');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/reset-password/${token}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ password })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }

      toast.success('Password reset successful! Redirecting...');

      // Store token if auto-login is enabled
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect to dashboard
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        // Redirect to login
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold">ONE GOAL</h1>
          <p className="mt-2 text-gray-600">Create New Password</p>
          <p className="mt-4 text-sm text-gray-500">
            Enter your new password below.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="••••••••"
            />
            <p className="mt-1 text-xs text-gray-500">
              Min 8 characters, with uppercase, lowercase, and number
            </p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        {/* Back to Login */}
        <div className="text-center">
          <button
            onClick={() => router.push('/login')}
            className="text-sm text-gray-600 hover:text-black hover:underline"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
