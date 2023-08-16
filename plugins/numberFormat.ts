import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $numberFormat(
      value: string | number,
      locale?: 'en-US' | 'ar-EG',
      int?: boolean
    ): any
  }
}

Vue.prototype.$numberFormat = (
  value: string | number,
  locale: 'en-US' | 'ar-EG' = 'en-US',
  toInt: boolean = false
) => {
  return new Intl.NumberFormat(
    locale,
    toInt
      ? {
          minimumIntegerDigits: 1,
          maximumFractionDigits: 0,
          useGrouping: false,
        }
      : {}
  ).format(+value)
}
