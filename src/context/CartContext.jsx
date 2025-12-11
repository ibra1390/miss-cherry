import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const { user } = useAuth()
  
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
      const { data, error } = await supabase
        .from('cart_items')
        .select('*, products(*)') 
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      if (error) throw error
      
      setCart(data || [])
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
      const existingItem = cart.find(item => item.product_id === product.id)

      if (existingItem) {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id)
        
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('cart_items')
          .insert({ user_id: user.id, product_id: product.id, quantity: 1 })
        
        if (error) throw error
      }

      await fetchCart()
      return { success: true }

    } catch (error) {
      console.error(error)
      return { error: 'Error al agregar' }
    }
  }

  // 3. BORRAR ITEM
  async function removeFromCart(id) {
    const { error } = await supabase.from('cart_items').delete().eq('id', id)
    if (!error) await fetchCart() 
  }

  // 4. ACTUALIZAR CANTIDAD
  async function updateQuantity(id, currentQty, change) {
    const newQty = currentQty + change
    if (newQty < 1) return
    // 1. ACTUALIZACIÓN OPTIMISTA (Instantánea visualmente) 
    // Modificamos el estado local 'cart' inmediatamente para que el usuario vea el cambio YA.
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === id ? { ...item, quantity: newQty } : item
      )
    )
    // 2. ACTUALIZACIÓN EN SEGUNDO PLANO (Base de datos) 
    // Mandamos el cambio a Supabase sin bloquear la pantalla
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity: newQty })
      .eq('id', id)
    // Solo si hubo error, revertimos (o recargamos para asegurar sincronía)
    if (error) {
      console.error("Error al actualizar cantidad:", error)
      await fetchCart() 
    } else {
        setCartCount(prev => prev + change)
    }
  }

  return (
    <CartContext.Provider value={{ 
      cart,       
      cartCount, 
      loading,
      addToCart, 
      removeFromCart, 
      updateQuantity,
      fetchCart 
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)