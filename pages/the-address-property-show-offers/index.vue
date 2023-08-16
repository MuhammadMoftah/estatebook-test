<template>
  <div class="container px-3 mt-8 lg:mt-10">
    <h1
      class="mb-1 text-lg font-semibold text-black md:text-xl lg:text-2xl"
    >
      {{ $t('developers') }}
    </h1>

    <div class="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4">
      <DevelopersDeveloperCard
        v-for="todo in developers"
        :key="todo.id"
        :developer="todo"
      />
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  async fetch() {
    await this.$store.dispatch('developer/getDevelopers', {
      page: this.page,
      filters: [{ key: 'is_offer', value: '1'}],
      per_page: 28,
    } as RequestPayload<DeveloperAllowedInclude[]>)
  },
  fetchOnServer: true,

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
  },
  async mounted() {
    this.page = +(this.$route.query.page ? this.$route.query.page : 1) as number
    this.$store.commit('CHANGE_LOADING', true)
    await this.$store.dispatch('developer/getDevelopers', {
      page: this.page,
      include: ['projects'],
      filters: [{ key: 'is_offer', value: '1'}],
      per_page: 28,
    } as RequestPayload<DeveloperAllowedInclude[]>)
    this.$store.commit('CHANGE_LOADING', false)
  },
})
</script>

<style scoped>
.black-dot {
  @apply inline-flex w-2 h-2 bg-black rounded-full rtl:ml-2 ltr:mr-2;
}
</style>
