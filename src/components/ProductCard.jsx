import { useState, useEffect } from 'react'
import { ShoppingBag, Heart, Check, Loader2, Sparkles, XCircle, Tag, Gift } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabase'
import { useToast } from '../context/ToastContext'
import { formatPrice } from '../utils/format'

export default function ProductCard({ product }) {
  const { addToCart, cart } = useCart() 
  const { user } = useAuth()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const [isAdding, setIsAdding] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [favLoading, setFavLoading] = useState(false)

  const hasStock = product.stock > 0

  const productInCart = (cart || []).find(item => item.product_id === product.id)
  const quantityInCart = productInCart ? productInCart.quantity : 0

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

  const handleAdd = async () => {
    if (!hasStock) return

    setIsAdding(true) 
    
    await new Promise(resolve => setTimeout(resolve, 1500)) 
    
    const result = await addToCart(product)
    
    if (result && result.error) {
       if(result.error.includes('iniciar')) navigate('/login')
    } else {
       showToast('¡Agregado al carrito!', 'cart')
    }
    setIsAdding(false) // 3. TERMINA LA CARGA
  }

  const handleToggleFavorite = async () => {
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

  return (
    <div className={`group relative bg-white rounded-[2.5rem] border-2 shadow-sm transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col h-full 
      ${hasStock ? 'border-pink-50 hover:border-pink-200 hover:shadow-xl hover:shadow-pink-100/50' : 'border-gray-100 opacity-80'}`}>
      
      {/* IMAGEN */}
      <div className="relative h-64 overflow-hidden bg-gray-50">
        <img 
          src={product.image_url} 
          alt={product.name} 
          className={`w-full h-full object-cover transition duration-700 ease-in-out ${hasStock ? 'group-hover:scale-110' : 'grayscale-[0.5]'}`}
        />
        
        {product.is_on_sale && hasStock && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-2 rounded-full z-20 shadow-md font-body tracking-wide flex items-center gap-1">
             <Tag size={12} fill="currentColor" /> ¡OFERTA!
          </div>
        )}

        <button 
          onClick={handleToggleFavorite}
          disabled={favLoading}
          className={`absolute top-4 right-4 p-2.5 rounded-full shadow-md transition-all duration-300 hover:scale-110 active:scale-95 z-20 cursor-pointer ${
            isFavorite 
              ? 'bg-cherry-red text-white' 
              : 'bg-white/90 text-cherry-pink hover:bg-cherry-pink hover:text-white'
          }`}
        >
          {favLoading ? <Loader2 size={20} className="animate-spin" /> : <Heart size={20} className={isFavorite ? 'fill-current' : ''} strokeWidth={2.5} />}
        </button>

        {!hasStock && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="bg-gray-800 text-white font-kawaii text-2xl px-6 py-2 rounded-full transform -rotate-12 shadow-lg border-2 border-white">
              Agotado 💔
            </span>
          </div>
        )}

        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm font-kawaii text-xl text-cherry-dark flex items-center gap-1 z-20">
           <span className="text-cherry-red text-sm">$</span>{formatPrice(product.price)}
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="p-6 flex flex-col flex-grow text-center relative">
        
        {product.coleccion && (
          <div className="mb-2">
            <span className="inline-block bg-pink-100 text-cherry-pink text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-pink-200">
              {product.coleccion}
            </span>
          </div>
        )}
        
        <h3 className="font-kawaii text-3xl text-gray-800 mb-2 truncate" title={product.name}>
          {product.name}
        </h3>
        
        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-6 flex-grow">
          <Sparkles size={16} className="text-yellow-400" />
          <span className="italic font-medium">Fragancia: {product.fragancia || "Sorpresa"}</span>
          <Sparkles size={16} className="text-yellow-400" />
        </div>

        {/* BOTÓN CON ESTADO DE CARGA REAL */}
        <button 
        onClick={handleAdd}
        disabled={isAdding || !hasStock}
        className={`w-full py-3 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 font-kawaii text-xl tracking-wide group/btn relative overflow-hidden cursor-pointer
            ${!hasStock 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-200' 
            : isAdding 
                ? 'bg-cherry-pink text-white cursor-wait scale-95' 
                : quantityInCart > 0 
                ? 'bg-pink-50 text-cherry-red border-2 border-cherry-red hover:bg-cherry-red hover:text-white'
                : 'bg-cherry-bg text-cherry-red hover:bg-cherry-red hover:text-white hover:shadow-lg hover:shadow-pink-200'
            }
        `}
        >
        {!hasStock ? (
            <> <XCircle size={20} /> <span>Sin Stock</span> </>
        ) : isAdding ? (
            // ESTADO DE CARGA SÓLIDO
            <> 
            <Loader2 size={24} className="animate-spin" /> 
            <span>Empacando...</span>
            <Gift size={20} className="animate-bounce" /> 
            </>
        ) : (
            <> 
            {quantityInCart > 0 ? (
                <div className="bg-cherry-red text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-body shadow-sm group-hover/btn:bg-white group-hover/btn:text-cherry-red transition-colors">
                {quantityInCart}
                </div>
            ) : (
                <ShoppingBag size={20} strokeWidth={2.5} className="group-hover/btn:-translate-y-0.5 transition-transform" /> 
            )}
            
            <span>{quantityInCart > 0 ? '¡Añadir más! 🍒' : 'A la bolsa'}</span> 
            </>
        )}
        </button>
      </div>
    </div>
  )
}