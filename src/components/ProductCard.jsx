import { Heart, Loader2, Sparkles, Tag } from 'lucide-react'
import { formatPrice } from '../utils/format'
// Importamos nuestras nuevas piezas modulares
import { useProductCard } from '../hooks/useProductCard'
import AddToCartBtn from './ui/AddToCartBtn'

export default function ProductCard({ product }) {
  // Usamos el Hook para traer toda la lógica y estados
  const {
    hasStock,
    quantityInCart,
    isAdding,
    isFavorite,
    favLoading,
    handleAdd,
    handleToggleFavorite
  } = useProductCard(product)

  return (
    <div className={`group relative bg-white rounded-[2.5rem] border-2 shadow-sm transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col h-full 
      ${hasStock ? 'border-pink-50 hover:border-pink-200 hover:shadow-xl hover:shadow-pink-100/50' : 'border-gray-100 opacity-80'}`}>
      
      {/* --- SECCIÓN IMAGEN --- */}
      <div className="relative h-64 overflow-hidden bg-gray-50">
        <img 
          src={product.image_url} 
          alt={product.name} 
          className={`w-full h-full object-cover transition duration-700 ease-in-out ${hasStock ? 'group-hover:scale-110' : 'grayscale-[0.5]'}`}
        />
        
        {/* Badge de Oferta */}
        {product.is_on_sale && hasStock && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-2 rounded-full z-20 shadow-md font-body tracking-wide flex items-center gap-1">
             <Tag size={12} fill="currentColor" /> ¡OFERTA!
          </div>
        )}

        {/* Botón Favorito */}
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

        {/* Overlay Agotado */}
        {!hasStock && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="bg-gray-800 text-white font-kawaii text-2xl px-6 py-2 rounded-full transform -rotate-12 shadow-lg border-2 border-white">
              Agotado 💔
            </span>
          </div>
        )}

        {/* Precio */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm font-kawaii text-xl text-cherry-dark flex items-center gap-1 z-20">
           {formatPrice(product.price)}
        </div>
      </div>

      {/* --- SECCIÓN CONTENIDO --- */}
      <div className="p-6 flex flex-col flex-grow text-center relative">
        
        {/* Colección */}
        {product.coleccion && (
          <div className="mb-2">
            <span className="inline-block bg-pink-100 text-cherry-pink text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-pink-200">
              {product.coleccion}
            </span>
          </div>
        )}
        
        {/* Nombre */}
        <h3 className="font-kawaii text-3xl text-gray-800 mb-2 truncate" title={product.name}>
          {product.name}
        </h3>
        
        {/* Fragancia */}
        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-6 flex-grow">
          <Sparkles size={16} className="text-yellow-400" />
          <span className="italic font-medium">Fragancia: {product.fragancia || "Sorpresa"}</span>
          <Sparkles size={16} className="text-yellow-400" />
        </div>

        {/* Botón Modularizado */}
        <AddToCartBtn 
          hasStock={hasStock}
          isAdding={isAdding}
          quantityInCart={quantityInCart}
          onClick={handleAdd}
        />

      </div>
    </div>
  )
}