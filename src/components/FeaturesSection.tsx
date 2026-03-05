import type { TranslationModel } from '../i18n/dictionary'

interface FeaturesSectionProps {
  copy: TranslationModel['features']
}

const ICONS = {
  idea: (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M9 21h6v-1H9v1zm3-19a7 7 0 0 0-4 12.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26A7 7 0 0 0 12 2zm2 11.6-.5.3V16h-3v-2.1l-.5-.3A5 5 0 1 1 14 13.6z" />
    </svg>
  ),
  bug: (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M14 5h-4l-1-1h6l-1 1zM8 7h8v2h-1v2.1c.6.3 1 .9 1 1.6V16a4 4 0 0 1-8 0v-3.3c0-.7.4-1.3 1-1.6V9H8V7zm2 5v4a2 2 0 0 0 4 0v-4h-4z" />
    </svg>
  ),
  train: (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M12 2a8 8 0 0 0-8 8v5a3 3 0 0 0 3 3h2l-1 3h2l1-3h2l1 3h2l-1-3h2a3 3 0 0 0 3-3v-5a8 8 0 0 0-8-8zm0 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-3 9h6v2H9v-2z" />
    </svg>
  ),
}

function FeaturesSection({ copy }: FeaturesSectionProps) {
  return (
    <section className="mb-16">
      <h2 className="mb-8 text-4xl font-bold tracking-tight">{copy.title}</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {copy.items.map((item, index) => {
          const iconKey = index === 0 ? 'idea' : index === 1 ? 'bug' : 'train'
          const iconColor = index === 0 ? 'text-primary bg-primary/10' : index === 1 ? 'text-rose-400 bg-rose-400/10' : 'text-violet-400 bg-violet-400/10'

          return (
            <article
              key={item.id}
              className="rounded-2xl border border-border bg-[var(--color-card)] p-6 shadow-[0_0_0_1px_rgba(19,91,236,0.02)]"
            >
              <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg ${iconColor}`}>
                {ICONS[iconKey as keyof typeof ICONS]}
              </div>
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="mt-2 text-base leading-7 text-muted">{item.description}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default FeaturesSection

