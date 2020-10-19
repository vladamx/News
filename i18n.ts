import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import newsTranslationsIt from './news/translations.it.json';
import newsTranslationsEn from './news/translations.en.json';

const resources = {
  en: {
    newsTranslations: newsTranslationsEn,
  },
  it: {
    newsTranslations: newsTranslationsIt,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
});
