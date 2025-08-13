import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient opacity-10"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="hero-text-gradient">Jafar Shaik</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Computer Science (IoT) Student & Java Developer building smart solutions for tomorrow
          </p>
          <Button 
            onClick={scrollToProjects}
            size="lg" 
            className="hero-gradient text-white hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            View My Work
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;