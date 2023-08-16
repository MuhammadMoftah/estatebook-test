<template>
  <div>
    <!-- search bar  -->
    <transition name="slide-in-Y" appear>
      <LazyHydrate when-visible>
        <div v-if="innerFilters" class="bg-[#F9F9F9]">
          <LazyCommonFiltersBar
            :style="'box-shadow: 0px 0px 145px 0px #0000001A'"
            class="container relative z-10 py-1 bg-white rounded-xl"
          />
        </div>
      </LazyHydrate>
    </transition>

    <LazyHydrate when-visible>
      <LazyCommonPagePreloader v-if="loading" />
      <div v-else class="container px-3">
        <div v-if="unit && Object.keys(unit)">
          <LazyCommonPageBreadcrumb
            :breadcrumb-links="[
              {
                id: 1,
                name: $t('home'),
                link: localePath('/'),
                active: false,
              },
              {
                id: 2,
                name: $t('units'),
                link: localePath('/discover?page=1'),
                discoverTab: 'units',
                active: false,
              },
              {
                id: 2,
                name: unit.title,
                link: '/',
                active: true,
              },
            ]"
          />

          <!-- End breadcrumb -->

          <div class="flex items-center justify-between mt-6">
            <div>
              <h1
                class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
              >
                {{ unit?.title }}
              </h1>
            </div>
          </div>
          <!-- End headtitle -->
        </div>

        <LazyCommonItemInfo class="mt-5" :item="unit" type="unit" />

        <div
          v-if="unit.type === 'commercial'"
          class="flex items-center mt-4 gap-x-4"
        >
          <div
            class="flex items-center justify-center w-8 h-8 border border-solid rounded-sm bg-bg-ofwight border-bg-ofwight"
          >
            <IconsAreaIcon class="w-4 h-4" />
          </div>

          <span class="text-sm font-medium uppercase truncate text-text-gray"
            >{{ unit.area }} {{ $t('m_2') }} <sup>2</sup></span
          >
        </div>
        <div
          v-else
          class="flex flex-wrap items-center justify-between mt-4 gap-y-4"
        >
          <div class="flex flex-wrap items-center gap-4">
            <div class="flex items-center gap-2">
              <div
                class="flex items-center justify-center min-w-[40px] max-w-[40px] h-10 bg-bg-ofwight border border-solid border-bg-ofwight rounded-sm"
              >
                <LazyIconsBedroomIcon class="w-5 h-5" />
              </div>
              <span
                class="text-sm font-medium uppercase text-text-gray ltr:ml-3 rtl:mr-3"
                >{{ unit?.bedroom }} {{ $t('bedrooms') }}</span
              >
            </div>
            <!-- End icon -->
            <div class="flex items-center">
              <div
                class="flex items-center justify-center min-w-[40px] max-w-[40px] h-10 bg-bg-ofwight border border-solid border-bg-ofwight rounded-sm"
              >
                <LazyIconsBathroomIcon class="w-5 h-5" />
              </div>
              <span
                class="text-sm font-medium uppercase text-text-gray ltr:ml-3 rtl:mr-3"
                >{{ unit?.bathroom }} {{ $t('bathrooms') }}
              </span>
            </div>
            <!-- End icon -->
            <div class="flex items-center">
              <div
                class="flex items-center justify-center min-w-[40px] max-w-[40px] h-10 bg-bg-ofwight border border-solid border-bg-ofwight rounded-sm"
              >
                <LazyIconsAreaIcon class="w-5 h-5" />
              </div>
              <span
                class="text-sm font-medium uppercase text-text-gray ltr:ml-3 rtl:mr-3"
                >{{ unit?.area }}{{ $t('m_2') }} <sup>2</sup></span
              >
            </div>
            <!-- End icon -->
          </div>
          <LazyCommonActionsBox
            :item="unit"
            type="unit"
            title-type="title"
            url="units"
          />

          <!-- End  -->
        </div>
        <!-- End icons -->

        <LazyCommonImagesGallarySection
          :images="unit?.images"
          :videos="unit?.videos"
        />

        <div class="grid w-full grid-cols-3 gap-2 gap-x-4">
          <div class="col-span-4 lg:col-span-2">
            <div class="w-full mt-8 lg:mt-16">
              <h2
                class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
              >
                {{ $t('description') }}
              </h2>
              <LazyCommonReadMore :content="unit.description" />

              <!-- <NuxtLink
              to="/"
              class="inline-block text-sm font-normal mt-1 tracking-[0.0015em] capitalize text-text-green hover:underline"
              >Read More</NuxtLink
            > -->
            </div>

            <div class="w-full mt-16">
              <h2
                class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
              >
                {{ $t('developed_by') }}
              </h2>
              <NuxtLink
                v-if="unit && unit?.developer"
                :to="localePath(`/developers/${unit.developer.slug}`)"
                class="flex items-center mt-7"
              >
                <div
                  class="flex items-center justify-center min-w-11/11 max-w-11/11 h-[88px] bg-white rounded-full ltr:mr-6 rtl:ml-6 drop-shadow-shadowlog"
                >
                  <img
                    :src="unit?.developer?.logo"
                    class="max-w-full max-h-full rounded-full"
                    alt="Estate Book"
                  />
                </div>
                <!-- End logo -->
                <div class="">
                  <div class="text-base font-medium text-black">
                    {{ unit?.developer?.name }}
                  </div>
                  <!-- <p class="mt-2 text-sm text-text-gray">
                    {{ unit?.developer?.address }}
                  </p> -->
                  <CommonReadMore :content="unit?.developer?.description" />

                  <!-- <NuxtLink
                  to="/"
                  class="inline-block text-sm font-normal mt-1 tracking-[0.0015em] capitalize text-text-green hover:underline"
                  >Read More</NuxtLink
                > -->
                </div>
                <!-- End price -->
              </NuxtLink>
            </div>

            <div class="w-full mt-10 lg:mt-12">
              <h2
                class="text-[22px] font-semibold leading-none text-black capitalize lg:text-2xl"
              >
                {{ $t('property_details') }}
              </h2>

              <div class="grid w-full grid-cols-2 gap-2 lg:grid-cols-3 gap-x-4">
                <aside v-if="unit.reference" class="col-span-1">
                  <div class="mt-8">
                    <span
                      class="text-sm font-normal capitalize text-text-color"
                    >
                      {{ $t('unit_code') }}
                    </span>
                    <div class="mt-2 text-lg font-medium text-black capitalize">
                      {{ unit?.reference }}
                    </div>
                  </div>
                </aside>

                <aside v-if="unit.project" class="col-span-1">
                  <div class="mt-8">
                    <span
                      class="text-sm font-normal capitalize text-text-color"
                    >
                      {{ $t('project') }}
                    </span>
                    <div class="mt-2 text-lg font-medium text-black capitalize">
                      {{ unit?.project.name }}
                    </div>
                  </div>
                </aside>

                <aside class="col-span-1">
                  <div class="mt-8">
                    <span
                      class="text-sm font-normal capitalize text-text-color"
                    >
                      {{ $t('delivery') }}
                    </span>

                    <div
                      v-show="$isClient"
                      class="mt-2 text-lg font-medium text-black capitalize"
                    >
                      {{ $startDateHandler(unit) }}
                    </div>
                  </div>
                </aside>

                <!-- End Item Text -->
                <aside v-if="unit.payment_type" class="col-span-1">
                  <div class="mt-8">
                    <span
                      class="text-sm font-normal capitalize text-text-color"
                    >
                      {{ $t('payment_options') }}
                    </span>
                    <div class="mt-2 text-lg font-medium text-black capitalize">
                      {{ unit.payment_type }}
                    </div>
                  </div>
                </aside>
              </div>
            </div>

            <div
              v-if="unit && unit?.lat && unit?.lng"
              class="w-full mt-8 lg:mt-16"
            >
              <h2
                class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
              >
                {{ $t('location') }}
              </h2>

              <div class="w-full mt-6">
                <!-- <client-only> -->
                <GmapMap
                  :center="
                    unit?.lat && unit?.lng
                      ? { lat: +unit?.lat, lng: +unit?.lng }
                      : { lat: 30.291201, lng: 31.74062 }
                  "
                  :zoom="7"
                  :options="defaultOptions"
                  map-type-id="terrain"
                  class="w-full h-140"
                >
                  <gmap-custom-marker
                    :marker="
                      unit?.lat && unit?.lng
                        ? { lat: +unit?.lat, lng: +unit?.lng }
                        : { lat: 30.291201, lng: 31.74062 }
                    "
                    :clickable="true"
                    :draggable="true"
                  >
                    <IconsUnitMarkerIcon />
                  </gmap-custom-marker>
                </GmapMap>
                <!-- </client-only> -->
              </div>
              <!-- End Map -->
            </div>
            <!-- End Items -->

            <div
              v-if="unit.amenities && unit.amenities.length"
              class="w-full mt-8 lg:mt-16"
            >
              <h2
                class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
              >
                {{ $t('amenities') }}
              </h2>
              <LazyCommonAmenitiesSection :amenities="unit?.amenities" />
              <!-- End list -->
            </div>
            <!-- End Items -->
          </div>
          <!-- End Item -->
          <div class="col-span-4 mt-12 lg:col-span-1">
            <div class="sticky top-24">
              <LazyCommonContactForm
                :title="'request_more_info'"
                model_type="unit"
                :model_id="unit?.id"
                :model_name="unit?.developer.name"
              />
            </div>
          </div>
          <!-- End Item -->
        </div>
        <!-- End All Items -->
        <div v-if="developerUnits && developerUnits.length">
          <div
            class="container flex items-center justify-between mt-12 mb-2 lg:mt-24 lg:mb-5"
          >
            <h2
              class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
            >
              {{ $t('from_the_developer') }}
            </h2>
            <!-- <NuxtLink
              to="/units"
              class="flex items-center text-text-gray tracking-[0.0015em] leading-none text-xs lg:text-base font-normal group hover:text-text-green duration-300"
            >
              {{ $t('show_all') }}
              <LazyIconsArrowIcon class="rtl:rotate-180" />
            </NuxtLink> -->
          </div>
          <div class="flex items-center justify-between mb-2 lg:mb-5">
            <div
              class="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4"
            >
              <LazyUnitsUnitCard
                v-for="unit in developerUnits?.slice(0, 3)"
                :key="unit?.slug"
                :unit="unit"
                @click.native="$router.push(localePath(`/units/${unit.slug}`))"
              />
            </div>
          </div>
        </div>
        <div
          v-if="recommandedUnits && recommandedUnits.length"
          class="container mt-12 lg:mt-24"
        >
          <div class="flex items-center justify-between mb-2 lg:mb-5">
            <h2
              class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
            >
              {{ $t('recommended_units') }}
            </h2>
            <!-- <NuxtLink
              to="/units"
              class="flex items-center text-text-gray tracking-[0.0015em] leading-none text-xs lg:text-base font-normal group hover:text-text-green duration-300"
            >
              {{ $t('show_all') }}
              <LazyIconsArrowIcon class="rtl:rotate-180" />
            </NuxtLink> -->
          </div>
          <!-- End headtitle -->
          <div
            class="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4"
          >
            <LazyUnitsUnitCard
              v-for="unit in recommandedUnits"
              :key="unit.slug"
              :unit="unit"
              @click.native="$router.push(localePath(`/units/${unit.slug}`))"
            />
          </div>
        </div>
      </div>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <LazyCommonPriceBar class="hidden lg:block" :data="unit" type="unit" />
    </LazyHydrate>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import mapStyles from '~/constants/mapsConfig/index.js'
