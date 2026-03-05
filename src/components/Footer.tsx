import type { TranslationModel } from '../i18n/dictionary'

interface FooterProps {
  copy: TranslationModel['footer']
}

function Footer({ copy }: FooterProps) {
  return (
    <footer className="border-t border-border py-8 text-center text-sm text-muted">
      <p>{copy.copyright}</p>
      <p className="mt-2">{copy.poweredBy}</p>
    </footer>
  )
}

export default Footer

