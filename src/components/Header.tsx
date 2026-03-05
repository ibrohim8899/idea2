import type { Language } from '../i18n/dictionary'

type Theme = 'light' | 'dark'

interface NavigationItem {
  key: string
  label: string
  targetId: string
}

interface HeaderProps {
  language: Language
  onLanguageChange: (language: Language) => void
  theme: Theme
  onThemeToggle: () => void
  title: string
  themeLabel: string
  navigation: NavigationItem[]
  activeSection: string
  onNavigate: (targetId: string) => void
}

const LANGUAGES: Language[] = ['uz', 'ru', 'en']

function Header({
  language,
  onLanguageChange,
  theme,
  onThemeToggle,
  title,
  themeLabel,
  navigation,
  activeSection,
  onNavigate,
}: HeaderProps) {
  return (
    <header className="border-b border-border py-4">
      <div className="flex items-center justify-between gap-4">
        <button type="button" onClick={() => onNavigate('top')} className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight">{title}</span>
        </button>

        <div className="hidden flex-1 items-center justify-end gap-6 md:flex">
          <nav className="flex items-center gap-7">
            {navigation.map((item) => {
              const selected = item.key === activeSection
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onNavigate(item.targetId)}
                  className={`text-sm font-medium transition ${
                    selected ? 'text-text' : 'text-muted hover:text-text'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}

            <div className="flex items-center gap-1 text-sm font-medium">
              {LANGUAGES.map((item, index) => (
                <span key={item} className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onLanguageChange(item)}
                    className={`uppercase transition ${
                      item === language ? 'font-bold text-text' : 'text-muted hover:text-text'
                    }`}
                  >
                    {item}
                  </button>
                  {index < LANGUAGES.length - 1 && <span className="text-muted">/</span>}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={onThemeToggle}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-[var(--color-card)] text-muted transition hover:text-text"
              aria-label={theme === 'dark' ? 'Enable light mode' : 'Enable dark mode'}
              title={themeLabel}
            >
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M6.76 4.84 5.34 3.42 4.22 4.54l1.42 1.42zM1 13h3v-2H1zm10 10h2v-3h-2zm9-10v-2h3v2zm-1.78-8.46-1.12-1.12-1.42 1.42 1.12 1.12zM17.24 19.16l1.42 1.42 1.12-1.12-1.42-1.42zM4.22 19.46l1.12 1.12 1.42-1.42-1.12-1.12zM12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M9.37 5.51A7 7 0 0 0 16.5 16a7.5 7.5 0 1 1-7.13-10.49z" />
                </svg>
              )}
            </button>
          </nav>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 md:hidden">
        {navigation.map((item) => {
          const selected = item.key === activeSection
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavigate(item.targetId)}
              className={`rounded-md border px-3 py-1.5 text-xs font-semibold ${
                selected ? 'border-primary bg-primary text-white' : 'border-border text-muted'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    </header>
  )
}

export default Header

