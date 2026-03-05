interface HeroSectionProps {
  title: string
  description: string
  primaryActionLabel: string
  secondaryActionLabel: string
  onPrimaryAction: () => void
  onSecondaryAction: () => void
}

const HERO_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuArcky0RGDy4RjXW2bh4g-cAjYztuho_MU_w4AuMCs0tEhF2tbMzXL2kwr-R77vXyIOM-wvJYRKw3yKRvD15kDIwsopmF-0QDke1AdR0NLmF0eHCloF9wuZbNKaol_daTBv8KdLDG8NwEKPoe9YwF3jBgymC7pqDKNvhfD2Elq0zOy-owwDV_a1-KYxLdA-vNQ9m_R3DHVALC8XQZjy4fNqBDiFkqJq29GXU3zPovD8YoKEV3xYMWWMuZT56k5uDBRygPBXWCBx90w'

function HeroSection({
  title,
  description,
  primaryActionLabel,
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction,
}: HeroSectionProps) {
  return (
    <section className="py-10 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <div className="space-y-6">
          <h1 className="max-w-xl text-5xl font-black leading-[1.03] tracking-tight lg:text-7xl">{title}</h1>
          <p className="max-w-xl text-lg leading-8 text-muted">{description}</p>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={onPrimaryAction}
              className="rounded-lg bg-primary px-6 py-3 text-base font-bold text-white transition hover:bg-primary/90"
            >
              {primaryActionLabel}
            </button>
            <button
              type="button"
              onClick={onSecondaryAction}
              className="rounded-lg border border-border bg-transparent px-6 py-3 text-base font-bold text-text transition hover:bg-white/5"
            >
              {secondaryActionLabel}
            </button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[520px] rounded-3xl border border-[var(--color-frame)] bg-[var(--color-frame)] p-6">
          <div
            className="aspect-square w-full rounded-sm bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${HERO_IMAGE_URL}')` }}
            role="img"
            aria-label="AI object"
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection

