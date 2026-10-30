export const locales = ["et", "ru", "en"] as const;
export type Locale = (typeof locales)[number];

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** Estonian lives at the site root, other languages under their own prefix. */
export const localePath = (locale: Locale) => (locale === "et" ? "/" : `/${locale}`);

export const localeNames: Record<Locale, string> = { et: "Eesti", ru: "Русский", en: "English" };

const et = {
  ogLocale: "et_EE",
  meta: {
    title: "Worktime — tööaja arvestus ühes vaates",
    description: "Worktime: tööaja, töötajate, objektide ja aruannete haldus ühes selges rakenduses.",
    keywords: ["worktime", "work time", "work time tracking", "worktime.ee", "tööaja arvestus", "tööaeg", "töötajate haldus", "tööaja tabel", "objektid", "aruanded"],
  },
  nav: {
    links: ["Toode", "Kuidas töötab", "Vaated", "Kontakt"],
    home: "Worktime'i avaleht",
    toggle: "Ava menüü",
    language: "Keel",
  },
  openApp: "Ava rakendus",
  getInTouch: "Võta ühendust",
  hero: {
    eyebrow: "Tööaja arvestus ettevõttele",
    title: "Worktime.\nSelgelt arvel.",
    lede: "Halda töötajaid ja objekte, jälgi käimasolevat tööd ning koosta aruandeid ühest selgest rakendusest.",
  },
  marquee: ["Tööaja arvestus", "Töötajad", "Objektid", "Elav kaart", "Aruanded", "CSV & Excel", "Mobiilivaade", "Tunnihinnad"],
  intro: {
    title: "Töö ülevaade.\nIlma liigse mürata.",
    lead: "Worktime annab tööandjale ühe koha töötajate, objektide, töötundide ja kulude haldamiseks.",
    muted: "Töötaja näeb, kus töö toimub. Juht näeb, kes töötab, kui kaua ja millisel objektil.",
  },
  how: {
    title: "Seadistusest\naruandeni.",
    lede: "Neli selget sammu töötajate ja objektide haldamisest kuni tööaja aruandluseni.",
    steps: [
      ["Lisa töötajad", "Koonda töötajate kontaktid, staatus ja tunnipõhine hind ühte vaatesse.", "Töötajate nimekiri koos kontaktide, staatuse, nädala tundide ja hinnaga"],
      ["Määra objektid", "Lisa töökohad, aadressid ja tööpiirkonnad, kus aega arvestatakse.", "Objektide vaade: uue objekti lisamise vorm ja aktiivsete objektide nimekiri"],
      ["Jälgi hetkeolukorda", "Vaata kaardilt vahetuse alustanud töötaja asukohta.", "Elav kaart Tallinnast, kus on märgitud vahetuse alustanud töötajad"],
      ["Koosta aruanne", "Filtreeri perioodi, töötaja või objekti järgi ning ekspordi tulemused.", "Aruande vaade perioodi filtrite, kokkuvõtte ning CSV- ja Exceli ekspordiga"],
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
  cta: { title: "Worktime.\nÜhes kohas." },
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
    note: "Vastame tavaliselt ühe tööpäeva jooksul.",
    sending: "Saadame…",
    error: "Sõnumit ei õnnestunud saata. Proovige uuesti või kirjutage joel@worktime.ee.",
    successTitle: "Aitäh, sõnum on saadetud.",
    successText: "Võtame teiega peagi ühendust teie e-posti aadressil.",
  },
  chat: {
    open: "Ava vestlus",
    close: "Sulge vestlus",
    title: "AI-assistent",
    greeting: "Tere! Olen Peeter, Tööaja AI-assistent. Küsige julgelt tööaja arvestuse, töötajate, objektide või aruannete kohta. Vajadusel liitub vestlusega meie meeskond.",
    placeholder: "Kirjutage sõnum…",
    send: "Saada",
    typing: "Peeter mõtleb…",
    joined: "Meeskonnaliige liitus vestlusega",
    left: "Vestlust jätkab AI-assistent",
    talkToTeam: "Kirjuta meeskonnale",
    requested: "Ühendame teid meeskonnaga. Kirjutage oma küsimus ja e-post või telefon — vastame siinsamas.",
    handedOff: "Küsimus on edastatud meeskonnale. Vastame siinsamas.",
    teamLabel: "Worktime'i meeskond",
    error: "Sõnumit ei õnnestunud saata. Proovige uuesti.",
    rateLimited: "Liiga palju sõnumeid. Proovige mõne minuti pärast uuesti.",
  },
  screenshots: {
    employees: "Worktime: töötajate ülevaade",
    reports: "Worktime: aruannete vaade",
    sites: "Worktime: objektide haldus",
    map: "Worktime: elav töökaart",
    "mobile-hours": "Worktime: töötaja tunnid mobiilis",
  },
};

export type Dictionary = typeof et;

const ru: Dictionary = {
  ogLocale: "ru_RU",
  meta: {
    title: "Worktime — учёт рабочего времени в одном окне",
    description: "Worktime: учёт рабочего времени, сотрудников, объектов и отчётов в одном понятном приложении.",
    keywords: ["worktime", "work time", "work time tracking", "worktime.ee", "tööaeg", "учёт рабочего времени", "табель рабочего времени", "управление сотрудниками", "объекты", "отчёты"],
  },
  nav: {
    links: ["Продукт", "Как это работает", "Интерфейс", "Контакты"],
    home: "Worktime — главная",
    toggle: "Открыть меню",
    language: "Язык",
  },
  openApp: "Открыть приложение",
  getInTouch: "Связаться с нами",
  hero: {
    eyebrow: "Учёт рабочего времени для бизнеса",
    title: "Worktime.\nКаждый час на учёте.",
    lede: "Управляйте сотрудниками и объектами, следите за текущей работой и формируйте отчёты в одном понятном приложении.",
  },
  marquee: ["Учёт времени", "Сотрудники", "Объекты", "Живая карта", "Отчёты", "CSV и Excel", "Мобильная версия", "Почасовые ставки"],
  intro: {
    title: "Обзор работы.\nБез лишнего шума.",
    lead: "Worktime даёт работодателю одно место для управления сотрудниками, объектами, рабочими часами и расходами.",
    muted: "Сотрудник видит, где идёт работа. Руководитель видит, кто работает, сколько и на каком объекте.",
  },
  how: {
    title: "От настройки\nдо отчёта.",
    lede: "Четыре простых шага — от управления сотрудниками и объектами до отчётности по рабочему времени.",
    steps: [
      ["Добавьте сотрудников", "Соберите контакты, статус и почасовую ставку сотрудников в одном окне.", "Список сотрудников с контактами, статусом, часами за неделю и ставкой"],
      ["Укажите объекты", "Добавьте рабочие места, адреса и зоны, где ведётся учёт времени.", "Раздел объектов: форма добавления объекта и список активных объектов"],
      ["Следите за ситуацией", "Смотрите на карте, где сотрудник начал смену.", "Живая карта Таллина с отметками сотрудников, начавших смену"],
      ["Сформируйте отчёт", "Фильтруйте по периоду, сотруднику или объекту и экспортируйте результаты.", "Отчёт с фильтрами по периоду, итогами и экспортом в CSV и Excel"],
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
  cta: { title: "Worktime.\nВсё в одном месте." },
  contact: {
    title: "Поговорим о вашей\nорганизации работы.",
    lede: "Хотите узнать о Worktime больше? Напишите напрямую или оставьте сообщение.",
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
    note: "Обычно отвечаем в течение одного рабочего дня.",
    sending: "Отправляем…",
    error: "Не удалось отправить сообщение. Попробуйте ещё раз или напишите на joel@worktime.ee.",
    successTitle: "Спасибо, сообщение отправлено.",
    successText: "Мы скоро ответим вам на указанный e-mail.",
  },
  chat: {
    open: "Открыть чат",
    close: "Закрыть чат",
    title: "ИИ ассистент",
    greeting: "Здравствуйте! Я Peeter, ИИ-ассистент Worktime. Спрашивайте про учёт рабочего времени, сотрудников, объекты или отчёты. Если нужно, к чату подключится наша команда.",
    placeholder: "Напишите сообщение…",
    send: "Отправить",
    typing: "Peeter думает…",
    joined: "К чату подключился сотрудник команды",
    left: "Разговор продолжает ИИ-ассистент",
    talkToTeam: "Написать команде",
    requested: "Соединяем с командой. Напишите вопрос и email или телефон — ответим прямо здесь.",
    handedOff: "Вопрос передан команде. Ответим прямо здесь.",
    teamLabel: "Команда Worktime",
    error: "Не удалось отправить сообщение. Попробуйте ещё раз.",
    rateLimited: "Слишком много сообщений. Попробуйте через несколько минут.",
  },
  screenshots: {
    employees: "Worktime: обзор сотрудников",
    reports: "Worktime: отчёты",
    sites: "Worktime: управление объектами",
    map: "Worktime: живая карта работ",
    "mobile-hours": "Worktime: часы сотрудника в телефоне",
  },
};

const en: Dictionary = {
  ogLocale: "en_GB",
  meta: {
    title: "Worktime — work time tracking in one view",
    description: "Worktime: track work time, employees, worksites and reports in one clear app.",
    keywords: ["worktime", "work time", "work time tracking", "worktime.ee", "tööaeg", "time tracking", "working hours", "employee management", "timesheet", "worksites", "reports"],
  },
  nav: {
    links: ["Product", "How it works", "Screens", "Contact"],
    home: "Worktime home",
    toggle: "Toggle navigation",
    language: "Language",
  },
  openApp: "Open app",
  getInTouch: "Get in touch",
  hero: {
    eyebrow: "Time tracking for businesses",
    title: "Worktime.\nEvery hour accounted for.",
    lede: "Manage employees and worksites, follow ongoing work and build reports — all from one clear app.",
  },
  marquee: ["Time tracking", "Employees", "Worksites", "Live map", "Reports", "CSV & Excel", "Mobile view", "Hourly rates"],
  intro: {
    title: "Your work at a glance.\nWithout the noise.",
    lead: "Worktime gives employers one place to manage employees, worksites, working hours and costs.",
    muted: "Employees see where the work happens. Managers see who is working, for how long and at which site.",
  },
  how: {
    title: "From setup\nto report.",
    lede: "Four clear steps, from managing employees and worksites to reporting on working time.",
    steps: [
      ["Add employees", "Bring employee contacts, status and hourly rates together in one view.", "Employee list with contacts, status, weekly hours and rates"],
      ["Set up worksites", "Add the workplaces, addresses and work areas where time is tracked.", "Worksites screen with the add-worksite form and the list of active sites"],
      ["Follow live activity", "See on the map where an employee started their shift.", "Live map of Tallinn marking employees who have started a shift"],
      ["Build a report", "Filter by period, employee or worksite and export the results.", "Report screen with period filters, totals and CSV and Excel export"],
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
  cta: { title: "Worktime.\nAll in one place." },
  contact: {
    title: "Let's talk about\nhow your team works.",
    lede: "Want to know more about Worktime? Write to us directly or leave a message.",
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
    note: "We usually reply within one working day.",
    sending: "Sending…",
    error: "Your message couldn't be sent. Please try again or email joel@worktime.ee.",
    successTitle: "Thanks, your message is on its way.",
    successText: "We'll get back to you at your email address soon.",
  },
  chat: {
    open: "Open chat",
    close: "Close chat",
    title: "AI assistant",
    greeting: "Hi! I'm Peeter, the Worktime AI assistant. Ask me about time tracking, employees, worksites or reports. If needed, someone from our team will join the chat.",
    placeholder: "Write a message…",
    send: "Send",
    typing: "Peeter is thinking…",
    joined: "A team member joined the chat",
    left: "The AI assistant is back in the chat",
    talkToTeam: "Talk to the team",
    requested: "Connecting you with the team. Write your question and email or phone — we'll reply right here.",
    handedOff: "Your question has been passed to the team. We'll reply right here.",
    teamLabel: "Worktime team",
    error: "Your message couldn't be sent. Please try again.",
    rateLimited: "Too many messages. Please try again in a few minutes.",
  },
  screenshots: {
    employees: "Worktime: employee overview",
    reports: "Worktime: reporting dashboard",
    sites: "Worktime: worksite management",
    map: "Worktime: live work map",
    "mobile-hours": "Worktime: employee hours on mobile",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { et, ru, en };
