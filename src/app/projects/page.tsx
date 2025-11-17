'use client';

import { useRouter } from 'next/navigation';
import { useState, type KeyboardEvent } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card';
import { Badge } from '@/components/badge';
import { projects, themes, themeLookup } from '@/data/projects';
import { colorStyles } from '@/lib/themeStyles';

export default function ProjectsPage() {
  const router = useRouter();
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
            const hasPage = project.hasPage !== false;
            const handleCardNavigation = () => {
              if (!hasPage) return;
              router.push(`/projects/${project.slug}`);
            };
            const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
              if (!hasPage) return;
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                router.push(`/projects/${project.slug}`);
              }
            };

            return (
              <Card
                key={project.slug}
                role={hasPage ? 'link' : undefined}
                tabIndex={hasPage ? 0 : undefined}
                aria-disabled={!hasPage}
                onClick={handleCardNavigation}
                onKeyDown={handleCardKeyDown}
                className={`hover:shadow-xl transition-shadow border-border ${
                  hasPage ? 'cursor-pointer focus-visible:ring-2 focus-visible:ring-navy/70 focus-visible:outline-none' : 'cursor-default'
                }`}
              >
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
                  <div className="flex flex-wrap gap-4">
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray hover:text-navy transition-colors"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <Github className="w-4 h-4" />
                        <span className="text-sm">Code</span>
                      </a>
                    ) : null}
                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-orange hover:text-orange/80 transition-colors"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm">Link</span>
                      </a>
                    ) : null}
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
