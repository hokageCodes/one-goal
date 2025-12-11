'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

export default function VerifyEmailPage() {
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Verification token is missing');
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/verify-email/${token}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Verification failed');
        }

        setStatus('success');
        setMessage(data.message || 'Email verified successfully!');
        toast.success('Email verified! Redirecting to login...');

        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } catch (err) {
        setStatus('error');
        setMessage(err.message);
        toast.error(err.message || 'Verification failed');
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Logo */}
        <h1 className="text-4xl font-bold">ONE GOAL</h1>

        {/* Status Icon */}
        <div className="flex justify-center">
          {status === 'verifying' && (
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black"></div>
          )}
          {status === 'success' && (
            <div className="rounded-full bg-green-100 p-4">
              <svg
                className="w-16 h-16 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
          {status === 'error' && (
            <div className="rounded-full bg-red-100 p-4">
              <svg
                className="w-16 h-16 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">
            {status === 'verifying' && 'Verifying Your Email...'}
            {status === 'success' && 'Email Verified!'}
            {status === 'error' && 'Verification Failed'}
          </h2>
          <p className="text-gray-600">{message}</p>
        </div>

        {/* Actions */}
        {status === 'success' && (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Redirecting to login page...</p>
            <button
              onClick={() => router.push('/login')}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Go to Login
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-3">
            <button
              onClick={() => router.push('/register')}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Try Registering Again
            </button>
            <button
              onClick={() => router.push('/login')}
              className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
