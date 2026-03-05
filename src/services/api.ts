export interface SubmitIdeaPayload {
  firstName: string
  lastName: string
  email?: string
  phone: string
  role: string
  workplace?: string
  school?: string
  region: string
  idea: string
  language: 'uz' | 'ru' | 'en'
  userAgent: string
  website?: string
}

interface SubmitIdeaResponse {
  ok: boolean
  message?: string
}

export class ApiError extends Error {
  code: 'RATE_LIMITED' | 'REQUEST_FAILED' | 'NOT_CONFIGURED'

  constructor(message: string, code: 'RATE_LIMITED' | 'REQUEST_FAILED' | 'NOT_CONFIGURED') {
    super(message)
    this.name = 'ApiError'
    this.code = code
  }
}

interface TelegramApiResponse {
  ok: boolean
  description?: string
  parameters?: {
    retry_after?: number
  }
}

const TELEGRAM_BOT_TOKEN = (import.meta.env.VITE_TELEGRAM_BOT_TOKEN ?? '').trim()
const TELEGRAM_CHAT_ID = (import.meta.env.VITE_TELEGRAM_CHAT_ID ?? '').trim()
const TELEGRAM_TOPIC_ID = (import.meta.env.VITE_TELEGRAM_TOPIC_ID ?? '').trim()

const TELEGRAM_API_URL = TELEGRAM_BOT_TOKEN
  ? `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
  : ''

const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export const submitIdea = async (payload: SubmitIdeaPayload): Promise<SubmitIdeaResponse> => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID || !TELEGRAM_API_URL) {
    throw new ApiError(
      'Telegram config is missing: VITE_TELEGRAM_BOT_TOKEN / VITE_TELEGRAM_CHAT_ID',
      'NOT_CONFIGURED',
    )
  }

  if (payload.website && payload.website.trim()) {
    throw new ApiError('Spam detected.', 'REQUEST_FAILED')
  }

  const text = [
    '<b>Yangi idea</b>',
    '',
    `<b>First name:</b> ${escapeHtml(payload.firstName)}`,
    `<b>Last name:</b> ${escapeHtml(payload.lastName)}`,
    `<b>Email:</b> ${escapeHtml(payload.email ?? '-')}`,
    `<b>Phone:</b> ${escapeHtml(payload.phone)}`,
    `<b>Role:</b> ${escapeHtml(payload.role || '-')}`,
    `<b>Workplace:</b> ${escapeHtml(payload.workplace ?? '-')}`,
    `<b>School:</b> ${escapeHtml(payload.school ?? '-')}`,
    `<b>Region:</b> ${escapeHtml(payload.region || '-')}`,
    `<b>Language:</b> ${escapeHtml(payload.language)}`,
    `<b>User agent:</b> ${escapeHtml(payload.userAgent)}`,
    '',
    '<b>Idea:</b>',
    escapeHtml(payload.idea),
  ].join('\n')

  const body: Record<string, string | boolean | number> = {
    chat_id: TELEGRAM_CHAT_ID,
    text,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  }

  if (TELEGRAM_TOPIC_ID) {
    body.message_thread_id = Number(TELEGRAM_TOPIC_ID)
  }

  const response = await fetch(TELEGRAM_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = (await response.json().catch(() => null)) as TelegramApiResponse | null

  if (response.status === 429 || data?.parameters?.retry_after) {
    throw new ApiError(data?.description ?? 'Too many requests', 'RATE_LIMITED')
  }

  if (!response.ok || !data?.ok) {
    throw new ApiError(data?.description ?? 'Telegram request failed', 'REQUEST_FAILED')
  }

  return { ok: true, message: 'Sent to Telegram' }
}
