import { createContext, useContext, useState } from 'react'
import { Heart, ShoppingBag, HeartCrack, CheckCircle, XCircle } from 'lucide-react'

const ToastContext = createContext()

export function useToast() {
  return useContext(ToastContext)
}

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }))
    }, 2500)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* --- AQUÍ ESTÁ EL TOAST GLOBAL --- */}
      {/* Al estar aquí, vive fuera de las cards y nada lo tapa */}
      <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-[9999] transition-all duration-500 pointer-events-none 
          ${toast.show ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}
      >
        <div className={`backdrop-blur-md px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border-2 
          ${toast.type === 'remove' 
            ? 'bg-white/95 text-gray-500 border-gray-200' 
            : toast.type === 'cart'
              ? 'bg-white/95 text-green-600 border-green-200' 
              : toast.type === 'error'
                ? 'bg-white/95 text-red-500 border-red-200'
                : 'bg-white/95 text-cherry-red border-cherry-pink' // Success/Love
          }`}
        >
          {toast.type === 'remove' ? <HeartCrack size={20} className="animate-bounce" /> :
           toast.type === 'cart' ? <ShoppingBag size={20} className="animate-bounce" /> :
           toast.type === 'error' ? <XCircle size={20} className="animate-bounce" /> :
           <Heart size={20} className="fill-current animate-bounce" />}
          
          <span className="font-body text-sm font-bold tracking-wide">
            {toast.message}
          </span>
        </div>
      </div>
    </ToastContext.Provider>
  )
}