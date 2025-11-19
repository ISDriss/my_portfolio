import type { Metadata } from 'next'; 
import { Navigation } from '@/components/navigation';
import { Toaster } from '@/components/sonner';
import '@/app/globals.css';
import { Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ilian Sebti',
  description: 'Professional portfolio showcasing projects, experience, and skills',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-white">
          <Navigation />
          <main>{children}</main>
          <footer className="bg-gradient-to-b from-electric to-navy text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-white/80">
                © {new Date().getFullYear()} Ilian SEBTI. All rights reserved.
              </p>
              <p className="text-white/60 mt-2 text-sm">
                Built with Next.js & Tailwind CSS
              </p>
            </div>
          </footer>
          <Toaster />
        </div>
      </body>
    </html>
  );
}