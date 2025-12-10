import { useEffect } from 'react'; 
import { Outlet, useLocation } from 'react-router-dom'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout() {
  const { pathname } = useLocation(); // <--- 3. Obtenemos la ruta actual (ej: '/tienda')
  // Este código se ejecuta cada vez que 'pathname' cambia.
  useEffect(() => {
    window.scrollTo(0, 0); // Manda el scroll a coordenadas X:0, Y:0 (Arriba a la izquierda)
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}