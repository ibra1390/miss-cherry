import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext' // <--- Usamos todo desde aquí
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Cart() {
  const { user } = useAuth()
  // Extraemos todo del contexto global
  const { cart, loading, removeFromCart, updateQuantity } = useCart() 

  // Calculamos el total al vuelo
  const total = cart.reduce((acc, item) => acc + (item.products.price * item.quantity), 0)

  // VISTA: CARGANDO
  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
       <Loader2 className="animate-spin text-cherry-pink w-12 h-12" />
       <p className="font-kawaii text-2xl text-gray-400">Cargando tu bolsa mágica...</p>
    </div>
  )

  // VISTA: VACÍO
  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-20">
        <div className="bg-pink-50 p-8 rounded-full mb-6 animate-float">
          <ShoppingBag size={64} className="text-cherry-pink" />
        </div>
        <h2 className="font-kawaii text-5xl text-cherry-dark mb-4">Tu carrito está vacío ☁️</h2>
        <p className="font-body text-gray-500 mb-8 text-lg">Parece que aún no has elegido tus aromas favoritos.</p>
        <Link to="/tienda" className="bg-cherry-red text-white px-8 py-3 rounded-full font-bold font-kawaii text-2xl hover:bg-pink-400 transition hover:scale-105 shadow-lg shadow-pink-200">
          Ir a la Tienda
        </Link>
      </div>
    )
  }

  // VISTA: CON PRODUCTOS
  return (
    <div className="container mx-auto px-4 pt-32 pb-20 max-w-5xl min-h-screen">
      <h1 className="font-kawaii text-5xl text-cherry-dark mb-10 text-center md:text-left">
        Tu Bolsa Mágica ({cart.length}) 🛍️
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LISTA DE ITEMS */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 md:gap-6 bg-white p-4 rounded-[2rem] border border-pink-50 shadow-sm hover:shadow-md transition-all items-center">
              
              {/* Imagen */}
              <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-gray-50 rounded-2xl overflow-hidden border border-pink-100">
                <img src={item.products.image_url} alt={item.products.name} className="w-full h-full object-cover" />
              </div>

              {/* Info */}
              <div className="flex-grow">
                <h3 className="font-kawaii text-2xl md:text-3xl text-gray-800 truncate">{item.products.name}</h3>
                <p className="font-body text-gray-400 text-sm mb-2 italic">
                   {item.products.coleccion || "Clásica"}
                </p>
                <p className="font-bold text-cherry-red text-lg">${item.products.price}</p>
              </div>

              {/* Controles */}
              <div className="flex flex-col items-end gap-3">
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-300 hover:text-red-400 p-2 hover:bg-red-50 rounded-full transition"
                >
                  <Trash2 size={20} />
                </button>
                
                <div className="flex items-center gap-3 bg-cherry-bg px-3 py-1 rounded-full border border-pink-100">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity, -1)}
                    className="text-cherry-red hover:scale-125 transition disabled:opacity-30"
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={16} strokeWidth={3} />
                  </button>
                  <span className="font-bold font-body w-4 text-center text-cherry-dark">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity, 1)}
                    className="text-cherry-red hover:scale-125 transition"
                  >
                    <Plus size={16} strokeWidth={3} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* RESUMEN DE PAGO */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2.5rem] border-2 border-pink-100 shadow-xl shadow-pink-50 sticky top-24">
            <h3 className="font-kawaii text-4xl text-cherry-dark mb-6">Resumen 🧾</h3>
            
            <div className="space-y-4 mb-8 font-body text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total}</span>
              </div>
              <div className="flex justify-between text-green-500">
                <span>Envío</span>
                <span>Gratis ✨</span>
              </div>
              <div className="border-t border-dashed border-pink-200 pt-4 mt-4 flex justify-between items-center text-xl font-bold text-cherry-dark">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            <button className="w-full bg-cherry-red text-white font-kawaii text-2xl py-4 rounded-2xl shadow-lg shadow-pink-200 hover:bg-pink-400 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
              <span>Pagar Ahora</span>
              <ArrowRight size={24} />
            </button>
            
            <div className="mt-4 text-center">
               <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">🔒 Pago 100% Seguro</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}