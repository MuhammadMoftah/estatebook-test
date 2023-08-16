<template>
  <div class="container px-3 mt-8 lg:mt-10">
    <CommonPageBreadcrumb
      :breadcrumb-links="[
        {
          id: 1,
          name: $t('home'),
          link: localePath('/'),
          active: false,
        },
        {
          id: 2,
          name: $t('profile'),
          link: localePath('/profile'),
          active: true,
        },
      ]"
    />
    <!-- End breadcrumb -->

    <div class="items-center justify-between block mt-6 lg:mb-10">
      <h1 class="text-xl font-semibold text-black capitalize">
        {{ $t('profile_info') }}
      </h1>
    </div>
    <!-- End headtitle -->

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-x-4">
      <div class="col-span-3 lg:col-span-1">
        <div class="sticky top-24">
          <div
            class="relative z-10 items-center block w-full p-5 text-center lg:flex ltr:lg:text-left rtl:lg:text-right lg:bg-white lg:rounded-lg lg:drop-shadow-shcomm"
          >
            <aside
              class="relative block w-48 lg:max-w-[72px] ltr:lg:mr-4 rtl:lg:ml-4 ml-auto mr-auto ltr:lg:m-0 rtl:lg:m-0"
            >
              <div
                class="flex items-center justify-center lg:min-w-[72px] lg:max-w-[72px] lg:h-[72px] w-48 h-48 overflow-hidden bg-slate-300 rounded-full"
              >
                <img
                  v-if="
                    $auth.loggedIn && $auth.user && $auth.user.avatar.length
                  "
                  class="w-full h-full rounded-full"
                  :src="
                    $auth.user.avatar
                      ? $auth.user.avatar
                      : 'https://api.lorem.space/image/face?w=150&h=150'
                  "
                />
                <img
                  v-else
                  class="w-full h-full rounded-full"
                  :src="
                    $auth.user
                      ? `https://eu.ui-avatars.com/api/?name=${
                          $auth.user.name.split(' ')[0]
                        }+${$auth.user.name.split(' ')[1]}&size=250`
                      : ''
                  "
                />
              </div>

              <label
                class="absolute bottom-0 flex items-center justify-center bg-white border rounded-full cursor-pointer drop-shadow-shphoto border-border-list ltr:right-0 rtl:left-0 lg:w-6 lg:h-6 w-11 h-11"
              >
                <input type="file" hidden @change="changeAvatar($event)" />
                <IconsEditIcon class="text-slate-500" />
              </label>
            </aside>
            <!-- End user -->
            <div class="overflow-hidden">
              <div
                class="flex justify-center mt-4 text-xl font-medium text-black capitalize lg:text-base lg:justify-start lg:mt-0"
              >
                {{ $auth.loggedIn && $auth.user ? $auth.user.name : '-' }}
              </div>
              <p class="mt-1 text-xs font-medium capitalize text-text-green">
                Property Consultant
              </p>
              <span
                class="mt-1 overflow-hidden text-xs font-normal lowercase text-text-gray whitespace-nowrap"
              >
                {{ $auth.loggedIn && $auth.user ? $auth.user.email : '-' }}
              </span>
            </div>
            <!-- End text -->
          </div>
          <!-- End User -->

          <ProfileTabs class="lg:mt-4 lg:p-5" @tabPicked="chooseTab" />
          <!-- End Categories -->
        </div>
      </div>

      <!-- End box Left -->
      <div class="col-span-3 lg:col-span-2">
        <ProfileInfo v-if="tab === 'profile'" class="mt-6 lg:p-5 lg:mt-0" />
        <ProfilePassword
          v-if="tab === 'password'"
          class="mt-6 lg:p-5 lg:mt-0"
        />
      </div>
      <!-- End box right -->
    </div>
    <!-- End Photos -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import auth from '~/middleware/auth'
export default Vue.extend({
  middleware: auth,
  data() {
    return {
      loading: false,
      tab: 'profile',
    }
  },
  methods: {
    chooseTab(value: string) {
      this.tab = value
    },

    changeAvatar(event: any) {
      const payload = new FormData()
      payload.append('avatar', event.target.files[0])

      this.$axios
        .post('/client-update-profile', payload)
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
