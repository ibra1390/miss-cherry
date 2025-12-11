import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

// Define cuántas velas quieres por página
const ITEMS_PER_PAGE = 8 

export function useProductFilters() {
  const [allProducts, setAllProducts] = useState([]) 
  const [filteredProducts, setFilteredProducts] = useState([]) 
  const [loading, setLoading] = useState(true)

  // NUEVO: Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1)

  const [filters, setFilters] = useState({
    search: "",
    category: "Todas",
    fragrance: "Todas",
    priceOrder: "default"
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filters, allProducts])

  async function fetchProducts() {
    try {
      setLoading(true)
      const dbPromise = supabase.from('products').select('*')
      const timerPromise = new Promise(resolve => setTimeout(resolve, 2000)) // Tu loader
      const [{ data, error }] = await Promise.all([dbPromise, timerPromise])

      if (error) throw error
      
      setAllProducts(data || [])
      setFilteredProducts(data || []) 
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const normalize = (text) => text ? text.toString().toLowerCase().trim() : ""

  const applyFilters = () => {
    let result = [...allProducts]

    // 1. Buscador Inteligente
    if (filters.search) {
      const term = normalize(filters.search)
      result = result.filter(p => 
        normalize(p.name).includes(term) || 
        normalize(p.fragancia).includes(term) || 
        normalize(p.coleccion).includes(term)
      )
    }
    // 2. Categoría
    if (filters.category !== "Todas") {
      const catFilter = normalize(filters.category)
      result = result.filter(p => normalize(p.coleccion) === catFilter)
    }
    // 3. Fragancia
    if (filters.fragrance !== "Todas") {
      const fragFilter = normalize(filters.fragrance)
      result = result.filter(p => normalize(p.fragancia) === fragFilter)
    }
    // 4. Precio
    if (filters.priceOrder === 'asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (filters.priceOrder === 'desc') {
      result.sort((a, b) => b.price - a.price)
    }

    setFilteredProducts(result)
    setCurrentPage(1) // <--- IMPORTANTE: Si filtran, volvemos a la pág 1
  }

  const updateFilter = (key, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value }
      if (key === 'fragrance' && value !== 'Todas') newFilters.category = "Todas"
      if (key === 'category' && value !== 'Todas') newFilters.fragrance = "Todas"
      return newFilters
    })
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "Todas",
      fragrance: "Todas",
      priceOrder: "default"
    })
  }

  // --- LÓGICA DE PAGINACIÓN ---
  // Calculamos qué productos mostrar AHORA MISMO
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
  
  // Total de páginas
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)

  // Función para cambiar página
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber)
    // Scroll suave hacia arriba de la lista
    window.scrollTo({ top: 400, behavior: 'smooth' })
  }

  return { 
    products: currentProducts, // Devolvemos SOLO los 8 de esta página
    totalResults: filteredProducts.length, // Total real para saber si mostrar paginación
    loading, 
    filters, 
    updateFilter, 
    clearFilters,
    // Cosas nuevas de paginación
    currentPage,
    totalPages,
    changePage
  }
}