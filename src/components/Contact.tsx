// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { useToast } from "@/hooks/use-toast";
// import { Mail, Phone, MapPin } from "lucide-react";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: ""
//   });
//   const { toast } = useToast();

//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   try {
//     const response = await fetch("http://localhost:8080/api/contact", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });

//     if (response.ok) {
//       toast({
//         title: "Message sent!",
//         description: "Thank you for your message. I'll get back to you soon.",
//       });
//       setFormData({ name: "", email: "", message: "" });
//     } else {
//       toast({
//         title: "Error sending message",
//         description: "Please try again later.",
//         variant: "destructive",
//       });
//     }
//   } catch (error) {
//     toast({
//       title: "Network error",
//       description: "Could not connect to the server.",
//       variant: "destructive",
//     });
//   }
// };


//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <section id="contact" className="py-20 bg-muted/30">
//       <div className="container mx-auto px-4">
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
//             Get In <span className="hero-text-gradient">Touch</span>
//           </h2>
          
//           <div className="grid md:grid-cols-2 gap-12">
//             {/* Contact Info */}
//             <div>
//               <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
//               <p className="text-muted-foreground mb-8 leading-relaxed">
//                 I'm always interested in hearing about new opportunities, 
//                 interesting projects, or just having a chat about technology. 
//                 Feel free to reach out!
//               </p>
              
//               <div className="space-y-4">
//                 <div className="flex items-center gap-4">
//                   <div className="p-3 rounded-lg skill-badge">
//                     <Mail className="h-5 w-5" />
//                   </div>
//                    <div>
//                      <p className="font-medium">Email</p>
//                      <p className="text-muted-foreground">skjafar4944@gmail.com</p>
//                    </div>
//                  </div>
                 
//                  <div className="flex items-center gap-4">
//                    <div className="p-3 rounded-lg skill-badge">
//                      <Phone className="h-5 w-5" />
//                    </div>
//                    <div>
//                      <p className="font-medium">Phone</p>
//                      <p className="text-muted-foreground">+91 9963909554</p>
//                    </div>
//                  </div>
                 
//                  <div className="flex items-center gap-4">
//                    <div className="p-3 rounded-lg skill-badge">
//                      <MapPin className="h-5 w-5" />
//                    </div>
//                    <div>
//                      <p className="font-medium">Location</p>
//                      <p className="text-muted-foreground">Guntur, Andhra Pradesh</p>
//                    </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Contact Form */}
//             <div>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <Label htmlFor="name">Name</Label>
//                   <Input
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="focus-ring"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="focus-ring"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <Label htmlFor="message">Message</Label>
//                   <Textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     className="min-h-[120px] focus-ring"
//                     required
//                   />
//                 </div>
                
//                 <Button 
//                   type="submit" 
//                   className="w-full hero-gradient text-white hover:scale-105 transition-transform"
//                 >
//                   Send Message
//                 </Button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;





import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true); // start animation

    try {
      const response = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({ title: "Message sent!", description: "Thank you! I'll get back soon." });
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast({ title: "Error sending", description: "Try again later.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Network error", description: "Could not connect.", variant: "destructive" });
    } finally {
      setIsSending(false); // stop animation
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Get In <span className="hero-text-gradient">Touch</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I'm always interested in hearing about new opportunities or projects. Feel free to reach out!
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg skill-badge"><Mail className="h-5 w-5" /></div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">skjafar4944@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg skill-badge"><Phone className="h-5 w-5" /></div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">+91 9963909554</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg skill-badge"><MapPin className="h-5 w-5" /></div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">Guntur, Andhra Pradesh</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6 relative">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} className="focus-ring" required />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="focus-ring" required />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} className="min-h-[120px] focus-ring" required />
                </div>

                <Button
  type="submit"
  className={`w-full hero-gradient text-white relative overflow-hidden ${
    isSending
      ? "animate-shake-shine shadow-xl bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%]"
      : "hover:scale-105"
  }`}
  disabled={isSending}
>
  {isSending ? "Sending ...." : "Send Message"}
</Button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
