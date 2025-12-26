'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
// ...existing code...
import { useAuth } from '@/contexts/AuthContext';
// ...existing code...
export default function LoginPage() {
  const [email, setEmail] = useState('');
// ...existing code...
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  // Email/Password Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }
      const data = await response.json();
      login(data.token, data.user);
      toast.success('Login successful!');
      setTimeout(() => {
        router.push('/dashboard');
      }, 100);
    } catch (err) {
      toast.error(err.message || 'Login failed');
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
          <p className="mt-2 text-gray-600">One Goal Per Day. That's It.</p>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Google Sign In Button removed */}

        {/* Footer Links */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="font-medium text-black hover:underline">
              Sign up
            </a>
          </p>
          {/* Forgot password link removed */}
        </div>
      </div>
    </div>
  );
}