<template>
  <CommonTheDrawer
    ref="test"
    :path="localePath(`/neighborhoods/${neighborhood.slug}`)"
  >
    <div v-if="neighborhood && Object.keys(neighborhood)">
      <div class="flex items-center justify-between mt-2">
        <h1
          class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
        >
          {{ neighborhood.name }}
        </h1>
      </div>
      <div v-if="neighborhood.image" class="h-[400px] my-5">
        <img :src="neighborhood.image" class="w-full h-full rounded-md" />
      </div>
    </div>

    <div v-if="neighborhood.description" class="w-full">
      <h2
        class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
      >
        {{ $t('description') }}
      </h2>
      <CommonReadMore :content="neighborhood.description" />
    </div>

    <!-- Projects section -->
    <section ref="projectsSection" class="container mt-12">
      <div class="flex items-center justify-between mb-2 lg:mb-5">
        <h2
          class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
        >
          {{ $t('projects') }}
        </h2>
      </div>

      <div class="grid w-full grid-cols-1 md:grid-cols-2 gap-x-4">
        <ProjectsProjectCard
          v-for="item in projects"
          :key="item.slug"
          :project="item"
          @click.native="$router.push(localePath(`/projects/${item.slug}`))"
        />
      </div>

      <div
        v-if="meta.total && !projects.length"
        class="py-16 text-sm font-medium text-slate-300"
      >
        No data ...
      </div>

      <div
        v-if="meta.current_page"
        class="flex items-center justify-center w-full mt-6"
      >
        <CommonListingPagination
          :total-pages="meta.last_page"
          :current-page="meta.current_page"
          :enable-routing="false"
          @pagechanged="
            getData($event), $refs['projectsSection'].scrollIntoView()
          "
        />
      </div>
    </section>
  </CommonTheDrawer>
</template>

<script>
export default {
  computed: {
    neighborhood() {
      return this.$store.state.neighbourhood.neighbourhood
    },
    projects() {
      return this.$store.state.project.projects
    },
    meta() {
      return this.$store.state.project.meta
    },
  },
  async created() {
    await this.getData(1)
  },
  methods: {
    getData(page) {
      this.$store.dispatch('project/getProjects', {
        page,
        filters: [{ key: 'location_id', value: this.neighborhood.id }],
      })
    },
  },
}
</script>
