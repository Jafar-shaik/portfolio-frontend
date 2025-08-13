
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [quote, setQuote] = useState<string>("Loading quote...");

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchQuote = async () => {
  try {
    const res = await fetch("http://localhost:8080/api/quote"); // backend port

    if (!res.ok) throw new Error("Failed to fetch quote");

    const data = await res.text();
    setQuote(data);
  } catch (err) {
    console.error("Error fetching quote:", err);
    setQuote("❌ Could not load quote");
  }
};



  useEffect(() => {
  // Fetch immediately on page load
  fetchQuote();

  const scheduleNextFetch = () => {
    const now = new Date();

    // Find next Sunday
    const nextSunday = new Date(now);
    nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7));
    nextSunday.setHours(9, 0, 0, 0); // 9:00 AM sharp

    // If current time is already past Sunday 9 AM, move to next week
    if (now > nextSunday) {
      nextSunday.setDate(nextSunday.getDate() + 7);
    }

    const msUntilNextSunday = nextSunday.getTime() - now.getTime();

    console.log(`Next quote refresh: ${nextSunday.toLocaleString()}`);

    setTimeout(() => {
      fetchQuote(); // Fetch at scheduled time
      scheduleNextFetch(); // Schedule next week's fetch
    }, msUntilNextSunday);
  };

  scheduleNextFetch();
}, []);




  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
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
            className="hero-gradient text-white hover:scale-105 transition-transform duration-300 shadow-lg mb-4"
          >
            View My Work
          </Button>

          {/* Quote section */}
{/* Quote section */}
<p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto 
   text-gray-800 dark:text-gray-200">
  <span className="font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
    dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300 
    bg-clip-text text-transparent">
    This week's quote:
  </span>{" "}
  "{quote}"
</p>



        </div>
      </div>
    </section>
  );
};

export default Hero;
