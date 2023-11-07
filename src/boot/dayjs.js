import { boot } from 'quasar/wrappers'
import dayjs from 'dayjs'
import jalali from 'dayjs-jalali'

dayjs.extend(jalali) // Extend Day.js with jalali

const $dayjs = dayjs()

export default boot(({ app }) => {
  app.config.globalProperties.$dayjs = dayjs
  app.use($dayjs);
})


