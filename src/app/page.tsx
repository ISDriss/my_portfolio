import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/utils/button';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy to-gray min-h-[calc(100vh-4rem)] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <div className="inline-block px-4 py-2 bg-yellow/20 border border-yellow rounded-full">
                <span className="text-yellow">Software Engineer</span>
              </div>
              <h1 className="text-5xl md:text-6xl">
                Hello, I'm
                <span className="block text-yellow mt-2">Your Name</span>
              </h1>
              <p className="text-xl text-white/80">
                Building innovative solutions and scalable applications with modern technologies.
                Passionate about creating exceptional user experiences.
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
                    className="border-yellow text-yellow hover:bg-yellow hover:text-navy"
                  >
                    Get In Touch
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-yellow rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute inset-0 bg-orange rounded-full opacity-20 blur-2xl animate-pulse"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-yellow to-orange rounded-full flex items-center justify-center">
                  <div className="w-72 h-72 bg-navy rounded-full flex items-center justify-center">
                    <span className="text-yellow text-8xl">{ }</span>
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
          <h2 className="text-center mb-12 text-navy">Technical Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-border rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-purple text-2xl">💻</span>
              </div>
              <h3 className="mb-3 text-navy">Frontend Development</h3>
              <p className="text-gray/80">
                React, TypeScript, Next.js, Tailwind CSS, and modern web technologies
              </p>
            </div>
            <div className="p-6 border border-border rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-green text-2xl">⚙️</span>
              </div>
              <h3 className="mb-3 text-navy">Backend Development</h3>
              <p className="text-gray/80">
                Node.js, Python, databases, APIs, and server-side technologies
              </p>
            </div>
            <div className="p-6 border border-border rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-orange text-2xl">🚀</span>
              </div>
              <h3 className="mb-3 text-navy">DevOps & Cloud</h3>
              <p className="text-gray/80">
                AWS, Docker, CI/CD, cloud architecture, and deployment automation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-navy to-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-6 text-white">Let's Work Together</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <div className="flex gap-6 justify-center">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 hover:bg-yellow rounded-full flex items-center justify-center transition-all hover:scale-110"
            >
              <Github className="w-6 h-6 text-white" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 hover:bg-yellow rounded-full flex items-center justify-center transition-all hover:scale-110"
            >
              <Linkedin className="w-6 h-6 text-white" />
            </a>
            <Link
              href="/contact"
              className="w-12 h-12 bg-white/10 hover:bg-yellow rounded-full flex items-center justify-center transition-all hover:scale-110"
            >
              <Mail className="w-6 h-6 text-white" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