// import GmapCustomMarker from 'vue2-gmap-custom-marker'

export default Vue.extend({
  data() {
    return {
      isDark: false,
      GOOGLE_MAP_API_KEY: '',
      recommandedUnits: [],
      developerUnits: [],
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
    await this.$store.dispatch('unit/getUnit', {
      slug: encodeURI(this.$route.params.slug),
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

    const unitsList = await this.$axios.get(
      `/get-units?filter[flag]=premium&include=developer,project,unitType&per_page=10`
    )
    this.recommandedUnits = unitsList?.data?.data?.slice(0, 10)

    const developerID = this.unit?.developer?.id

    const developerUnits = await this.$axios.get(
      `/units?include=project,developer,unitType&filter[developer.id]=${developerID}&filter[sale_type]=sale&per_page=10`
    )

    this.developerUnits = developerUnits?.data?.data?.slice(0, 10)
    this.$store.commit('CHANGE_LOADING', false)
  },
  head() {
    const title =
      this.unit.meta_title?.length > 1 ? this.unit.meta_title : this.unit.title

    const description =
      this.unit.meta_description?.length > 1
        ? this.unit.meta_description
        : this.unit.description
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
    unit() {
      return this.$store.state.unit.unit
    },
    loading() {
      return this.$store.state.loading
    },
    innerFilters() {
      return this.$store.state.innerFilters
    },
    // recommandedUnits() {
    //   return []
    // },
    // fromDeveloperUnits() {
    //   return []
    // },
  },
})
</script>
