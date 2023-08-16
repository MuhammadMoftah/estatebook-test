<template>
  <div
    class="relative mt-4 overflow-hidden bg-white drop-shadow-shadowcard rounded-xl group"
  >
    <div
      class="absolute top-0 left-0 z-10 flex items-center justify-between w-full p-5"
    >
      <p
        class="flex items-center justify-center w-24 h-8 text-sm font-medium text-black capitalize bg-white rounded-3xl animate-pulse"
      ></p>
      <!-- End Premium -->
      <div class="relative flex items-center">
        <div
          class="flex items-center justify-center ml-2 bg-white rounded-full w-9 h-9 animate-pulse"
        ></div>
      </div>
      <!-- End icons -->
    </div>
    <!-- End icon top -->
    <div class="block w-full h-fit">
      <div
        class="relative w-full flex h-48 overflow-hidden bg-[#eeeeee] rounded-b-2xl"
      >
        <div
          class="flex items-center justify-center w-full h-full animate-pulse"
        >
          <IconsHomeIcon />
          <div
            class="absolute bottom-0 left-0 flex items-center justify-between w-full p-5"
          >
            <div
              class="flex items-center justify-center w-12 h-12 bg-white rounded-full"
            ></div>
            <!-- End logo -->

            <div
              class="flex items-center justify-center w-10 h-10 bg-white rounded-full"
            ></div>
            <!-- End logo -->
          </div>
          <!-- End icon top -->
        </div>
        <!-- photo -->
      </div>
      <div class="w-full px-5 bg-white">
        <div class="flex flex-col w-full gap-4 py-4">
          <div class="flex items-center justify-between">
            <div
              class="w-[133px] h-[22px] bg-[#eeeeee] rounded-full animate-pulse"
            ></div>
            <div
              class="w-[89px] h-[22px] bg-[#eeeeee] rounded-full animate-pulse"
            ></div>
          </div>
          <div class="w-full h-3 bg-[#eeeeee] rounded-full animate-pulse"></div>
          <div class="flex items-center gap-4">
            <div
              v-for="n in 3"
              :key="`n-${n}`"
              class="w-7 h-7 rounded-[3px] bg-[#eeeeee] animate-pulse"
            ></div>
          </div>
        </div>
        <div
          class="flex items-center justify-around w-full py-6 mt-2 border-t border-solid border-border-top"
        >
          <!-- <NuxtLink to="/" class="block">
          <IconsCallIcon class="w-6 h-6" />
        </NuxtLink> -->
          <a class="h-full">
            <IconsCallIcon class="w-6 h-6" />
          </a>
          <!-- End icon -->

          <a class="h-full" target="_blank">
            <IconsWhatsappIcon
              class="w-6 h-6 duration-150 fill-fill-icons hover:fill-text-green"
            />
          </a>
          <!-- End icon -->

          <a class="h-full">
            <IconsShareIcon
              class="w-6 h-6 duration-150 fill-fill-icons hover:fill-text-green"
            />
          </a>

          <!-- End icon -->
        </div>
      </div>
      <!-- End All Icons -->
    </div>
  </div>
  <!-- End Item -->
</template>

<script lang="ts" setup></script>
