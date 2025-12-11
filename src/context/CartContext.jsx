import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const { user } = useAuth()
  
  // AHORA GUARDAMOS LA LISTA COMPLETA, NO SOLO EL NÚMERO
  const [cart, setCart] = useState([]) 
  const [cartCount, setCartCount] = useState(0)
  const [loading, setLoading] = useState(true)

  // 1. Cargar el carrito completo cuando inicia sesión
  useEffect(() => {
    if (user) fetchCart()
    else {
      setCart([])
      setCartCount(0)
      setLoading(false)
    }
  }, [user])

  // Función Maestra: TRAER TODO EL CARRITO
  async function fetchCart() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('cart_items')
        .select('*, products(*)') // Traemos items + datos del producto
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      
      setCart(data || [])
      
      // Calculamos el total de items (sumando cantidades)
      const count = (data || []).reduce((acc, item) => acc + item.quantity, 0)
      setCartCount(count)

    } catch (error) {
      console.error('Error cargando carrito:', error)
    } finally {
      setLoading(false)
    }
  }

  // 2. AGREGAR AL CARRITO
  async function addToCart(product) {
    if (!user) return { error: 'Debes iniciar sesión 🔒' }

    try {
      // Revisamos si ya existe EN LA LISTA LOCAL (Más rápido que ir a Supabase)
      const existingItem = cart.find(item => item.product_id === product.id)

      if (existingItem) {
        // Actualizamos cantidad
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id)
        
        if (error) throw error
      } else {
        // Insertamos nuevo
        const { error } = await supabase
          .from('cart_items')
          .insert({ user_id: user.id, product_id: product.id, quantity: 1 })
        
        if (error) throw error
      }

      // IMPORTANTE: Recargamos la lista para que toda la app se entere
      await fetchCart()
      return { success: true }

    } catch (error) {
      console.error(error)
      return { error: 'Error al agregar' }
    }
  }

  // 3. BORRAR ITEM (Movido aquí para que sea global)
  async function removeFromCart(id) {
    const { error } = await supabase.from('cart_items').delete().eq('id', id)
    if (!error) await fetchCart() // Recargamos para actualizar UI
  }

  // 4. ACTUALIZAR CANTIDAD (Movido aquí)
  async function updateQuantity(id, currentQty, change) {
    const newQty = currentQty + change
    if (newQty < 1) return

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity: newQty })
      .eq('id', id)

    if (!error) await fetchCart() // Recargamos
  }

  return (
    <CartContext.Provider value={{ 
      cart,         // <--- ESTO FALTABA EXPORTAR
      cartCount, 
      loading,
      addToCart, 
      removeFromCart, 
      updateQuantity 
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)