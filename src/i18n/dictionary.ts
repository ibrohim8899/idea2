export type Language = 'uz' | 'ru' | 'en'

export const DEFAULT_LANGUAGE: Language = 'en'

export const isLanguage = (value: string | null): value is Language =>
  value === 'uz' || value === 'ru' || value === 'en'

export interface TranslationModel {
  header: {
    title: string
    darkMode: string
    lightMode: string
    nav: {
      features: string
      community: string
      docs: string
    }
  }
  hero: {
    title: string
    description: string
    primaryCta: string
    secondaryCta: string
  }
  features: {
    title: string
    items: Array<{
      id: string
      title: string
      description: string
    }>
  }
  community: {
    title: string
    description: string
    stats: Array<{
      value: string
      label: string
    }>
  }
  form: {
    title: string
    description: string
    firstNameLabel: string
    firstNamePlaceholder: string
    lastNameLabel: string
    lastNamePlaceholder: string
    emailLabel: string
    optional: string
    emailPlaceholder: string
    phoneLabel: string
    phonePlaceholder: string
    ideaLabel: string
    ideaPlaceholder: string
    submit: string
    submitting: string
    success: string
    error: string
    rateLimited: string
    validation: {
      firstNameRequired: string
      lastNameRequired: string
      emailInvalid: string
      phoneRequired: string
      phoneInvalid: string
      ideaRequired: string
      ideaTooShort: string
    }
  }
  footer: {
    copyright: string
    poweredBy: string
  }
}

