import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

export function useProductFilters() {
  const [allProducts, setAllProducts] = useState([]) // Copia original
  const [filteredProducts, setFilteredProducts] = useState([]) // Copia filtrada
  const [loading, setLoading] = useState(true)

  // Estados de los filtros
  const [filters, setFilters] = useState({
    search: "",
    category: "Todas",
    fragrance: "Todas",
    priceOrder: "default"
  })

  // 1. Cargar datos al inicio
  useEffect(() => {
    fetchProducts()
  }, [])

  // 2. Filtrar cuando cambien los datos o los filtros
  useEffect(() => {
    applyFilters()
  }, [filters, allProducts])

  async function fetchProducts() {
    try {
      const { data, error } = await supabase.from('products').select('*')
      if (error) throw error
      
      setAllProducts(data || [])
      setFilteredProducts(data || []) 
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let result = [...allProducts]

    // A. Búsqueda
    if (filters.search) {
      result = result.filter(p => p.name.toLowerCase().includes(filters.search.toLowerCase()))
    }

    // B. Categoría (Colección)
    if (filters.category !== "Todas") {
      result = result.filter(p => p.coleccion === filters.category)
    }

    // C. Fragancia
    if (filters.fragrance !== "Todas") {
      result = result.filter(p => p.fragancia === filters.fragrance)
    }

    // D. Precio
    if (filters.priceOrder === 'asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (filters.priceOrder === 'desc') {
      result.sort((a, b) => b.price - a.price)
    }

    setFilteredProducts(result)
  }

  // Función helper para actualizar filtros fácilmente
  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  // Resetear todo
  const clearFilters = () => {
    setFilters({
      search: "",
      category: "Todas",
      fragrance: "Todas",
      priceOrder: "default"
    })
  }

  return {
    products: filteredProducts, // Devolvemos ya filtrados
    loading,
    filters,
    updateFilter,
    clearFilters
  }
}