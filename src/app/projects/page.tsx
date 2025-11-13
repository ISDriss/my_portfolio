'use client';

import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card';
import { Badge } from '@/components/badge';

const colorStyles = {
  purple: {
    accent: 'bg-purple',
    pill: {
      active: 'bg-purple text-white border-purple shadow-lg',
      inactive: 'text-purple border-purple/40 bg-purple/10 hover:bg-purple/15',
    },
    badge: 'text-purple border-purple/40 bg-purple/10',
  },
  green: {
    accent: 'bg-green',
    pill: {
      active: 'bg-green text-white border-green shadow-lg',
      inactive: 'text-green border-green/40 bg-green/10 hover:bg-green/15',
    },
    badge: 'text-green border-green/40 bg-green/10',
  },
  orange: {
    accent: 'bg-orange',
    pill: {
      active: 'bg-orange text-white border-orange shadow-lg',
      inactive: 'text-orange border-orange/40 bg-orange/10 hover:bg-orange/15',
    },
    badge: 'text-orange border-orange/40 bg-orange/10',
  },
  yellow: {
    accent: 'bg-yellow',
    pill: {
      active: 'bg-yellow text-navy border-yellow shadow-lg',
      inactive: 'text-yellow border-yellow/60 bg-yellow/10 hover:bg-yellow/15',
    },
    badge: 'text-yellow border-yellow/60 bg-yellow/10',
  },
} as const;

type ThemeColor = keyof typeof colorStyles;

type Theme = {
  id: string;
  label: string;
  description: string;
  color: ThemeColor;
};

type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  theme: Theme['id'];
};

const themes: Theme[] = [
  {
    id: 'data',
    label: 'Data & Commerce',
    description: 'Dashboards, reporting, and transactional systems.',
    color: 'yellow',
  },
  {
    id: 'productivity',
    label: 'Productivity & DevOps',
    description: 'Team coordination, automation, and developer tooling.',
    color: 'green',
  },
  {
    id: 'ai',
    label: 'AI & Automation',
    description: 'Intelligent assistants, content generation, and ML workflows.',
    color: 'purple',
  },
  {
    id: 'mobile',
    label: 'Mobile & Wellness',
    description: 'Cross-platform experiences focused on health and habits.',
    color: 'orange',
  },
];

const themeLookup = themes.reduce<Record<string, Theme>>((acc, theme) => {
  acc[theme.id] = theme;
  return acc;
}, {});

const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory management, payment processing, and analytics dashboard.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    theme: 'data',
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Collaborative task management application with real-time updates, team workspaces, and productivity analytics.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'WebSocket'],
    theme: 'productivity',
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 3,
    title: 'AI Content Generator',
    description: 'AI-powered content generation tool leveraging GPT-4 API for creating marketing copy, blog posts, and social media content.',
    tags: ['Python', 'FastAPI', 'OpenAI', 'React'],
    theme: 'ai',
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 4,
    title: 'Analytics Dashboard',
    description: 'Real-time analytics dashboard with data visualization, custom reports, and automated insights for business intelligence.',
    tags: ['React', 'D3.js', 'GraphQL', 'AWS'],
    theme: 'data',
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 5,
    title: 'Mobile Fitness Tracker',
    description: 'Cross-platform mobile app for tracking workouts, nutrition, and health metrics with social features.',
    tags: ['React Native', 'Firebase', 'Redux', 'iOS/Android'],
    theme: 'mobile',
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 6,
    title: 'DevOps Automation Tool',
    description: 'Infrastructure automation platform for managing deployments, monitoring, and scaling cloud resources efficiently.',
    tags: ['Python', 'Docker', 'Kubernetes', 'Terraform'],
    theme: 'productivity',
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
];

export default function ProjectsPage() {
  const [activeTheme, setActiveTheme] = useState<string>('all');
  const defaultTheme = themes[0]!;

  const filteredProjects =
    activeTheme === 'all' ? projects : projects.filter((project) => project.theme === activeTheme);

  const handleThemeClick = (themeId: string) => {
    setActiveTheme((prev) => (prev === themeId ? 'all' : themeId));
  };

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="mb-4 text-navy">My Projects</h1>
          <p className="text-xl text-gray/80 max-w-2xl mx-auto">
            A showcase of my recent work and personal projects. Each project represents a unique challenge and learning experience.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            type="button"
            onClick={() => setActiveTheme('all')}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
              activeTheme === 'all'
                ? 'bg-navy text-white border-navy'
                : 'border-border text-gray hover:text-navy hover:border-navy/40'
            }`}
          >
            Show All
          </button>
          {themes.map((theme) => {
            const isActive = activeTheme === theme.id;
            const colorSet = colorStyles[theme.color] || colorStyles.purple;

            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleThemeClick(theme.id)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                  isActive ? colorSet.pill.active : colorSet.pill.inactive
                }`}
                aria-pressed={isActive}
              >
                {theme.label}
              </button>
            );
          })}
        </div>

        <div className="text-center max-w-4xl mx-auto mb-12">
          {activeTheme === 'all' ? (
            <p className="text-gray/80">
              Browse by trend to focus on the type of work you care about. Click a label to filter these cards instantly.
            </p>
          ) : (
            <p className="text-gray/80">
              {themeLookup[activeTheme]?.description || defaultTheme.description}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const currentTheme = themeLookup[project.theme] || defaultTheme;
            const colorSet = colorStyles[currentTheme.color] || colorStyles.purple;

            return (
              <Card key={project.id} className="hover:shadow-xl transition-shadow border-border">
                <CardHeader>
                  <div className={`w-full h-2 rounded-t-lg mb-4 ${colorSet.accent}`} />
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-navy">{project.title}</CardTitle>
                    <Badge variant="outline" className={`text-xs font-semibold ${colorSet.badge}`}>
                      {currentTheme.label}
                    </Badge>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-gray/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray hover:text-navy transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm">Code</span>
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-orange hover:text-orange/80 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm">Demo</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center text-gray/70 mt-6">
            <p>No projects match this theme yet. Check back soon!</p>
          </div>
        )}

        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-gradient-to-r from-navy to-gray rounded-xl">
            <p className="text-white mb-4">Want to see more of my work?</p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-yellow hover:bg-yellow/90 text-navy rounded-lg transition-colors"
            >
              <Github className="w-5 h-5" />
              View GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
