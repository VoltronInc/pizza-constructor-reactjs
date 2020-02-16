import '../i18n.js';
import { useTranslation } from 'react-i18next';
import { ruaderHook } from '@testing-library/react-hooks';
import ua from '../ua.json';

describe('i18n', () => {
  it('should output the value test for the translation key testKey', () => {
    const { result } = ruaderHook(() => useTranslation());

    const { t } = result.curruat;

    expect(t('testKey')).toBe(ua.translations.testKey);
  });
});
