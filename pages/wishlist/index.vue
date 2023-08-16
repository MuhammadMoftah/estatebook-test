<template>
  <div>
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
            name: $t('wishlist'),
            link: localePath('/wishlist'),
            active: true,
          },
        ]"
      />
      <!-- End breadcrumb -->

      <div class="items-center justify-between block mt-5 lg:flex lg:mb-5">
        <h2 class="text-xl font-semibold text-black capitalize lg:text-2xl">
          {{ $t('wishlist') }}
        </h2>
      </div>
      <!-- End headtitle -->
      <div class="flex items-center justify-between">
        <nav
          class="flex items-center w-full mt-8 mb-6 overflow-hidden overflow-x-scroll"
        >
          <button
            :class="{ 'bg-text-green text-white': activeTab == 'projects' }"
            class="flex items-center justify-center w-32 min-w-[128px] h-11 rounded-lg border border-border-list text-sm font-medium text-black capitalize hover:bg-text-green hover:text-white hover:border-text-green duration-150 ltr:mr-2 rtl:ml-2"
            @click="activeTab = 'projects'"
          >
            {{ $t('projects') }}
          </button>
          <button
            :class="{ 'bg-text-green text-white': activeTab == 'units' }"
            class="flex items-center justify-center w-32 min-w-[128px] h-11 rounded-lg border border-border-list text-sm font-medium text-black capitalize hover:bg-text-green hover:text-white hover:border-text-green duration-150 ltr:mr-2 rtl:ml-2"
            @click="activeTab = 'units'"
          >
            {{ $t('units') }}
          </button>
        </nav>
        <!-- <CommonPageSort
          :sort-types="sortTypes"
          @sortSelected="sortSelected($event)"
        /> -->
      </div>
      <!-- End List -->
      <WishlistUnitsList v-if="activeTab == 'units'" />
      <WishlistProjectsList v-if="activeTab == 'projects'" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import auth from '~/middleware/auth'
export default Vue.extend({
  // middleware: auth,
  data() {
    return {
      activeTab: 'projects',
      sortTypes: [
        { id: 1, name: this.$t('latest'), value: '' },
        { id: 2, name: this.$t('lowest_price'), value: 'price' },
        { id: 3, name: this.$t('highest_price'), value: '-price' },
      ],
    }
  },
  methods: {
    sortSelected(e: any) {
      if (this.activeTab === 'projects') {
        this.$store.dispatch('wishlist/GET_PROJECTS', {
          sort: e.value,
        } as RequestPayload)
      } else if (this.activeTab === 'units') {
        this.$store.dispatch('wishlist/GET_UNITS', {
          sort: e.value,
        } as RequestPayload)
      }

      // this.sort = e
      // this.searchServer()
    },
  },
})
</script>
