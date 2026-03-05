import { useMemo, useRef, useState, type FormEvent } from 'react'
import { type Language, type TranslationModel } from '../i18n/dictionary'
import { ApiError, submitIdea } from '../services/api'
import { formatUzPhoneInput, isValidEmail, normalizeUzPhone } from '../utils/validators'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

interface IdeaFormProps {
  id: string
  language: Language
  copy: TranslationModel['form']
}

interface FormValues {
  firstName: string
  lastName: string
  email: string
  phone: string
  idea: string
  website: string
}

type FieldName = keyof Omit<FormValues, 'website'>
type FieldErrors = Partial<Record<FieldName, string>>

const MIN_IDEA_LENGTH = 20
const FRONTEND_RATE_LIMIT_MS = 7000

const emptyForm: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  idea: '',
  website: '',
}

function IdeaForm({ id, language, copy }: IdeaFormProps) {
  const [formValues, setFormValues] = useState<FormValues>(emptyForm)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const lastSubmitTime = useRef<number>(0)

  const isSubmitting = status === 'loading'

  const submitButtonLabel = useMemo(
    () => (isSubmitting ? copy.submitting : copy.submit),
    [isSubmitting, copy],
  )

  const validate = (): { errors: FieldErrors; normalizedPhone: string | null } => {
    const validationErrors: FieldErrors = {}

    if (!formValues.firstName.trim()) {
      validationErrors.firstName = copy.validation.firstNameRequired
    }

    if (!formValues.lastName.trim()) {
      validationErrors.lastName = copy.validation.lastNameRequired
    }

    if (formValues.email.trim() && !isValidEmail(formValues.email)) {
      validationErrors.email = copy.validation.emailInvalid
    }

    if (!formValues.phone.trim()) {
      validationErrors.phone = copy.validation.phoneRequired
    }

    const normalizedPhone = normalizeUzPhone(formValues.phone)
    if (!normalizedPhone) {
      validationErrors.phone = copy.validation.phoneInvalid
    }

    if (!formValues.idea.trim()) {
      validationErrors.idea = copy.validation.ideaRequired
    } else if (formValues.idea.trim().length < MIN_IDEA_LENGTH) {
      validationErrors.idea = copy.validation.ideaTooShort
    }

    return { errors: validationErrors, normalizedPhone }
  }

  const updateField = (field: keyof FormValues, value: string) => {
    setFormValues((previous) => ({ ...previous, [field]: value }))
    if (field !== 'website') {
      setErrors((previous) => ({ ...previous, [field]: undefined }))
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const now = Date.now()
    if (now - lastSubmitTime.current < FRONTEND_RATE_LIMIT_MS) {
      setStatus('error')
      setStatusMessage(copy.rateLimited)
      return
    }

    const { errors: validationErrors, normalizedPhone } = validate()
    if (Object.keys(validationErrors).length > 0 || !normalizedPhone) {
      setErrors(validationErrors)
      setStatus('error')
      setStatusMessage(copy.error)
      return
    }

    lastSubmitTime.current = now
    setStatus('loading')
    setStatusMessage('')
    setErrors({})

    try {
      await submitIdea({
        firstName: formValues.firstName.trim(),
        lastName: formValues.lastName.trim(),
        email: formValues.email.trim() || undefined,
        phone: normalizedPhone,
        idea: formValues.idea.trim(),
        language,
        website: formValues.website.trim(),
        userAgent: window.navigator.userAgent,
      })

      setStatus('success')
      setStatusMessage(copy.success)
      setFormValues(emptyForm)
    } catch (error) {
      setStatus('error')
      if (error instanceof ApiError && error.code === 'RATE_LIMITED') {
        setStatusMessage(copy.rateLimited)
      } else {
        setStatusMessage(copy.error)
      }
    }
  }

  const statusClassName =
    status === 'success'
      ? 'border-success/30 bg-success/10 text-success'
      : 'border-danger/30 bg-danger/10 text-danger'

  return (
    <section id={id} className="mb-20 scroll-mt-24">
      <div className="mx-auto w-full max-w-2xl text-center">
        <h2 className="text-5xl font-bold tracking-tight">{copy.title}</h2>
        <p className="mt-3 text-lg text-muted">{copy.description}</p>
      </div>

      <div className="mx-auto mt-10 w-full max-w-2xl rounded-2xl border border-border bg-[var(--color-card)] p-6 md:p-8">
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field
              id="firstName"
              label={copy.firstNameLabel}
              value={formValues.firstName}
              placeholder={copy.firstNamePlaceholder}
              onChange={(value) => updateField('firstName', value)}
              error={errors.firstName}
            />
            <Field
              id="lastName"
              label={copy.lastNameLabel}
              value={formValues.lastName}
              placeholder={copy.lastNamePlaceholder}
              onChange={(value) => updateField('lastName', value)}
              error={errors.lastName}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field
              id="email"
              type="email"
              label={`${copy.emailLabel} (${copy.optional})`}
              value={formValues.email}
              placeholder={copy.emailPlaceholder}
              onChange={(value) => updateField('email', value)}
              error={errors.email}
            />
            <Field
              id="phone"
              label={copy.phoneLabel}
              value={formValues.phone}
              placeholder={copy.phonePlaceholder}
              onChange={(value) => updateField('phone', formatUzPhoneInput(value))}
              onFocus={() => {
                if (!formValues.phone) {
                  updateField('phone', '+998')
                }
              }}
              error={errors.phone}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="idea" className="text-sm font-semibold text-text">
              {copy.ideaLabel}
            </label>
            <textarea
              id="idea"
              rows={4}
              value={formValues.idea}
              onChange={(event) => updateField('idea', event.target.value)}
              placeholder={copy.ideaPlaceholder}
              className="w-full resize-none rounded-lg border border-border bg-[var(--color-input)] px-4 py-3 text-sm text-text outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
            />
            {errors.idea && <p className="text-sm text-danger">{errors.idea}</p>}
          </div>

          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formValues.website}
              onChange={(event) => updateField('website', event.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex h-12 w-full items-center justify-center rounded-lg bg-primary px-6 text-base font-bold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitButtonLabel}
          </button>

          {(status === 'success' || status === 'error') && (
            <p className={`rounded-lg border px-3 py-2 text-sm ${statusClassName}`}>{statusMessage}</p>
          )}
        </form>
      </div>
    </section>
  )
}

interface FieldProps {
  id: string
  label: string
  type?: 'text' | 'email'
  value: string
  placeholder: string
  onChange: (value: string) => void
  onFocus?: () => void
  error?: string
}

function Field({ id, label, type = 'text', value, placeholder, onChange, onFocus, error }: FieldProps) {
  return (
    <div className="space-y-2 text-left">
      <label htmlFor={id} className="text-sm font-semibold text-text">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onFocus={onFocus}
        className="w-full rounded-lg border border-border bg-[var(--color-input)] px-4 py-2.5 text-sm text-text outline-none transition placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary"
      />
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  )
}

export default IdeaForm
