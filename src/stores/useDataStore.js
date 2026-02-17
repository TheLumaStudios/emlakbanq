import { create } from 'zustand'
import { supabase } from '../utils/supabase'

export const useDataStore = create((set, get) => ({
  heroImages: null,
  siteSettings: null,
  loaded: { heroImages: false, siteSettings: false },
  loading: { heroImages: false, siteSettings: false },
  errors: { heroImages: null, siteSettings: null },

  fetchHeroImages: async () => {
    if (get().loaded.heroImages) return get().heroImages
    set((s) => ({
      loading: { ...s.loading, heroImages: true },
      errors: { ...s.errors, heroImages: null },
    }))
    try {
      const { data, error } = await supabase.from('hero_images').select('*')
      if (error) throw error
      const map = Object.fromEntries((data || []).map((r) => [r.page, r.url]))
      set((s) => ({
        heroImages: map,
        loaded: { ...s.loaded, heroImages: true },
        loading: { ...s.loading, heroImages: false },
      }))
      return map
    } catch (error) {
      console.error('Failed to fetch hero images:', error)
      set((s) => ({
        loading: { ...s.loading, heroImages: false },
        errors: { ...s.errors, heroImages: error.message },
      }))
      return null
    }
  },

  fetchSiteSettings: async () => {
    if (get().loaded.siteSettings) return get().siteSettings
    set((s) => ({
      loading: { ...s.loading, siteSettings: true },
      errors: { ...s.errors, siteSettings: null },
    }))
    try {
      const { data, error } = await supabase.from('site_settings').select('*')
      if (error) throw error
      const settings = Object.fromEntries((data || []).map((r) => [r.key, r.value]))
      set((s) => ({
        siteSettings: settings,
        loaded: { ...s.loaded, siteSettings: true },
        loading: { ...s.loading, siteSettings: false },
      }))
      return settings
    } catch (error) {
      console.error('Failed to fetch site settings:', error)
      set((s) => ({
        loading: { ...s.loading, siteSettings: false },
        errors: { ...s.errors, siteSettings: error.message },
      }))
      return null
    }
  },

  refetchHeroImages: async () => {
    set((s) => ({ loaded: { ...s.loaded, heroImages: false } }))
    return get().fetchHeroImages()
  },

  refetchSiteSettings: async () => {
    set((s) => ({ loaded: { ...s.loaded, siteSettings: false } }))
    return get().fetchSiteSettings()
  },
}))
