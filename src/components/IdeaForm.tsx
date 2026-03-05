import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
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
  role: string
  workplace: string
  school: string
  region: string
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
  role: '',
  workplace: '',
  school: '',
  region: '',
  idea: '',
  website: '',
}

function IdeaForm({ id, language, copy }: IdeaFormProps) {
  const [formValues, setFormValues] = useState<FormValues>(emptyForm)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [toastId, setToastId] = useState(0)
  const lastSubmitTime = useRef<number>(0)
  const toastTimer = useRef<number | null>(null)

  const isSubmitting = status === 'loading'

  const submitButtonLabel = useMemo(
    () => (isSubmitting ? copy.submitting : copy.submit),
    [isSubmitting, copy],
  )

  useEffect(() => {
    if (status !== 'success' && status !== 'error') {
      setToastVisible(false)
      return undefined
    }

    setToastVisible(true)

    if (toastTimer.current) {
      window.clearTimeout(toastTimer.current)
    }

    toastTimer.current = window.setTimeout(() => {
      setToastVisible(false)
    }, 5000)

    return () => {
      if (toastTimer.current) {
        window.clearTimeout(toastTimer.current)
      }
    }
  }, [status, statusMessage, toastId])

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

    if (!formValues.role.trim()) {
      validationErrors.role = copy.validation.roleRequired
    }

    if (formValues.role === 'worker' && !formValues.workplace.trim()) {
      validationErrors.workplace = copy.validation.workplaceRequired
    }

    if (formValues.role === 'student' && !formValues.school.trim()) {
      validationErrors.school = copy.validation.schoolRequired
    }

    if (!formValues.region.trim()) {
      validationErrors.region = copy.validation.regionRequired
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
  }

  const showToast = (nextStatus: FormStatus, message: string) => {
    setStatus(nextStatus)
    setStatusMessage(message)
    setToastId((previous) => previous + 1)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const now = Date.now()
    if (now - lastSubmitTime.current < FRONTEND_RATE_LIMIT_MS) {
      showToast('error', copy.rateLimited)
      return
    }

    const { errors: validationErrors, normalizedPhone } = validate()
    if (Object.keys(validationErrors).length > 0 || !normalizedPhone) {
      const hasPhoneError = Boolean(validationErrors.phone)
      const hasNonPhoneErrors = Object.entries(validationErrors).some(
        ([key, value]) => key !== 'phone' && Boolean(value),
      )
      showToast('error', hasPhoneError && !hasNonPhoneErrors ? copy.toast.fillPhone : copy.toast.fillForm)
      return
    }

    lastSubmitTime.current = now
    setStatus('loading')
    setStatusMessage('')
    try {
      const role = formValues.role
      const workplace = role === 'worker' ? formValues.workplace.trim() : undefined
      const school = role === 'student' ? formValues.school.trim() : undefined

      await submitIdea({
        firstName: formValues.firstName.trim(),
        lastName: formValues.lastName.trim(),
        email: formValues.email.trim() || undefined,
        phone: normalizedPhone,
        role,
        workplace,
        school,
        region: formValues.region.trim(),
        idea: formValues.idea.trim(),
        language,
        website: formValues.website.trim(),
        userAgent: window.navigator.userAgent,
      })

      showToast('success', copy.success)
      setFormValues(emptyForm)
    } catch (error) {
      if (error instanceof ApiError && error.code === 'RATE_LIMITED') {
        showToast('error', copy.rateLimited)
      } else {
        showToast('error', copy.error)
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
            />
            <Field
              id="lastName"
              label={copy.lastNameLabel}
              value={formValues.lastName}
              placeholder={copy.lastNamePlaceholder}
              onChange={(value) => updateField('lastName', value)}
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
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2 text-left">
              <label htmlFor="role" className="text-sm font-semibold text-text">
                {copy.roleLabel}
              </label>
              <select
                id="role"
                value={formValues.role}
                onChange={(event) => updateField('role', event.target.value)}
                className="w-full rounded-lg border border-border bg-[var(--color-input)] px-4 py-2.5 text-sm text-text outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="">{copy.rolePlaceholder}</option>
                <option value="worker">{copy.roleWorker}</option>
                <option value="student">{copy.roleStudent}</option>
              </select>
            </div>

            <div className="space-y-2 text-left">
              <label htmlFor="region" className="text-sm font-semibold text-text">
                {copy.regionLabel}
              </label>
              <select
                id="region"
                value={formValues.region}
                onChange={(event) => updateField('region', event.target.value)}
                className="w-full rounded-lg border border-border bg-[var(--color-input)] px-4 py-2.5 text-sm text-text outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="">{copy.regionPlaceholder}</option>
                {copy.regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {formValues.role === 'worker' && (
            <Field
              id="workplace"
              label={copy.workplaceLabel}
              value={formValues.workplace}
              placeholder={copy.workplacePlaceholder}
              onChange={(value) => updateField('workplace', value)}
            />
          )}

          {formValues.role === 'student' && (
            <Field
              id="school"
              label={copy.schoolLabel}
              value={formValues.school}
              placeholder={copy.schoolPlaceholder}
              onChange={(value) => updateField('school', value)}
            />
          )}

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
        </form>
      </div>

      {(status === 'success' || status === 'error') && statusMessage && (
        <div
          className={`fixed right-6 top-6 z-50 max-w-sm rounded-lg border px-4 py-3 text-sm shadow-lg transition-all duration-300 ease-out ${
            toastVisible
              ? 'translate-y-0 opacity-100'
              : '-translate-y-2 opacity-0 pointer-events-none'
          } ${statusClassName}`}
          role="status"
          aria-live="polite"
        >
          {statusMessage}
        </div>
      )}
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
}

function Field({ id, label, type = 'text', value, placeholder, onChange, onFocus }: FieldProps) {
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
    </div>
  )
}

export default IdeaForm
