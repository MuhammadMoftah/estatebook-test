<template>
  <CommonPagePreloader v-if="loading" />
  <div v-else class="container px-3 mt-8 lg:mt-10">
    <div v-if="neighbourhood && Object.keys(neighbourhood) && neighbourhood">
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
            name: $t('neighbourhoods'),
            link: localePath('/discover?page=1'),
            discoverTab: 'neighborhoods',
            active: false,
          },
          {
            id: 2,
            name: neighbourhood.name,
            link: '/',
            active: true,
          },
        ]"
      />
      <!-- End breadcrumb -->
      <div class="flex items-center justify-between mt-6">
        <h1
          class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
        >
          {{ neighbourhood.name }}
        </h1>
      </div>
      <!-- End headtitle -->
      <CommonImagesGallarySection
        :images="neighbourhood.images"
        :videos="neighbourhood.videos"
      />
    </div>

    <div v-if="neighbourhood.description" class="w-full mt-8 lg:mt-16">
      <h2
        class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
      >
        {{ $t('description') }}
      </h2>
      <CommonReadMore :content="neighbourhood.description" />
    </div>
    <!-- End Items -->

    <div class="w-full mt-8 lg:mt-16">
      <h2
        class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
      >
        {{ $t('location') }}
      </h2>
      <div v-if="neighbourhood && neighbourhood.coords" class="w-full mt-6">
        <client-only>
          <GmapMap
            :center="
              neighbourhood.coords[0].lat && neighbourhood.coords[0].lng
                ? {
                    lat: +neighbourhood.coords[0].lat,
                    lng: +neighbourhood.coords[1].lng,
                  }
                : { lat: 30.291201, lng: 31.74062 }
            "
            :zoom="12"
            :options="defaultOptions"
            map-type-id="terrain"
            class="w-full h-140"
          >
            <gmap-polygon
              v-if="neighbourhood.coords.length > 0"
              :path="neighbourhood.coords"
              :options="{
                strokeColor: '#4CB087',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#4CB087',
                fillOpacity: 0.6,
              }"
            >
            </gmap-polygon>
          </GmapMap>
        </client-only>
      </div>
      <!-- End Map -->
    </div>
    <!-- End Items -->
    <div
      v-if="neighbourhood.projects && neighbourhood.projects.length"
      class="px-3 mt-12 lg:mt-24"
    >
      <div class="flex items-center justify-between mb-2 lg:mb-5">
        <h2
          class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
        >
          {{ $t('available_projects') }}
        </h2>
        <NuxtLink
          to="/projects"
          class="flex items-center text-text-gray tracking-[0.0015em] leading-none text-xs lg:text-base font-normal group hover:text-text-green duration-300"
        >
          {{ $t('show_all') }}
          <IconsArrowIcon class="rtl:rotate-180" />
        </NuxtLink>
      </div>
      <!-- End headtitle -->
      <div
        class="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4"
      >
        <ProjectsProjectCard
          v-for="project in neighbourhood.projects"
          :key="project.slug"
          :project="project"
          @click.native="$router.push(localePath(`/projects/${project.slug}`))"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import mapStyles from '~/constants/mapsConfig/index.js'

export default Vue.extend({
  data() {
    return {
      isDark: false,
      styles: {},
      GOOGLE_MAP_API_KEY: '',
      defaultOptions: {
        zoomControl: true,
        scaleControl: true,
        disableDefaultUI: true,
        scrollwheel: true,
        fullscreenControl: true,
        gestureHandling: 'greedy',
        styles: mapStyles.styles,
      },
    }
  },
  async fetch() {
    this.$store.commit('CHANGE_LOADING', true)
    await this.$store.dispatch('neighbourhood/getNeighbourhood', {
      slug: encodeURI(this.$route.params.slug),
      page: 1,
      include: [
        'children',
        'childrenCount',
        'parent',
        'parentCount',
        'projects',
        'projectsCount',
        'units',
        'unitsCount',
      ],
      per_page: 25,
    } as RequestPayload<NeighbourhoodAllowedInclude[]>)

    this.$store.commit('CHANGE_LOADING', false)
  },
  computed: {
    neighbourhood(): Neighbourhood {
      return this.$store.state.neighbourhood.neighbourhood
    },
    loading() {
      return this.$store.state.loading
    },
  },
})
</script>
