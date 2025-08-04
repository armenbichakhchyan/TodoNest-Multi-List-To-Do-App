import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationHY from './translationHY.json';
import translationEN from './translationEN.json';
import translationRU from './translationRU.json';

i18n.use(initReactI18next).init({
    resources: {
        hy: {
            translation: translationHY
        },
        en: {
            translation: translationEN
        },
        ru: {
            translation: translationRU
        }
    },

    lng: 'hy',
    fallbackLng: 'hy',

    interpolation: {
        escapeValue: false
    }
});

export default i18n;