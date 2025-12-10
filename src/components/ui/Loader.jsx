export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-20 h-full w-full bg-white/50 backdrop-blur-sm">
      
      <div className="relative">
        <div className="absolute inset-0 bg-pink-200 blur-2xl rounded-full opacity-60 animate-pulse"></div>
        <img 
          src="/loader.gif" 
          alt="Cargando..." 
          className="w-72 h-auto object-contain relative z-10 mix-blend-multiply" 
        />
      </div>

      <p className="mt-2 font-kawaii text-2xl text-cherry-red animate-pulse tracking-wider">
        Cargando...
      </p>
    </div>
  );
}