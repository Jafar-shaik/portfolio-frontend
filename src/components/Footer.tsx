import { Github, Linkedin, Instagram, Heart } from "lucide-react";



const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/jafar-shaik-8a652b338/",
      label: "LinkedIn"
    },
    {
      icon: Github,
      href: "https://github.com/Jafar-shaik",
      label: "GitHub"
    },
    {
      icon: Instagram,
       href: "https://www.instagram.com/shaik_jafar.____/?utm_source=ig_profile_share&igsh=MzRlODBiNWFlZA==",
      label: "Twitter"
    }
  ];

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-8">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                aria-label={link.label}
              >
                <link.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
          
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <span>© {currentYear} Shaik Jafar. Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>and lots of ☕</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
