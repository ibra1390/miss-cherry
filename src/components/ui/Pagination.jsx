import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  // Si solo hay 1 página, no mostramos nada
  if (totalPages <= 1) return null

  // Crear array de números [1, 2, 3...]
  const pages = [...Array(totalPages).keys()].map(num => num + 1)

  return (
    <div className="flex justify-center items-center gap-2 mt-12 animate-fade-in-up">
      
      {/* Botón Anterior */}
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-full border-2 border-pink-100 text-cherry-pink hover:bg-pink-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
      >
        <ChevronLeft size={24} strokeWidth={3} />
      </button>

      {/* Números de Página */}
      <div className="flex gap-2">
        {pages.map(number => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`w-10 h-10 rounded-full font-bold font-kawaii text-lg transition-all shadow-sm
              ${currentPage === number 
                ? 'bg-cherry-red text-white scale-110 shadow-pink-200 shadow-md' 
                : 'bg-white text-gray-400 border-2 border-transparent hover:border-pink-100'
              }
            `}
          >
            {number}
          </button>
        ))}
      </div>

      {/* Botón Siguiente */}
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full border-2 border-pink-100 text-cherry-pink hover:bg-pink-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
      >
        <ChevronRight size={24} strokeWidth={3} />
      </button>

    </div>
  )
}