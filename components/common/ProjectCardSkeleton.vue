<template>
  <div
    class="relative mt-4 overflow-hidden bg-white drop-shadow-shadowcard rounded-xl group"
  >
    <div
      class="absolute top-0 left-0 z-10 flex items-center justify-between w-full p-5"
    >
      <div
        class="flex items-center justify-center w-12 h-12 bg-white rounded-full animate-pulse"
      ></div>
      <!-- End logo -->
      <div class="relative flex items-center">
        <div
          class="flex items-center justify-center bg-white rounded-full w-9 h-9 animate-pulse"
        ></div>
        <div
          class="flex items-center justify-center ml-2 bg-white rounded-full animate-pulse w-9 h-9"
        ></div>
      </div>
      <!-- End icons -->
    </div>
    <!-- End icon top -->
    <div class="relative block w-full">
      <div
        class="relative w-full h-64 bg-[#eeeeee] animate-pulse overflow-hidden flex items-center justify-center"
      >
        <IconsHomeIcon />
        <!-- End map -->
      </div>
      <!-- photo -->
      <div class="flex items-center justify-between w-full px-5 py-7">
        <div class="flex items-center gap-2">
          <div
            class="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-full shadow-lg animate-pulse"
          ></div>
          <!-- End logo -->
          <div
            class="w-[100px] rounded-full bg-[#eeeeee] h-4 animate-pulse"
          ></div>
        </div>
        <div class="flex flex-col gap-2">
          <div
            class="w-[65px] h-2 bg-[#eeeeee] rounded-full animate-pulse"
          ></div>
          <div
            class="w-[80px] h-4 bg-[#eeeeee] rounded-full animate-pulse"
          ></div>
        </div>
      </div>
      <!-- End Content -->
    </div>
  </div>
</template>

<script setup></script>
