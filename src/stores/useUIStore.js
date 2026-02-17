import { create } from 'zustand'

export const useUIStore = create((set) => ({
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  cookieConsentShown: false,
  cookieConsentAccepted: null,
  setCookieConsent: (accepted) =>
    set({ cookieConsentAccepted: accepted, cookieConsentShown: true }),

  activeModal: null,
  openModal: (key) => set({ activeModal: key }),
  closeModal: () => set({ activeModal: null }),
}))
