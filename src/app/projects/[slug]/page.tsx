import Link from 'next/link';
import Image from 'next/image'
import next, { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/badge';
import { projects, themeLookup, ProjectContentBlock } from '@/data/projects';
import { colorStyles } from '@/lib/themeStyles';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects
    .filter((project) => project.hasPage !== false)
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug && item.hasPage !== false);

  if (!project) {
    return {
      title: 'Project',
    };
  }

  return {
    title: `${project.title} – Project`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug && item.hasPage !== false);

  if (!project) {
    notFound();
  }

  const theme = themeLookup[project.theme];
  const colorSet = theme ? colorStyles[theme.color] : colorStyles.purple;
  const contentBlocks =
    project.pageContent?.map<ProjectContentBlock>((block) =>
      typeof block === 'string' ? { type: 'text', content: block } : block,
    ) ?? [];
  const highlights = project.highlights ?? [];
  const renderBlock = (block: ProjectContentBlock, index: number) => {
    if (block.type === 'image') {
      return (
        <figure key={`${block.type}-${index}`} className="space-y-3">
          <Image 
            src={block.src} 
            alt={block.alt} 
            width='500'
            height='500'
            className="w-full rounded-2xl border border-border object-cover" 
          />
          {block.caption ? <figcaption className="text-sm text-gray/70">{block.caption}</figcaption> : null}
        </figure>
      );
    }
    if (block.type === 'video') {
      return (
        <figure key={`${block.type}-${index}`} className="space-y-3">
          <video
            src={block.src}
            controls
            className="w-full rounded-2xl border border-border"
            preload="metadata"
          />
          {block.caption ? <figcaption className="text-sm text-gray/70">{block.caption}</figcaption> : null}
        </figure>
      );
    }
    if (block.type === 'code') {
      return (
        <figure key={`${block.type}-${index}`} className="space-y-3">
          <pre className="rounded-xl bg-gray/5 p-4 text-sm text-navy overflow-x-auto border border-border">
            <code>{block.code}</code>
          </pre>
        </figure>
      );
    }

    return (
      <p key={`${block.type}-${index}`} className="text-lg leading-relaxed text-gray/90">
        {block.content}
      </p>
    );
  };

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Link href="/projects" className="inline-flex items-center gap-2 text-gray hover:text-navy transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to projects</span>
          </Link>
        </div>

        <div className="mb-12">
          <Badge variant="outline" className={`text-xs font-semibold ${colorSet.badge}`}>
            {theme?.label ?? 'Project'}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-semibold text-navy mt-4">{project.title}</h1>
          <p className="text-lg text-gray/80 mt-4 max-w-3xl">{project.description}</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          {contentBlocks.length > 0 && (
            <div className="space-y-3">
              {contentBlocks.map((block, index) => renderBlock(block, index))}
            </div>
          )}

          <aside className="space-y-8">
            <div className="rounded-2xl border border-border p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray/70 mb-4">Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-gray/30">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {highlights.length > 0 && (
              <div className="rounded-2xl border border-border p-6">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray/70 mb-4">Highlights</h2>
                <ul className="space-y-3 text-gray/90">
                  {highlights.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className={`mt-2 h-2 w-2 rounded-full ${colorSet.accent}`} aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(project.github || project.demo) && (
              <div className="rounded-2xl border border-border p-6 space-y-4">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray hover:text-navy transition-colors font-medium"
                  >
                    <Github className="w-4 h-4" />
                    <span>View source</span>
                  </a>
                ) : null}
                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-orange hover:text-orange/80 transition-colors font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View live product</span>
                  </a>
                ) : null}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
