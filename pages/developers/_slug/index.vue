<template>
  <CommonPagePreloader v-if="loading" />
  <div v-else class="container px-3 mt-8 lg:mt-10">
    <div v-if="developer && Object.keys(developer)">
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
            link: localePath('/developers?page=1'),
            active: false,
          },
          {
            id: 2,
            name: developer.name,
            link: '/',
            active: true,
          },
        ]"
      />
      <div class="flex items-center w-full mt-8">
        <div
          class="flex items-center justify-center min-w-[95px] max-w-[95px] h-[95px] bg-white rounded-full ltr:mr-6 rtl:ml-6 drop-shadow-shadowlog"
        >
          <img
            :src="developer.logo"
            class="max-w-[38px] max-h-full"
            alt="Estate Book"
          />
        </div>
        <div class="">
          <div
            class="flex text-base font-semibold text-black lg:text-2xl md:text-xl"
          >
            {{ developer.name }}
          </div>
        </div>
      </div>

      <div
        class="grid w-full grid-cols-1 gap-8 mt-0 lg:grid-cols-3 lg:gap-3 gap-x-4 lg:mt-4"
      >
        <div class="col-span-1 lg:col-span-2 md:col-span-2">
          <div>
            <CommonImageOnError
              v-if="developer && developer.cover_image"
              :image="developer.cover_image"
              img-class="object-cover w-full h-full duration-300 group-hover:scale-110"
              type="image"
              parent-class="relative block rounded-lg w-full h-[250px] lg:h-150  overflow-hidden group "
            />
          </div>

          <div class="w-full mt-8 lg:mt-5">
            <h2
              class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
            >
              {{ $t('description') }}
            </h2>
            <CommonReadMore :content="developer.description" />
          </div>
        </div>

        <div class="col-span-1">
          <div class="sticky top-24">
            <CommonContactForm
              :title="'request_more_info'"
              model_type="developer"
              :model_id="developer.id"
              :model_name="developer.name"
            />
          </div>
        </div>

        <!-- <div class="hidden col-span-1 md:block lg:col-span-1">
        <div
          class="relative block rounded-lg w-full h-[214px] lg:h-[348px] overflow-hidden group mt-4"
        >
          <img
            src="../../assets/images/unit/img4.jpg"
            class="object-cover w-full h-full duration-300 group-hover:scale-110"
            alt="Estate Book"
          />
        </div>
        <div
          class="relative block rounded-lg w-full h-[160px] lg:h-[260px] overflow-hidden group mt-4"
        >
          <img
            src="../../assets/images/unit/img5.jpg"
            class="object-cover w-full h-full duration-300 group-hover:scale-110"
            alt="Estate Book"
          />
          <div
            class="absolute top-0 left-0 flex items-center justify-center w-full h-full text-2xl font-semibold text-white lg:text-4xl bg-bg-overlay"
          >
            +4
          </div>
        </div>
      </div> -->
      </div>
    </div>

    <div v-if="developer.projects_count" class="w-full mt-8 lg:mt-16">
      <div class="flex items-center justify-between">
        <h2
          class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
        >
          {{ $t('projects') }} ({{ developer.projects_count }})
        </h2>
      </div>
      <!-- End headtitle -->
      <!-- <nav
        class="flex items-center w-full mt-4 overflow-hidden overflow-x-scroll"
      >
        <a
          class="flex items-center justify-center w-32 min-w-[128px] h-11 rounded-lg border border-border-list text-sm font-medium text-black capitalize hover:bg-text-green hover:text-white hover:border-text-green duration-150 ltr:mr-2 rtl:ml-2 mt-2"
          >North Coast </a
        ><a
          class="flex items-center justify-center w-32 min-w-[128px] h-11 rounded-lg border border-border-list text-sm font-medium text-black capitalize hover:bg-text-green hover:text-white hover:border-text-green duration-150 ltr:mr-2 rtl:ml-2 mt-2"
          >Location </a
        ><a
          class="flex items-center justify-center w-32 min-w-[128px] h-11 rounded-lg border border-border-list text-sm font-medium text-black capitalize hover:bg-text-green hover:text-white hover:border-text-green duration-150 ltr:mr-2 rtl:ml-2 mt-2"
          >Other location </a
        ><a
          class="flex items-center justify-center w-32 min-w-[128px] h-11 rounded-lg border border-border-list text-sm font-medium text-black capitalize hover:bg-text-green hover:text-white hover:border-text-green duration-150 ltr:mr-2 rtl:ml-2 mt-2"
          >New location </a
        ><a
          class="flex items-center justify-center w-32 min-w-[128px] h-11 rounded-lg border border-border-list text-sm font-medium text-black capitalize hover:bg-text-green hover:text-white hover:border-text-green duration-150 ltr:mr-2 rtl:ml-2 mt-2"
          >add location
        </a>
      </nav> -->
      <div
        class="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4"
      >
        <ProjectsProjectCard
          v-for="project in developer.projects"
          :key="project.slug"
          :project="project"
          @click.native="$router.push(localePath(`/projects/${project.slug}`))"
        />
      </div>
    </div>
    <!-- End items -->
    <div
      v-if="developer.units && developer.units.length"
      class="w-full mt-8 lg:mt-16"
    >
      <div class="flex items-center justify-between">
        <h2
          class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
        >
          {{ $t('from_the_developers') }}
        </h2>
        <NuxtLink
          :to="localePath('/units')"
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
        <UnitsUnitCard
          v-for="unit in developer.units.slice(0, 6)"
          :key="unit.slug"
          :unit="unit"
          @click.native="$router.push(localePath(`/units/${unit.slug}`))"
        />
      </div>
    </div>
    <!-- End container -->
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
    await this.$store.dispatch('developer/getDeveloper', {
      slug: encodeURI(this.$route.params.slug),
      page: 1,
      include: [
        'amenities',
        'projects',
        'projectsCount',
        'units',
        'units.project',
        'units.state',
        'units.unitType',
      ],
      per_page: 25,
    } as RequestPayload<DeveloperAllowedInclude[]>)

    this.$store.commit('CHANGE_LOADING', false)
  },

  head() {
    const title =
      this.developer.meta_title?.length > 1
        ? this.developer.meta_title
        : this.developer.name

    const description =
      this.developer.meta_description?.length > 1
        ? this.developer.meta_description
        : this.developer.description

    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
      ],
    }
  },
  computed: {
    developer(): Developer {
      return this.$store.state.developer.developer
    },
    loading() {
      return this.$store.state.loading
    },
  },
})
</script>
