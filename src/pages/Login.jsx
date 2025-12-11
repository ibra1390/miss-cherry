import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { Sparkles, ArrowRight, Mail, Lock, Loader2 } from 'lucide-react'

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    try {
      // CAMBIO 2: Agregamos un retraso de 2 segundos para apreciar el spinner cute
      await new Promise(resolve => setTimeout(resolve, 2000))

      let result
      if (isRegistering) {
        result = await signUp({ email, password })
      } else {
        result = await signIn({ email, password })
      }

      if (result.error) throw result.error
      navigate('/') 
    } catch (error) {
      setErrorMsg(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    // CAMBIOS DE LAYOUT (MANTENIDOS IGUAL):
    <div className="min-h-screen flex items-center justify-center bg-cherry-bg/50 px-4 relative overflow-hidden -mt-24 md:-mt-32 pt-24 md:pt-32">
      
      {/* --- TU DECORACIÓN ORIGINAL --- */}
      <div className="absolute top-10 left-10 text-pink-200 animate-float opacity-50"><Sparkles size={40}/></div>
      <div className="absolute bottom-10 right-10 text-purple-200 animate-float opacity-50" style={{animationDelay: '1s'}}><Sparkles size={60}/></div>

      {/* Tarjeta de Login */}
      <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-pink-100 border-4 border-white w-full max-w-md relative z-10 text-center transition-all hover:scale-[1.01]">
        
        {/* Encabezado */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-pink-100 shadow-sm animate-bounce-slow">
              <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain drop-shadow-sm hover:scale-110 transition"/>
          </div>
          <h1 className="font-kawaii text-5xl text-cherry-dark mb-2">
            {isRegistering ? 'Únete al Club' : '¡Hola de nuevo!'}
          </h1>
          <p className="font-body text-gray-400">
            {isRegistering ? 'Crea tu cuenta para guardar favoritos' : 'Ingresa para ver tus pedidos 📦'}
          </p>
        </div>

        {/* Mensaje de Error */}
        {errorMsg && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-400 text-sm rounded-xl font-bold font-body animate-pulse">
            {errorMsg}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          
          {/* INPUT CORREO  */}
          <div className="group">
            <label className="block text-xs font-bold text-cherry-pink uppercase tracking-wider mb-2 ml-4">Tu Correo</label>
            <div className="relative transition-all group-focus-within:scale-105">
              <div className="absolute left-4 top-3.5 bg-pink-50 p-1 rounded-full text-cherry-pink">
                 <Mail size={16} />
              </div>
              <input 
                type="email" 
                required
                className="w-full bg-white border-2 border-pink-100 focus:border-cherry-pink focus:ring-4 focus:ring-pink-100/50 rounded-full py-3 pl-12 pr-4 outline-none transition-all font-body text-gray-600 placeholder:text-gray-300 shadow-sm"
                placeholder="nombre@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* INPUT PASSWORD  */}
          <div className="group">
            <label className="block text-xs font-bold text-cherry-pink uppercase tracking-wider mb-2 ml-4">Contraseña</label>
            <div className="relative transition-all group-focus-within:scale-105">
              <div className="absolute left-4 top-3.5 bg-pink-50 p-1 rounded-full text-cherry-pink">
                 <Lock size={16} />
              </div>
              <input 
                type="password" 
                required
                className="w-full bg-white border-2 border-pink-100 focus:border-cherry-pink focus:ring-4 focus:ring-pink-100/50 rounded-full py-3 pl-12 pr-4 outline-none transition-all font-body text-gray-600 placeholder:text-gray-300 shadow-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* BOTÓN CON SPINNER */}
          <button 
            disabled={loading}
            className="w-full bg-cherry-red text-white font-kawaii text-2xl py-3 rounded-2xl shadow-lg shadow-pink-200 hover:bg-pink-400 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 mt-8 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : (isRegistering ? 'Crear Cuenta' : 'Entrar')}
            {!loading && <ArrowRight size={20} strokeWidth={3} />}
          </button>

        </form>

        {/* Switch Login/Registro */}
        <div className="mt-8 pt-6 border-t-2 border-dashed border-pink-50">
          <p className="font-body text-gray-400 text-sm">
            {isRegistering ? '¿Ya tienes cuenta?' : '¿Eres nuevo por aquí?'}
            <button 
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-cherry-red font-bold ml-2 hover:text-pink-600 transition cursor-pointer"
            >
              {isRegistering ? 'Inicia Sesión' : 'Regístrate Gratis'}
            </button>
          </p>
        </div>

        <div className="mt-4">
            <Link to="/" className="text-gray-300 text-xs font-bold hover:text-gray-500 transition group flex items-center justify-center gap-1">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Volver al inicio
            </Link>
        </div>

      </div>
    </div>
  )
}