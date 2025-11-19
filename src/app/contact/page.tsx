"use client"
import { Mail, MapPin, Github, Linkedin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card';

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'ilian.sebti@gmail.com',
      href: 'mailto:ilian.sebti@gmail.com',
      color: 'purple',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Garches, France',
      href: 'https://maps.google.com/?q=Garches%2C%20France',
      color: 'orange',
    },
    {
      icon: Linkedin,
      label: 'Linkedin',
      value: 'linkedin.com/in/ilian-sebti',
      href: 'https://www.linkedin.com/in/ilian-sebti',
      color: 'blue'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/ISDriss',
      href: 'https://github.com/ISDriss',
      color: 'gray',
    },
  ];

  const quickFacts = [
    { label: 'Timezone', value: 'UTC+1 (Paris)' },
    { label: 'Collaboration', value: 'Async-friendly, happy to hop on focused calls when needed.' },
    { label: 'Languages', value: 'French & English' },
  ];

  const getIconColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      purple: 'bg-purple/10 text-purple',
      green: 'bg-green/10 text-green',
      orange: 'bg-orange/10 text-orange',
      blue: 'bg-blue/10 text-blue',
      gray: 'bg-gray/10 text-gray'
    };
    return colorMap[color] || colorMap.purple;
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white py-20">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple/5 via-white to-orange/10" />
        <div className="absolute -right-24 top-16 h-80 w-80 rounded-full bg-purple/15 blur-3xl" />
        <div className="absolute -left-28 bottom-0 h-96 w-96 rounded-full bg-yellow/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(3,14,60,0.08),_transparent_55%)]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="mb-4 text-navy">Get In Touch</h1>
          <p className="text-xl text-gray/80 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you. 
            Send me a message and I&apos;ll respond as soon as possible.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <Card className="lg:col-span-3 border-border/70 shadow-lg shadow-purple/5">
            <CardHeader>
              <CardTitle className="text-navy">Contact Information</CardTitle>
              <CardDescription>Pick the channel that works best for you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getIconColorClasses(item.color)}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray/70">{item.label}</p>
                        <p className="font-slim text-navy group-hover:text-navy">{item.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
              <div className="rounded-xl border border-dashed border-border/70 bg-muted/50 p-4 text-sm text-gray/80">
                Prefer async-first communication, but I&apos;m always happy to schedule a focused call once we have a clear agenda.
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">

            <Card className="border-border/70">
              <CardHeader>
                <CardTitle className="text-navy">Quick facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickFacts.map((fact) => (
                  <div key={fact.label}>
                    <p className="text-xs uppercase tracking-wide text-gray/70">{fact.label}</p>
                    <p className="text-navy">{fact.value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
