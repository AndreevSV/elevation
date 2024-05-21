import { useTranslation } from 'react-i18next';

function Error404Page() {
  const {t } = useTranslation();
  
  return (
    <>
      <h1>{t('oooops-no-such-page-found')}</h1>
    </>
  );
}

export default Error404Page;
