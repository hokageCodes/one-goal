'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { API_URL } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [quote] = useState({
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  });

  // Only show dashboard for non-admins
  if (user && user.role === 'admin') {
    return (
      <ProtectedRoute adminOnly>
        <div className="space-y-4">
          <div>
            <h1 className="text-display-md font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-body-md text-muted-foreground">Welcome, admin.</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  // ...existing code for non-admins (quote, goals, etc.)
  // You can paste the previous non-admin dashboard code here if needed.
}
