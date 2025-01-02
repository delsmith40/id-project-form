export function Header() {
  return (
    <div className="relative py-8 bg-background/80 backdrop-blur-sm border-b z-10">
      <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 animate-fade-in">
        Covington Instructional Design
        <span className="block text-2xl mt-2 text-foreground/80 animate-fade-in [animation-delay:200ms]">
          Project Form
        </span>
      </h1>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 rounded-full animate-fade-in [animation-delay:400ms]" />
    </div>
  );
}