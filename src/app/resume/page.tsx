import { Download, Code, Briefcase, GraduationCap, Award } from 'lucide-react';
import { Button } from '@/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Badge } from '@/components/badge';

export default function ResumePage() {
  const skills = {
    'Frontend': ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js', 'Redux'],
    'Backend': ['Node.js', 'Python', 'Express', 'Django', 'FastAPI', 'GraphQL'],
    'Database': ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'DynamoDB'],
    'DevOps': ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform', 'Jenkins'],
    'Tools': ['Git', 'VS Code', 'Jira', 'Figma', 'Postman', 'Linux'],
  };

  const certifications = [
    'AWS Certified Solutions Architect',
    'Google Cloud Professional Developer',
    'MongoDB Certified Developer',
    'Certified Kubernetes Administrator',
  ];

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="mb-4 text-navy">Resume</h1>
          <p className="text-xl text-gray/80 mb-6">
            Download my complete resume or view the summary below
          </p>
          <Button className="bg-orange hover:bg-orange/90 text-white">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>

        {/* Professional Summary */}
        <Card className="mb-8 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-navy">
              <Briefcase className="w-5 h-5 text-orange" />
              Professional Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray/80 leading-relaxed">
              Experienced Software Engineer with 5+ years of expertise in full-stack development, 
              specializing in building scalable web applications and microservices architectures. 
              Proven track record of delivering high-quality solutions using modern technologies 
              including React, Node.js, and cloud platforms. Strong problem-solving skills and 
              passion for writing clean, maintainable code. Experienced in leading development 
              teams and mentoring junior developers.
            </p>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="mb-8 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-navy">
              <Code className="w-5 h-5 text-purple" />
              Technical Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category}>
                  <h4 className="mb-2 text-navy">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="outline" 
                        className="border-gray/30 hover:bg-purple/10 hover:border-purple transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Experience Highlights */}
        <Card className="mb-8 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-navy">
              <Briefcase className="w-5 h-5 text-green" />
              Experience Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-navy">Senior Software Engineer</h4>
                    <p className="text-gray/70">Tech Innovations Inc.</p>
                  </div>
                  <Badge className="bg-purple/10 text-purple border-0">2022 - Present</Badge>
                </div>
                <ul className="space-y-1 text-gray/80">
                  <li>• Led development of microservices architecture serving 1M+ users</li>
                  <li>• Improved application performance by 40%</li>
                  <li>• Mentored team of 5 developers</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-navy">Software Engineer</h4>
                    <p className="text-gray/70">Digital Solutions Co.</p>
                  </div>
                  <Badge className="bg-green/10 text-green border-0">2020 - 2021</Badge>
                </div>
                <ul className="space-y-1 text-gray/80">
                  <li>• Developed 15+ client-facing applications</li>
                  <li>• Implemented comprehensive testing strategies</li>
                  <li>• Integrated payment processing systems</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-navy">Junior Developer</h4>
                    <p className="text-gray/70">StartUp Ventures</p>
                  </div>
                  <Badge className="bg-orange/10 text-orange border-0">2018 - 2020</Badge>
                </div>
                <ul className="space-y-1 text-gray/80">
                  <li>• Built responsive web applications</li>
                  <li>• Contributed to open-source projects</li>
                  <li>• Mastered modern JavaScript frameworks</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Education & Certifications */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-navy">
                <GraduationCap className="w-5 h-5 text-yellow" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <h4 className="text-navy">Bachelor of Science</h4>
                <p className="text-gray/70 mb-1">Computer Science</p>
                <p className="text-gray/70 mb-2">University Name, 2014 - 2018</p>
                <Badge variant="outline" className="border-yellow/50 text-yellow">
                  GPA: 3.8/4.0
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-navy">
                <Award className="w-5 h-5 text-orange" />
                Certifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {certifications.map((cert) => (
                  <li key={cert} className="flex items-start gap-2 text-gray/80">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange flex-shrink-0"></span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
