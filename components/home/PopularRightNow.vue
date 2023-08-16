<template>
  <div class="mt-12 lg:mt-24">
    <CommonHeadersSectionHeader
      class="px-1 !mb-6"
      :title="$t('trending_now')"
      url="discover?page=1"
      discover-tab="neighborhoods"
    />

    <div v-if="loading" class="grid w-full grid-cols-1 md:grid-cols-3 gap-x-4">
      <CommonNeighborhoodCardSkeleton v-for="n in 3" :key="n" />
    </div>

    <div v-else>
      <!-- Desktop -->
      <div class="hidden lg:block">
        <LazyUiFlickingWrapper
          :options="{
            duration: 500,
            circular: true,
          }"
        >
          <div
            v-if="neighbourhoods[0]"
            class="w-full md:w-1/4 ltr:mr-2 rtl:ml-2 grid-panel"
          >
            <div>
              <NeighborhoodCard
                class="mb-4 h-[434px]"
                :neighbourhood="neighbourhoods[0]"
              />
            </div>
          </div>
          <div class="w-full md:w-1/4 grid-panel ltr:mr-2 rtl:ml-2">
            <div v-if="neighbourhoods[1]">
              <NeighborhoodCard
                class="h-40 mb-2 min-h-[213px]"
                :neighbourhood="neighbourhoods[1]"
              />
            </div>
            <div v-if="neighbourhoods[2]">
              <NeighborhoodCard
                class="h-40 mb-2 min-h-[213px]"
                :neighbourhood="neighbourhoods[2]"
              />
            </div>
          </div>
          <div class="w-full md:w-1/4 ltr:mr-2 rtl:ml-2 grid-panel">
            <div v-if="neighbourhoods[3]">
              <NeighborhoodCard
                class="ltr:mr-2 rtl:ml-2 mb-4 h-[434px]"
                :neighbourhood="neighbourhoods[3]"
              />
            </div>
          </div>
          <div class="w-full md:w-1/4 ltr:mr-2 rtl:ml-2 grid-panel">
            <div v-if="neighbourhoods[4]">
              <NeighborhoodCard
                class="h-40 mb-2 min-h-[213px]"
                :neighbourhood="neighbourhoods[4]"
              />
            </div>
            <div v-if="neighbourhoods[5]">
              <NeighborhoodCard
                class="h-40 mb-2 min-h-[213px]"
                :neighbourhood="neighbourhoods[5]"
              />
            </div>
          </div>
          <div class="w-full md:w-1/4 ltr:mr-2 rtl:ml-2 grid-panel">
            <div v-if="neighbourhoods[6]">
              <NeighborhoodCard
                class="mb-4 h-[434px]"
                :neighbourhood="neighbourhoods[6]"
              />
            </div>
          </div>
          <div class="w-full md:w-1/4 grid-panel ltr:mr-2 rtl:ml-2">
            <div v-if="neighbourhoods[7]">
              <NeighborhoodCard
                class="h-40 mb-2 min-h-[213px]"
                :neighbourhood="neighbourhoods[7]"
              />
            </div>
            <div v-if="neighbourhoods[8]">
              <NeighborhoodCard
                class="h-40 mb-2 min-h-[213px]"
                :neighbourhood="neighbourhoods[8]"
              />
            </div>
          </div>
          <div class="w-full md:w-1/4 ltr:mr-2 rtl:ml-2 grid-panel">
            <div v-if="neighbourhoods[9]">
              <NeighborhoodCard
                class="mb-4 h-[434px]"
                :neighbourhood="neighbourhoods[9]"
              />
            </div>
          </div>
          <div class="w-full md:w-1/4 grid-panel ltr:mr-2 rtl:ml-2">
            <div v-if="neighbourhoods[10]">
              <NeighborhoodCard
                class="h-40 mb-2 min-h-[213px]"
                :neighbourhood="neighbourhoods[10]"
              />
            </div>
            <div v-if="neighbourhoods[11]">
              <NeighborhoodCard
                class="h-40 mb-2 min-h-[213px]"
                :neighbourhood="neighbourhoods[11]"
              />
            </div>
          </div>
        </LazyUiFlickingWrapper>
      </div>

      <!-- Mobile/Tablet -->
      <div class="lg:hidden">
        <client-only>
          <LazyUiFlickingWrapper
            :options="{
              duration: 500,
              circular: true,
              panelsPerView: 1,
            }"
          >
            <LazyNeighbourhoodsLocationCard
              v-for="neighbourhood in neighbourhoods"
              :key="neighbourhood.slug"
              :location="neighbourhood"
            />
          </LazyUiFlickingWrapper>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PropOptions } from 'vue/types/umd'
import NeighborhoodCard from '@/components/neighbourhoods/home/NeighborhoodCard'

export default Vue.extend({
  name: 'PopularRightNow',
  components: {
    NeighborhoodCard,
  },
  props: {
    neighbourhoods: {
      type: Array,
      default: () => [],
    } as PropOptions<Neighbourhood[]>,
    loading: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
