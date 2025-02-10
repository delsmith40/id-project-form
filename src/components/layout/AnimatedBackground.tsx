
export function AnimatedBackground() {
  return (
    <>
      <div 
        className="absolute inset-0 bg-cover bg-center animate-scale-in" 
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7")',
          filter: 'brightness(0.4)'
        }} 
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-950/70 animate-fade-in" />
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.02] bg-[size:3rem_3rem] animate-fade-in delay-200" />
    </>
  );
}
