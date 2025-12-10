import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const { user } = useAuth()
  const [cartCount, setCartCount] = useState(0)

  // 1. Cargar el carrito cuando el usuario inicia sesión
  useEffect(() => {
    if (user) fetchCartCount()
    else setCartCount(0) // Si no hay usuario, carrito en 0
  }, [user])

  // Función para contar cuántos items hay (para la burbuja roja)
  async function fetchCartCount() {
    const { count } = await supabase
      .from('cart_items')
      .select('*', { count: 'exact', head: true }) // head: true significa "solo cuenta, no traigas datos"
      .eq('user_id', user.id)
    
    setCartCount(count || 0)
  }

  // 2. Función Estrella: AGREGAR AL CARRITO
  async function addToCart(product) {
    if (!user) return { error: 'Debes iniciar sesión 🔒' }

    try {
      // A. Revisar si ya tienes esta vela en el carrito
      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', product.id)
        .single()

      if (existingItem) {
        // B. Si ya existe, le sumamos +1 a la cantidad
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id)
        
        if (error) throw error
      } else {
        // C. Si es nueva, creamos la fila
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: product.id,
            quantity: 1
          })
        
        if (error) throw error
      }

      // Actualizamos el numerito rojo
      await fetchCartCount()
      return { success: true }

    } catch (error) {
      console.error(error)
      return { error: 'Error al agregar al carrito 😢' }
    }
  }

  return (
    <CartContext.Provider value={{ cartCount, addToCart, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)