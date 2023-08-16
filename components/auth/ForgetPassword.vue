<template>
  <div class="flex w-full h-screen ml-auto mr-auto overflow-hidden bg-white">
    <div class="relative hidden max-w-5xl md:block min-w-1/2">
      <div class="absolute left-11 top-11">
        <img
          src="~/assets/images/login/logo.svg"
          class="w-20"
          alt="Estate Book"
        />
      </div>
      <!-- End Logo -->
      <img
        src="~/assets/images/login/img.jpg"
        class="object-cover w-full h-full"
        alt="Estate Book"
      />
    </div>
    <!--  End Photo & Logo -->
    <form
      class="relative flex items-center justify-center h-full max-w-5xl min-w-full md:min-w-1/2 p-9"
      @submit.prevent="resetPassword()"
    >
      <div class="w-full">
        <h2 class="text-xl font-semibold text-black capitalize">
          {{ $t('enter_your_email_to_reset_password') }}
        </h2>

        <div>
          <div class="w-full mt-6">
            <label for="" class="text-sm font-medium text-black capitalize">
              {{ $t('email') }}
            </label>
            <input
              v-model="form.email"
              type="email"
              class="block w-full h-12 px-6 mt-1 text-xs font-normal bg-white border rounded-md outline-none text-text-black border-border-input focus:border-text-green"
              :placeholder="$t('email')"
            />
          </div>

          <!-- End input -->
          <div class="relative w-full mt-6">
            <CommonThemeButton
              class="font-semibold text-white uppercase duration-300 bg-text-green focus:text-green focus:outline-none focus:bg-text-green hover:scale-105"
              :loading="loading"
              :label="$t('reset_password')"
            />
          </div>
          <!-- End input -->
          <div class="flex items-center justify-between w-full mt-6">
            <p class="text-xs font-normal capitalize text-text-gray">
              {{ $t('dont_have_account') }}
              <NuxtLink
                :to="localePath('/register')"
                class="font-semibold text-text-green hover:underline"
              >
                {{ $t('sign_up') }}
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </form>
    <!-- End Form -->
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'auth',
  data() {
    return {
      form: {
        email: '',
      },
      errorMessage: null,
      loading: false,
    }
  },
  methods: {
    async resetPassword() {
      try {
        this.loading = true
        // this.$auth.$storage.setUniversal("resetPassCode", code.toString());
        this.$auth.$storage.setUniversal('emailToResetPass', this.form.email)

        const response = await this.$axios.post('/password/email', {
          ...this.form,
        })
        if (!response) {
          return
        }
        this.$router.push('/')

        this.$store.commit('global/modal', '')
        this.loading = false
      } catch (err) {
        // this.$toast.error(err.response.data.message)
        this.loading = false
      }
    },
  },
})
</script>
