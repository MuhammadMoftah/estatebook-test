<template>
  <div>
    <!-- search bar  -->
    <transition name="slide-in-Y" appear>
      <div v-if="innerFilters" class="bg-[#F9F9F9]">
        <CommonFiltersBar
          :style="'box-shadow: 0px 0px 145px 0px #0000001A'"
          class="container relative z-10 py-1 bg-white rounded-xl"
        />
      </div>
    </transition>
    <CommonPagePreloader v-if="loading" />
    <div v-else class="container px-3 mt-8 lg:mt-10">
      <div v-if="project && Object.keys(project)">
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
              name: $t('projects'),
              link: localePath('/discover?page=1'),
              discoverTab: 'projects',
              active: false,
            },
            {
              id: 2,
              name: project.name,
              link: '/',
              active: true,
            },
          ]"
        />
        <div class="flex items-center justify-between mt-6">
          <div>
            <h1
              class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
            >
              {{ project.name }}
            </h1>
          </div>
          <CommonCallBox
            class="flex justify-end mt-0 4k:mt-6"
            :item="project.developer"
          />
        </div>
        <CommonItemInfo class="mt-8" :item="project" type="project" />
        <CommonImagesGallarySection
          :images="project.images"
          :videos="project.videos"
        />
        <div class="w-full mt-8 lg:mt-16">
          <h2
            class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
          >
            {{ $t('description') }}
          </h2>
          <CommonReadMore :content="project.description" />
        </div>
        <div class="grid w-full grid-cols-3 gap-2 gap-x-4">
          <div class="col-span-4 lg:col-span-2">
            <div class="w-full mt-10 lg:mt-12">
              <h2
                class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
              >
                {{ $t('project_details') }}
              </h2>

              <div class="grid w-full grid-cols-2 gap-2 lg:grid-cols-3 gap-x-4">
                <!-- <div class="col-span-1">
                <div class="mt-8">
                  <span class="text-sm font-normal capitalize text-text-color"
                    >Finishing</span
                  >
                  <div class="mt-2 text-lg font-medium text-black capitalize">
                    Semi-finished
                  </div>
                </div>
              </div> -->

                <div v-if="project.start_delivery" class="col-span-1">
                  <div class="mt-8">
                    <span
                      class="text-sm font-normal capitalize text-text-color"
                    >
                      {{ $t('delivery') }}</span
                    >
                    <div class="mt-2 text-lg font-medium text-black capitalize">
                      {{ project.start_delivery.slice(0, 4) }}
                    </div>
                  </div>
                </div>
                <!-- <div class="col-span-1">
                <div class="mt-8">
                  <span class="text-sm font-normal capitalize text-text-color"
                    >Sale type</span
                  >
                  <div class="mt-2 text-lg font-medium text-black capitalize">
                    Resale
                  </div>
                </div>
              </div> -->
                <div class="col-span-1">
                  <div class="mt-8">
                    <span
                      class="text-sm font-normal capitalize text-text-color"
                    >
                      {{ $t('payment_options') }}</span
                    >
                    <div class="mt-2 text-lg font-medium text-black capitalize">
                      {{ project.payment_method }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="project && project.unit_types && project.unit_types.length"
              class="grid w-full gap-4 mt-10 lg:grid-cols-4 lg:mt-12"
            >
              <h2
                class="text-xl font-semibold leading-none text-black capitalize lg:col-span-4 lg:text-2xl"
              >
                {{ $t('property_types') }}
              </h2>
              <div
                v-for="unitType in project.unit_types"
                :key="unitType.id"
                style="box-shadow: 0px 0px 43px rgba(0, 0, 0, 0.03)"
                class="flex items-center gap-4 px-3 h-[102px] drop-shadow-theme rounded-lg border border-[#E4E4E4]"
              >
                <CommonImageOnError
                  :image="unitType.icon"
                  img-class="w-20 h-20 "
                  overriden-classes="flex items-center"
                  placeholder-class="w-8 h-8 text-black"
                />

                <span class="text-sm capitalize"> {{ unitType.name }} </span>
              </div>
            </div>

            <div class="w-full mt-16">
              <h2
                class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
              >
                {{ $t('developed_by') }}
              </h2>
              <div
                v-if="project && project.developer"
                class="flex items-center mt-7"
              >
                <CommonImageOnError
                  v-if="project && project.developer.logo"
                  :image="project.developer.logo"
                  img-class="h-full"
                  overriden-classes="w-auto"
                  parent-class="flex items-center justify-center overflow-hidden min-w-[78px] max-w-[78px] h-[78px] bg-white rounded-full ltr:mr-6 rtl:ml-6 drop-shadow-shadowlog"
                />

                <div class="">
                  <div class="text-base font-medium text-black">
                    {{ project.developer.name }}
                  </div>
                  <CommonReadMore :content="project.developer.description" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-4 mt-12 lg:col-span-1">
            <div class="sticky top-24">
              <CommonContactForm
                :title="'request_more_info'"
                model_type="project"
                :model_id="project.id"
                :model_name="project.developer.name"
              />
            </div>
          </div>
        </div>
        <div
          v-if="project.amenities && project.amenities.length"
          class="w-full mt-8 lg:mt-16"
        >
          <h2
            class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
          >
            {{ $t('amenities') }}
          </h2>
          <CommonAmenitiesSection
            :amenities="project.amenities"
            overriden-classes="grid lg:grid-cols-10 grid-cols-2  gap-4 mt-3"
          />
        </div>
        <div
          v-if="project && project.coords && project.coords.length"
          class="w-full mt-8 lg:mt-16"
        >
          <h2
            class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
          >
            {{ $t('location') }}
          </h2>
          <div class="w-full mt-6">
            <client-only>
              <GmapMap
                :center="
                  project.coords[0].lat && project.coords[0].lng
                    ? {
                        lat: +project.coords[0].lat,
                        lng: +project.coords[1].lng,
                      }
                    : { lat: 30.291201, lng: 31.74062 }
                "
                :zoom="15"
                :options="defaultOptions"
                map-type-id="terrain"
                class="w-full h-140"
              >
                <gmap-polygon
                  v-if="project.coords.length > 0"
                  :path="project.coords"
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

        <!-- start developer units -->
        <div
          v-if="saleResponse && saleResponse.length"
          class="w-full mt-8 lg:mt-16"
        >
          <div class="flex items-center justify-between">
            <h2
              class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
            >
              {{ $t('from_the_developers') }}
            </h2>
            <!-- <NuxtLink
              :to="localePath('/discover')"
              class="flex items-center text-text-gray tracking-[0.0015em] leading-none text-xs lg:text-base font-normal group hover:text-text-green duration-300"
            >
              {{ $t('show_all') }}
              <IconsArrowIcon class="rtl:rotate-180" />
            </NuxtLink> -->
          </div>
          <!-- End headtitle -->
          <div
            class="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4"
          >
            <UnitsUnitCard
              v-for="unit in saleResponse"
              :key="unit.slug"
              :unit="unit"
              @click.native="$router.push(localePath(`/units/${unit.slug}`))"
            />
          </div>
        </div>
        <div
          v-if="resaleResponse && resaleResponse.length"
          class="w-full mt-8 lg:mt-16"
        >
          <div class="flex items-center justify-between">
            <h2
              class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
            >
              {{ $t('resale_units') }}
            </h2>
            <!-- <NuxtLink
              :to="localePath('/discover')"
              class="flex items-center text-text-gray tracking-[0.0015em] leading-none text-xs lg:text-base font-normal group hover:text-text-green duration-300"
            >
              {{ $t('show_all') }}
              <IconsArrowIcon class="rtl:rotate-180" />
            </NuxtLink> -->
          </div>
          <!-- End headtitle -->
          <div
            class="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4"
          >
            <UnitsUnitCard
              v-for="unit in resaleResponse"
              :key="unit.slug"
              :unit="unit"
              @click.native="$router.push(localePath(`/units/${unit.slug}`))"
            />
          </div>
        </div>
        <div v-if="project?.children?.length" class="w-full mt-8 lg:mt-16">
          <div class="flex items-center justify-between">
            <h2
              class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
            >
              {{ $t('project_phases') }}
            </h2>
          </div>
          <div
            class="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4"
          >
            <ProjectsProjectPhaseCard
              v-for="project in project?.children"
              :key="project.slug"
              :project="project"
            />
          </div>
        </div>
        <div id="masterPlans" class="relative my-5 lg:my-10">
          <button
            type="button"
            class="absolute top-0 flex items-center justify-center w-10 h-10 text-xs font-medium duration-300 border border-solid rounded-full cursor-pointer ltr:right-0 rtl:left-0 border-slate-200 bg-wight drop-shadow-mapshadow border-bg-ofwight hover:bg-text-green hover:text-white hover:border-text-green group"
            @click="copyLink()"
          >
            <IconsShareIcon class="fill-icon-header group-hover:fill-white" />
          </button>
          <CommonTabsTheWrapper
            v-if="project.brochure || project.master_plans?.length"
          >
            <CommonTabsTabItem
              v-if="project.master_plans?.length"
              :title="$t('master_plans')"
            >
              <LazyUiFlickingWrapper
                :options="{
                  duration: 1000,
                  circular: true,
                }"
              >
                <div
                  v-for="(image, i) in project.master_plans"
                  :key="'image' + i"
                  class="w-full"
                >
                  <CommonImageOnError
                    :image="image"
                    type="image"
                    img-class="h-[500px] max-w-2xl rounded-lg mx-auto "
                  />
                </div>
              </LazyUiFlickingWrapper>
            </CommonTabsTabItem>
            <CommonTabsTabItem
              v-if="project.brochure"
              class="flex justify-center"
              :title="$t('brochure')"
              classes="max-h-[1000px] overflow-y-auto "
            >
              <vue-pdf-embed :width="1000" :source="project.brochure" />
            </CommonTabsTabItem>
          </CommonTabsTheWrapper>
        </div>
      </div>
      <CommonPriceBar class="hidden lg:block" :data="project" type="project" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import mapStyles from '~/constants/mapsConfig/index.js'

