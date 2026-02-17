import { RTL_LANGUAGES } from '../config/i18n'

export function isRTL(languageCode) {
  return RTL_LANGUAGES.includes(languageCode)
}

export function startSide(languageCode) {
  return isRTL(languageCode) ? 'right' : 'left'
}

export function endSide(languageCode) {
  return isRTL(languageCode) ? 'left' : 'right'
}
