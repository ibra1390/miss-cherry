import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabase'

export function useProductCard(product) {
  const { addToCart, cart } = useCart() 
  const { user } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [isAdding, setIsAdding] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [favLoading, setFavLoading] = useState(false)

  // Calcular Stock y Cantidad
  const hasStock = product.stock > 0
  const productInCart = (cart || []).find(item => item.product_id === product.id)
  const quantityInCart = productInCart ? productInCart.quantity : 0

  // Verificar favorito al cargar
  useEffect(() => {
    if (user) checkIfFavorite()
  }, [user, product.id])

  const checkIfFavorite = async () => {
    const { data } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', user.id)
      .eq('product_id', product.id)
      .single()
    if (data) setIsFavorite(true)
  }

  // Lógica de Agregar al Carrito (con tu delay de 0.5s)
  const handleAdd = async (e) => {
    e.stopPropagation() // Para que no abra el detalle del producto si das click al botón
    if (!hasStock) return

    setIsAdding(true) 
    await new Promise(resolve => setTimeout(resolve, 500)) // Tu delay estético
    
    const result = await addToCart(product)
    
    if (result && result.error) {
       if(result.error.includes('iniciar')) navigate('/login')
    } else {
       showToast('¡Agregado al carrito!', 'cart')
    }
    setIsAdding(false)
  }

  // Lógica de Favoritos
  const handleToggleFavorite = async (e) => {
    e.stopPropagation() 
    if (!user) {
      navigate('/login')
      return
    }
    setFavLoading(true)
    
    if (isFavorite) {
      const { error } = await supabase.from('favorites').delete().eq('user_id', user.id).eq('product_id', product.id)
      if (!error) {
        setIsFavorite(false)
        showToast('Eliminado de favoritos', 'remove')
      }
    } else {
      const { error } = await supabase.from('favorites').insert([{ user_id: user.id, product_id: product.id }])
      if (!error) {
        setIsFavorite(true)
        showToast('¡Guardado en favoritos!', 'success')
      }
    }
    setFavLoading(false)
  }

  return {
    hasStock,
    quantityInCart,
    isAdding,
    isFavorite,
    favLoading,
    handleAdd,
    handleToggleFavorite
  }
}