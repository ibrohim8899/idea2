import type { TranslationModel } from '../i18n/dictionary'

interface CommunitySectionProps {
  copy: TranslationModel['community']
}

const COMMUNITY_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCta779Ltr9UtUTssnL8XYaEZOqfWYwyRA3aezh26fkCZCL-rNaRqQcRjuQglFkSLu6OjCYqH1EJb1KaacfZ4TLQsA642oLPMtq8pl_fOFdKll-Qkj25ip_rJJSI_VoZAVWmhGp49LQvktOXC2WiHJ3wMpMSKK0U933jjQo-ZikxYiOquk1Nnj27yC9Lhv8yy_alVu3yTuN1sHBFveol8E5_38CEDtnx8IWEKHATn1XbfjCWmRWeMhF8hGJa8IQBOh0wUhZi4tZKWE'

function CommunitySection({ copy }: CommunitySectionProps) {
  return (
    <section className="mb-20">
      <div className="overflow-hidden rounded-2xl border border-border bg-[var(--color-card)]">
        <div className="grid lg:grid-cols-2">
          <div className="p-8 lg:p-10">
            <h2 className="text-4xl font-bold tracking-tight">{copy.title}</h2>
            <p className="mt-4 max-w-md text-lg leading-8 text-muted">{copy.description}</p>

            <div className="mt-10 grid grid-cols-2 gap-8">
              {copy.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-5xl font-black text-primary">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center bg-[var(--color-panel)] p-8 lg:p-10">
            <div
              className="h-full min-h-[320px] w-full max-w-[320px] bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${COMMUNITY_IMAGE_URL}')` }}
              role="img"
              aria-label="Community trust"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CommunitySection

