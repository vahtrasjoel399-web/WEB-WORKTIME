export const locales = ["et", "ru", "en"] as const;
export type Locale = (typeof locales)[number];

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** Estonian lives at the site root, other languages under their own prefix. */
export const localePath = (locale: Locale) => (locale === "et" ? "/" : `/${locale}`);

export const localeNames: Record<Locale, string> = { et: "Eesti", ru: "Русский", en: "English" };

const et = {
  ogLocale: "et_EE",
  meta: {
    title: "Tööaeg — tööaja arvestus ühes vaates",
    description: "Tööaja, töötajate, objektide ja aruannete haldus ühes selges rakenduses.",
    keywords: ["tööaja arvestus", "tööaeg", "töötajate haldus", "tööaja tabel", "objektid", "aruanded"],
  },
  nav: {
    links: ["Toode", "Kuidas töötab", "Vaated", "Kontakt"],
    home: "Tööaeg avaleht",
    toggle: "Ava menüü",
    language: "Keel",
  },
  openApp: "Ava rakendus",
  getInTouch: "Võta ühendust",
  hero: {
    eyebrow: "Tööaja arvestus ettevõttele",
    title: "Tööaeg.\nSelgelt arvel.",
    lede: "Halda töötajaid ja objekte, jälgi käimasolevat tööd ning koosta aruandeid ühest selgest rakendusest.",
  },
  marquee: ["Tööaja arvestus", "Töötajad", "Objektid", "Elav kaart", "Aruanded", "CSV & Excel", "Mobiilivaade", "Tunnihinnad"],
  intro: {
    title: "Töö ülevaade.\nIlma liigse mürata.",
    lead: "Tööaeg annab tööandjale ühe koha töötajate, objektide, töötundide ja kulude haldamiseks.",
    muted: "Töötaja näeb, kus töö toimub. Juht näeb, kes töötab, kui kaua ja millisel objektil.",
  },
  how: {
    title: "Seadistusest\naruandeni.",
    lede: "Neli selget sammu töötajate ja objektide haldamisest kuni tööaja aruandluseni.",
    steps: [
      ["Lisa töötajad", "Koonda töötajate kontaktid, staatus ja tunnipõhine hind ühte vaatesse."],
      ["Määra objektid", "Lisa töökohad, aadressid ja tööpiirkonnad, kus aega arvestatakse."],
      ["Jälgi hetkeolukorda", "Vaata kaardilt vahetuse alustanud töötaja asukohta."],
      ["Koosta aruanne", "Filtreeri perioodi, töötaja või objekti järgi ning ekspordi tulemused."],
    ],
  },
  showcase: {
    title: "Kogu pilt ees.\nDetailid käeulatuses.",
    lede: "Päris rakenduse vaated näitavad tööaja arvestust sellisena, nagu seda iga päev kasutatakse.",
    mobileTitle: ["Oma tunnid.", "Alati kaasas."],
    mobileCopy: "Töötaja näeb kuu- ja nädalapõhist tööaega ning teenitud summat otse telefonist.",
  },
  capabilities: {
    title: "Loodud päris tööpäeva jaoks.",
    items: [
      ["Töötajate haldus", "Kontaktid, staatus, nädala töötunnid ja arvestus ühes kohas."],
      ["Objektid ja elav kaart", "Halda töökohti ning vaata vahetuse alustamise asukohta kaardil."],
      ["Aruanded ja eksport", "Filtreeri tööaega ning ekspordi aruanded CSV- või Exceli failina."],
    ],
  },
  cta: { title: "Tööaeg.\nÜhes kohas." },
  contact: {
    title: "Räägime teie\ntöökorraldusest.",
    lede: "Kas soovite Tööaja kohta rohkem teada? Kirjutage otse või jätke sõnum.",
    tech: "Tehnilised küsimused · Joel",
    sales: "Müük ja muud küsimused · Stepan",
  },
  form: {
    name: "Nimi",
    namePlaceholder: "Teie nimi",
    email: "E-post",
    emailPlaceholder: "teie@ettevote.ee",
    message: "Sõnum",
    messagePlaceholder: "Kirjutage, mida soovite teada.",
    submit: "Saada sõnum",
    note: "Demovorm — sõnumit veel ei saadeta.",
    successTitle: "Sõnum on valmis.",
    successText: "Vormil ei ole veel serveriühendust. Ühendage see enne avaldamist sobiva vormiteenusega.",
  },
  screenshots: {
    employees: "Tööaeg: töötajate ülevaade",
    reports: "Tööaeg: aruannete vaade",
    sites: "Tööaeg: objektide haldus",
    map: "Tööaeg: elav töökaart",
    "mobile-hours": "Tööaeg: töötaja tunnid mobiilis",
  },
};

