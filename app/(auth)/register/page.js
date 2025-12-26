'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Email/Password Registration
  const handleEmailRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      toast.error('Password must contain uppercase, lowercase, and number');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            name: `${formData.firstName} ${formData.lastName}`.trim()
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      toast.success('Registration successful! You can now log in.');

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

      setTimeout(() => router.push('/login'), 3000);
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
          <p className="mt-2 text-gray-600">One Goal Per Day. That's It.</p>
          <p className="mt-4 text-lg font-semibold">Create Your Account</p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleEmailRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black"
                placeholder="John"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black"
            />
            <p className="mt-1 text-xs text-gray-500">
              Min 8 characters, uppercase, lowercase & number
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-black hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
