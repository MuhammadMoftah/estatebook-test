<template>
  <div class="container flex flex-col w-full min-h-screen">
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
          name: `${$t('units')} - ${$t('rent')}`,
          link: localePath('/rent'),
          active: true,
        },
      ]"
    />

    <CommonPageHeader
      :title="$t('rent')"
      :placeholder="$t('search_for_units')"
      store-path="unit/getUnits"
      search-with="title"
      :enable-sort="false"
      :enable-search="false"
      :sort-types="sortTypes"
    />

    <CommonLoadersLoaderLayout :data-length="units.length">
      <template #loader>
        <div
          class="grid w-full min-h-screen grid-cols-1 md:grid-cols-2 gap-x-4"
          :class="display === 'grid' ? 'lg:grid-cols-2' : ' lg:grid-cols-3'"
        >
          <CommonUnitCardSkeleton v-for="n in 6" :key="'unit' + n" />
        </div>
      </template>
      <div
        :class="display === 'grid' ? 'lg:grid-cols-2' : ' lg:grid-cols-3'"
        class="grid w-full grid-cols-1 md:grid-cols-2 gap-x-4"
      >
        <UnitsUnitCard
          v-for="unit in units"
          :key="unit.slug"
          :unit="unit"
          @click.native="$router.push(localePath(`/units/${unit.slug}`))"
        />
      </div>
    </CommonLoadersLoaderLayout>
    <div class="flex items-center justify-center w-full mt-6">
      <CommonListingPagination
        v-if="units.length"
        :total-pages="meta.last_page"
        :current-page="currentPage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      title: '',
      sort: '',
      page: 1,
    }
  },
  computed: {
    display() {
      return this.$store.state.display
    },
    units() {
      return this.$store.state.unit.units
    },
    meta(): Meta {
      return this.$store.state.unit.meta
    },
    sortTypes() {
      return [
        { id: 1, name: this.$t('latest'), value: '' },
        { id: 1, name: this.$t('lowest_price'), value: 'price' },
        { id: 1, name: this.$t('highest_price'), value: '-price' },
        { id: 2, name: this.$t('lowest_area'), value: 'area' },
        { id: 2, name: this.$t('highest_area'), value: '-area' },
        { id: 5, name: this.$t('duration'), value: 'duration' },
        {
          id: 6,
          name: this.$t('min_month_payment'),
          value: 'min_month_payment',
        },
        { id: 7, name: this.$t('min_down_payment'), value: 'min_down_payment' },
        { id: 8, name: this.$t('unit_type'), value: 'unitType.name' },
        { id: 3, name: this.$t('bedrooms'), value: 'bedroom' },
        { id: 4, name: this.$t('bathrooms'), value: 'bathroom' },
      ]
    },
    loading() {
      return this.$store.state.loading
    },
    currentPage() {
      return +(this.$route.query.page ? this.$route.query.page : 1) as number
    },
  },
  watch: {
    $route: {
      handler(newVal) {
        const page = +(newVal?.query?.page ? newVal?.query?.page : 1) as number
        this.loadMore(page)
      },
      deep: true,
    },
  },
  async mounted() {
    this.page = +(this.$route.query.page ? this.$route.query.page : 1) as number
    await this.$store.dispatch('filter/clearState', {
      path: 'units',
    })
    const payload = {
      path: 'units',
      filter: {
        key: 'sale_type',
        value: 'rent',
      },
    }
    this.$store.commit('filter/ADD_FILTER', payload)
    this.$store.commit('CHANGE_LOADING', true)
    await this.$store.dispatch('unit/getUnits', {
      page: this.page,
      include: [
        'developer',
        'unitType',
        'city',
        'state',
        'project',
        'agent',
        'agent.company',
        'amenities',
        'amenitiesCount',
      ],
      per_page: 27,
    } as RequestPayload<UnitAllowedInclude[]>)
    this.$store.commit('CHANGE_LOADING', false)
  },
  methods: {
    async loadMore(value: number) {
      this.page = value
      this.$store.commit('CHANGE_LOADING', true)
      await this.$store.dispatch('unit/getUnits', {
        page: this.page,
        include: [
          'developer',
          'unitType',
          'city',
          'state',
          'project',
          'agent',
          'agent.company',
          'amenities',
          'amenitiesCount',
        ],
        per_page: 27,
      } as RequestPayload<UnitAllowedInclude[]>)
      this.$store.commit('CHANGE_LOADING', false)
    },
  },
})
</script>
