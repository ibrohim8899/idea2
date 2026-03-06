export type Language = 'uz' | 'ru' | 'en'

export const DEFAULT_LANGUAGE: Language = 'uz'

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
    roleLabel: string
    rolePlaceholder: string
    roleWorker: string
    roleStudent: string
    workplaceLabel: string
    workplacePlaceholder: string
    schoolLabel: string
    schoolPlaceholder: string
    regionLabel: string
    regionPlaceholder: string
    regions: string[]
    ideaLabel: string
    ideaPlaceholder: string
    submit: string
    submitting: string
    success: string
    error: string
    rateLimited: string
    toast: {
      fillForm: string
      fillPhone: string
    }
    validation: {
      firstNameRequired: string
      lastNameRequired: string
      emailInvalid: string
      phoneRequired: string
      phoneInvalid: string
      roleRequired: string
      workplaceRequired: string
      schoolRequired: string
      regionRequired: string
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
      title: 'G`oya yuborish',
      darkMode: 'Dark mode',
      lightMode: 'Light mode',
      nav: {
        features: 'Imkoniyatlar',
        community: 'Hamjamiyat',
        docs: 'G`oya',
      },
    },
    hero: {
      title: "G'oyangiz bor, investitsiya yo'qmi?",
      description:
        "G'oyangizni qoldiring — biz ko'rib chiqamiz va keyingi qadamlar bo'yicha yordam beramiz.",
      primaryCta: "G'oya qoldirish",
      secondaryCta: 'Qanday ishlaymiz',
    },
    features: {
      title: 'Qanday yordam beramiz',
      items: [
        {
          id: 'ideas',
          title: "G'oyangizni qoldiring",
          description:
            "G'oyangizni tushunamiz, bozor va qiymat taklifini qisqa tahlil qilamiz.",
        },
        {
          id: 'issues',
          title: "Yordam va yo'nalish",
          description:
            "Siz bilan bog'lanib, g'oyani pishitish va taqdimotga tayyorlashda yordam beramiz.",
        },
        {
          id: 'training',
          title: "Keyingi qadamlar",
          description:
            "MVP, taqdimot va kelishuvlar bo'yicha yo'naltiramiz.",
        },
      ],
    },
    community: {
      title: "G'oya egalari hamjamiyati",
      description:
        "G'oya egalarga yordam beramiz. Loyihangiz eshitilishi kerak.",
      stats: [
        { value: '120+', label: "Ko'rib chiqilgan g'oyalar" },
        { value: '40+', label: "Bog'langan loyihalar" },
        { value: '15+', label: 'Hamkorlar' },
      ],
    },
    form: {
      title: "G'oyangizni qoldiring",
      description: "Quyidagi formani to'ldiring — biz g'oyangizni ko'rib chiqamiz va siz bilan bog'lanamiz.",
      firstNameLabel: 'Ism',
      firstNamePlaceholder: 'John',
      lastNameLabel: 'Familiya',
      lastNamePlaceholder: 'Doe',
      emailLabel: 'Email',
      optional: 'Ixtiyoriy',
      emailPlaceholder: 'john@example.com',
      phoneLabel: 'Telefon raqam',
      phonePlaceholder: '+998 90 123 45 67',
      roleLabel: 'Siz kimsiz?',
      rolePlaceholder: 'Tanlang',
      roleWorker: 'Ishchi',
      roleStudent: "O'quvchi",
      workplaceLabel: 'Ish joyi',
      workplacePlaceholder: 'Kompaniya nomi va lavozim',
      schoolLabel: 'Maktab / OTM',
      schoolPlaceholder: 'Maktab yoki universitet nomi',
      regionLabel: 'Viloyat',
      regionPlaceholder: 'Viloyatni tanlang',
      regions: [
        'Toshkent shahri',
        'Toshkent viloyati',
        'Andijon',
        'Buxoro',
        "Farg'ona",
        'Jizzax',
        'Xorazm',
        'Namangan',
        'Navoiy',
        'Qashqadaryo',
        'Samarqand',
        'Surxondaryo',
        'Sirdaryo',
        "Qoraqalpog'iston",
      ],
      ideaLabel: 'G`oya',
      ideaPlaceholder: 'G`oyangizni yozing...',
      submit: "G'oya qoldirish",
      submitting: 'Yuborilmoqda...',
      success: "Rahmat. G'oyangiz qabul qilindi, tez orada bog'lanamiz.",
      error: 'Xatolik yuz berdi. Iltimos, qayta urinib ko`ring.',
      rateLimited: 'Juda tez yuborildi. Bir necha soniyadan keyin qayta urinib ko`ring.',
      toast: {
        fillForm: "Formani to'ldiring.",
        fillPhone: "Nomerni to'ldiring.",
      },
      validation: {
        firstNameRequired: 'Ism kiritish majburiy.',
        lastNameRequired: 'Familiya kiritish majburiy.',
        emailInvalid: 'Email formati noto`g`ri.',
        phoneRequired: 'Telefon raqam majburiy.',
        phoneInvalid: 'Telefon raqam +998 formatida bo`lishi kerak.',
        roleRequired: 'Kimligingizni tanlang.',
        workplaceRequired: 'Ish joyini kiriting.',
        schoolRequired: "Maktab yoki OTM nomini kiriting.",
        regionRequired: 'Viloyatni tanlang.',
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
      title: 'Отправить идею',
      darkMode: 'Dark mode',
      lightMode: 'Light mode',
      nav: {
        features: 'Функции',
        community: 'Сообщество',
        docs: 'Идея',
      },
    },
    hero: {
      title: 'Есть идея, но нет инвестиций?',
      description:
        'Оставьте идею — мы рассмотрим её и поможем с дальнейшими шагами.',
      primaryCta: 'Оставить идею',
      secondaryCta: 'Как это работает',
    },
    features: {
      title: 'Как мы помогаем',
      items: [
        {
          id: 'ideas',
          title: 'Оставьте идею',
          description:
            'Мы изучаем вашу идею и делаем короткую оценку рынка и ценности.',
        },
        {
          id: 'issues',
          title: 'Поддержка и консультации',
          description:
            'Связываемся с вами и помогаем доработать идею и подготовить презентацию.',
        },
        {
          id: 'training',
          title: 'Дорожная карта',
          description:
            'Подскажем по MVP, презентации и следующим шагам, чтобы подготовиться к сделке.',
        },
      ],
    },
    community: {
      title: 'Сообщество авторов идей',
      description:
        'Мы помогаем авторам идей. Ваш проект должен быть услышан.',
      stats: [
        { value: '120+', label: 'Рассмотренных идей' },
        { value: '40+', label: 'Сведенных проектов' },
        { value: '15+', label: 'Партнеров' },
      ],
    },
    form: {
      title: 'Оставьте свою идею',
      description: 'Заполните форму ниже — мы рассмотрим вашу идею и свяжемся с вами.',
      firstNameLabel: 'Имя',
      firstNamePlaceholder: 'John',
      lastNameLabel: 'Фамилия',
      lastNamePlaceholder: 'Doe',
      emailLabel: 'Email',
      optional: 'Необязательно',
      emailPlaceholder: 'john@example.com',
      phoneLabel: 'Телефон',
      phonePlaceholder: '+998 90 123 45 67',
      roleLabel: 'Кто вы?',
      rolePlaceholder: 'Выберите',
      roleWorker: 'Работник',
      roleStudent: 'Студент/ученик',
      workplaceLabel: 'Место работы',
      workplacePlaceholder: 'Компания и должность',
      schoolLabel: 'Учебное заведение',
      schoolPlaceholder: 'Школа или университет',
      regionLabel: 'Регион',
      regionPlaceholder: 'Выберите регион',
      regions: [
        'Ташкент (город)',
        'Ташкентская область',
        'Андижанская область',
        'Бухарская область',
        'Ферганская область',
        'Джизакская область',
        'Хорезмская область',
        'Наманганская область',
        'Навоийская область',
        'Кашкадарьинская область',
        'Самаркандская область',
        'Сурхандарьинская область',
        'Сырдарьинская область',
        'Республика Каракалпакстан',
      ],
      ideaLabel: 'Идея',
      ideaPlaceholder: 'Опишите вашу идею...',
      submit: 'Оставить идею',
      submitting: 'Отправка...',
      success: 'Спасибо. Мы получили вашу идею и скоро свяжемся с вами.',
      error: 'Что-то пошло не так. Пожалуйста, попробуйте снова.',
      rateLimited: 'Слишком частые отправки. Подождите несколько секунд.',
      toast: {
        fillForm: 'Заполните форму.',
        fillPhone: 'Введите номер телефона.',
      },
      validation: {
        firstNameRequired: 'Введите имя.',
        lastNameRequired: 'Введите фамилию.',
        emailInvalid: 'Неверный формат email.',
        phoneRequired: 'Введите номер телефона.',
        phoneInvalid: 'Номер должен быть в формате +998.',
        roleRequired: 'Выберите, кто вы.',
        workplaceRequired: 'Укажите место работы.',
        schoolRequired: 'Укажите учебное заведение.',
        regionRequired: 'Выберите регион.',
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
      title: 'Submit Idea',
      darkMode: 'Dark mode',
      lightMode: 'Light mode',
      nav: {
        features: 'Features',
        community: 'Community',
        docs: 'Idea',
      },
    },
    hero: {
      title: 'Have an idea but no investment?',
      description:
        "Share your idea — we'll review it and help you with the next steps.",
      primaryCta: 'Leave an Idea',
      secondaryCta: 'How It Works',
    },
    features: {
      title: 'How We Help',
      items: [
        {
          id: 'ideas',
          title: 'Leave Your Idea',
          description:
            'We review your idea and provide a quick market and value assessment.',
        },
        {
          id: 'issues',
          title: 'Guidance and Support',
          description:
            "We'll get in touch and help you refine the idea and prepare the pitch.",
        },
        {
          id: 'training',
          title: 'Roadmap Support',
          description:
            'We guide you on MVP, pitch, and next steps to be ready for investment.',
        },
      ],
    },
    community: {
      title: 'Idea-Builder Community',
      description:
        'We support idea owners. Your project deserves to be heard.',
      stats: [
        { value: '120+', label: 'Ideas Reviewed' },
        { value: '40+', label: 'Projects Connected' },
        { value: '15+', label: 'Partners' },
      ],
    },
    form: {
      title: 'Leave Your Idea',
      description: 'Fill out the form below — we will review your idea and contact you.',
      firstNameLabel: 'First Name',
      firstNamePlaceholder: 'John',
      lastNameLabel: 'Last Name',
      lastNamePlaceholder: 'Doe',
      emailLabel: 'Email',
      optional: 'Optional',
      emailPlaceholder: 'john@example.com',
      phoneLabel: 'Phone Number',
      phonePlaceholder: '+998 90 123 45 67',
      roleLabel: 'You are',
      rolePlaceholder: 'Select',
      roleWorker: 'Worker',
      roleStudent: 'Student',
      workplaceLabel: 'Workplace',
      workplacePlaceholder: 'Company and role',
      schoolLabel: 'School / University',
      schoolPlaceholder: 'School or university name',
      regionLabel: 'Region',
      regionPlaceholder: 'Select a region',
      regions: [
        'Tashkent City',
        'Tashkent Region',
        'Andijan',
        'Bukhara',
        'Fergana',
        'Jizzakh',
        'Khorezm',
        'Namangan',
        'Navoi',
        'Kashkadarya',
        'Samarkand',
        'Surkhandarya',
        'Syrdarya',
        'Karakalpakstan',
      ],
      ideaLabel: 'Idea',
      ideaPlaceholder: 'Tell us about your idea...',
      submit: 'Leave Idea',
      submitting: 'Submitting...',
      success: 'Thank you. We received your idea and will contact you soon.',
      error: 'Something went wrong. Please try again.',
      rateLimited: 'Too many quick submissions. Please wait a few seconds.',
      toast: {
        fillForm: 'Please fill out the form.',
        fillPhone: 'Please enter your phone number.',
      },
      validation: {
        firstNameRequired: 'First name is required.',
        lastNameRequired: 'Last name is required.',
        emailInvalid: 'Invalid email format.',
        phoneRequired: 'Phone number is required.',
        phoneInvalid: 'Phone must be a valid Uzbekistan number.',
        roleRequired: 'Select your role.',
        workplaceRequired: 'Enter your workplace.',
        schoolRequired: 'Enter your school or university.',
        regionRequired: 'Select a region.',
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
