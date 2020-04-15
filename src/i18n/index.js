import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import cz from './cz.json'
import en from './en.json'
import { getLangPrefLocal } from 'utils/functions'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: { cz, en },
    lng: getLangPrefLocal() || 'cz',
    fallbackLng: 'cz',
    interpolation: {
      escapeValue: false,
    },
  })
export default i18n
