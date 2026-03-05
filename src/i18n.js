const LOCALES = {
  en: {
    "settings.section.dataSource": "Data Source",
    "settings.section.dataSource.desc": "Where your tasks come from.",
    "settings.section.fieldMapping": "Field Mapping",
    "settings.section.fieldMapping.desc": "Map your frontmatter or inline fields to Kanban properties.",
    "settings.section.layout": "Board Layout",
    "settings.section.layout.desc": "Control lane order, sorting, and work-in-progress limits.",
    "settings.section.appearance": "Appearance",
    "settings.section.appearance.desc": "Customize colors, fonts, and visual theme.",
    "settings.section.advanced": "Advanced",
    "settings.section.advanced.desc": "Performance and behavior tuning.",
    "settings.section.dateDisplay": "Date Display",
    "settings.section.dateDisplay.desc": "Control saved date format and due badge rendering.",
    "settings.language.name": "Language",
    "settings.language.desc": "UI language for Smart Kanban.",
    "settings.language.en": "English",
    "settings.language.tr": "Turkish",
    "due.today": "Due today",
    "due.tomorrow": "Due tomorrow",
    "due.in_days": "Due in {days}d",
    "due.overdue_days": "Overdue by {days}d",
  },
  tr: {
    "settings.section.dataSource": "Veri Kaynagi",
    "settings.section.dataSource.desc": "Gorevlerin nereden geldigi.",
    "settings.section.fieldMapping": "Alan Eslestirme",
    "settings.section.fieldMapping.desc": "Frontmatter veya inline alanlarini Kanban ozelliklerine eslestirin.",
    "settings.section.layout": "Pano Duzeni",
    "settings.section.layout.desc": "Lane sirasi, siralama ve WIP limitlerini yonetin.",
    "settings.section.appearance": "Gorunum",
    "settings.section.appearance.desc": "Renkleri, fontlari ve tema ayarlarini ozellestirin.",
    "settings.section.advanced": "Gelismis",
    "settings.section.advanced.desc": "Performans ve davranis ayarlari.",
    "settings.section.dateDisplay": "Tarih Gorunumu",
    "settings.section.dateDisplay.desc": "Kaydedilen tarih formatini ve teslim etiketi gorunumunu yonetin.",
    "settings.language.name": "Dil",
    "settings.language.desc": "Smart Kanban arayuz dili.",
    "settings.language.en": "Ingilizce",
    "settings.language.tr": "Turkce",
    "due.today": "Bugun teslim",
    "due.tomorrow": "Yarin teslim",
    "due.in_days": "{days}g sonra",
    "due.overdue_days": "{days}g gecikti",
  },
};

let currentLocale = "en";

function getLocale() {
  return currentLocale;
}

function setLocale(locale) {
  if (LOCALES[locale]) currentLocale = locale;
  else currentLocale = "en";
}

function interpolate(template, params) {
  if (!params || typeof params !== "object") return template;
  return String(template).replace(/\{(\w+)\}/g, (_, key) => {
    if (Object.prototype.hasOwnProperty.call(params, key)) return String(params[key]);
    return `{${key}}`;
  });
}

function t(key, params) {
  const localePack = LOCALES[currentLocale] || LOCALES.en;
  const fallbackPack = LOCALES.en;
  const raw = localePack[key] ?? fallbackPack[key] ?? key;
  return interpolate(raw, params);
}

module.exports = { LOCALES, t, setLocale, getLocale };
