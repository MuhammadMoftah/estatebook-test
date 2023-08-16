<template>
  <div
    class="flex flex-col items-center justify-center gap-4 px-3 mt-8 lg:mt-10"
  >
    <!-- <EmptyEstate /> -->
    <div class="rounded-full bg-bg-green">
      <svg
        class="m-3"
        xmlns="http://www.w3.org/2000/svg"
        width="120"
        height="120"
        viewBox="0 0 24 24"
      >
        <path
          fill="#4cb087"
          d="M12.025 21.925q-3.35-3.375-5.338-5.45t-3.025-3.45q-1.037-1.375-1.35-2.35T2 8.5q0-2.3 1.6-3.9T7.5 3q1.125 0 2.175.412T11.55 4.6L10 10h3l-.85 8.375L15 9h-3l1.775-5.3q.625-.35 1.313-.525T16.5 3q2.3 0 3.9 1.6T22 8.5q0 1.2-.325 2.2T20.3 13.088q-1.05 1.387-3.025 3.45t-5.25 5.387Z"
        />
      </svg>
    </div>

    <p class="font-medium text-md text-text-gray">
      {{ $t('are_you_sure_that_you_want_to_delete_account') }}
    </p>

    <button
      @click="deleteAccount"
      type="button"
      class="inline-flex items-center gap-x-1.5 text-red-600 rounded-md border border-red-600 px-2.5 py-1.5 text-sm font-semibold shadow-sm hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      <IconsSpinnerIcon :class="loading ? 'w-5 h-5' : 'hidden'" />

      {{ $t('confirm_deletion') }}
    </button>
    <AuthPopup v-if="$store.state.modal === 'loginPopup'" />
  </div>
</template>

<script>
import EmptyEstate from '~/components/icons/emptyStates/EmptyWishlist.vue'
import AuthPopup from '~/components/auth/AuthPopup.vue'

export default {
  components: {
    EmptyEstate,
    AuthPopup,
  },
  mounted() {
    if (!this.$auth.loggedIn) {
      this.$store.commit('SET_MODAL', 'loginPopup')
    }
  },
  data() {
    return {
      loading: false,
    }
  },
  // auth: 'guest',
  methods: {
    deleteAccount(payload) {
      this.loading = true
      this.$axios
        .post('/client-delete-account', payload)
        .then(res => {
          this.$toast.success('Delete Account Done Successfully')
          this.$auth.logout()
          this.$router.push(this.localePath('/'))
        })
        .catch(err => {
          // this.$toast.error('Error')
        })
      this.loading = false
    },
  },
}
</script>