export type Dictionary = typeof et;

const ru: Dictionary = {
  ogLocale: "ru_RU",
  meta: {
    title: "Tööaeg — учёт рабочего времени в одном окне",
    description: "Учёт рабочего времени, сотрудников, объектов и отчётов в одном понятном приложении.",
    keywords: ["учёт рабочего времени", "табель рабочего времени", "управление сотрудниками", "объекты", "отчёты"],
  },
  nav: {
    links: ["Продукт", "Как это работает", "Интерфейс", "Контакты"],
    home: "Tööaeg — главная",
    toggle: "Открыть меню",
    language: "Язык",
  },
  openApp: "Открыть приложение",
  getInTouch: "Связаться с нами",
  hero: {
    eyebrow: "Учёт рабочего времени для бизнеса",
    title: "Tööaeg.\nКаждый час на учёте.",
    lede: "Управляйте сотрудниками и объектами, следите за текущей работой и формируйте отчёты в одном понятном приложении.",
  },
  marquee: ["Учёт времени", "Сотрудники", "Объекты", "Живая карта", "Отчёты", "CSV и Excel", "Мобильная версия", "Почасовые ставки"],
  intro: {
    title: "Обзор работы.\nБез лишнего шума.",
    lead: "Tööaeg даёт работодателю одно место для управления сотрудниками, объектами, рабочими часами и расходами.",
    muted: "Сотрудник видит, где идёт работа. Руководитель видит, кто работает, сколько и на каком объекте.",
  },
  how: {
    title: "От настройки\nдо отчёта.",
    lede: "Четыре простых шага — от управления сотрудниками и объектами до отчётности по рабочему времени.",
    steps: [
      ["Добавьте сотрудников", "Соберите контакты, статус и почасовую ставку сотрудников в одном окне."],
      ["Укажите объекты", "Добавьте рабочие места, адреса и зоны, где ведётся учёт времени."],
      ["Следите за ситуацией", "Смотрите на карте, где сотрудник начал смену."],
      ["Сформируйте отчёт", "Фильтруйте по периоду, сотруднику или объекту и экспортируйте результаты."],
    ],
  },
  showcase: {
    title: "Вся картина перед глазами.\nДетали под рукой.",
    lede: "Экраны настоящего приложения показывают учёт времени таким, каким им пользуются каждый день.",
    mobileTitle: ["Свои часы.", "Всегда с собой."],
    mobileCopy: "Сотрудник видит рабочее время за месяц и неделю и заработанную сумму прямо в телефоне.",
  },
  capabilities: {
    title: "Создано для настоящего рабочего дня.",
    items: [
      ["Управление сотрудниками", "Контакты, статус, часы за неделю и расчёты в одном месте."],
      ["Объекты и живая карта", "Управляйте рабочими местами и смотрите на карте, где началась смена."],
      ["Отчёты и экспорт", "Фильтруйте рабочее время и экспортируйте отчёты в CSV или Excel."],
    ],
  },
  cta: { title: "Tööaeg.\nВсё в одном месте." },
  contact: {
    title: "Поговорим о вашей\nорганизации работы.",
    lede: "Хотите узнать о Tööaeg больше? Напишите напрямую или оставьте сообщение.",
    tech: "Технические вопросы · Joel",
    sales: "Продажи и другие вопросы · Stepan",
  },
  form: {
    name: "Имя",
    namePlaceholder: "Ваше имя",
    email: "E-mail",
    emailPlaceholder: "vy@kompaniya.ee",
    message: "Сообщение",
    messagePlaceholder: "Напишите, что хотите узнать.",
    submit: "Отправить сообщение",
    note: "Демо-форма — сообщение пока не отправляется.",
    successTitle: "Сообщение готово.",
    successText: "Форма пока не подключена к серверу. Перед публикацией подключите её к подходящему сервису форм.",
  },
  screenshots: {
    employees: "Tööaeg: обзор сотрудников",
    reports: "Tööaeg: отчёты",
    sites: "Tööaeg: управление объектами",
    map: "Tööaeg: живая карта работ",
    "mobile-hours": "Tööaeg: часы сотрудника в телефоне",
  },
};

