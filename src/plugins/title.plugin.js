import localizeFilter from "@/filters/localize.filter"
export default {
  install(Vue) {
    Vue.prototype.$title = function(titleKey) {
      const appName = 'Budget Calculator on VUE 2'
      return `${localizeFilter(titleKey)} | ${appName}`
    }
  }
}