export default Vue.extend({
  data() {
    return {
      brochure: 'https://www.chessvariants.com/books.dir/Chess-Strategy.pdf',
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
      saleResponse: [],
      resaleResponse: [],
    }
  },
  async fetch() {
    this.$store.commit('CHANGE_LOADING', true)
    await this.$store.dispatch('project/getProject', {
      slug: encodeURI(this.$route.params.slug),
      page: 1,
      include: [
        'developer',
        'developerCount',
        'location',
        'locationCount',
        'amenities',
        'amenitiesCount',
        'unitTypes',
        'unitTypesCount',
        'units',
        'unitsCount',
        'landmarks',
        'roads',
        'children',
      ],
      per_page: 25,
    } as RequestPayload<ProjectAllowedInclude[]>)

    const {
      data: { data: saleResponse },
    } = await this.$axios.get('/get-units', {
      params: {
        page: 1,
        include: ['agent', 'project', 'developer', 'unitType'].join(','),
        'filter[sale_type]': 'sale',
        'filter[project.id]': this.project.id,
      },
    })

    const {
      data: { data: resaleResponse },
    } = await this.$axios.get('/get-units', {
      params: {
        page: 1,
        include: ['agent', 'project', 'developer', 'unitType'].join(','),
        'filter[sale_type]': 'resale',
        'filter[project.id]': this.project.id,
      },
    })
    this.saleResponse = saleResponse
    this.resaleResponse = resaleResponse

    this.$store.commit('CHANGE_LOADING', false)
  },

  head() {
    const title =
      this.project.meta_title?.length > 1
        ? this.project.meta_title
        : this.project.name

    const description =
      this.project.meta_description?.length > 1
        ? this.project.meta_description
        : this.project.description

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
    project(): Project {
      return this.$store.state.project.project
    },
    loading() {
      return this.$store.state.loading
    },
    innerFilters() {
      return this.$store.state.innerFilters
    },
    children() {
      return [
        {
          id: 185,
          name: 'The Wonder MarQ',
          slug: 'the-wonder-marq',
          status: 'active',
          slugs: {
            en: 'the-wonder-marq',
            ar: 'ذا-وندر-مارك',
          },
          description:
            'The Wonder MarQ is an upscale residential complex located in Mostakbal city. The compound is one of the latest projects by The MarQ Communities. It is designed in a modern European style, which gives the project its beauty and elegance. The Wonder MarQ spreads over an area of 255 acres, with lots of green spaces and picturesque landscapes, with stunning Crystal Lakes, colorful trees, and beautiful roses.',
          address: 'Mostkbal city, Second New Cairo, Cairo Governorate',
          duration: '1',
          min_month_payment: 40000,
          min_down_payment: 480000,
          start_price: 4800000,
          start_delivery: '2026-11-01',
          delivery_year: '2026',
          favorite: false,
          logo: 'https://api.theestatebook.net/storage/10256/conversions/pasted-image-0-webp_format.webp',
          images: [
            'https://api.theestatebook.net/storage/10257/conversions/2-webp_format.webp',
            'https://api.theestatebook.net/storage/10258/conversions/3-webp_format.webp',
            'https://api.theestatebook.net/storage/10259/conversions/5-webp_format.webp',
            'https://api.theestatebook.net/storage/10260/conversions/2-webp_format.webp',
            'https://api.theestatebook.net/storage/10261/conversions/1-webp_format.webp',
          ],
          full_images_data: [
            {
              id: 10257,
              image: 'https://api.theestatebook.net/storage/10257/2.PNG',
            },
            {
              id: 10258,
              image: 'https://api.theestatebook.net/storage/10258/3.PNG',
            },
            {
              id: 10259,
              image: 'https://api.theestatebook.net/storage/10259/5.PNG',
            },
            {
              id: 10260,
              image: 'https://api.theestatebook.net/storage/10260/2.PNG',
            },
            {
              id: 10261,
              image: 'https://api.theestatebook.net/storage/10261/1.PNG',
            },
          ],
          flag: 'premium',
          videos: [
            {
              id: 2659,
              project_id: 185,
              url: 'https://www.youtube.com/channel/UC6g1b1n-vZ5Q84FRmASbrWg',
              created_at: '2023-04-11T08:58:53.000000Z',
              updated_at: '2023-04-11T08:58:53.000000Z',
            },
          ],
          payment_method: 'installment',
          installment_years: 9,
          coords: [
            {
              lat: 30.044835772491133,
              lng: 31.6381584723683,
            },
            {
              lat: 30.044798623508512,
              lng: 31.64641967613417,
            },
            {
              lat: 30.0523210082438,
              lng: 31.646548422166884,
            },
            {
              lat: 30.048689903731887,
              lng: 31.63840523559767,
            },
          ],
          master_layouts: [],
          master_plans: [],
          brochure: '',
          children: [],
          is_delivered: false,
          order_ranking: 1,
          sdcs: [],
        },
      ]
    },
    master_plans() {
      return [
        'https://api.theestatebook.net/storage/10257/conversions/2-webp_format.webp',
        'https://api.theestatebook.net/storage/10258/conversions/3-webp_format.webp',
        'https://api.theestatebook.net/storage/10259/conversions/5-webp_format.webp',
        'https://api.theestatebook.net/storage/10260/conversions/2-webp_format.webp',
        'https://api.theestatebook.net/storage/10261/conversions/1-webp_format.webp',
      ]
    },
  },
  methods: {
    copyLink() {
      const domain = window.location.origin

      // console.log(domain + this.$route.path + '#masterPlans')
      navigator.clipboard
        .writeText(domain + this.$route.path + '#masterPlans')
        .then(() => {
          // console.log('URL copied to clipboard')
          this.$toast.success('URL copied to clipboard')
        })
        .catch(error => {
          console.error('Failed to copy URL: ', error)
        })
    },
  },
})
</script>

<style scoped>
.vue-pdf-embed {
  @apply !mx-auto;
}
</style>
