<template>
  <div class="w-full lg:bg-white md:rounded-lg lg:drop-shadow-shcomm">
    <form @submit.prevent="editProfile()">
      <div
        class="grid w-full grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-x-4"
      >
        <div class="mt-8">
          <label for="" class="text-base font-normal capitalize text-text-gray">
            {{ $t('name') }}
          </label>
          <input
            v-model="form.name"
            type="text"
            class="block w-full h-12 px-4 mt-2 text-base font-normal text-black bg-white border rounded-md outline-none border-border-input focus:border-text-green"
            placeholder=""
          />
        </div>

        <!-- End input -->

        <div class="mt-8">
          <label for="" class="text-base font-normal capitalize text-text-gray">
            {{ $t('email') }} </label
          ><input
            v-model="form.email"
            type="email"
            class="block w-full h-12 px-4 mt-2 text-base font-normal text-black lowercase bg-white border rounded-md outline-none border-border-input focus:border-text-green"
            placeholder=""
          />
        </div>
        <!-- End input -->
        <div class="mt-8">
          <label for="" class="text-base font-normal capitalize text-text-gray">
            {{ $t('phone') }}
          </label>
          <div class="grid w-full grid-cols-4 gap-2 gap-x-4">
            <div class="col-span-1 ltr:order-1 rtl:order-2">
              <input
                type="text"
                class="block w-full h-12 mt-2 text-base font-normal text-center text-black bg-white border rounded-md outline-none border-border-input focus:border-text-green"
                placeholder=""
                value="+2"
              />
            </div>
            <div class="col-span-3 ltr:order-2 rtl:order-1">
              <input
                v-model="form.mobile"
                type="text"
                class="block w-full h-12 px-4 mt-2 text-base font-normal text-black bg-white border rounded-md outline-none border-border-input focus:border-text-green"
                placeholder=""
              />
            </div>
          </div>
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
      editMode: false,
      loading: false,
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.form.name = this.$auth.user?.name
      this.form.email = this.$auth.user?.email
      this.form.mobile = this.$auth.user?.mobile
    },
    editProfile() {
      this.loading = true
      this.$axios
        .post('/client-update-profile', this.form)
        .then(res => {
          this.loading = false
          this.$auth.refreshTokens()
          this.$auth.fetchUser()
          this.$toast.success('Update Done Successfully')
        })
        .catch(err => {
          this.$errorHandler(err)
          this.loading = false
        })
    },
  },
})
</script>
