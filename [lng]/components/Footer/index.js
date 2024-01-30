import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'
import { languages } from '../../../i18n/settings'
import { useTranslation } from '../../../i18n'
import { FooterBase } from './FooterBase'

export const Footer = async ({ lng }) => {
  const { t } = await useTranslation(lng);
  const { t: footerT } = await useTranslation(lng, 'footer');
  const { t: placeholderT } = await useTranslation(lng, 'placeholder');
  const first_name=placeholderT('first_name');
  return (
    <footer style={{ marginTop: 50 }}>
      <Trans i18nKey="languageSwitcher" t={t} >
        Switch from <strong>{{lng}}</strong> to:{' '}
      </Trans>
      <FooterBase t={t} lng={lng} />      
      {languages.filter((l) => lng !== l).map((l, index) => {
        return (
          <span key={l}>
            {index > 0 && (' or ')}
            <Link href={`/$l}`}>
              {l}
            </Link>
          </span>        
        )
      })}
    </footer>
  )
}