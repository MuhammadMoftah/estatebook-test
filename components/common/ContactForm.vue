<template>
  <div
    class="bg-white rounded-lg lg:drop-shadow-contactFormrequest lg:border lg:border-border-list lg:p-9"
    :class="classes"
  >
    <h2 class="text-lg font-semibold leading-none text-black capitalize">
      {{ $t(title) }}
    </h2>

    <div>
      <!-- name -->
      <CommonFormInput
        v-model="contactForm.name"
        name="name"
        type="text"
        :label="$t('name')"
        :placeholder="$t('enter_your_name')"
        :error-class="$v.contactForm.name.$error"
        @blur="$v.contactForm.name.$touch()"
      />
      <div v-if="$v.contactForm.name.$error" class="my-2">
        <p
          v-if="!$v.contactForm.name.required"
          class="text-xs font-semibold text-red-600"
        >
          {{ $t('empty_validation_error') }}
        </p>
        <p
          v-if="!$v.contactForm.name.minLength"
          class="text-xs font-semibold text-red-600"
        >
          {{ $t('valid_name_validation_error') }}
          {{ $v.contactForm.name.$params.minLength.min }}
          {{ $t('characters') }}
        </p>
      </div>
      <!-- email -->
      <CommonFormInput
        v-model="contactForm.email"
        name="email"
        type="email"
        :label="$t('email')"
        :placeholder="$t('enter_your_email')"
        :error-class="$v.contactForm.email.$error"
        @blur="$v.contactForm.email.$touch()"
      />
      <div v-if="$v.contactForm.email.$error" class="my-2">
        <p
          v-if="!$v.contactForm.email.email"
          class="text-xs font-semibold text-red-600"
        >
          {{ $t('email_validation_error') }}
        </p>
        <!-- <p
          v-if="!$v.contactForm.email.required"
          class="text-xs font-semibold text-red-600"
        >
          {{ $t('empty_validation_error') }}
        </p> -->
      </div>
      <!-- phone -->
      <CommonFormInput
        v-model="contactForm.mobile"
        name="phone"
        type="text"
        :label="$t('phone')"
        :placeholder="$t('enter_your_phone')"
        :error-class="$v.contactForm.mobile.$error"
        @blur="$v.contactForm.mobile.$touch()"
      />
      <div v-if="$v.contactForm.mobile.$error" class="py-2">
        <p
          v-if="!$v.contactForm.mobile.numeric"
          class="text-xs font-semibold text-red-600"
        >
          {{ $t('number_validation_error') }}
        </p>
        <p
          v-if="!$v.contactForm.mobile.minLength"
          class="text-xs font-semibold text-red-600"
        >
          {{ $t('number_validation_error_2') }}
          {{ $v.contactForm.mobile.$params.minLength.min }}
          {{ $t('numbers') }}
        </p>

        <p
          v-if="!$v.contactForm.mobile.required"
          class="text-xs font-semibold text-red-600"
        >
          {{ $t('empty_validation_error') }}
        </p>
      </div>
      <!-- message -->
      <div class="w-full mt-6">
        <label class="text-base font-normal capitalize text-text-gray">
          {{ $t('message') }}
        </label>
        <textarea
          v-model="contactForm.message"
          class="block w-full h-32 p-2 mt-2 text-xs font-normal bg-white border rounded-md outline-none resize-none text-slate-800 border-border-input focus:border-text-green"
          :placeholder="textAreaPlaceholder()"
          @blur="$v.contactForm.message.$touch()"
        ></textarea>
        <div v-if="$v.contactForm.message.$error" class="py-2">
          <!-- <p
            v-if="!$v.contactForm.message.required"
            class="text-xs font-semibold text-red-600"
          >
            {{ $t('empty_validation_error') }}
          </p> -->
          <p
            v-if="!$v.contactForm.message.minLength"
            class="text-xs font-semibold text-red-600"
          >
            {{ $t('empty_validation_error') }}
            {{ $v.contactForm.message.$params.minLength.min }}
            {{ $t('characters') }}
          </p>
        </div>
      </div>
    </div>
    <div class="relative w-full mt-6">
      <button
        :class="$v.$invalid ? 'pointer-events-none  opacity-75' : ''"
        class="flex items-center justify-center w-full gap-2 text-base font-semibold text-white capitalize duration-300 rounded-md h-11 bg-text-green focus:text-green focus:outline-none focus:bg-text-green hover:scale-110"
        @click="onSubmit"
      >
        <IconsSpinnerIcon :class="loading ? 'w-5 h-5' : 'hidden'" />
        {{ $t('send') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { required, email, minLength, numeric } from 'vuelidate/lib/validators'

export default {
  props: {
    classes: {
      default: '',
      type: String,
    },
    title: {
      type: String,
      default: 'request_more_info',
    },
    model_type: {
      type: String,
      default: '',
    },
    model_id: {
      type: Number,
      default: null,
    },
    model_name: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      contactForm: {
        name: '',
        email: '',
        mobile: '',
        message: '',
        model_type: this.model_type,
        model_id: this.model_id,
        interested_in: this.model_type,
      },
    }
  },
  validations: {
    contactForm: {
      name: {
        required,
        minLength: minLength(3),
      },
      email: {
        // required,
        email,
      },
      mobile: {
        required,
        numeric,
        minLength: minLength(11),
      },
      message: {
        // required,
        minLength: minLength(10),
      },
    },
  },
  computed: {
    loading() {
      return this.$store.state.buttonLoader
    },
  },
  methods: {
    async onSubmit() {
      this.isSubmitted = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.$store.commit('CHANGE_BUTTON_LOADING', true)

      await this.$axios
        .post('/contact-us', this.contactForm)
        .then(res => {
          this.$store.commit('CHANGE_BUTTON_LOADING', false)
          this.$toast.success(this.$t('thank_you'))
        })
        .catch(err => {
          this.$toast.error(err.response.data.message)

          this.$store.commit('CHANGE_BUTTON_LOADING', false)
        })
    },
    textAreaPlaceholder(): string {
      return this.$t(`message_placeholder`) + ' ' + this.model_name
    },
  },
}
</script>
