import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

export function useProductFilters() {
  const [allProducts, setAllProducts] = useState([]) // Copia original de datos
  const [filteredProducts, setFilteredProducts] = useState([]) // Copia filtrada para mostrar
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

  // 2. Filtrar cada vez que cambien los datos o los filtros
  useEffect(() => {
    applyFilters()
  }, [filters, allProducts])

  async function fetchProducts() {
    try {
      setLoading(true)

      // --- TRUCO DEL TIEMPO (2 segundos de espera para el Loader) ---
      const dbPromise = supabase.from('products').select('*')
      const timerPromise = new Promise(resolve => setTimeout(resolve, 2000))

      // Esperamos a que AMBAS cosas terminen
      const [{ data, error }] = await Promise.all([dbPromise, timerPromise])

      if (error) throw error
      
      console.log("📦 Productos cargados:", data)
      
      setAllProducts(data || [])
      setFilteredProducts(data || []) 
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Helper para normalizar texto (minusculas y sin espacios extra)
  const normalize = (text) => text ? text.toString().toLowerCase().trim() : ""

  const applyFilters = () => {
    let result = [...allProducts]

    // A. Búsqueda por nombre
    // 1. Búsqueda INTELIGENTE (Nombre, Fragancia o Colección)
    if (filters.search) {
      const term = normalize(filters.search)
      
      result = result.filter(p => 
        normalize(p.name).includes(term) ||       // ¿Está en el nombre?
        normalize(p.fragancia).includes(term) ||  // O... ¿Está en la fragancia?
        normalize(p.coleccion).includes(term)     // O... ¿Está en la colección?
      )
    }

    // B. Categoría (Colección)
    if (filters.category !== "Todas") {
      const catFilter = normalize(filters.category)
      result = result.filter(p => normalize(p.coleccion) === catFilter)
    }

    // C. Fragancia
    if (filters.fragrance !== "Todas") {
      const fragFilter = normalize(filters.fragrance)
      result = result.filter(p => {
        const prodFragancia = normalize(p.fragancia)
        return prodFragancia === fragFilter
      })
    }

    // D. Precio
    if (filters.priceOrder === 'asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (filters.priceOrder === 'desc') {
      result.sort((a, b) => b.price - a.price)
    }

    setFilteredProducts(result)
  }

 // --- FUNCIÓN ACTUALIZADA (LÓGICA DOBLE VÍA) ---
  const updateFilter = (key, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value }

      // REGLA 1: Si cambio la FRAGANCIA, limpio la categoría
      // (Para buscar "Cereza" en todo el catálogo)
      if (key === 'fragrance' && value !== 'Todas') {
        newFilters.category = "Todas"
      }

      // REGLA 2: Si cambio la CATEGORÍA, limpio la fragancia
      // (Para ver todo "Navidad" sin importar a qué huela)
      if (key === 'category' && value !== 'Todas') {
        newFilters.fragrance = "Todas"
      }

      return newFilters
    })
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
    products: filteredProducts, 
    loading, 
    filters, 
    updateFilter, 
    clearFilters 
  }
}