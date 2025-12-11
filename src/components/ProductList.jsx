import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { Loader2, Ghost } from 'lucide-react'
import ProductCard from './ProductCard'

// ACEPTAMOS UNA PROP LLAMADA 'limit'
// Si no le pasamos nada, por defecto será null (traerá todos)
export default function ProductList({ limit = null }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false }) // Los más nuevos primero

      // SI HAY LIMITE, LO APLICAMOS
      if (limit) {
        query = query.limit(limit)
      }

      const { data, error } = await query

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error cargando productos:', error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
         <Loader2 className="animate-spin text-cherry-red w-10 h-10" />
         <p className="font-kawaii text-xl text-gray-400 animate-pulse">Buscando aromas...</p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <Ghost size={48} className="text-gray-300 mx-auto mb-4" />
        <p className="font-body text-gray-400">No encontramos productos por ahora 😿</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}