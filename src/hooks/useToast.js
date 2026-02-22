import { useToastStore } from '../stores/useToastStore'

export function useToast() {
  const addToast = useToastStore((s) => s.addToast)

  return {
    showToast: (type, message, duration) => addToast({ type, message, duration }),
    success: (message, duration) => addToast({ type: 'success', message, duration }),
    error: (message, duration) => addToast({ type: 'error', message, duration }),
    info: (message, duration) => addToast({ type: 'info', message, duration }),
    warning: (message, duration) => addToast({ type: 'warning', message, duration }),
  }
}
