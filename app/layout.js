import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/contexts/AuthContext';
import ConditionalLayout from '@/components/layout/ConditionalLayout';
import ErrorBoundary from '@/components/ErrorBoundary';

export const metadata = {
  metadataBase: new URL('https://onegoal.app'),
  title: {
    default: "One Goal - Focus on What Matters",
    template: "%s | One Goal"
  },
  description: "A minimalist productivity platform designed to help you focus on the one goal that truly matters. Track progress, stay motivated, achieve more.",
  keywords: ["productivity", "goal tracking", "focus", "minimalist", "task management", "one goal", "achievement", "motivation"],
  authors: [{ name: "One Goal Team" }],
  creator: "One Goal",
  publisher: "One Goal",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://onegoal.app',
    siteName: 'One Goal',
    title: 'One Goal - Focus on What Matters',
    description: 'A minimalist productivity platform designed to help you focus on the one goal that truly matters.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'One Goal - Focus on What Matters',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'One Goal - Focus on What Matters',
    description: 'A minimalist productivity platform designed to help you focus on the one goal that truly matters.',
    creator: '@onegoalapp',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body>
        <ErrorBoundary>
          <AuthProvider>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              closeOnClick
              pauseOnHover
              theme="light"
            />
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
