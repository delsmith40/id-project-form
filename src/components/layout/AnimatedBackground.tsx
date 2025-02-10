
import { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7", // Code on screen
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b", // Laptop computer
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", // Programming
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085", // MacBook with code
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742", // Modern building
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa", // Digital abstract
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c", // Team working
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd", // Code closeup
  "https://images.unsplash.com/photo-1551434678-e076c223a692", // Developer team
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f"  // Tech workspace
];

export function AnimatedBackground() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 500); // Half of the fade duration
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ 
          backgroundImage: `url("${images[currentImageIndex]}")`,
          filter: 'brightness(0.4)'
        }} 
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-950/70 animate-fade-in" />
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.02] bg-[size:3rem_3rem] animate-fade-in delay-200" />
    </>
  );
}
