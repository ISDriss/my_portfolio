'use client';

import { ThreeScene } from '@/components/three-scene';

export default function TestPage() {
  return (
    <main className="min-h-screen bg-navy text-white flex flex-col items-center justify-center gap-6 px-6 py-12">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Three.js Scene Page</h1>
        <p className="text-lg text-gray-300">
          I still consider this page a work in progress.
          that's why the page is not linked from anywhere else.
        </p>
      </div>
      <div className="w-full max-w-5xl">
        <ThreeScene />
      </div>
    </main>
  );
}
