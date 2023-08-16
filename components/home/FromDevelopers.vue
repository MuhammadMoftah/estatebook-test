<template>
  <div class="mt-12 lg:mt-10">
    <CommonHeadersSectionHeader
      class="!mb-5"
      :title="$t('from_the_developers')"
      url="discover?page=1"
      discover-tab="units"
    />

    <!-- End headtitle -->
    <!-- <div class="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4"> -->
    <div class="relative mt-4 bg-white rounded-xl">
      <CommonLoadersLoaderLayout :data-length="units.length">
        <template #loader>
          <div class="grid w-full grid-cols-1 md:grid-cols-3 gap-x-4">
            <CommonUnitCardSkeleton v-for="n in 3" :key="n" />
          </div>
        </template>
        <client-only>
          <LazyUiFlickingWrapper
            :options="{
              duration: 500,
              circular: true,
            }"
          >
            <div
              v-for="unit in units"
              :key="unit.slug"
              class="w-full sm:w-[80%] md:w-[45%] lg:w-[32%] mx-3 lg:mb-4"
            >
              <UnitCard :unit="unit" />
            </div>
          </LazyUiFlickingWrapper>
        </client-only>
      </CommonLoadersLoaderLayout>

      <!-- </div> -->
    </div>
  </div>
  <!-- End container -->
</template>

<script lang="ts">
import Vue from 'vue'
import { PropOptions } from 'vue/types/umd'
import UnitCard from '@/components/units/home/UnitCard'

export default Vue.extend({
  name: 'RecommondedUnits',
  components: {
    UnitCard,
  },
  props: {
    units: {
      type: Array,
      default: () => [],
    } as PropOptions<Unit[]>,
    loading: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
