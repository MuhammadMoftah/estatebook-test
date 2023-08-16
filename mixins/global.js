import Vue from 'vue'
const mixin = {
  data() {
    return {
      // isFav: null,
    }
  },
  methods: {
    async favHandler(value, type, item) {
      if (!this.$auth.loggedIn) {
        // this.$store.commit('SET_MODAL', 'loginPopup')
        if (type === 'unit') {
          this.$store.commit('wishlist/SET_UNITS_IDS_LOCALSTORAGE', item)
        } else if (type === 'project') {
          this.$store.commit('wishlist/SET_PROJECTS_IDS_LOCALSTORAGE', item)
        }
        this.isFav = value
        return
      }

      const payload = {
        id: item.id,
        type,
        favorite: value,
      }

      await this.$axios.post('/favorite', payload).then(res => {
        if (type === 'project') {
          this.$store.dispatch('wishlist/GET_PROJECTS')
        } else if (type === 'unit') {
          this.$store.dispatch('wishlist/GET_UNITS')
        }
        this.isFav = value
      })
    },
    async bulkFavHandler(value, type, item) {
      const payload = {
        ids: item,
        type,
        favorite: 1,
      }

      await this.$axios.post('/favorite', payload).then(res => {
        if (type === 'project') {
          this.$store.dispatch('wishlist/GET_PROJECTS')
        } else if (type === 'unit') {
          this.$store.dispatch('wishlist/GET_UNITS')
        }
      })
    },
    $objectToFormData(object) {
      const data = new FormData()
      for (const i in object) {
        if (object[i] && !Array.isArray(object[i])) {
          data.append(i, object[i])
        }

        if (Array.isArray(object[i])) {
          for (const i2 in object[i]) {
            data.append(`${i}[${i2}]`, object[i][i2])
          }
        }
      }
      return data
    },
    polyCenter(coords) {
      const lats = []
      const lngs = []
      let xMin = 0
      let xMax = 0
      let yMin = 0
      let yMax = 0
      if (coords) {
        coords.forEach(obj => {
          lats.push(obj.lat)
          lngs.push(obj.lng)
        })
      }
      xMin = Math.min(...lats)
      xMax = Math.max(...lats)
      yMin = Math.min(...lngs)
      yMax = Math.max(...lngs)
      let clat = (+xMax - +xMin) / 2
      let clng = (+yMax - +yMin) / 2
      clat = +xMin + +clat
      clng = +yMin + +clng
      return {
        lat: clat,
        lng: clng,
      }
    },
    $closeModal() {
      this.$store.commit('global/closeModal')
    },
    $errorHandler(err, customMessage) {
      if (customMessage) {
        this.$toast.error(customMessage)
        return
      }
      if (typeof err.response?.data.errors === 'object') {
        for (const i in err.response.data.errors) {
          this.$toast.error(err.response.data.errors[i][0])
        }
        return
      }

      if (err.response.status >= 400 && err.response.status < 500) {
        if (err.response?.data?.message?.length) {
          this.$toast.error(err.response.data.message)
          return
        }
      }

      this.$toast.error('Some Error happed!')
    },
    $successHandler(customMessage) {
      if (customMessage) {
        this.$closeModal()
        this.$toast.success(customMessage)
        return
      }
      this.$closeModal()
      this.$toast.success('Request successfully done')
    },
    $conditionalFilter(filterObj) {
      if (typeof filterObj !== 'object') {
        throw new TypeError(`${typeof filterObj} is not allowed.`)
      }

      const searchEntries = Object.entries(filterObj)
      const resolvedSearch = searchEntries
        .filter(([_, fValue]) => fValue || /^0$/.test(fValue))
        .map(([fKey, fValue]) => {
          if (Array.isArray(fValue)) {
            return fValue
          }
          return `${fKey} ${fValue}`
        })
      return resolvedSearch
    },
    $startDateHandler(item) {
      if (!item.project) return 'N/A'
      let itemDate = item.project?.start_delivery?.substring(0, 4)
      let currentYear = new Date().getFullYear()
      if (currentYear > itemDate) {
        return this.$t('ready_to_move')
      }
      return this.$t('delivery') + ' ' + itemDate
    },
  },
  computed: {
    resetFilters() {
      return this.$store.state.filter.reset
    },
    displayHide() {
      // console.log(';sara', this.$route)
      // return true
      if (
        this.$route?.matched[0]?.path === this.localePath('/neighborhoods') ||
        this.$route?.matched[0]?.path === this.localePath('/projects') ||
        this.$route?.matched[0]?.path === this.localePath('/units')
      ) {
        if (
          this.$store.state.display === 'grid' ||
          this.$store.state.display === 'map'
        ) {
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    },
    displayHide1() {
      // console.log(this.$route, 'this.$route')
      // return true
      if (
        this.$route?.matched[0]?.path === this.localePath('/neighborhoods') ||
        this.$route?.matched[0]?.path === this.localePath('/projects')
      ) {
        if (
          this.$store.state.display === 'grid' ||
          this.$store.state.display === 'map'
        ) {
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    },
    stickyHeader() {
      // return true
      if (
        this.$route?.path === this.localePath('/') ||
        (this.$store.state.display === 'list' &&
          this.$route?.matched[0]?.path !== this.localePath('/units'))
      ) {
        return true
      }
    },
    debounce(func, delay) {
      let timeId
      return (...args) => {
        clearTimeout(timeId)
        timeId = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    },
    $isClient() {
      return process.client
    },
  },
}

Vue.mixin(mixin)
export default mixin
