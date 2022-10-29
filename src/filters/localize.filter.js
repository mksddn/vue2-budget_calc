import store from '../store'
import ru from '../langs/ru.json'
import en from '../langs/en.json'

const langs = {
  'ru-RU': ru,
  'en-US': en
}

export default function localizeFilter(key) {
  const lang = store.getters.info.lang || 'ru-RU'
  return langs[lang][key] || `[Localize error]: key ${key} not found`
}
