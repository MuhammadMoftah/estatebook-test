<template>
  <div class="w-full lg:bg-white md:rounded-lg lg:drop-shadow-shcomm">
    <form @submit.prevent="changePass()">
      <div class="grid w-full grid-cols-1 gap-x-4">
        <div class="mt-8">
          <label for="" class="text-base font-normal capitalize text-text-gray">
            {{ $t('old_password') }}
          </label>
          <input
            v-model="form.old_password"
            type="password"
            class="block w-full h-12 px-4 mt-2 text-base font-normal text-black bg-white border rounded-md outline-none border-border-input focus:border-text-green"
            placeholder=""
          />
        </div>

        <div class="mt-8">
          <label for="" class="text-base font-normal capitalize text-text-gray">
            {{ $t('password') }}
          </label>
          <input
            v-model="form.password"
            type="password"
            class="block w-full h-12 px-4 mt-2 text-base font-normal text-black bg-white border rounded-md outline-none border-border-input focus:border-text-green"
            placeholder=""
          />
        </div>

        <div class="mt-8">
          <label for="" class="text-base font-normal capitalize text-text-gray">
            {{ $t('password_confirmation') }}
          </label>
          <input
            v-model="form.password_confirmation"
            type="password"
            class="block w-full h-12 px-4 mt-2 text-base font-normal text-black lowercase bg-white border rounded-md outline-none border-border-input focus:border-text-green"
            placeholder=""
          />
        </div>

        <!-- End input -->
      </div>
      <div class="flex w-full mt-16">
        <CommonThemeButton
          class="max-w-xs text-white capitalize duration-300 bg-text-green focus:text-green focus:outline-none focus:bg-text-green hover:scale-105"
          :loading="loading"
          :label="$t('save_changes')"
        />
      </div>
      <!-- End input -->
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      form: {},
      loading: false,
    }
  },

  methods: {
    changePass() {
      this.loading = true
      this.$axios
        .put('/client-update-password', this.form)
        .then(res => {
          this.loading = false
          this.$auth.refreshTokens()
          this.$auth.fetchUser()
          this.$toast.success('Password changed Successfully')
        })
        .catch(err => {
          this.$errorHandler(err)
          this.loading = false
        })
    },
  },
})
</script>
