<template>
  <div
    class="fixed inset-0 flex items-center justify-center w-full min-h-screen overflow-hidden z-[1100] bg-black/40"
  >
    <transition
      :enter-active-class="$t('dir') === 'ltr' ? 'slide-top' : 'slide-top'"
      :leave-active-class="
        $t('dir') === 'ltr' ? 'slide-bottom' : 'slide-bottom'
      "
      appear
    >
      <div
        v-on-clickaway="close"
        class="w-full lg:w-[1028px] flex bg-white mr-auto ml-auto drop-shadow-theme rounded-xl overflow-hidden"
      >
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
        <div
          class="relative flex items-center justify-center max-w-5xl min-w-full md:min-w-1/2 p-9"
        >
          <a
            class="absolute cursor-pointer ltr:right-4 rtl:left-4 top-4"
            @click.prevent="
              $route.path.includes('delete-account')
                ? closeOnDeletePage()
                : close()
            "
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.9984 19.5754L10.1234 27.4504C9.89844 27.6754 9.63594 27.7879 9.33594 27.7879C9.03594 27.7879 8.77344 27.6754 8.54844 27.4504C8.32344 27.2254 8.21094 26.9629 8.21094 26.6629C8.21094 26.3629 8.32344 26.1004 8.54844 25.8754L16.4234 18.0004L8.54844 10.1254C8.32344 9.90039 8.21094 9.63789 8.21094 9.33789C8.21094 9.03789 8.32344 8.77539 8.54844 8.55039C8.77344 8.32539 9.03594 8.21289 9.33594 8.21289C9.63594 8.21289 9.89844 8.32539 10.1234 8.55039L17.9984 16.4254L25.8734 8.55039C26.0984 8.32539 26.3609 8.21289 26.6609 8.21289C26.9609 8.21289 27.2234 8.32539 27.4484 8.55039C27.6734 8.77539 27.7859 9.03789 27.7859 9.33789C27.7859 9.63789 27.6734 9.90039 27.4484 10.1254L19.5734 18.0004L27.4484 25.8754C27.6734 26.1004 27.7859 26.3629 27.7859 26.6629C27.7859 26.9629 27.6734 27.2254 27.4484 27.4504C27.2234 27.6754 26.9609 27.7879 26.6609 27.7879C26.3609 27.7879 26.0984 27.6754 25.8734 27.4504L17.9984 19.5754Z"
                fill="#BEBEBE"
              />
            </svg>
          </a>

          <div class="w-full">
            <h2 class="text-xl font-semibold text-black capitalize">
              {{ $t('welcome_back') }}
            </h2>

            <p class="mt-1 text-xs font-normal capitalize text-text-gray">
              {{ $t('sign_in_to_your_account') }}
            </p>
            <!-- End title -->
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
                <label for="" class="text-sm font-medium text-black capitalize">
                  {{ $t('password') }}
                </label>
                <input
                  v-if="!showPassword"
                  v-model="form.password"
                  type="password"
                  class="block w-full h-12 px-6 mt-1 text-xs font-normal bg-white border rounded-md outline-none text-text-black border-border-input focus:border-text-green"
                  :placeholder="$t('password')"
                />
                <input
                  v-else
                  v-model="form.password"
                  type="text"
                  class="block w-full h-12 px-6 mt-1 text-xs font-normal bg-white border rounded-md outline-none text-text-black border-border-input focus:border-text-green"
                  :placeholder="$t('password')"
                />
                <div
                  class="absolute cursor-pointer ltr:right-4 rtl:left-4 bottom-4"
                >
                  <IconsEyeIcon
                    v-if="!showPassword"
                    class="w-5 h-5 text-slate-500"
                    @click.native="showPassword = true"
                  />
                  <IconsEyeIconShow
                    v-else
                    class="w-5 h-5 text-slate-500"
                    @click.native="showPassword = false"
                  />
                </div>
              </div>
              <!-- End input -->
              <div class="relative w-full mt-6">
                <CommonThemeButton
                  class="font-semibold text-white uppercase duration-300 bg-text-green focus:text-green focus:outline-none focus:bg-text-green hover:scale-105"
                  :loading="loading"
                  :label="$t('sign_in')"
                  @click.native="signIn()"
                />
              </div>
              <!-- End input -->
              <div class="items-center justify-between w-full mt-6 lg:flex">
                <p
                  class="flex items-center gap-2 text-xs font-normal capitalize text-text-gray"
                >
                  {{ $t('dont_have_account') }}

                  <NuxtLink
                    :to="localePath('/register')"
                    class="font-semibold text-text-green hover:underline"
                  >
                    <div @click="$store.commit('SET_MODAL', '')">
                      {{ $t('sign_up') }}
                    </div>
                  </NuxtLink>
                </p>
                <button
                  class="text-xs font-normal capitalize duration-300 text-text-gray hover:text-text-green"
                  @click="
                    $store.commit('SET_MODAL', ''),
                      $router.push(localePath('/forget-password'))
                  "
                >
                  {{ $t('forget_your_password') }}
                </button>
              </div>
              <!-- End text -->
              <div class="relative w-full mt-8">
                <div class="relative w-full border-b border-border-input">
                  <p
                    class="absolute bg-white right-0 left-0 bottom-[-11px] mr-auto ml-auto px-3 table text-lg font-normal text-border-list capitalize"
                  >
                    {{ $t('or') }}
                  </p>
                </div>
              </div>
            </div>
            <nav class="items-center justify-center block gap-4 mt-6 md:flex">
              <div class="w-full">
                <div id="g_id_onload"></div>
                <div id="g_id_signin"></div>
              </div>

              <v-facebook-login
                :app-id="facebookClientId"
                @sdk-init="handleSdkInit"
                @login="facebookLogin"
              >
                <template #logo>
                  <IconsFacebookIcon />
                </template>
                <template #login>
                  {{ $t('login_with_facebook') }}
                </template>
                <template #logout>
                  {{ $t('login_with_facebook') }}
                </template>
              </v-facebook-login>
            </nav>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  components: {
    VFacebookLogin: () =>
      process.client ? import('vue-facebook-login-component') : null,
  },
  layout: 'auth',

  props: {
    fromPopup: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      errorMessage: null,
      loading: false,
      facebookClientId: process.env.NUXT_ENV_FACEBOOK_CLIENT_ID,
      params: {
        client_id: process.env.NUXT_ENV_GOOGLE_CLIENT_ID,
      },
      showPassword: false,
    }
  },
  mounted() {
    this.initializeGoogleSignIn()
  },
  methods: {
    initializeGoogleSignIn() {
      const params = {
        client_id: process.env.NUXT_ENV_GOOGLE_CLIENT_ID,
        callback: this.handleCredentialResponse,
      }

      google.accounts.id.initialize(params)

      google.accounts.id.renderButton(document.getElementById('g_id_signin'), {
        theme: 'outline',
        size: 'large',
        callback: this.handleCredentialResponse,
      })
    },
    handleCredentialResponse(response: any) {
      if (response.credential) {
        const jwtToken = response.credential
        const responsePayload = this.jwt_decode(response.credential)
        try {
          const googlePayload = {
            name: responsePayload.name,
            email: responsePayload.email,
            token: responsePayload.sub,
            avatar: responsePayload.picture,
            platform: 'google',
          }

          console.log(response, 'google response try')
          this.socialLogin(googlePayload)
        } catch (err) {
          console.log(response, 'google response catch')
          this.$toast.error(err.response.data.message)
          this.$store.commit('SET_MODAL', '')
        }
      } else {
        console.error('No credential received')
      }
    },
    jwt_decode(token: string) {
      var base64Url = token.split('.')[1]
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      var jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          })
          .join('')
      )

      return JSON.parse(jsonPayload)
    },

    close() {
      if (!this.$route.path.includes('delete-account')) {
        this.$store.commit('SET_MODAL', '')
      }
    },
    closeOnDeletePage() {
      this.$store.commit('SET_MODAL', '')
      this.$router.push(this.localePath('/'))
    },
    async signIn() {
      try {
        this.loading = true
        const response = await this.$auth.loginWith('local', {
          data: this.form,
        })
        if (!response) {
          return
        }
        const wishlistUnits = this.$store.state.wishlist.localStorageUnits
        const wishlistProjects = this.$store.state.wishlist.localStorageProjects
        if (wishlistUnits && wishlistUnits.length) {
          this.bulkFavHandler(true, 'unit', wishlistUnits)
        }
        if (wishlistProjects && wishlistProjects.length) {
          this.bulkFavHandler(true, 'project', wishlistProjects)
        }

        this.$store.commit('SET_MODAL', '')

        this.loading = false
        // this.$emit('loginDone')
      } catch (err) {
        this.$toast.error(err.response.data.message)
        this.loading = false
      }
    },
    // facebook login
    facebookLogin(data) {
      try {
        if (data) {
          this.$axios
            .get(
              `https://graph.facebook.com/v6.0/me?fields=id,email,name,picture&access_token=${data.authResponse.accessToken}`
            )
            .then(response => {
              const facebookPayload = {
                name: response.data.name,
                email: response.data.email,
                token: data.authResponse.userID,
                avatar: response.data.picture.data.url,
                platform: 'facebook',
              }
              this.socialLogin(facebookPayload)
            })
        }
      } catch (err) {
        this.$toast.error(err.response.data.message)
        this.$store.commit('SET_MODAL', '')
      }
    },
    handleSdkInit({ FB, scope }) {
      FB.logout = FB.login
      // this.FB = FB
      scope.logout = scope.login
      // this.scope = scope
    },

    socialLogin(payload: any) {
      this.$axios
        .post('/client-social', payload)
        .then(res => {
          const token = res.data.token
          const user = res.data.user
          this.$auth.setUser(user)
          this.$auth.setUserToken(token)

          // this.$router.push(this.localePath('/'))
          this.$store.commit('SET_MODAL', '')
        })
        .catch(err => {
          this.$toast.error(err.response.data.failed)
        })
    },
  },
})
</script>

<style scoped>
.v-facebook-login {
  @apply flex justify-center items-center cursor-pointer gap-2 w-full md:min-w-[170px] bg-transparent text-sm text-text-gray font-medium  border border-gray-300 rounded-md  !important;
}
.v-facebook-login svg {
  @apply fill-[#3D6AD6];
}
</style>
