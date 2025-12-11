import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext' 
// Importamos nuestro nuevo Hook
import { useOrder } from '../hooks/useOrder' 
import { Trash2, Plus, Minus, MessageCircle, ShoppingBag, Loader2, CheckCircle, ArrowRight, Package } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/format'

export default function Cart() {
  const { user } = useAuth()
  const { cart, loading, removeFromCart, updateQuantity } = useCart() 
  // Usamos el hook para la lógica de negocio
  const { isProcessing, orderSuccess, handleCreateOrder, sendToWhatsapp } = useOrder()

  const total = cart.reduce((acc, item) => acc + (item.products.price * item.quantity), 0)

  // --- VISTAS (Igual que antes, solo que el código está más ordenado) ---

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
       <Loader2 className="animate-spin text-cherry-pink w-12 h-12" />
       <p className="font-kawaii text-2xl text-gray-400">Cargando...</p>
    </div>
  )

  if (orderSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in-up">
        <div className="bg-green-100 p-6 rounded-full mb-6 shadow-sm animate-bounce-slow">
          <CheckCircle size={80} className="text-green-500" strokeWidth={1.5} />
        </div>
        <h2 className="font-kawaii text-5xl text-cherry-dark mb-4">¡Pedido Creado! 🎉</h2>
        <p className="font-body text-gray-500 mb-8 text-xl max-w-md">
          Tu orden <b>#{orderSuccess.id}</b> ya está registrada.<br/>
          Envíanos mensaje para coordinar el envío.
        </p>
        <button 
          onClick={sendToWhatsapp}
          className="bg-green-500 text-white px-8 py-4 rounded-full font-bold font-kawaii text-2xl hover:bg-green-600 transition hover:scale-105 shadow-xl shadow-green-200 flex items-center gap-3 animate-pulse cursor-pointer"
        >
          <MessageCircle size={28} /> Enviar WhatsApp
        </button>
        <Link to="/tienda" className="mt-8 text-gray-400 underline hover:text-cherry-red transition">Volver a la tienda</Link>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-20">
        <div className="bg-pink-50 p-8 rounded-full mb-6 animate-float">
          <ShoppingBag size={64} className="text-cherry-pink" />
        </div>
        <h2 className="font-kawaii text-5xl text-cherry-dark mb-4">Tu carrito está vacío</h2>
        <Link to="/tienda" className="bg-cherry-red text-white px-8 py-3 rounded-full font-bold font-kawaii text-2xl hover:bg-pink-400 transition hover:scale-105 shadow-lg shadow-pink-200">
          Ir a la Tienda
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 pt-32 pb-20 max-w-5xl min-h-screen">
      <h1 className="font-kawaii text-5xl text-cherry-dark mb-10 text-center md:text-left flex items-center justify-center md:justify-start gap-3">
        Tu Bolsa ({cart.length})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LISTA DE ITEMS */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-5 bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm items-center">
              
              <div className="w-full sm:w-28 h-28 flex-shrink-0 bg-gray-50 rounded-2xl overflow-hidden">
                <img src={item.products.image_url} alt={item.products.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-grow flex flex-col justify-center text-center sm:text-left w-full">
                <h3 className="font-kawaii text-2xl text-gray-800 mb-1">{item.products.name}</h3>
                <p className="font-body text-gray-400 text-sm mb-1 uppercase tracking-wider">
                   {item.products.coleccion}
                </p>
                <p className="font-bold text-cherry-red text-xl">
                    {formatPrice(item.products.price)}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                  <button onClick={() => updateQuantity(item.id, item.quantity, -1)} disabled={item.quantity <= 1} className="text-gray-400 hover:text-cherry-red transition-colors cursor-pointer"><Minus size={16} /></button>
                  <span className="font-bold w-4 text-center text-gray-700">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity, 1)} className="text-gray-400 hover:text-cherry-red transition-colors cursor-pointer"><Plus size={16} /></button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="p-2 text-gray-300 hover:text-red-400 transition-colors cursor-pointer" title="Eliminar"><Trash2 size={20} /></button>
              </div>
            </div>
          ))}
        </div>

        {/* RESUMEN DE PAGO */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-lg sticky top-28">
            <h3 className="font-kawaii text-3xl text-cherry-dark mb-6">Resumen</h3>
            <div className="space-y-3 mb-8 font-body text-gray-600">
              <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <span className="font-bold text-gray-800">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-500 bg-gray-50 p-2 rounded-lg">
                <span className="flex items-center gap-1 text-sm"><Package size={14}/> Envío</span>
                <span className="font-bold text-sm text-cherry-pink">Por acordar</span>
              </div>
              <div className="border-t border-dashed border-gray-200 pt-4 mt-4 flex justify-between items-center text-2xl font-kawaii text-cherry-dark">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <p className="text-[10px] text-center text-gray-400">* El costo de envío se sumará al acordar la entrega.</p>
            </div>

            <button 
              onClick={handleCreateOrder}
              disabled={isProcessing}
              className="w-full bg-cherry-red text-white font-kawaii text-xl py-4 rounded-2xl shadow-lg shadow-pink-200 hover:bg-pink-500 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isProcessing ? (
                <> <Loader2 className="animate-spin" /> Procesando... </>
              ) : (
                <> <span>Confirmar Reserva</span> <ArrowRight size={24} /> </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}