<template>
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
          name: $t('developers'),
          link: localePath('/developers'),
          active: true,
        },
      ]"
    />
    <CommonPageHeader
      :title="$t('developers')"
      :placeholder="$t('search_for_developers')"
      store-path="developer/getDevelopers"
      :enable-sort="false"
    />
    <!-- @search-typing-done="searchTypingDone($event)" -->
    <!--    <CommonLoadersLoaderLayout :data-length="developers.length">-->
    <!--      <template #loader>-->
    <!--        <div-->
    <!--          class="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4"-->
    <!--        >-->
    <!--          <CommonDeveloperCardSkeleton v-for="n in 6" :key="n" />-->
    <!--        </div>-->
    <!--      </template>-->
    <div class="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4">
      <DevelopersDeveloperCard
        v-for="todo in developers"
        :key="todo.id"
        :developer="todo"
      />
    </div>

    <!--    </CommonLoadersLoaderLayout>-->
    <div class="flex items-center justify-center w-full mt-6">
      <CommonListingPagination
        v-if="developers.length"
        :total-pages="meta.last_page"
        :current-page="currentPage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  // async fetch() {
  //   await this.$store.dispatch('developer/getDevelopers', {
  //     page: this.page,
  //     include: ['projects'],
  //     per_page: 28,
  //   } as RequestPayload<DeveloperAllowedInclude[]>)
  // },
  // fetchOnServer: true,
  async mounted() {
    this.page = +(this.$route.query.page ? this.$route.query.page : 1) as number
    this.$store.commit('CHANGE_LOADING', true)
    await this.$store.dispatch('developer/getDevelopers', {
      page: this.page,
      include: ['projects'],
      per_page: 28,
    } as RequestPayload<DeveloperAllowedInclude[]>)
    this.$store.commit('CHANGE_LOADING', false)
  },

  data() {
    return {
      pending: false,
      title: '',
      page: 1,
      // developers: [],
    }
  },
  computed: {
    developers(): Developer[] {
      return this.$store.state.developer.developers
    },
    meta(): Meta {
      return this.$store.state.developer.meta
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

  methods: {
    async loadMore(value: number) {
      this.page = value
      this.$store.commit('CHANGE_LOADING', true)
      await this.$store.dispatch('developer/getDevelopers', {
        page: this.page,
        include: ['projects'],
        per_page: 28,
      } as RequestPayload<DeveloperAllowedInclude[]>)
      this.$store.commit('CHANGE_LOADING', false)
    },
  },
})
</script>
