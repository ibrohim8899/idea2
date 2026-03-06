import { useEffect, useState } from 'react'
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [activeSection, language, theme])

  const handleNavigate = (targetId: string) => {
    onNavigate(targetId)
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="border-b border-border py-4">
      <div className="flex items-start justify-between gap-3 sm:items-center">
        <button
          type="button"
          onClick={() => handleNavigate('top')}
          className="flex min-w-0 items-center gap-3 text-left"
        >
          <span className="text-lg font-bold tracking-tight sm:text-xl">{title}</span>
        </button>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((previous) => !previous)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-[var(--color-card)] text-text md:hidden"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
            {isMobileMenuOpen ? (
              <path d="M18.3 5.71 12 12l6.3 6.29-1.41 1.41L10.59 13.4 4.29 19.7 2.88 18.29 9.17 12 2.88 5.71 4.29 4.3l6.3 6.29 6.29-6.3z" />
            ) : (
              <path d="M4 7h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            )}
          </svg>
        </button>

        <div className="hidden flex-1 items-center justify-end gap-6 md:flex">
          <nav className="flex items-center gap-7">
            {navigation.map((item) => {
              const selected = item.key === activeSection
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleNavigate(item.targetId)}
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

      {isMobileMenuOpen && (
        <div className="mt-4 space-y-4 rounded-2xl border border-border bg-[var(--color-card)] p-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {navigation.map((item) => {
              const selected = item.key === activeSection
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleNavigate(item.targetId)}
                  className={`rounded-lg border px-3 py-2 text-left text-sm font-semibold transition ${
                    selected
                      ? 'border-primary bg-primary text-white'
                      : 'border-border text-text hover:bg-[var(--color-input)]'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            {LANGUAGES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onLanguageChange(item)}
                className={`rounded-lg border px-3 py-2 text-xs font-bold uppercase transition ${
                  item === language
                    ? 'border-primary bg-primary text-white'
                    : 'border-border text-text hover:bg-[var(--color-input)]'
                }`}
              >
                {item}
              </button>
            ))}

            <button
              type="button"
              onClick={onThemeToggle}
              className="ml-auto flex h-10 min-w-10 items-center justify-center rounded-lg border border-border bg-[var(--color-card)] px-3 text-text transition hover:bg-[var(--color-input)]"
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
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
