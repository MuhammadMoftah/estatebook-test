<template>
  <section>
    <!-- empty case  -->
    <div
      v-if="projects.length <= 0"
      class="flex flex-col items-center justify-center gap-4"
    >
      <EmptyEstate />
      <p class="font-medium text-md text-text-gray">
        {{ $t('your_wishlist_is_empty') }}
      </p>
      <NuxtLink :to="localePath('/projects')" class="text-xs text-text-green">
        {{ $t('click_here_to_start_browsing') }} {{ $t('projects') }}</NuxtLink
      >
    </div>

    <section
      v-else
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <ProjectsProjectCard
        v-for="(project, i) in projects"
        :key="'project' + i"
        :project="project"
        @click.native="$router.push(localePath(`/projects/${project.slug}`))"
      />
    </section>
  </section>
</template>

<script>
import EmptyEstate from '~/components/icons/emptyStates/EmptyWishlist.vue'

export default {
  name: 'ProjectsList',
  components: {
    EmptyEstate,
  },
  data() {
    return {}
  },
  computed: {
    projects() {
      return this.$store.state.wishlist.projects
    },
    total() {
      return this.$store.state.wishlist.projectsMeta
    },
  },
  mounted() {
    this.$store.dispatch('wishlist/GET_PROJECTS')
  },
}
</script>

<style></style>
