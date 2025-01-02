export function AnimatedBackground() {
  return (
    <>
      <div 
        className="absolute inset-0 bg-cover bg-center animate-ken-burns" 
        style={{ 
          backgroundImage: 'url("/lovable-uploads/045b8846-3861-481e-91d4-b99d5db55d3a.png")',
          filter: 'brightness(0.3)'
        }} 
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/90 to-slate-950/70" />
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.02] bg-[size:3rem_3rem]" />
    </>
  );
}