<template>
  <div class="flex w-full h-full ml-auto mr-auto overflow-hidden bg-white">
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
      class="relative flex justify-center max-w-5xl min-w-full md:min-w-1/2 p-9"
      @submit.prevent="signUp()"
    >
      <div class="w-full">
        <div>
          <div class="w-full mt-6">
            <label for="" class="text-sm font-medium text-black capitalize">
              {{ $t('name') }}
            </label>
            <input
              v-model="form.name"
              type="name"
              class="block w-full h-12 px-6 mt-1 text-xs font-normal bg-white border rounded-md outline-none text-text-black border-border-input focus:border-text-green"
              :placeholder="$t('name')"
            />
          </div>
          <div class="w-full mt-6">
            <label for="" class="text-sm font-medium text-black capitalize">
              {{ $t('phone') }}
            </label>
            <input
              v-model="form.mobile"
              type="text"
              class="block w-full h-12 px-6 mt-1 text-xs font-normal bg-white border rounded-md outline-none text-text-black border-border-input focus:border-text-green"
              :placeholder="$t('phone')"
              :class="{ '!border-red-500': $v.form.mobile.$error }"
              @blur="$v.form.mobile.$touch()"
            />
            <div v-if="$v.form.mobile.$error" class="py-2">
              <p
                v-if="!$v.form.mobile.numeric"
                class="text-xs font-semibold text-red-600"
              >
                {{ $t('number_validation_error') }}
              </p>
              <p
                v-if="!$v.form.mobile.minLength"
                class="text-xs font-semibold text-red-600"
              >
                {{ $t('number_validation_error_2') }}
                {{ $v.form.mobile.$params.minLength.min }}
                {{ $t('numbers') }}
              </p>

              <p
                v-if="!$v.form.mobile.required"
                class="text-xs font-semibold text-red-600"
              >
                {{ $t('empty_validation_error') }}
              </p>
            </div>
          </div>
          <div class="w-full mt-6">
            <label for="" class="text-sm font-medium text-black capitalize">
              {{ $t('email') }}
            </label>
            <input
              v-model="form.email"
              type="email"
              class="block w-full h-12 px-6 mt-1 text-xs font-normal bg-white border rounded-md outline-none text-text-black border-border-input focus:border-text-green"
              :placeholder="$t('email')"
              :class="{ '!border-red-500': $v.form.email.$error }"
              @blur="$v.form.email.$touch()"
            />
            <div v-if="$v.form.email.$error" class="my-2">
              <p
                v-if="!$v.form.email.email"
                class="text-xs font-semibold text-red-600"
              >
                {{ $t('email_validation_error') }}
              </p>
              <p
                v-if="!$v.form.email.required"
                class="text-xs font-semibold text-red-600"
              >
                {{ $t('empty_validation_error') }}
              </p>
            </div>
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
          <div class="relative w-full mt-6">
            <label for="" class="text-sm font-medium text-black capitalize">
              {{ $t('password_confirmation') }}
            </label>

            <input
              v-if="!showPasswordConfirm"
              v-model="form.password_confirmation"
              type="password"
              class="block w-full h-12 px-6 mt-1 text-xs font-normal bg-white border rounded-md outline-none text-text-black border-border-input focus:border-text-green"
              :placeholder="$t('password_confirmation')"
            />
            <input
              v-else
              v-model="form.password_confirmation"
              type="text"
              class="block w-full h-12 px-6 mt-1 text-xs font-normal bg-white border rounded-md outline-none text-text-black border-border-input focus:border-text-green"
              :placeholder="$t('password_confirmation')"
            />
            <div
              class="absolute cursor-pointer ltr:right-4 rtl:left-4 bottom-4"
            >
              <IconsEyeIcon
                v-if="!showPasswordConfirm"
                class="w-5 h-5 text-slate-500"
                @click.native="showPasswordConfirm = true"
              />
              <IconsEyeIconShow
                v-else
                class="w-5 h-5 text-slate-500"
                @click.native="showPasswordConfirm = false"
              />
            </div>
          </div>
          <!-- End input -->
          <div class="relative w-full mt-6">
            <CommonThemeButton
              class="font-semibold text-white uppercase duration-300 bg-text-green focus:text-green focus:outline-none focus:bg-text-green hover:scale-105"
              :loading="loading"
              :label="$t('sign_up')"
            />
          </div>
          <!-- End input -->
          <div class="flex items-center justify-between w-full mt-6">
            <p class="text-xs font-normal capitalize text-text-gray">
              {{ $t('or_you_already_have_account') }}
              <NuxtLink
                :to="localePath('/login')"
                class="font-semibold text-text-green hover:underline"
              >
                {{ $t('sign_in') }}
              </NuxtLink>
            </p>
          </div>
          <!-- End text -->
        </div>
      </div>
    </form>
    <!-- End Form -->
  </div>
</template>
<script lang="ts">
// import Vue from 'vue'
import { required, email, minLength, numeric } from 'vuelidate/lib/validators'

export default {
  layout: 'auth',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        mobile: '',
      },
      errorMessage: null,
      loading: false,
      showPassword: false,
      showPasswordConfirm: false,
      isSubmitted: false,
    }
  },
  validations: {
    form: {
      // name: {
      //   required,
      //   minLength: minLength(4),
      // },
      email: {
        required,
        email,
      },
      mobile: {
        required,
        numeric,
        minLength: minLength(11),
      },
    },
  },
  methods: {
    async signUp() {
      this.isSubmitted = true
      this.loading = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      await this.$axios
        .post('/client-register', { ...this.form })
        .then(res => {
          this.loading = false
          this.$auth.setUserToken(res.data.token)
          this.$router.push(this.localePath('/'))
          this.$auth.fetchUser()
          // this.$toast.success('Register done Successfully');
        })
        .catch(err => {
          this.loading = false
          // this.$errorHandler.error(err.response.data.errors)
          this.$errorHandler(err)

          // this.nameError = err.response.data.errors.name;
          // this.emailError = err.response.data.errors.email;
          // this.passwordError = err.response.data.errors.password;
          // this.mobile_error = err.response.data.errors.mobile;
          // this.password_confirmationError =
          //   err.response.data.errors.password_confirmation;
        })
    },
  },
}
</script>