export const translations: Record<Language, TranslationModel> = {
  uz: {
    header: {
      title: 'EchoAI',
      darkMode: 'Dark mode',
      lightMode: 'Light mode',
      nav: {
        features: 'Imkoniyatlar',
        community: 'Hamjamiyat',
        docs: 'G`oya',
      },
    },
    hero: {
      title: 'Fikringiz bilan AI ni yaxshilang',
      description:
        "G'oyalar yuboring, xatolarni xabar qiling va hammaga aniqroq AI yaratishda yordam bering.",
      primaryCta: 'G`oya yuborish',
      secondaryCta: "Batafsil o'rganish",
    },
    features: {
      title: 'Imkoniyatlar',
      items: [
        {
          id: 'ideas',
          title: "G'oyalaringizni ulashing",
          description:
            "AI rivoji uchun o'z qarashlaringizni ulashing. Biz hamjamiyat fikrlarini doim inobatga olamiz.",
        },
        {
          id: 'issues',
          title: 'AI xatolarini bildiring',
          description:
            "Xatolik yoki noto'g'ri javob topsangiz, yozib qoldiring. Aniqlikni birga yaxshilaymiz.",
        },
        {
          id: 'training',
          title: 'AI ni birga o`rgatamiz',
          description:
            'Javoblarga kontekst va batafsil fikr bildirib model sifatini oshirishga yordam bering.',
        },
      ],
    },
    community: {
      title: 'Hamjamiyat ishonchi',
      description:
        'EchoAI kelajagini shakllantirayotgan minglab foydalanuvchilarga qo`shiling. Sizning ovozingiz muhim.',
      stats: [
        { value: '10k+', label: 'Yuborilgan fikrlar' },
        { value: '3k+', label: 'Faol foydalanuvchilar' },
        { value: '500+', label: 'Platforma yaxshilanishlari' },
      ],
    },
    form: {
      title: 'G`oya yuborish',
      description: 'Quyidagi formani to`ldirib g`oyangizni yuboring.',
      firstNameLabel: 'Ism',
      firstNamePlaceholder: 'John',
      lastNameLabel: 'Familiya',
      lastNamePlaceholder: 'Doe',
      emailLabel: 'Email',
      optional: 'Ixtiyoriy',
      emailPlaceholder: 'john@example.com',
      phoneLabel: 'Telefon raqam',
      phonePlaceholder: '+998 90 123 45 67',
      ideaLabel: 'G`oya',
      ideaPlaceholder: 'G`oyangizni yozing...',
      submit: 'G`oya yuborish',
      submitting: 'Yuborilmoqda...',
      success: 'Rahmat. G`oyangiz muvaffaqiyatli yuborildi.',
      error: 'Xatolik yuz berdi. Iltimos, qayta urinib ko`ring.',
      rateLimited: 'Juda tez yuborildi. Bir necha soniyadan keyin qayta urinib ko`ring.',
      validation: {
        firstNameRequired: 'Ism kiritish majburiy.',
        lastNameRequired: 'Familiya kiritish majburiy.',
        emailInvalid: 'Email formati noto`g`ri.',
        phoneRequired: 'Telefon raqam majburiy.',
        phoneInvalid: 'Telefon raqam +998 formatida bo`lishi kerak.',
        ideaRequired: 'G`oya matni majburiy.',
        ideaTooShort: 'G`oya matni kamida 20 ta belgidan iborat bo`lishi kerak.',
      },
    },
    footer: {
      copyright: `© ${new Date().getFullYear()}. Barcha huquqlar himoyalangan.`,
      poweredBy: 'Powered by Techgigs',
    },
  },
  ru: {
    header: {
      title: 'EchoAI',
      darkMode: 'Dark mode',
      lightMode: 'Light mode',
      nav: {
        features: 'Функции',
        community: 'Сообщество',
        docs: 'Идея',
      },
    },
    hero: {
      title: 'Помогите улучшить AI вашим отзывом',
      description:
        'Отправляйте идеи, сообщайте об ошибках и помогайте нам обучать более точную AI модель для всех.',
      primaryCta: 'Отправить идею',
      secondaryCta: 'Узнать больше',
    },
    features: {
      title: 'Функции',
      items: [
        {
          id: 'ideas',
          title: 'Делитесь идеями',
          description:
            'Поделитесь вашим видением будущего AI. Мы внимательно слушаем сообщество.',
        },
        {
          id: 'issues',
          title: 'Сообщайте о проблемах AI',
          description:
            'Нашли баг или галлюцинацию? Сообщите нам, чтобы мы исправили и повысили точность.',
        },
        {
          id: 'training',
          title: 'Помогайте обучать AI',
          description:
            'Добавляйте контекст и подробную обратную связь, чтобы модели улучшались быстрее.',
        },
      ],
    },
    community: {
      title: 'Доверие сообщества',
      description:
        'Присоединяйтесь к тысячам пользователей, которые формируют будущее EchoAI. Ваш голос важен.',
      stats: [
        { value: '10k+', label: 'Отправленных отзывов' },
        { value: '3k+', label: 'Активных пользователей' },
        { value: '500+', label: 'Улучшений платформы' },
      ],
    },
    form: {
      title: 'Отправить идею',
      description: 'Заполните форму ниже, чтобы отправить вашу идею.',
      firstNameLabel: 'Имя',
      firstNamePlaceholder: 'John',
      lastNameLabel: 'Фамилия',
      lastNamePlaceholder: 'Doe',
      emailLabel: 'Email',
      optional: 'Необязательно',
      emailPlaceholder: 'john@example.com',
      phoneLabel: 'Телефон',
      phonePlaceholder: '+998 90 123 45 67',
      ideaLabel: 'Идея',
      ideaPlaceholder: 'Опишите вашу идею...',
      submit: 'Отправить идею',
      submitting: 'Отправка...',
      success: 'Спасибо. Ваша идея успешно отправлена.',
      error: 'Что-то пошло не так. Пожалуйста, попробуйте снова.',
      rateLimited: 'Слишком частые отправки. Подождите несколько секунд.',
      validation: {
        firstNameRequired: 'Введите имя.',
        lastNameRequired: 'Введите фамилию.',
        emailInvalid: 'Неверный формат email.',
        phoneRequired: 'Введите номер телефона.',
        phoneInvalid: 'Номер должен быть в формате +998.',
        ideaRequired: 'Введите текст идеи.',
        ideaTooShort: 'Идея должна содержать минимум 20 символов.',
      },
    },
    footer: {
      copyright: `© ${new Date().getFullYear()}. Все права защищены.`,
      poweredBy: 'Powered by Techgigs',
    },
  },
  en: {
    header: {
      title: 'EchoAI',
      darkMode: 'Dark mode',
      lightMode: 'Light mode',
      nav: {
        features: 'Features',
        community: 'Community',
        docs: 'Idea',
      },
    },
    hero: {
      title: 'Help Improve AI with Your Feedback',
      description:
        'Submit ideas, report bugs, and help us train a better, more accurate AI model for everyone.',
      primaryCta: 'Submit Idea',
      secondaryCta: 'Learn More',
    },
    features: {
      title: 'Features',
      items: [
        {
          id: 'ideas',
          title: 'Share Your Ideas',
          description:
            'Share your vision to guide the future of AI development. We listen to our community.',
        },
        {
          id: 'issues',
          title: 'Report AI Issues',
          description:
            'Found a bug or hallucination? Let us know so we can fix it and improve accuracy.',
        },
        {
          id: 'training',
          title: 'Help Train AI',
          description:
            'Help our models improve by providing valuable context and detailed feedback on responses.',
        },
      ],
    },
    community: {
      title: 'Community Trust',
      description:
        'Join thousands of users who are actively shaping the future of EchoAI. Your voice matters in building better technology.',
      stats: [
        { value: '10k+', label: 'Feedback Submitted' },
        { value: '3k+', label: 'Active Users' },
        { value: '500+', label: 'Platform Improvements' },
      ],
    },
    form: {
      title: 'Submit Your Idea',
      description: 'Fill out the form below to send your idea.',
      firstNameLabel: 'First Name',
      firstNamePlaceholder: 'John',
      lastNameLabel: 'Last Name',
      lastNamePlaceholder: 'Doe',
      emailLabel: 'Email',
      optional: 'Optional',
      emailPlaceholder: 'john@example.com',
      phoneLabel: 'Phone Number',
      phonePlaceholder: '+998 90 123 45 67',
      ideaLabel: 'Idea',
      ideaPlaceholder: 'Tell us about your idea...',
      submit: 'Submit Idea',
      submitting: 'Submitting...',
      success: 'Thank you. Your idea was submitted successfully.',
      error: 'Something went wrong. Please try again.',
      rateLimited: 'Too many quick submissions. Please wait a few seconds.',
      validation: {
        firstNameRequired: 'First name is required.',
        lastNameRequired: 'Last name is required.',
        emailInvalid: 'Invalid email format.',
        phoneRequired: 'Phone number is required.',
        phoneInvalid: 'Phone must be a valid Uzbekistan number.',
        ideaRequired: 'Idea text is required.',
        ideaTooShort: 'Idea must contain at least 20 characters.',
      },
    },
    footer: {
      copyright: `© ${new Date().getFullYear()}. All rights reserved.`,
      poweredBy: 'Powered by Techgigs',
    },
  },
}