const en: Dictionary = {
  ogLocale: "en_GB",
  meta: {
    title: "Tööaeg — time tracking in one view",
    description: "Manage working hours, employees, worksites and reports in one clear app.",
    keywords: ["time tracking", "working hours", "employee management", "timesheet", "worksites", "reports"],
  },
  nav: {
    links: ["Product", "How it works", "Screens", "Contact"],
    home: "Tööaeg home",
    toggle: "Toggle navigation",
    language: "Language",
  },
  openApp: "Open app",
  getInTouch: "Get in touch",
  hero: {
    eyebrow: "Time tracking for businesses",
    title: "Tööaeg.\nEvery hour accounted for.",
    lede: "Manage employees and worksites, follow ongoing work and build reports — all from one clear app.",
  },
  marquee: ["Time tracking", "Employees", "Worksites", "Live map", "Reports", "CSV & Excel", "Mobile view", "Hourly rates"],
  intro: {
    title: "Your work at a glance.\nWithout the noise.",
    lead: "Tööaeg gives employers one place to manage employees, worksites, working hours and costs.",
    muted: "Employees see where the work happens. Managers see who is working, for how long and at which site.",
  },
  how: {
    title: "From setup\nto report.",
    lede: "Four clear steps, from managing employees and worksites to reporting on working time.",
    steps: [
      ["Add employees", "Bring employee contacts, status and hourly rates together in one view."],
      ["Set up worksites", "Add the workplaces, addresses and work areas where time is tracked."],
      ["Follow live activity", "See on the map where an employee started their shift."],
      ["Build a report", "Filter by period, employee or worksite and export the results."],
    ],
  },
  showcase: {
    title: "The full picture up front.\nDetails within reach.",
    lede: "Screens from the real app show time tracking the way it's used every day.",
    mobileTitle: ["Your hours.", "Always with you."],
    mobileCopy: "Employees see their monthly and weekly hours and what they've earned, right on their phone.",
  },
  capabilities: {
    title: "Built for a real working day.",
    items: [
      ["Employee management", "Contacts, status, weekly hours and pay in one place."],
      ["Worksites and live map", "Manage workplaces and see on the map where each shift started."],
      ["Reports and export", "Filter working time and export reports as CSV or Excel files."],
    ],
  },
  cta: { title: "Tööaeg.\nAll in one place." },
  contact: {
    title: "Let's talk about\nhow your team works.",
    lede: "Want to know more about Tööaeg? Write to us directly or leave a message.",
    tech: "Technical questions · Joel",
    sales: "Sales and other questions · Stepan",
  },
  form: {
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "you@company.com",
    message: "Message",
    messagePlaceholder: "Tell us what you'd like to know.",
    submit: "Send message",
    note: "Demo form — messages aren't sent yet.",
    successTitle: "Message ready.",
    successText: "The form isn't connected to a server yet. Connect it to a form service before going live.",
  },
  screenshots: {
    employees: "Tööaeg: employee overview",
    reports: "Tööaeg: reporting dashboard",
    sites: "Tööaeg: worksite management",
    map: "Tööaeg: live work map",
    "mobile-hours": "Tööaeg: employee hours on mobile",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { et, ru, en };
