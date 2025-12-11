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
    { name: 'Admin Dashboard', href: '/dashboard/admin', icon: '⚙️' },
    { name: 'Users', href: '/dashboard/admin/users', icon: '👥' },
    { name: 'Goals Overview', href: '/dashboard/admin/goals', icon: '🎯' },
    { name: 'System', href: '/dashboard/admin/system', icon: '🔧' },
  ];

  // Choose navigation based on role
  const navigation = isAdmin() ? adminNavigation : userNavigation;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 flex-shrink-0">
            <Link href="/dashboard" className="text-2xl font-bold">
              ONE GOAL
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-black text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={logout}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Page title */}
            <div className="flex-1 px-4">
              <h1 className="text-xl font-semibold text-gray-900">
                {isAdmin() ? 'Admin Dashboard' : 'Dashboard'}
              </h1>
            </div>

            {/* User info */}
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">
                  {isAdmin() ? 'Administrator' : user?.email}
                </p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
