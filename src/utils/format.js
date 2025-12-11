export const formatPrice = (amount) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency', // <--- Esto pone el signo $ automático
    currency: 'MXN',
    minimumFractionDigits: 2,
  }).format(amount)
}