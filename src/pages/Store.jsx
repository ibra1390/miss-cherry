import ProductCard from '../components/ProductCard'
import { Search, Filter, ArrowUpDown, Ghost } from 'lucide-react' // Quitamos ChevronDown y Check de aquí
import { useProductFilters } from '../hooks/useProductFilters'
import { CATEGORIES, FRAGRANCES } from '../utils/constants'
import Loader from '../components/ui/Loader' 
import Pagination from '../components/ui/Pagination'
import KawaiiDropdown from '../components/ui/KawaiiDropdown' // <--- IMPORT NUEVO

export default function Store() {
  const { 
    products, loading, filters, updateFilter, 
    clearFilters, currentPage, totalPages, changePage 
  } = useProductFilters()

  return (
    <div className="min-h-screen bg-gray-50 pb-20 relative z-0 -mt-24">
      
      {/* HEADER */}
      <div className="bg-cherry-bg pt-40 pb-16 px-4 text-center rounded-b-[3rem] mb-12 relative overflow-hidden shadow-sm mx-4 md:mx-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <h1 className="font-kawaii text-6xl text-cherry-dark mb-4 relative z-10">Nuestro Catálogo</h1>
        <p className="font-body text-gray-500 text-lg max-w-xl mx-auto relative z-10">Explora todas nuestras creaciones.</p>

        {/* BUSCADOR */}
        <div className="max-w-md mx-auto mt-8 relative z-10">
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-cherry-pink pointer-events-none z-10 group-focus-within:text-cherry-red transition-colors">
               <Search size={24} />
            </div>
            <input 
              type="text" 
              placeholder="¿Qué fragancia buscas hoy?" 
              className="w-full pl-14 pr-6 py-4 rounded-full border-2 border-pink-100 focus:border-cherry-pink focus:outline-none font-body text-gray-600 shadow-sm transition-all focus:shadow-md bg-white/90 backdrop-blur-sm relative z-0"
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* BARRA DE FILTROS */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-pink-50 mb-10 relative z-50">
          <div className="flex flex-col xl:flex-row gap-8 justify-between items-center">
             
             {/* Categorías */}
             <div className="flex flex-wrap justify-center xl:justify-start gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => updateFilter('category', cat)}
                    className={`px-5 py-2 rounded-full font-bold font-kawaii text-lg transition-all border-2 cursor-pointer
                      ${filters.category === cat 
                        ? 'bg-cherry-red text-white border-cherry-red shadow-lg shadow-pink-200 transform scale-105' 
                        : 'bg-gray-50 text-gray-400 border-transparent hover:border-pink-200 hover:text-cherry-red hover:bg-white'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
             </div>

             {/* Dropdowns usando el componente importado */}
             <div className="flex flex-wrap gap-4 w-full xl:w-auto justify-center">
                <KawaiiDropdown 
                  icon={Filter}
                  value={filters.fragrance}
                  placeholder="Todas las fragancias"
                  options={FRAGRANCES}
                  onChange={(val) => updateFilter('fragrance', val)}
                  type="fragrance"
                />

                <KawaiiDropdown 
                  icon={ArrowUpDown}
                  value={filters.priceOrder}
                  type="price" 
                  options={[
                    { label: 'Precio: Normal', value: 'default' },
                    { label: 'Menor a Mayor $', value: 'asc' },
                    { label: 'Mayor a Menor $$$', value: 'desc' }
                  ]}
                  onChange={(val) => updateFilter('priceOrder', val)}
                />
             </div>
          </div>
        </div>

        {/* RESULTADOS */}
        <div className="relative z-0 min-h-[400px]">
          {loading ? (
             <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-[3rem] border-2 border-pink-50 overflow-hidden flex items-center justify-center">
                <Loader />
             </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 75}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={changePage} />
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-200">
               <Ghost size={64} className="text-gray-300 mx-auto mb-4 animate-bounce-slow" />
               <h3 className="font-kawaii text-3xl text-gray-400 mb-2">Ups, no encontramos nada</h3>
               <p className="text-gray-400 mb-6 font-body">Intenta cambiar los filtros o busca otro nombre.</p>
               <button type="button" onClick={clearFilters} className="text-cherry-red font-bold hover:text-pink-500 cursor-pointer">
                 Limpiar todos los filtros
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}