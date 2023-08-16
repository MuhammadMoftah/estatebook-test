<template>
  <nuxt-link :to="localePath('/the-address-property-show-offers')">
    <div
      class="relative m-1 h-[250px] w-full overflow-hidden rounded-lg md:h-[360px]"
    >
      <img
        src="https://images.unsplash.com/photo-1569288063643-5d29ad64df09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
        class="object-cover object-center w-full h-full rounded-lg"
        alt=""
      />
      <div
        class="absolute inset-0 p-10 rounded-lg bg-gradient-to-r from-black/100"
      >
        <div>
          <div class="flex w-full md:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="md:w-[100px] w-[60px]"
              height="70"
              viewBox="0 0 123 70"
              fill="none"
            >
              <path
                d="M1.79537 52.6494C1.10957 52.6494 0.516274 53.1643 0.431512 53.8406C0.146405 56.2152 0 58.6436 0 61.0873C0 63.5311 0.146405 65.9749 0.431512 68.3649C0.516274 69.0489 1.10187 69.5561 1.79537 69.5561H40.7781V52.6494H1.79537Z"
                fill="white"
              />
              <path
                d="M81.8535 52.6494V69.5561H120.836C121.522 69.5561 122.115 69.0489 122.2 68.3649C122.485 65.9749 122.632 63.5542 122.632 61.0873C122.632 58.6359 122.485 56.2152 122.2 53.8406C122.115 53.1566 121.53 52.6494 120.836 52.6494H81.8535Z"
                fill="white"
              />
              <path
                d="M109.39 25.1448L81.8577 52.6488L61.2915 42.451L40.7791 52.6488L13.2162 25.1678C12.7307 24.676 12.6768 23.8999 13.1006 23.3619C14.6109 21.4484 16.2291 19.6194 17.9551 17.9057C19.6658 16.1996 21.4843 14.5858 23.3876 13.1026C23.927 12.68 24.7052 12.7338 25.1984 13.2179L52.8076 40.745V1.79056C52.8076 1.10661 53.3161 0.514882 54.0019 0.430349C56.3984 0.14601 58.841 0 61.3145 0C63.788 0 66.1922 0.138325 68.5733 0.430349C69.2591 0.514882 69.7676 1.10661 69.7676 1.79056V40.7604L97.3922 13.2102C97.8777 12.7261 98.6559 12.6723 99.203 13.095C101.114 14.5858 102.94 16.1996 104.666 17.921C106.392 19.6425 108.003 21.456 109.513 23.3696C109.937 23.9075 109.883 24.6914 109.398 25.1678L109.39 25.1448Z"
                fill="white"
              />
            </svg>
            <div
              class="mt-2 text-lg font-medium text-white md:py-6 md:text-2xl md:ms-0 ms-4"
            >
              <p class="uppercase md:tracking-[12px] tracking-[5px]">
                The Address
              </p>
              <p class="uppercase md:tracking-[12px] tracking-[5px]">
                Property show
              </p>
            </div>
          </div>
          <div class="md:w-[200px] w-full">
            <div class="flex justify-between">
              <p
                class="text-lg font-semibold tracking-wider text-white uppercase md:text-xl"
              >
                AUG
              </p>
              <p
                class="text-lg font-semibold tracking-wider text-white uppercase md:text-xl"
              >
                AUG
              </p>
            </div>
            <div class="flex items-center gap-2">
              <p class="text-2xl font-semibold text-white">4</p>
              <div class="flex-auto h-1 bg-white"></div>
              <p class="text-2xl font-semibold text-white">7</p>
            </div>
          </div>

          <div
            class="md:absolute bottom-0 end-0 md:flex hidden h-[72px] w-[250px] items-center justify-center gap-3 rounded-ts-lg bg-[#FFD700] p-3 font-semibold uppercase tracking-wider"
          >
            {{ $t('explore_offers') }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g clip-path="url(#clip0_896_66525)">
                <path
                  d="M19.7865 9.48203L12.444 2.13948C12.1802 1.83149 11.7167 1.79559 11.4087 2.05941C11.1007 2.32316 11.0648 2.7867 11.3286 3.09469C11.3532 3.1234 11.38 3.15021 11.4087 3.17476L17.4956 9.26907H0.73423C0.32875 9.26907 0 9.59782 0 10.0034C0 10.4089 0.32875 10.7376 0.73423 10.7376H17.4956L11.4087 16.8245C11.1007 17.0883 11.0648 17.5518 11.3286 17.8598C11.5924 18.1678 12.0559 18.2037 12.3639 17.9399C12.3926 17.9153 12.4194 17.8885 12.444 17.8598L19.7865 10.5172C20.0712 10.231 20.0712 9.76844 19.7865 9.48203Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_896_66525">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>
