import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'

export default function KawaiiDropdown({ icon: Icon, value, options, onChange, placeholder, type = 'text' }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const getLabel = (val) => {
    if (type === 'price') {
      if (val === 'default') return 'Precio: Normal'
      if (val === 'asc') return 'Menor a Mayor $'
      if (val === 'desc') return 'Mayor a Menor $$$'
    }
    if (value === "Todas" && placeholder) return placeholder
    return val
  }

  return (
    <div className="relative min-w-[220px]" ref={dropdownRef}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between pl-12 pr-4 py-3 rounded-2xl border-2 bg-white font-body font-bold transition-all shadow-sm
          ${isOpen ? 'border-cherry-pink ring-4 ring-pink-100' : 'border-pink-100 hover:border-pink-200'}
          text-gray-600 cursor-pointer
        `}
      >
        <span className="truncate">{getLabel(value)}</span>
        <ChevronDown size={16} strokeWidth={3} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cherry-pink' : ''}`} />
      </button>

      <div className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${isOpen ? 'text-cherry-red' : 'text-cherry-pink'}`}>
        <Icon size={20} />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl border-2 border-pink-100 shadow-2xl overflow-hidden z-[100] animate-fade-in-down max-h-60 overflow-y-auto">
          {options.map((option, index) => {
            const optValue = typeof option === 'object' ? option.value : option
            const optLabel = typeof option === 'object' ? option.label : option
            
            return (
              <button
                key={index}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onChange(optValue)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-5 py-3 hover:bg-pink-50 transition-colors flex items-center justify-between group border-b border-pink-50 last:border-0 cursor-pointer
                  ${value === optValue ? 'bg-pink-50 text-cherry-red font-bold' : 'text-gray-500'}
                `}
              >
                <span>{optLabel}</span>
                {value === optValue && <Check size={16} className="text-cherry-red" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}