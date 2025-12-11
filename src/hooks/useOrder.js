import { useState } from 'react'
import { supabase } from '../utils/supabase'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { formatPrice } from '../utils/format'

export function useOrder() {
  const { user } = useAuth()
  const { cart, fetchCart } = useCart()
  const { showToast } = useToast()
  
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(null)

  const PHONE_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER

  const handleCreateOrder = async () => {
    if (!cart.length) return
    const total = cart.reduce((acc, item) => acc + (item.products.price * item.quantity), 0)

    try {
      setIsProcessing(true)
      
      // 1. Crear Orden en BD
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({ user_id: user.id, total: total, status: 'pendiente' })
        .select().single()

      if (orderError) throw orderError

      // 2. Mover items a tabla historial
      const orderItems = cart.map(item => ({
        order_id: orderData.id,
        product_id: item.products.id,
        quantity: item.quantity,
        price: item.products.price
      }))

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems)
      if (itemsError) throw itemsError

      // 3. Vaciar Carrito BD
      await supabase.from('cart_items').delete().eq('user_id', user.id)

      // 4. Actualizar Estado Local
      setOrderSuccess({ id: orderData.id, items: [...cart], total: total })
      await fetchCart() // Limpia UI

    } catch (error) {
      console.error("Error:", error)
      showToast('Hubo un error al crear tu pedido', 'error')
    } finally {
      setIsProcessing(false)
    }
  }

  const sendToWhatsapp = () => {
    if (!orderSuccess) return
    let message = `Hola! 🎀 Quiero reservar mi pedido #${orderSuccess.id}\n\n`
    message += `📋 *Detalles:*\n`
    orderSuccess.items.forEach(item => {
      message += `▫️ ${item.quantity}x ${item.products.name} - ${formatPrice(item.products.price * item.quantity)}\n`
    })
    message += `\n💰 *Subtotal productos: ${formatPrice(orderSuccess.total)}*\n`
    message += `📦 *Envío:* Por acordar\n` 
    message += `\nQuedo pendiente para coordinar envío y pago. Gracias! ✨`
    
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return {
    isProcessing,
    orderSuccess,
    handleCreateOrder,
    sendToWhatsapp
  }
}