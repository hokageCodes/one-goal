// Dashboard layout with sidebar and header
'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const pathname = usePathname();

  // Navigation based on role
  const userNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'My Goal', href: '/dashboard/goal', icon: '🎯' },
    { name: 'Progress', href: '/dashboard/progress', icon: '📈' },
    { name: 'Profile', href: '/dashboard/profile', icon: '👤' },
  ];

  const adminNavigation = [
    { name: 'Overview', href: '/dashboard/admin', icon: '⚙️' },
    { name: 'Waitlist', href: '/dashboard/admin/waitlist', icon: '📋' },
    { name: 'Settings', href: '/dashboard/admin/settings', icon: '⚙️' },
  ];

  // Choose navigation based on role
  const navigation = isAdmin() ? adminNavigation : userNavigation;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-card border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b flex-shrink-0">
            <Link href="/dashboard" className="text-heading-lg font-bold text-foreground">
              ONE GOAL
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-3 py-2.5 text-body-sm font-medium rounded-md transition-colors ${
                  pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t">
            <button
              onClick={logout}
              className="w-full flex items-center px-3 py-2.5 text-body-sm font-medium text-destructive hover:bg-destructive/10 rounded-md transition-colors"
            >
              <span className="mr-3">🚪</span>
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-card border-b">
          <div className="flex items-center justify-between h-16 px-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-muted-foreground hover:text-foreground"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Page title */}
            <div className="flex-1 px-4">
              <h1 className="text-heading-lg font-semibold text-foreground">
                {isAdmin() ? 'Admin Dashboard' : 'Dashboard'}
              </h1>
            </div>

            {/* User info */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-body-sm font-semibold text-foreground">{user?.name}</p>
                <p className="text-body-xs text-muted-foreground">
                  {isAdmin() ? 'Administrator' : user?.email}
                </p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-semibold text-body-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
