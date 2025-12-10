import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { Sparkles, ArrowRight, Mail, Lock, Loader } from 'lucide-react'

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false) // ¿Está en modo registro?
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
      let result
      if (isRegistering) {
        result = await signUp({ email, password })
      } else {
        result = await signIn({ email, password })
      }

      if (result.error) throw result.error
      
      // Si todo sale bien, nos vamos a la tienda
      navigate('/') 
    } catch (error) {
      setErrorMsg(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-cherry-bg/50 px-4 relative overflow-hidden">
      
      {/* Decoración de fondo */}
      <div className="absolute top-10 left-10 text-pink-200 animate-float opacity-50"><Sparkles size={40}/></div>
      <div className="absolute bottom-10 right-10 text-purple-200 animate-float opacity-50" style={{animationDelay: '1s'}}><Sparkles size={60}/></div>

      {/* Tarjeta de Login */}
      <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-pink-100 border-4 border-white w-full max-w-md relative z-10 text-center">
        
        {/* Encabezado */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-pink-100">
             <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain drop-shadow-sm hover:scale-110 transition"/>
          </div>
          <h1 className="font-kawaii text-5xl text-cherry-dark mb-2">
            {isRegistering ? 'Únete al Club' : '¡Holis de nuevo!'}
          </h1>
          <p className="font-body text-gray-400">
            {isRegistering ? 'Crea tu cuenta para guardar favoritos 💖' : 'Ingresa para ver tus pedidos 🕯️'}
          </p>
        </div>

        {/* Mensaje de Error */}
        {errorMsg && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-400 text-sm rounded-xl font-bold font-body animate-pulse">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          <div className="group">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 ml-4">Tu Correo</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-300 group-hover:text-cherry-pink transition" size={20} />
              <input 
                type="email" 
                required
                className="w-full bg-gray-50 border-2 border-transparent focus:border-cherry-pink focus:bg-white rounded-2xl py-3 pl-12 pr-4 outline-none transition-all font-body text-gray-600"
                placeholder="nombre@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 ml-4">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-300 group-hover:text-cherry-pink transition" size={20} />
              <input 
                type="password" 
                required
                className="w-full bg-gray-50 border-2 border-transparent focus:border-cherry-pink focus:bg-white rounded-2xl py-3 pl-12 pr-4 outline-none transition-all font-body text-gray-600"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-cherry-red text-white font-kawaii text-2xl py-3 rounded-2xl shadow-lg shadow-pink-200 hover:bg-pink-400 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader className="animate-spin" /> : (isRegistering ? 'Crear Cuenta' : 'Entrar Ahora')}
            {!loading && <ArrowRight size={20} strokeWidth={3} />}
          </button>

        </form>

        {/* Switch Login/Registro */}
        <div className="mt-8 pt-6 border-t border-pink-50">
          <p className="font-body text-gray-400 text-sm">
            {isRegistering ? '¿Ya tienes cuenta?' : '¿Eres nueva por aquí?'}
            <button 
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-cherry-red font-bold ml-2 hover:underline hover:text-pink-600 transition"
            >
              {isRegistering ? 'Inicia Sesión' : 'Regístrate Gratis'}
            </button>
          </p>
        </div>

        <div className="mt-4">
            <Link to="/" className="text-gray-300 text-xs font-bold hover:text-gray-500 transition">
                ← Volver al inicio
            </Link>
        </div>

      </div>
    </div>
  )
}