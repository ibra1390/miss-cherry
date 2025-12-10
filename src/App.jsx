import { useState, useEffect } from 'react' // <--- 1. Agrega estos hooks
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import MainLayout from './layouts/MainLayout'
import Loader from './components/ui/Loader'

// Páginas
import Cart from './pages/Cart'
import Store from './pages/Store'
import Home from './pages/Home'
import Login from './pages/Login' // Asegúrate que el nombre coincida (Login.jsx)
import Dashboard from './pages/Dashboard'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  return children
}

function App() {
  const { loading: authLoading } = useAuth()
  
  // 2. CREAMOS UN ESTADO DE "CARGA MÍNIMA" PARA DEBUG
  const [minLoading, setMinLoading] = useState(true)

  // 3. EFECTO: Fuerza la carga por 2 segundos (2000ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoading(false)
    }, 2000) // <--- Cambia este número para que dure más o menos tiempo
    
    return () => clearTimeout(timer)
  }, [])

  // 4. LA CONDICIÓN: Si Auth está cargando O si estamos en el tiempo mínimo...
  if (authLoading || minLoading) {
    return (
       // Puse este contenedor flex para asegurar que el loader esté centrado en pantalla completa
       <div className="h-screen w-screen flex items-center justify-center bg-white/90">
         <Loader />
       </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="tienda" element={<Store />} />
        <Route path="catalogo" element={<Store />} />

        <Route 
          path="dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="carrito" 
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } 
        />
      </Route>
    </Routes>
  )
}

export default App