<template>
  <div :dir="$t('dir')">
    <LayoutTheHeader />
    <div class="mx-auto min-h-[calc(100vh-80px)]">
      <nuxt />
    </div>
    <AuthPopup v-if="$store.state.modal === 'loginPopup'" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AuthPopup from '~/components/auth/AuthPopup.vue'

export default Vue.extend({
  components: {
    AuthPopup,
  },
  data() {
    return {}
  },
  beforeMount() {
    this.setFont()
  },
  mounted() {
    // google analytcs
    if (window) {
      /**
       * ====================================================================
       * ====================================================================
       * ====================================================================
       * ====================================================================
       * ====================================================================
       * ====================================================================
       * ====================================================================
       * ====================================================================
       * ====================================================================
       * ====================================================================
       * ====================================================================
       * ====================================================================
       * ====================================================================
       * ====================================================================
       * ====================================================================
       */
      window.dataLayer.push({ js: new Date(), config: 'G-GKQ2D0MRPT' })
      ;(function (
        c?: any,
        l?: any,
        a?: any,
        r?: any,
        i?: any,
        t?: any,
        y?: any
      ) {
        c[a] =
          c[a] ||
          function () {
            ;(c[a].q = c[a].q || []).push(arguments)
          }
        t = l.createElement(r)
        t.async = 1
        t.src = 'https://www.clarity.ms/tag/' + i
        y = l.getElementsByTagName(r)[0]
        y.parentNode.insertBefore(t, y)
      })(window, document, 'clarity', 'script', 'h3uee0ahxn')
    }
  },
  methods: {
    setFont() {
      const code = this.$i18n.locale
      if (code === 'ar') {
        document.documentElement.style.setProperty(
          '--appFont',
          "'Cairo', sans-serif"
        )
      } else {
        document.documentElement.style.setProperty(
          '--appFont',
          "'Poppins', sans-serif"
        )
      }
    },
  },
})
</script>
