export const formatPrice = (amount) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'decimal', // <--- Esto agrega comas (1,000) pero NO el signo $
    minimumFractionDigits: 0, // Sin centavos (o pon 2 si prefieres)
    maximumFractionDigits: 0, 
  }).format(amount)
}