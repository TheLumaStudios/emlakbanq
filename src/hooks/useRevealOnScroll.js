import { useEffect, useRef } from 'react'

export function useRevealOnScroll(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -60px 0px',
      }
    )

    const observeReveals = () => {
      const revealElements = element.querySelectorAll('.reveal:not(.revealed)')
      revealElements.forEach((el) => observer.observe(el))
    }

    observeReveals()

    if (element.classList.contains('reveal')) {
      observer.observe(element)
    }

    // Watch for dynamically added .reveal elements (async data loading)
    const mutationObserver = new MutationObserver(observeReveals)
    mutationObserver.observe(element, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [options.threshold, options.rootMargin])

  return ref
}
