import { useEffect, useMemo, useState } from 'react'
import CommunitySection from './components/CommunitySection'
import FeaturesSection from './components/FeaturesSection'
import Footer from './components/Footer'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import IdeaForm from './components/IdeaForm'
import { DEFAULT_LANGUAGE, isLanguage, translations, type Language } from './i18n/dictionary'

const LANGUAGE_STORAGE_KEY = 'landing-language-v2'
const THEME_STORAGE_KEY = 'landing-theme'

type Theme = 'light' | 'dark'

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE
  }

  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
  return isLanguage(savedLanguage) ? savedLanguage : DEFAULT_LANGUAGE
}

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme
  }

  return 'dark'
}

function App() {
  const [language, setLanguage] = useState<Language>(() => getInitialLanguage())
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme())
  const [activeSection, setActiveSection] = useState('features')

  const t = useMemo(() => translations[language], [language])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = language
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  }, [language])

  useEffect(() => {
    if (window.location.pathname !== '/') {
      window.history.replaceState({}, '', '/')
    }
  }, [])

  const handleLanguageChange = (nextLanguage: Language) => {
    setLanguage(nextLanguage)
  }

  const handleThemeToggle = () => {
    setTheme((previousTheme) => (previousTheme === 'light' ? 'dark' : 'light'))
  }

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    const navKey =
      id === 'top'
        ? 'features'
        : headerNavigation.find((item) => item.targetId === id)?.key ??
          (id === 'idea-form' ? 'docs' : activeSection)
    setActiveSection(navKey)
  }

  const headerNavigation = [
    { key: 'features', label: t.header.nav.features, targetId: 'features-section' },
    { key: 'community', label: t.header.nav.community, targetId: 'community-section' },
    { key: 'docs', label: t.header.nav.docs, targetId: 'idea-form' },
  ]

  return (
    <div id="top" className="min-h-screen bg-bg text-text">
      <div className="mx-auto flex min-h-screen w-full max-w-[1200px] flex-col px-4 md:px-10 lg:px-12">
        <Header
          language={language}
          onLanguageChange={handleLanguageChange}
          theme={theme}
          onThemeToggle={handleThemeToggle}
          title={t.header.title}
          themeLabel={theme === 'dark' ? t.header.lightMode : t.header.darkMode}
          navigation={headerNavigation}
          activeSection={activeSection}
          onNavigate={scrollToSection}
        />
        <main className="flex-1">
          <HeroSection
            title={t.hero.title}
            description={t.hero.description}
            primaryActionLabel={t.hero.primaryCta}
            secondaryActionLabel={t.hero.secondaryCta}
            onPrimaryAction={() => scrollToSection('idea-form')}
            onSecondaryAction={() => scrollToSection('features-section')}
          />
          <section id="features-section" className="scroll-mt-24">
            <FeaturesSection copy={t.features} />
          </section>
          <section id="community-section" className="scroll-mt-24">
            <CommunitySection copy={t.community} />
          </section>
          <IdeaForm id="idea-form" language={language} copy={t.form} />
        </main>
        <Footer copy={t.footer} />
      </div>
    </div>
  )
}

export default App

