import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card';
import { Badge } from '@/components/badge';

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with real-time inventory management, payment processing, and analytics dashboard.',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      color: 'purple',
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates, team workspaces, and productivity analytics.',
      tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'WebSocket'],
      color: 'green',
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      id: 3,
      title: 'AI Content Generator',
      description: 'AI-powered content generation tool leveraging GPT-4 API for creating marketing copy, blog posts, and social media content.',
      tags: ['Python', 'FastAPI', 'OpenAI', 'React'],
      color: 'orange',
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      id: 4,
      title: 'Analytics Dashboard',
      description: 'Real-time analytics dashboard with data visualization, custom reports, and automated insights for business intelligence.',
      tags: ['React', 'D3.js', 'GraphQL', 'AWS'],
      color: 'yellow',
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      id: 5,
      title: 'Mobile Fitness Tracker',
      description: 'Cross-platform mobile app for tracking workouts, nutrition, and health metrics with social features.',
      tags: ['React Native', 'Firebase', 'Redux', 'iOS/Android'],
      color: 'purple',
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      id: 6,
      title: 'DevOps Automation Tool',
      description: 'Infrastructure automation platform for managing deployments, monitoring, and scaling cloud resources efficiently.',
      tags: ['Python', 'Docker', 'Kubernetes', 'Terraform'],
      color: 'green',
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      purple: 'bg-purple/10 border-purple text-purple hover:bg-purple/20',
      green: 'bg-green/10 border-green text-green hover:bg-green/20',
      orange: 'bg-orange/10 border-orange text-orange hover:bg-orange/20',
      yellow: 'bg-yellow/10 border-yellow text-yellow hover:bg-yellow/20',
    };
    return colorMap[color] || colorMap.purple;
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-xl transition-shadow border-border">
              <CardHeader>
                <div className={`w-full h-2 rounded-t-lg mb-4 ${getColorClasses(project.color)}`}></div>
                <CardTitle className="text-navy">{project.title}</CardTitle>
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
          ))}
        </div>

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
