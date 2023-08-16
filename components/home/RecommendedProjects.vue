<template>
  <div class="mt-12 lg:mt-10">
    <CommonHeadersSectionHeader
      class="!mb-5"
      :title="$t('recommended_projects')"
      url="discover?page=1"
      discover-tab="projects"
    />
    <div class="relative mt-4 bg-white rounded-xl">
      <div
        v-if="loading"
        class="grid w-full grid-cols-1 md:grid-cols-3 gap-x-4"
      >
        <CommonProjectCardSkeleton v-for="n in 3" :key="n" />
      </div>
      <client-only>
        <LazyUiFlickingWrapper
          :options="{
            duration: 500,
            circular: true,
          }"
        >
          <div
            v-for="project in projects"
            :key="project.slug"
            class="w-full sm:w-[80%] md:w-[45%] lg:w-[32%] mx-3 lg:mb-4"
          >
            <ProjectCard :project="project" />
          </div> </LazyUiFlickingWrapper
      ></client-only>

      <!-- </CommonLoadersLoaderLayout> -->
    </div>
  </div>
  <!-- End container -->
</template>

<script lang="ts">
import Vue from 'vue'
import { PropOptions } from 'vue/types/umd'
import ProjectCard from '@/components/projects/home/ProjectCard'

export default Vue.extend({
  name: 'RecommondedProjects',
  components: {
    ProjectCard,
  },
  props: {
    projects: {
      type: Array,
      default: () => [],
    } as PropOptions<Project[]>,
    loading: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
