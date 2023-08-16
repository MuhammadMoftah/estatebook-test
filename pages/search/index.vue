<template>
  <div class="container mt-8 lg:mt-10">
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
          name: $t('search'),
          link: localePath('/search'),
          active: true,
        },
      ]"
    />

    <CommonPageHeader
      :title="$t('search')"
      :placeholder="$t('search_for_units')"
      store-path="search/getItems"
      search-with="title"
      :enable-search="false"
      :enable-sort="false"
    />

    <CommonLoadersLoaderLayout :data-length="items.length">
      <template #loader>
        <div
          class="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4"
        >
          <CommonUnitCardSkeleton v-for="n in 6" :key="'unit' + n" />
        </div>
      </template>
      <div
        class="grid w-full grid-cols-1 md:grid-cols-2 gap-x-4 lg:grid-cols-3"
      >
        <UnitsUnitCard
          v-for="item in items"
          :key="item.slug"
          :unit="item"
          @click.native="$router.push(localePath(`/units/${unit.slug}`))"
        />
      </div>
    </CommonLoadersLoaderLayout>
    <!-- <div v-if="items.length" class="flex items-center justify-center w-full">
      <CommonListingPagination
        :total-pages="meta.last_page"
        :current-page="meta.current_page"
        @pagechanged="loadMore"
      />
    </div> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      page: 1,
      selectedMark: {},
    }
  },
  computed: {
    items() {
      return this.$store.state.search.items
    },
    meta(): Meta {
      return this.$store.state.search.meta
    },
  },
  async mounted() {
    // await this.$store.dispatch('filter/init')
    this.$store.commit('CHANGE_LOADING', true)
    await this.$store.dispatch('search/getItems', {
      milliSearch_api_key: process.env.API_KEY,
      page: 1,
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
      per_page: 25,
    } as RequestPayload<UnitAllowedInclude[]>)
    this.$store.commit('CHANGE_LOADING', false)
  },
  methods: {
    async loadMore(value: number) {
      this.page = value
      this.$store.commit('CHANGE_LOADING', true)
      await this.$store.dispatch('search/getItems', {
        milliSearch_api_key: process.env.API_KEY,

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
        per_page: 25,
      } as RequestPayload<UnitAllowedInclude[]>)
      this.$store.commit('CHANGE_LOADING', false)
    },
  },
})
</script>
