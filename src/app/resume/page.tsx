import { Download, Code, Briefcase, GraduationCap, Award } from 'lucide-react';
import { Button } from '@/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Badge } from '@/components/badge';

export default function ResumePage() {
  const resumeUrl = '/resume.pdf';
  const skills = {
    'Frontend': ['Next.js', 'Tailwind CSS', 'HTML/CSS/JS'],
    'Backend': ['Python', 'Django'],
    'Database': ['MySQL', 'Databricks'],
    'DevOps': ['Docker', 'AWS', 'Gitlab CI/CD'],
    'Tools': ['Git', 'VS Code', 'Jira', 'Figma', 'Postman', 'Linux', 'Arduino', 'Raspberry Pi', '3D Printing', 'CAD (Fusion 360/Solidworks)'],
  };

  const certifications = [
    'Design Thinker - dthinking academy (2022)',
    'Amateur Radio Operator - ANFR (2025)',
    'Karate - 1st Dan (2023)',
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
          <Button asChild className="bg-orange hover:bg-orange/90 text-white">
            <a href={resumeUrl} download aria-label="Download my resume as PDF">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </a>
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
              Creative and forward-thinking engineering student at ESILV – Léonard de Vinci Engineering School (France),  
              majoring in Creative Technology, with international experience in Electrical Engineering at Hanyang University (Seoul).  
              Driven by a strong appetite for R&D, prototyping, and innovation,  
              combining technical rigor with a maker mindset to bring ideas from concept to functional prototype.  
              Hands-on experience in software development, data science, and embedded systems.  
              Skilled in Python, C#, JavaScript, and C++, and comfortable bridging hardware and software to design practical, high-value solutions.
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
                    <h4 className="text-navy">Junior Developper</h4>
                    <p className="text-gray/70">Vallourec</p>
                  </div>
                  <Badge className="bg-green/10 text-green border-0">2020 - 2021</Badge>
                </div>
                <ul className="space-y-1 text-gray/80">
                  <li>• Created a tool from scratch for industrial sites in record time as CI/CD</li>
                </ul>
              </div>
              
              {/*Add more experience entries as needed*/}

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
                <h4 className="text-navy">Master of Engineering</h4>
                <p className="text-gray/70 mb-1">Computer science</p>
                <p className="text-gray/70 mb-2">ESILV, 2021 - 2026</p>
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
