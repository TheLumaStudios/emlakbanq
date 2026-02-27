import { useEffect, useRef, useState, useCallback } from 'react'
import { useBlocker } from 'react-router-dom'

export function useUnsavedChanges(formData, initialData) {
  const initialRef = useRef(null)
  const isDirtyRef = useRef(false)
  const [isDirty, setIsDirty] = useState(false)
  const suppressUntilRef = useRef(0)

  // Capture initial state on first call or when initialData changes
  useEffect(() => {
    initialRef.current = JSON.stringify(initialData)
  }, [initialData])

  // Check if form has been modified
  useEffect(() => {
    if (initialRef.current === null) return
    // Skip dirty check during suppression period (e.g. after markClean while editors normalize)
    if (Date.now() < suppressUntilRef.current) return
    const dirty = JSON.stringify(formData) !== initialRef.current
    isDirtyRef.current = dirty
    setIsDirty(dirty)
  }, [formData])

  // Browser navigation warning
  useEffect(() => {
    if (!isDirty) return
    const handler = (e) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isDirty])

  // React Router in-app navigation blocker (use function form so ref is read at navigation time)
  const blocker = useBlocker(() => isDirtyRef.current)

  const markClean = useCallback((data) => {
    initialRef.current = JSON.stringify(data ?? formData)
    isDirtyRef.current = false
    setIsDirty(false)
    // Suppress dirty checks for 1.5s to allow rich text editors to normalize
    suppressUntilRef.current = Date.now() + 1500
  }, [formData])

  return { isDirty, markClean, blocker }
}
