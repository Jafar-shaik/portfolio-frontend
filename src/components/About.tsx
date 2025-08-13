import { useEffect, useRef } from "react";
import { Code, Smartphone, Palette, Database, Globe, Zap } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skills = entry.target.querySelectorAll('.skill-item');
            skills.forEach((skill, index) => {
              setTimeout(() => {
                skill.classList.add('slide-up');
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = [
    { icon: Code, name: "Java Development", description: "Core Java + Advanced" },
    { icon: Database, name: "Spring Boot", description: "REST APIs, Spring Security, Transactions" },
    { icon: Database, name: "MongoDB", description: "Schema design, Aggregations, MongoTemplate" },
    { icon: Globe, name: "Web Technologies", description: "HTML, CSS, JavaScript" },
    { icon: Zap, name: "API Integration", description: "External APIs & Web Services" },
    { icon: Smartphone, name: "IoT & Problem Solving", description: "IoT Systems & Data Structures" }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            About <span className="hero-text-gradient">Me</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="text-center md:text-left">
              <img 
                src={profilePhoto} 
                alt="Jafar Shaik Profile" 
                className="w-64 h-64 rounded-full mx-auto md:mx-0 object-cover shadow-xl border-4 border-white/10"
              />
            </div>
            
            <div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Hi, I'm Jafar Shaik 👋 I'm a passionate and curious Computer Science (IoT) student at 
                Vasireddy Venkatadri Institute of Technology, currently in my 3rd year. I love building 
                smart, efficient, and user-friendly applications that solve real-world problems.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I enjoy combining backend logic with clean, intuitive frontends, and I'm constantly 
                exploring new tools, frameworks, and design patterns to improve my work. When I'm not 
                coding, you can find me exploring the latest tech trends or working on side projects.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-center mb-8">Skills & Expertise</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="skill-item p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-all duration-300 opacity-0 translate-y-8"
                >
                  <div className="flex items-center mb-3">
                    <div className="p-2 rounded-lg skill-badge mr-3">
                      <skill.icon className="h-6 w-6" />
                    </div>
                    <h4 className="font-semibold">{skill.name}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;