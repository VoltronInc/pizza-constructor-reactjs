import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ua from './ua';

const i18Config = {
  resources: {
    ua,
  },
  fallbackLng: 'ua',
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: false,
  lng: 'ua',
};

i18n.use(initReactI18next).init(i18Config);

export default i18n;
