import { useRouter } from 'next/router';
import en from '../../translations/en.json';
import vi from '../../translations/vi.json';

interface Language {
  [key: string]: string;
}

export const useTranslate = () => {
  const router = useRouter();
  const { locale } = router;
  let language: Language = en;
  if (locale === 'vi') language = vi;

  function t(key: string) {
    return language[key];
  }

  return { t, locale };
};
