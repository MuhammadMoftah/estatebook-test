<template>
  <div
    class="fixed inset-0 flex items-center justify-center w-full min-h-screen overflow-hidden z-[1100] bg-black/40"
  >
    <transition name="slide-in-Y" appear>
      <AuthTheLogin from-popup />
    </transition>
  </div>
  <!-- <Login
        v-if="currentTabComponent == 'login'"
        classes="flex items-center justify-center min-h-full px-4 py-5 sm:px-6 lg:px-8"
      />
      <Register v-if="currentTabComponent == 'register'" />

      <ForgerPassword v-if="currentTabComponent == 'forget_password'" /> -->
  <!-- </template> -->
  <!-- </CommonMainModal> -->
</template>
