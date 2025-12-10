import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { ShoppingBag, User, Menu, X, Heart, LogOut, ChevronDown, LayoutDashboard } from 'lucide-react'
import Loader from './ui/Loader' // <--- 1. IMPORTAMOS TU LOADER (El del GIF)

export default function Navbar() {
  const { user, signOut } = useAuth()
  const { cartCount } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false) 
  const userMenuRef = useRef(null)
  const [showToast, setShowToast] = useState(false)
  
  // 2. ESTADO PARA SABER SI ESTAMOS CERRANDO SESIÓN
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  
  const navigate = useNavigate()

  const handleHeartClick = () => {
    if (user) {
      navigate('/favoritos')
    } else {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
  }

  // 3. LOGOUT CON EL GIF CUTE
  const handleSignOut = async () => {
    setIsUserMenuOpen(false) // Cerramos el menú
    setIsLoggingOut(true)    // Activamos el GIF
    
    // Esperamos 2 segundos para que se vea el loader bonito
    setTimeout(async () => {
        await signOut()
        setIsLoggingOut(false)
        navigate('/')
    }, 2000)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <>
      {/* 4. PANTALLA DE CARGA (OVERLAY) */}
      {isLoggingOut && (
        <div className="fixed inset-0 z-[9999] bg-white">
          <Loader />
        </div>
      )}

      {/* Toast Notificación */}
      <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-[70] transition-all duration-500 pointer-events-none ${showToast ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
        <div className="bg-white/90 backdrop-blur-md text-cherry-red px-6 py-3 rounded-full shadow-xl shadow-pink-200/50 flex items-center gap-3 border-2 border-cherry-pink">
          <Heart className="w-6 h-6 text-cherry-red fill-cherry-red animate-bounce drop-shadow-sm" strokeWidth={1.5} />
          <span className="font-body text-sm font-bold tracking-wide text-cherry-dark">Inicia sesión para guardar favoritos</span>
        </div>
      </div>

      {/* --- NAVBAR --- */}
      <div className="sticky top-2 md:top-6 z-50 px-2 md:px-0 transition-all duration-300">
        <nav className="container mx-auto bg-white/85 backdrop-blur-md rounded-full shadow-lg shadow-cherry-pink/20 border-2 border-cherry-pink/50 py-2 px-4 sm:px-8 md:px-10 max-w-5xl transition-all hover:shadow-cherry-pink/40">
          <div className="relative flex justify-between items-center h-16 md:h-20">
            
            {/* --- ZONA IZQUIERDA (SOLO MÓVIL) --- */}
            <div className="flex items-center gap-2 md:hidden z-20">
                <button className="text-cherry-red bg-cherry-bg p-2.5 rounded-full hover:bg-cherry-pink hover:text-white transition-all" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X size={22} strokeWidth={3} /> : <Menu size={22} strokeWidth={3} />}
                </button>
                <button onClick={handleHeartClick} className="text-cherry-red bg-cherry-bg p-2.5 rounded-full hover:bg-cherry-pink hover:text-white transition-all">
                  <Heart size={20} strokeWidth={2.5} className={user ? "fill-cherry-red" : ""} />
                </button>
            </div>

            {/* --- LOGO --- */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 md:static md:transform-none md:translate-x-0 md:translate-y-0 z-10">
              <Link to="/" className="flex items-center gap-2 group">
                <img 
                  src="/logo.png" 
                  alt="Miss Cherry" 
                  className="h-12 sm:h-16 md:h-20 w-auto object-contain drop-shadow-sm group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 ease-out" 
                />
              </Link>
            </div>

            {/* Links Centrales (SOLO PC) */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {['Inicio', 'Tienda', 'Nosotros'].map((item) => (
                <Link key={item} to={item === 'Inicio' ? '/' : `/${item.toLowerCase()}`} className="bg-cherry-bg border-2 border-cherry-pink/50 text-cherry-red px-5 py-1 rounded-full shadow-sm hover:shadow-md hover:shadow-pink-200 hover:scale-110 hover:bg-pink-100 transition-all duration-300 font-kawaii text-2xl lg:text-3xl pt-2">
                  {item}
                </Link>
              ))}
            </div>

            {/* --- ZONA DERECHA --- */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 z-20">
              
              {/* Favoritos (Solo PC) */}
              <button onClick={handleHeartClick} className="hidden md:block group p-2.5 rounded-full bg-cherry-bg hover:bg-cherry-pink/20 text-cherry-red transition-all duration-300 hover:scale-110 cursor-pointer">
                <Heart size={22} strokeWidth={2.5} className={`transition-transform ${user ? "fill-cherry-red scale-110" : "group-hover:scale-110"}`} />
              </button>

              <div className="h-6 w-0.5 bg-cherry-pink/30 rounded-full hidden md:block"></div>

              {/* Usuario Dropdown */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                    <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center gap-2 bg-cherry-bg px-2 py-1.5 pl-3 rounded-full border border-cherry-pink/30 hover:border-cherry-pink transition-colors group cursor-pointer">
                      <span className="text-sm font-bold font-body text-cherry-dark hidden md:block lowercase first-letter:uppercase truncate max-w-[100px]">{user.email.split('@')[0]}</span>
                      <div className="bg-white text-cherry-pink group-hover:text-cherry-red rounded-full p-1 w-6 h-6 flex items-center justify-center transition-all shadow-sm"><User size={14} strokeWidth={3} /></div>
                      <ChevronDown size={14} className={`text-cherry-dark transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-2xl border-2 border-cherry-pink shadow-xl shadow-cherry-pink/20 overflow-hidden animate-[fade-in-down_0.2s_ease-out]">
                      <div className="py-2">
                        <Link to="/perfil" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-cherry-dark hover:bg-cherry-bg hover:text-cherry-red transition-colors" onClick={() => setIsUserMenuOpen(false)}><LayoutDashboard size={18} />Mi Perfil</Link>
                        <div className="h-px bg-cherry-pink/20 mx-4 my-1"></div>
                        <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors text-left cursor-pointer"><LogOut size={18} />Cerrar Sesión</button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="bg-cherry-bg text-cherry-red p-2.5 rounded-full hover:bg-cherry-pink hover:text-white transition-all shadow-sm hover:scale-110 hover:-translate-y-0.5">
                  <User size={22} strokeWidth={2.5} />
                </Link>
              )}

              {/* Carrito PC */}
              <Link to="/carrito" className="hidden md:flex relative bg-cherry-red text-white p-2.5 rounded-2xl shadow-lg shadow-pink-200 hover:bg-pink-400 hover:scale-105 transition-all">
                <ShoppingBag size={20} strokeWidth={2.5} />
                <span className="absolute -top-1.5 -right-1.5 bg-yellow-300 text-cherry-red text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black border-2 border-white font-body">{cartCount}</span>
              </Link>
            </div>
          </div>

          {/* Menú Móvil */}
          {isMenuOpen && (
            <div className="md:hidden mt-2 pt-4 border-t-2 border-dashed border-pink-100 flex flex-col gap-3 text-center text-gray-500 font-kawaii animate-fade-in-down">
              {['Inicio', 'Tienda', 'Nosotros'].map((item) => (
                  <Link key={item} to={item === 'Inicio' ? '/' : `/${item.toLowerCase()}`} className="hover:text-cherry-red hover:bg-cherry-bg rounded-xl py-2 transition text-2xl" onClick={() => setIsMenuOpen(false)}>{item}</Link>
              ))}
              {user && <Link to="/perfil" className="hover:text-cherry-red hover:bg-cherry-bg rounded-xl py-2 transition text-2xl" onClick={() => setIsMenuOpen(false)}>Mi Perfil</Link>}
            </div>
          )}
        </nav>
      </div>

      {/* Carrito Móvil */}
      <Link to="/carrito" className="md:hidden fixed bottom-6 right-6 z-[60] bg-cherry-red text-white p-4 rounded-full shadow-2xl hover:bg-pink-400 active:scale-95 transition-all animate-bounce-slow border-4 border-white">
        <ShoppingBag size={28} strokeWidth={2.5} />
        <span className="absolute -top-1 -right-1 bg-yellow-300 text-cherry-red text-xs w-6 h-6 rounded-full flex items-center justify-center font-black border-2 border-white font-body shadow-sm">{cartCount}</span>
      </Link>
    </>
  )
}