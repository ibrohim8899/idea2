const UZ_PHONE_REGEX = /^(?:\+?998)?(33|77|88|90|91|93|94|95|97|98|99)\d{7}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const formatUzPhoneInput = (value: string): string => {
  const digits = value.replace(/\D/g, '')

  if (!digits) {
    return '+998'
  }

  const nationalPart = digits.startsWith('998') ? digits.slice(3, 12) : digits.slice(0, 9)
  const operator = nationalPart.slice(0, 2)
  const blockOne = nationalPart.slice(2, 5)
  const blockTwo = nationalPart.slice(5, 7)
  const blockThree = nationalPart.slice(7, 9)

  let formatted = '+998'
  if (operator) formatted += ` ${operator}`
  if (blockOne) formatted += ` ${blockOne}`
  if (blockTwo) formatted += ` ${blockTwo}`
  if (blockThree) formatted += ` ${blockThree}`

  return formatted
}

export const normalizeUzPhone = (value: string): string | null => {
  const digits = value.replace(/\D/g, '')
  let nationalPart = ''

  if (digits.length === 9) {
    nationalPart = digits
  } else if (digits.startsWith('998') && digits.length === 12) {
    nationalPart = digits.slice(3)
  } else {
    return null
  }

  const normalizedPhone = `+998${nationalPart}`
  return UZ_PHONE_REGEX.test(normalizedPhone) ? normalizedPhone : null
}

export const isValidUzPhone = (value: string): boolean => normalizeUzPhone(value) !== null

export const isValidEmail = (value: string): boolean => EMAIL_REGEX.test(value.trim())
