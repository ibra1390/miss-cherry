import ProductCard from '../components/ProductCard'
import { Search, Filter, ArrowUpDown, Ghost } from 'lucide-react'
// Importamos el hook y las constantes
import { useProductFilters } from '../hooks/useProductFilters'
import { CATEGORIES, FRAGRANCES } from '../utils/constants'

export default function Store() {
  // Usamos el hook para toda la lógica
  const { products, loading, filters, updateFilter, clearFilters } = useProductFilters()

  return (
    <div className="min-h-screen bg-gray-50 pb-20 relative z-0 -mt-24">
      
      {/* --- HEADER ORIGINAL RESTAURADO (Con ajuste de padding superior) --- */}
      <div className="bg-cherry-bg pt-40 pb-16 px-4 text-center rounded-b-[3rem] mb-12 relative overflow-hidden shadow-sm">
        
        {/* Círculo decorativo original */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        
        <h1 className="font-kawaii text-6xl text-cherry-dark mb-4 relative z-10">
          Nuestro Catálogo 
        </h1>
        <p className="font-body text-gray-500 text-lg max-w-xl mx-auto relative z-10">
          Explora todas nuestras creaciones. Usa los filtros para encontrar tu aroma ideal.
        </p>

        {/* --- BARRA DE BÚSQUEDA  --- */}
        <div className="max-w-md mx-auto mt-8 relative z-10">
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-cherry-pink pointer-events-none z-10 group-focus-within:text-cherry-red transition-colors">
               <Search size={24} />
            </div>
            <input 
              type="text" 
              placeholder="¿Qué aroma buscas hoy?" 
              className="w-full pl-14 pr-6 py-4 rounded-full border-2 border-pink-100 focus:border-cherry-pink focus:outline-none font-body text-gray-600 shadow-sm transition-all focus:shadow-md bg-white/90 backdrop-blur-sm relative z-0"
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* --- BARRA DE FILTROS (Esta sí la dejamos nueva porque está más completa) --- */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-pink-50 mb-10 relative z-10">
          <div className="flex flex-col xl:flex-row gap-8 justify-between items-center">
             
             {/* A. Categorías (Botones) */}
             <div className="flex flex-wrap justify-center xl:justify-start gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => updateFilter('category', cat)}
                    className={`px-5 py-2 rounded-full font-bold font-kawaii text-lg transition-all border-2 
                      ${filters.category === cat 
                        ? 'bg-cherry-red text-white border-cherry-red shadow-lg shadow-pink-200 transform scale-105' 
                        : 'bg-gray-50 text-gray-400 border-transparent hover:border-pink-200 hover:text-cherry-red hover:bg-white'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
             </div>

             {/* B. Dropdowns (Fragancia y Precio) */}
             <div className="flex flex-wrap gap-4 w-full xl:w-auto justify-center">
                {/* Fragancia */}
                <div className="relative min-w-[220px]">
                   <div className="absolute left-4 top-3.5 text-cherry-pink pointer-events-none"><Filter size={20} /></div>
                   <select 
                      value={filters.fragrance}
                      onChange={(e) => updateFilter('fragrance', e.target.value)}
                      className="w-full pl-12 pr-8 py-3 rounded-2xl border-2 border-pink-100 bg-white text-gray-600 font-body font-bold focus:outline-none focus:border-cherry-pink cursor-pointer appearance-none hover:bg-pink-50 transition shadow-sm"
                   >
                      {FRAGRANCES.map(f => <option key={f} value={f}>{f === "Todas" ? "Todas las fragancias" : f}</option>)}
                   </select>
                </div>
                {/* Precio */}
                <div className="relative min-w-[200px]">
                   <div className="absolute left-4 top-3.5 text-cherry-pink pointer-events-none"><ArrowUpDown size={20} /></div>
                   <select 
                      value={filters.priceOrder}
                      onChange={(e) => updateFilter('priceOrder', e.target.value)}
                      className="w-full pl-12 pr-8 py-3 rounded-2xl border-2 border-pink-100 bg-white text-gray-600 font-body font-bold focus:outline-none focus:border-cherry-pink cursor-pointer appearance-none hover:bg-pink-50 transition shadow-sm"
                   >
                      <option value="default">Precio: Normal</option>
                      <option value="asc">Menor a Mayor $</option>
                      <option value="desc">Mayor a Menor $$$</option>
                   </select>
                </div>
             </div>
          </div>
        </div>

        {/* --- RESULTADOS (GRID) --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-80 gap-4 relative z-10">
             <div className="animate-spin rounded-full h-14 w-14 border-4 border-t-cherry-red border-pink-100"></div>
             <p className="font-kawaii text-2xl text-gray-400 animate-pulse">Buscando aromas...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-200 relative z-10">
             <Ghost size={64} className="text-gray-300 mx-auto mb-4 animate-bounce-slow" />
             <h3 className="font-kawaii text-3xl text-gray-400 mb-2">Ups, no encontramos nada</h3>
             <p className="text-gray-400 mb-6 font-body">Intenta cambiar los filtros o busca otro nombre.</p>
             <button 
               onClick={clearFilters}
               className="text-cherry-red font-bold underline hover:text-pink-500 decoration-wavy decoration-2 underline-offset-4"
             >
               Limpiar todos los filtros
             </button>
          </div>
        )}

      </div>
    </div>
  )
}