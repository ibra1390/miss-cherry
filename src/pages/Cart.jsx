import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Cart() {
  const { user } = useAuth()
  const { fetchCartCount } = useCart() // Para actualizar el numerito rojo al borrar
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (user) getCart()
  }, [user])

  async function getCart() {
    try {
      // Magia de Supabase: Traemos los items Y los datos del producto juntos
      const { data, error } = await supabase
        .from('cart_items')
        .select('*, products(*)') // <--- El * trae todo de cart_items, products(*) une la otra tabla
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setItems(data || [])
      calculateTotal(data)
    } catch (error) {
      console.error('Error cargando carrito:', error)
    } finally {
      setLoading(false)
    }
  }

  function calculateTotal(cartItems) {
    if (!cartItems) return
    const sum = cartItems.reduce((acc, item) => {
      return acc + (item.products.price * item.quantity)
    }, 0)
    setTotal(sum)
  }

  // Función para borrar item
  async function removeItem(id) {
    const { error } = await supabase.from('cart_items').delete().eq('id', id)
    if (!error) {
      // Actualizamos la lista localmente para que se sienta rápido
      const newItems = items.filter(item => item.id !== id)
      setItems(newItems)
      calculateTotal(newItems)
      fetchCartCount() // Actualizamos el numerito del navbar
    }
  }

  // Función para cambiar cantidad (+ o -)
  async function updateQuantity(id, currentQty, change) {
    const newQty = currentQty + change
    if (newQty < 1) return // No dejar bajar de 1

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity: newQty })
      .eq('id', id)

    if (!error) {
      // Actualizamos visualmente
      const newItems = items.map(item => 
        item.id === id ? { ...item, quantity: newQty } : item
      )
      setItems(newItems)
      calculateTotal(newItems)
    }
  }

  if (loading) return <div className="text-center py-20 font-kawaii text-3xl text-gray-400">Cargando tu bolsa mágica... 🪄</div>

  // VISTA: CARRITO VACÍO
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-pink-50 p-8 rounded-full mb-6 animate-float">
          <ShoppingBag size={64} className="text-cherry-pink" />
        </div>
        <h2 className="font-kawaii text-5xl text-cherry-dark mb-4">Tu carrito está vacío ☁️</h2>
        <p className="font-body text-gray-500 mb-8 text-lg">Parece que aún no has elegido tus aromas favoritos.</p>
        <Link to="/" className="bg-cherry-red text-white px-8 py-3 rounded-full font-bold font-kawaii text-2xl hover:bg-pink-400 transition hover:scale-105 shadow-lg shadow-pink-200">
          Ir a la Tienda
        </Link>
      </div>
    )
  }

  // VISTA: CON PRODUCTOS
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="font-kawaii text-5xl text-cherry-dark mb-10 text-center md:text-left">
        Tu Bolsa Mágica ({items.length}) 🛍️
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LISTA DE ITEMS (Izquierda) */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 md:gap-6 bg-white p-4 rounded-[2rem] border border-pink-50 shadow-sm hover:shadow-md transition-all items-center">
              
              {/* Imagen */}
              <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-gray-50 rounded-2xl overflow-hidden border border-pink-100">
                <img src={item.products.image_url} alt={item.products.name} className="w-full h-full object-cover" />
              </div>

              {/* Info */}
              <div className="flex-grow">
                <h3 className="font-kawaii text-2xl md:text-3xl text-gray-800 truncate">{item.products.name}</h3>
                <p className="font-body text-gray-400 text-sm mb-2">{item.products.scent || "Aroma sorpresa"}</p>
                <p className="font-bold text-cherry-red text-lg">${item.products.price}</p>
              </div>

              {/* Controles (Cantidad y Borrar) */}
              <div className="flex flex-col items-end gap-3">
                <button 
                  onClick={() => removeItem(item.id)}
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

        {/* RESUMEN DE PAGO (Derecha) */}
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