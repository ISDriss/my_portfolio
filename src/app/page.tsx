import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/button';
import { ThreeScene } from '@/components/three-scene';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy to-electric min-h-[calc(100vh-4rem)] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <div className="inline-block px-4 py-2 bg-cyan/20 border border-cyan rounded-full">
                <span className="text-cyan">Creative Technologies Engineer</span>
              </div>
              <h1 className="text-5xl md:text-6xl">
                Hello, I&apos;m
                <span className="block text-orange mt-2">Ilian SEBTI</span>
              </h1>
              <p className="text-xl text-white/80">
                Passionate about prototyping new tools and innovative solutions.  
                For a better tommorrow.
              </p>
              <div className="flex gap-4 pt-4">
                <Link href="/projects">
                  <Button className="bg-orange hover:bg-orange/90 text-white">
                    View My Work <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-cyan text-cyan bg-transparent hover:bg-cyan hover:text-navy"
                  >
                    Get In Touch
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-6 max-w-lg">
                <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 border border-white/10">
                  <Sparkles className="w-5 h-5 text-yellow" />
                  <div>
                    <p className="text-sm text-white/70">Real-time visuals</p>
                    <p className="text-white">Three.js prototyping</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 border border-white/10">
                  <ArrowRight className="w-5 h-5 text-cyan" />
                  <div>
                    <p className="text-sm text-white/70">Full-stack delivery</p>
                    <p className="text-white">Ideas to production</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="block mt-4 md:mt-0">
              <div className="relative">
                <ThreeScene />
                <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-orange/30 blur-3xl" />
                <div className="pointer-events-none absolute -right-12 top-12 h-40 w-40 rounded-full bg-cyan/25 blur-3xl" />
                <div className="absolute bottom-6 left-6 right-6 md:left-8 md:right-8 flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[220px] rounded-2xl bg-white/10 border border-white/15 p-4 backdrop-blur">
                    <p className="text-sm text-white/70">Latest playground</p>
                    <p className="text-white text-lg">Interactive energy core</p>
                  </div>
                  <div className="min-w-[180px] rounded-2xl bg-navy/80 border border-cyan/30 p-4 text-white shadow-lg">
                    <p className="text-sm text-cyan/80">Now showing</p>
                    <p className="text-lg">Shader-inspired motion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12 text-electric">Technical Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-border rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-purple text-2xl">💻</span>
              </div>
              <h3 className="mb-3 text-electric">Full Stack Development</h3>
              <p className="text-gray/80">
                Next.js, Tailwind CSS, Python Django REST, SQL, API swaggers and other web technologies
              </p>
            </div>
            <div className="p-6 border border-border rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-green text-2xl">⚙️</span>
              </div>
              <h3 className="mb-3 text-electric">Electronics</h3>
              <p className="text-gray/80">
                Verilog on FPGA, C++ on Arduino & ESP32, circuit design on Kicad and soldering
              </p>
            </div>
            <div className="p-6 border border-border rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-orange text-2xl">🚀</span>
              </div>
              <h3 className="mb-3 text-electric">3D modeling</h3>
              <p className="text-gray/80">
                Solidworks & Blender
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-navy to-electric">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-6 text-white">Let&apos;s Work Together</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            I&apos;m always interested in hearing about new projects and opportunities.
          </p>
          <div className="flex gap-6 justify-center">
            <a
              href="https://github.com/ISDriss"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 hover:bg-orange rounded-full flex items-center justify-center transition-all hover:scale-110"
            >
              <Github className="w-6 h-6 text-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/ilian-sebti"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 hover:bg-orange rounded-full flex items-center justify-center transition-all hover:scale-110"
            >
              <Linkedin className="w-6 h-6 text-white" />
            </a>
            <Link
              href="/contact"
              className="w-12 h-12 bg-white/10 hover:bg-orange rounded-full flex items-center justify-center transition-all hover:scale-110"
            >
              <Mail className="w-6 h-6 text-white" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
