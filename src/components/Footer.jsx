import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Heart, Mail, MapPin, Phone, Send, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-32 bg-gradient-to-b from-cherry-bg via-white to-cherry-bg pt-32 pb-10 overflow-hidden">
      
      {/* --- DECORACIÓN SUPERIOR (EFECTO NUBE/CREMA) --- */}
      <div className="absolute top-0 left-0 w-full rotate-180 leading-none">
        <svg className="relative block w-full h-[80px] md:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
           {/* La forma de la ola rellena de blanco para cortar el fondo */}
           <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>

      {/* --- ELEMENTOS FLOTANTES DE FONDO (DECORACIÓN) --- */}
      <div className="absolute top-1/4 left-10 opacity-20 animate-bounce delay-700 pointer-events-none text-cherry-red">
         <Sparkles size={40} />
      </div>
      <div className="absolute bottom-1/3 right-10 opacity-20 animate-pulse pointer-events-none text-cherry-pink">
         <Heart size={60} fill="currentColor" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-16 text-center md:text-left">
          
          {/* 1. BRANDING & LOGO */}
          <div className="flex flex-col items-center md:items-start md:col-span-1">
             <Link to="/" className="flex items-center gap-2 mb-4 group hover:scale-105 transition-transform">
                <img src="/logo.png" alt="Logo" className="h-16 w-auto object-contain drop-shadow-sm" />
                <span className="font-kawaii text-4xl text-cherry-red pt-2 group-hover:text-cherry-pink transition-colors">Miss Cherry</span>
             </Link>
             <p className="text-cherry-dark/70 font-body text-sm leading-relaxed">
               Llenando tu vida de dulzura y aromas mágicos. ✨ <br/> 
               ¡Hecho a mano con mucho amor!
             </p>
          </div>

          {/* 2. LINKS RÁPIDOS */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-kawaii text-2xl text-cherry-red mb-6 relative inline-block">
              Explora
              {/* Subrayado cute */}
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-200 rounded-full opacity-60"></span>
            </h3>
            <ul className="space-y-3 font-body text-cherry-dark/80 font-medium">
              {['Inicio', 'Tienda', 'Nosotros', 'Mi Cuenta'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Inicio' ? '/' : `/${item.toLowerCase().replace(' ', '')}`} 
                    className="hover:text-cherry-red hover:pl-2 transition-all flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">🍒</span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. CONTACTO */}
          <div className="flex flex-col items-center md:items-start">
             <h3 className="font-kawaii text-2xl text-cherry-red mb-6 relative inline-block">
               Contacto
               <span className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-200 rounded-full opacity-60"></span>
             </h3>
             <ul className="space-y-4 text-sm text-cherry-dark/80 font-body">
                <li className="flex items-center gap-3 hover:text-cherry-red transition-colors cursor-pointer bg-white/50 py-2 px-4 rounded-full shadow-sm border border-pink-100">
                  <MapPin size={18} className="text-cherry-red" /> 
                  <span>Calle Dulzura #123</span>
                </li>
                <li className="flex items-center gap-3 hover:text-cherry-red transition-colors cursor-pointer bg-white/50 py-2 px-4 rounded-full shadow-sm border border-pink-100">
                  <Mail size={18} className="text-cherry-red" /> 
                  <span>hola@misscherry.com</span>
                </li>
             </ul>
          </div>

          {/* 4. NEWSLETTER & SOCIALS */}
          <div className="flex flex-col items-center md:items-start">
             <h3 className="font-kawaii text-2xl text-cherry-red mb-4">¡Únete al Club! 💌</h3>
             <p className="text-xs text-cherry-dark/60 mb-4 font-body">Recibe descuentos y noticias dulces.</p>
             
             {/* Input Kawaii */}
             <div className="flex w-full bg-white rounded-full p-1 shadow-md border-2 border-cherry-pink/30 mb-6">
                <input 
                  type="email" 
                  placeholder="Tu correo..." 
                  className="w-full bg-transparent px-4 py-2 text-sm text-cherry-dark outline-none placeholder:text-cherry-pink/50 font-body"
                />
                <button className="bg-cherry-red text-white rounded-full p-2 hover:bg-cherry-pink transition-colors shadow-sm">
                  <Send size={18} />
                </button>
             </div>

             {/* Redes Sociales (Burbujas) */}
             <div className="flex gap-3">
               {[Facebook, Instagram, Twitter].map((Icon, i) => (
                 <a 
                   key={i} 
                   href="#" 
                   className="bg-white p-3 rounded-full text-cherry-red shadow-md border-2 border-transparent hover:border-cherry-pink hover:bg-cherry-bg hover:-translate-y-1 hover:rotate-6 transition-all duration-300"
                 >
                   <Icon size={20} strokeWidth={2.5} />
                 </a>
               ))}
             </div>
          </div>
        </div>

        {/* --- BARRA INFERIOR --- */}
        <div className="border-t-2 border-dashed border-cherry-pink/30 pt-8 text-center relative">
          <p className="text-cherry-dark/60 text-sm font-body font-bold flex flex-col md:flex-row items-center justify-center gap-2">
            <span>© {new Date().getFullYear()} Miss Cherry.</span>
            <span className="hidden md:block text-cherry-pink">•</span> 
            <span className="flex items-center gap-1">
              Hecho con <Heart size={14} className="fill-cherry-red text-cherry-red animate-bounce" /> y mucho café
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}