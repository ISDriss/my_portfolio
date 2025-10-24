import { Building, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card';
import { Badge } from '@/components/badge';

export default function ExperiencePage() {
  const experiences = [
    {
      id: 1,
      company: 'Tech Innovations Inc.',
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      period: 'Jan 2022 - Present',
      type: 'Full-time',
      color: 'purple',
      achievements: [
        'Led development of microservices architecture serving 1M+ daily active users',
        'Reduced application load time by 40% through performance optimization',
        'Mentored 5 junior developers and conducted technical interviews',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
      ],
      technologies: ['React', 'Node.js', 'AWS', 'Kubernetes', 'PostgreSQL'],
    },
    {
      id: 2,
      company: 'Digital Solutions Co.',
      position: 'Software Engineer',
      location: 'Remote',
      period: 'Mar 2020 - Dec 2021',
      type: 'Full-time',
      color: 'green',
      achievements: [
        'Developed and maintained 15+ client-facing web applications',
        'Collaborated with cross-functional teams in Agile environment',
        'Improved code quality through comprehensive testing strategies',
        'Integrated third-party APIs and payment processing systems',
      ],
      technologies: ['Vue.js', 'Python', 'Django', 'MongoDB', 'Docker'],
    },
    {
      id: 3,
      company: 'StartUp Ventures',
      position: 'Junior Developer',
      location: 'New York, NY',
      period: 'Jun 2018 - Feb 2020',
      type: 'Full-time',
      color: 'orange',
      achievements: [
        'Built responsive web applications from design mockups',
        'Participated in daily stand-ups and sprint planning sessions',
        'Contributed to open-source projects and internal tools',
        'Gained expertise in modern JavaScript frameworks and tools',
      ],
      technologies: ['JavaScript', 'React', 'Express', 'MySQL', 'Git'],
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { border: string; bg: string; text: string }> = {
      purple: { border: 'border-purple', bg: 'bg-purple/5', text: 'text-purple' },
      green: { border: 'border-green', bg: 'bg-green/5', text: 'text-green' },
      orange: { border: 'border-orange', bg: 'bg-orange/5', text: 'text-orange' },
    };
    return colorMap[color] || colorMap.purple;
  };

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="mb-4 text-navy">Work Experience</h1>
          <p className="text-xl text-gray/80 max-w-2xl mx-auto">
            My professional journey in software engineering, building scalable applications and solving complex problems.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => {
            const colors = getColorClasses(exp.color);
            return (
              <Card key={exp.id} className={`border-l-4 ${colors.border} hover:shadow-xl transition-shadow`}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-navy mb-2">{exp.position}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mb-2">
                        <Building className="w-4 h-4" />
                        <span>{exp.company}</span>
                      </CardDescription>
                      <div className="flex flex-wrap gap-3 text-sm text-gray/70">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                        <Badge className={`${colors.bg} ${colors.text} border-0`}>
                          {exp.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="mb-3 text-navy">Key Achievements</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex gap-2 text-gray/80">
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.bg}`}></span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 text-navy">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="border-gray/30">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 p-8 bg-gradient-to-r from-navy to-gray rounded-xl text-center">
          <h3 className="mb-2 text-white">Education</h3>
          <p className="text-white/90 mb-2">Bachelor of Science in Computer Science</p>
          <p className="text-white/70 mb-1">University Name, 2014 - 2018</p>
          <p className="text-white/70">GPA: 3.8/4.0</p>
        </div>
      </div>
    </div>
  );
}
