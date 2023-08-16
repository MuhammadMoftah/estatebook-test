<template>
  <footer
    v-if="displayHide"
    class="relative w-full pb-24 lg:pb-6 lg:mt-16 bg-bg-green"
  >
    <!-- :class="[removeMarginTop ? 'lg:mt-0' : 'lg:mt-24']" -->
    <div class="container px-5">
      <div
        class="grid w-full grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-4"
      >
        <div class="relative">
          <NuxtLink :to="localePath('/')" class="block mt-16 md:hidden">
            <img
              src="~/assets/images/logo.svg"
              class="max-w-[140px]"
              alt="Estate Book"
              loading="lazy"
            />
          </NuxtLink>
          <!-- End Logo -->
          <div
            class="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-2 pb-28 md:p-0"
          >
            <div
              class="absolute bottom-0 flex items-end justify-between w-full start-0 sm:w-full md:mt-16 md:relative md:block md:flex-row"
            >
              <NuxtLink :to="localePath('/')" class="hidden md:block">
                <img
                  src="~/assets/images/logo.svg"
                  class="max-w-[140px]"
                  alt="Estate Book"
                  loading="lazy"
                />
              </NuxtLink>
              <!-- End Logo -->
              <LayoutSocialBox class="w-1/2 md:w-auto" />
              <!-- End Icons -->
              <div class="md:mt-11">
                <div class="flex items-center">
                  <svg
                    width="25"
                    height="27"
                    viewBox="0 0 25 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.4573 18.7665H21.6256C23.4776 18.7665 24.9844 17.1879 24.9844 15.2475V12.4428C24.9844 10.5025 23.4777 8.92383 21.6256 8.92383H18.4573C17.9695 8.92383 17.5727 9.33959 17.5727 9.85064V17.8398C17.5728 18.3508 17.9695 18.7665 18.4573 18.7665ZM21.6256 10.4071C22.6971 10.4071 23.5687 11.3203 23.5687 12.4428V15.2475C23.5687 16.3701 22.6971 17.2833 21.6256 17.2833H18.9884V10.4071H21.6256Z"
                      fill="black"
                    />
                    <path
                      d="M3.35726 18.7665H6.52561C7.01333 18.7665 7.41016 18.3508 7.41016 17.8398V9.85064C7.41016 9.33959 7.01333 8.92383 6.52561 8.92383H3.35726C1.50529 8.92383 -0.00146437 10.5024 -0.00146437 12.4428V15.2475C-0.00146437 17.1879 1.50524 18.7665 3.35726 18.7665ZM5.9945 17.2833H3.35726C2.28585 17.2833 1.4142 16.3701 1.4142 15.2475V12.4428C1.4142 11.3203 2.2858 10.4071 3.35726 10.4071H5.9945V17.2833Z"
                      fill="black"
                    />
                    <path
                      d="M3.50461 9.20415H4.92027C4.92027 4.95113 8.23394 1.49103 12.307 1.49103C16.38 1.49103 19.6937 4.95113 19.6937 9.20415H21.1094C21.1094 4.13327 17.1606 0.0078125 12.307 0.0078125C7.45337 0.0078125 3.50461 4.13327 3.50461 9.20415Z"
                      fill="black"
                    />
                    <path
                      d="M10.2091 24.455L10.4766 22.9985C7.74663 22.448 5.43886 20.4407 4.4538 17.7598L3.13265 18.2926C4.29188 21.4474 7.00336 23.8086 10.2091 24.455Z"
                      fill="black"
                    />
                    <path
                      d="M12.3087 26.1945C13.6096 26.1945 14.668 25.0859 14.668 23.7232C14.668 22.3605 13.6096 21.252 12.3087 21.252C11.0078 21.252 9.94942 22.3606 9.94942 23.7232C9.94942 25.0859 11.0078 26.1945 12.3087 26.1945ZM12.3087 22.7351C12.829 22.7351 13.2523 23.1784 13.2523 23.7232C13.2523 24.268 12.829 24.7112 12.3087 24.7112C11.7884 24.7112 11.3651 24.268 11.3651 23.7232C11.3651 23.1784 11.7884 22.7351 12.3087 22.7351Z"
                      fill="black"
                    />
                  </svg>
                  <p
                    class="text-base font-bold text-black uppercase ltr:ml-1 rtl:mr-1"
                  >
                    {{ $t('hotline') }}
                  </p>
                </div>
                <NuxtLink
                  :to="localePath('/')"
                  class="text-text-green text-[42px] font-bold leading-8 md:leading-10"
                >
                  17066
                </NuxtLink>
              </div>
              <!-- End Hot Line -->
            </div>
            <!-- item one -->
            <div class="relative mt-16">
              <h6 class="text-base font-semibold text-black capitalize">
                {{ $t('quick_links') }}
              </h6>
              <nav class="text-sm">
                <button
                  :to="localePath('/discover?page=1')"
                  class="table mt-3 font-normal capitalize duration-300 text-link-footer hover:text-text-green"
                  @click="
                    $router.push(localePath('/discover?page=1')),
                      $store.commit('discoverTab', 'neighborhoods')
                  "
                >
                  {{ $t('neighborhoods') }}
                </button>
                <!-- <NuxtLink
                  :to="localePath('/neighborhoods')"
                  class="table mt-3 font-normal capitalize duration-300 text-link-footer hover:text-text-green"
                >
                  {{ $t('neighborhoods') }}
                </NuxtLink> -->
                <NuxtLink
                  :to="localePath('/projects')"
                  class="table mt-3 font-normal capitalize duration-300 text-link-footer hover:text-text-green"
                >
                  {{ $t('projects') }}
                </NuxtLink>
                <!-- <NuxtLink
                  :to="localePath('/community')"
                  class="table mt-3 font-normal capitalize duration-300 text-link-footer hover:text-text-green"
                >
                  {{ $t('community') }}
                </NuxtLink> -->
                <NuxtLink
                  :to="localePath('/blogs')"
                  class="table mt-3 font-normal capitalize duration-300 text-link-footer hover:text-text-green"
                >
                  {{ $t('blogs') }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/developers')"
                  class="table mt-3 font-normal capitalize duration-300 text-link-footer hover:text-text-green"
                >
                  {{ $t('developers') }}
                </NuxtLink>
              </nav>
            </div>
            <!-- item two -->
            <div class="relative mt-16">
              <h6 class="text-base font-semibold text-black capitalize">
                {{ $t('about') }}
              </h6>
              <nav class="text-sm">
                <NuxtLink
                  :to="localePath('/about')"
                  class="table mt-3 font-normal capitalize duration-300 text-link-footer hover:text-text-green"
                >
                  {{ $t('about_us') }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/privacy-policy')"
                  class="table mt-3 font-normal capitalize duration-300 text-link-footer hover:text-text-green"
                >
                  {{ $t('privacy-policy') }}
                </NuxtLink>

                <!-- <NuxtLink
                  :to="localePath('/agents')"
                  class="table mt-3 font-normal capitalize duration-300 text-link-footer hover:text-text-green"
                >
                  {{ $t('agents') }}
                </NuxtLink>

                 <NuxtLink
                  :to="localePath('/help')"
                  class="table mt-3 font-normal capitalize duration-300 text-link-footer hover:text-text-green"
                >
                  {{ $t('help_support') }}
                </NuxtLink>  -->
              </nav>
            </div>
            <!-- item three -->
          </div>
        </div>
        <!-- End Box One -->
        <div
          class="relative hidden py-6 mt-16 bg-black md:block rounded-3xl px-9"
        >
          <div class="max-w-[68%]">
            <h6 class="text-base font-semibold text-white capitalize">
              {{ $t('download_our_app') }}
            </h6>
            <p class="mt-2 text-sm font-light text-white">
              {{ $t('download_app_pref') }}
            </p>
            <nav class="flex mt-4">
              <a
                href="https://apps.apple.com/us/app/estatebook-its-time/id6448032499"
                target="_blank"
                class="flex items-center justify-center w-40 py-2 duration-300 rounded-md bg-icons-download hover:bg-text-green"
              >
                <svg
                  width="17"
                  height="21"
                  viewBox="0 0 17 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.0199 10.8713C14.0301 10.0878 14.2401 9.3196 14.6305 8.63816C15.0209 7.95673 15.5789 7.3842 16.2526 6.97383C15.8246 6.36824 15.26 5.86986 14.6036 5.51828C13.9471 5.16669 13.217 4.97159 12.4712 4.94848C10.8801 4.78302 9.33773 5.89169 8.52696 5.89169C7.70052 5.89169 6.45224 4.9649 5.10804 4.9923C4.23858 5.02013 3.39122 5.27062 2.64853 5.71936C1.90583 6.1681 1.29313 6.79979 0.870119 7.55288C-0.962228 10.696 0.404541 15.3152 2.15981 17.8559C3.03801 19.0999 4.06437 20.4896 5.40736 20.4403C6.72155 20.3863 7.21237 19.6101 8.7987 19.6101C10.3703 19.6101 10.8308 20.4403 12.201 20.409C13.6112 20.3863 14.4997 19.1594 15.3471 17.9035C15.9781 17.0171 16.4636 16.0374 16.7858 15.0007C15.9665 14.6574 15.2673 14.0827 14.7755 13.3484C14.2836 12.6141 14.0208 11.7526 14.0199 10.8713Z"
                    fill="white"
                  />
                  <path
                    d="M11.4314 3.27656C12.2003 2.3621 12.5792 1.18671 12.4874 0C11.3127 0.122234 10.2276 0.678453 9.44836 1.55783C9.06735 1.98743 8.77553 2.48722 8.5896 3.02862C8.40366 3.57002 8.32726 4.14242 8.36474 4.71309C8.9523 4.71908 9.53357 4.59291 10.0648 4.34408C10.596 4.09525 11.0633 3.73025 11.4314 3.27656Z"
                    fill="white"
                  />
                </svg>

                <div class="ltr:ml-2 rtl:mr-2">
                  <p
                    class="text-[11px] text-white capitalize font-extralight eading-none"
                  >
                    {{ $t('download_on') }}
                  </p>
                  <h6
                    class="text-[14px] font-medium leading-none text-white capitalize"
                  >
                    {{ $t('app_store') }}
                  </h6>
                </div>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.estatebook.app"
                target="_blank"
                class="flex items-center justify-center w-40 py-2 duration-150 rounded-md ltr:ml-4 rtl:mr-4 bg-icons-download hover:bg-text-green"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  width="28"
                  height="28"
                >
                  <path
                    d="M37.289 28.973l7.139-7.313L15.401 6.325C14.7 5.955 13.95 5.898 13.27 6.072L37.289 28.973zM11.084 8.284C11.033 8.505 11 8.736 11 8.978v46.044c0 .272.036.531.101.777l22.911-23.469L11.084 8.284zM37.248 35.723L13.355 57.949c.657.147 1.374.081 2.046-.274l28.447-15.029L37.248 35.723zM58.979 29.347l-9.489-5.013-8.638 8.036 8.003 7.631 10.124-5.349C61.111 33.526 61.111 30.474 58.979 29.347z"
                    fill="#fff"
                  />
                </svg>

                <div class="ltr:ml-2 rtl:mr-2">
                  <p
                    class="text-[11px] text-white capitalize font-extralight eading-none"
                  >
                    {{ $t('download_on') }}
                  </p>
                  <h6
                    class="text-[14px] font-medium leading-none text-white capitalize"
                  >
                    {{ $t('google_play') }}
                  </h6>
                </div>
              </a>
            </nav>
          </div>
          <div class="absolute ltr:right-6 rtl:left-6 top-[-32px]">
            <img
              src="~/assets/images/FooterMockup.svg"
              class="max-w-[130px]"
              alt="Estate Book"
              loading="lazy"
            />
          </div>
        </div>
        <!-- End Box Tow -->
      </div>

      <p
        v-if="$i18n.locale == 'en'"
        class="w-full mt-10 text-xs font-normal text-center text-black md:mt-16"
      >
        All copyrights © reserved • {{ new Date().getFullYear() }} •
        <span class="font-medium">Estatebook</span>
      </p>

      <p
        v-if="$i18n.locale == 'ar'"
        class="w-full mt-10 text-xs font-normal text-center text-black md:mt-16"
      >
        • {{ new Date().getFullYear() }} • جميع الحقوق محفوظة
        <span class="font-medium">إستات بوك</span>
      </p>
    </div>
  </footer>
</template>
<script lang="ts">
// // i18n handling
import Vue from 'vue'

export default Vue.extend({
  computed: {
    removeMarginTop() {
      return (
        this.$route.path.includes(this.localePath('/units')) ||
        this.$route.path.includes(this.localePath('/projects'))
      )
    },
  },
})
// const localePath = useLocalePath()
</script>
