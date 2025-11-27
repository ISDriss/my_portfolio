'use client';

import { ThreeScene } from '@/components/three-scene';

export default function TestPage() {
  return (
    <main className="min-h-screen bg-navy text-white flex flex-col items-center justify-center gap-6 px-6 py-12">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-semibold">Three.js Test Page</h1>
        <p className="text-white/70">
          Drag to orbit, scroll to zoom. This page only renders the city scene.
        </p>
      </div>
      <div className="w-full max-w-5xl">
        <ThreeScene />
      </div>
    </main>
  );
}
