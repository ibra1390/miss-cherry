import { ShoppingBag, Loader2, XCircle, Gift } from 'lucide-react'

export default function AddToCartBtn({ hasStock, isAdding, quantityInCart, onClick }) {
  return (
    <button 
      onClick={onClick}
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
  )
}