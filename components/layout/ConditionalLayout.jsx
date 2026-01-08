// Conditional layout - shows public nav/footer OR dashboard layout
'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  // Check if user is on dashboard or admin routes
  const isDashboard = pathname?.startsWith('/dashboard');

  // If dashboard route, render children without public nav/footer
  if (isDashboard) {
    return children;
  }

  // Otherwise, render with public nav/footer
  return (
    <>
      {/* <Header /> */}
      <main className="flex-1 w-full px-2 md:container md:mx-auto">
        {children}
      </main>
      {/* <Footer /> */}
    </>
  );
}
