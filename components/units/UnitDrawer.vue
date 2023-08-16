<template>
  <CommonTheDrawer :path="localePath(`/units/${unit.slug}`)">
    <div v-if="unit && Object.keys(unit)">
      <!-- End breadcrumb -->

      <div class="sticky top-0 flex items-center justify-between mt-3">
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

    <div class="flex-wrap items-center justify-between mt-10 lg:flex">
      <div class="flex flex-wrap items-center gap-8">
        <div class="flex items-center">
          <div
            v-if="unit && unit.project"
            class="flex items-center justify-center w-20 h-20 overflow-hidden bg-white rounded-full ltr:mr-6 rtl:ml-6 drop-shadow-iconlogo"
          >
            <!-- <img
              :src="unit.project.logo"
              class="max-w-full max-h-full"
              alt="Estate Book"
            /> -->
            <CommonImageOnError
              v-if="unit.project.logo"
              :image="unit.project.logo"
              img-class="max-w-full max-h-full"
            />

            <IconsPlaceholderLogoIcon v-else class="w-8" />
          </div>
          <!-- End logo -->
          <div class="">
            <span class="text-base font-normal capitalize text-text-gray">{{
              $t('start_from')
            }}</span>
            <div class="text-2xl font-bold text-black">
              {{ $numberFormat(unit.price) }}
              <span class="text-xl font-normal uppercase">{{ $t('EGP') }}</span>
            </div>
          </div>
          <!-- End price -->
        </div>
        <!-- End Logo & Price -->
        <div>
          <span class="text-base font-normal capitalize text-text-gray">
            {{ $t('min_down_payment') }}</span
          >
          <div class="text-2xl font-bold text-black">
            {{ $numberFormat(unit.min_down_payment) }}
            <span class="text-lg font-normal uppercase">
              {{ $t('EGP') }}
            </span>
          </div>
        </div>
        <!-- End Logo & Price -->
        <div>
          <span class="text-base font-normal capitalize text-text-gray">{{
            $t('min_monthly_payment')
          }}</span>
          <div class="text-2xl font-bold text-black">
            {{ $numberFormat(unit.min_month_payment) }}
            <span class="text-lg font-normal uppercase">
              {{ $t('EGP') }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="unit.type === 'commercial'"
      class="flex items-center mt-8 mb-2 gap-x-4"
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
      class="flex flex-wrap items-center justify-between mt-8 mb-2 gap-y-4"
    >
      <div class="flex flex-wrap items-center gap-4">
        <div class="flex items-center">
          <div
            class="flex items-center justify-center min-w-[40px] max-w-[40px] h-10 bg-bg-ofwight border border-solid border-bg-ofwight rounded-sm"
          >
            <IconsBedroomIcon class="w-5 h-5" />
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
            <IconsBathroomIcon class="w-5 h-5" />
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
            <IconsAreaIcon class="w-5 h-5" />
          </div>
          <span
            class="text-sm font-medium uppercase text-text-gray ltr:ml-3 rtl:mr-3"
            >{{ unit?.area }}{{ $t('m_2') }} <sup>2</sup></span
          >
        </div>
        <!-- End icon -->
      </div>
      <!-- <CommonActionsBox :item="unit" type="unit" url="units" /> -->

      <!-- End  -->
    </div>
    <!-- End icons -->

    <LazyCommonImagesDrawerGallarySection
      :images="unit?.images"
      :videos="unit?.videos"
    />

    <div class="grid w-full grid-cols-2 gap-2 gap-x-4">
      <div class="col-span-4 lg:col-span-2">
        <div class="w-full mt-10 lg:mt-12">
          <h2
            class="text-[22px] font-semibold leading-none text-black capitalize lg:text-2xl"
          >
            {{ $t('property_details') }}
          </h2>

          <div class="grid w-full grid-cols-2 gap-2 lg:grid-cols-3 gap-x-4">
            <aside v-if="unit.reference" class="col-span-1">
              <div class="mt-8">
                <span class="text-sm font-normal capitalize text-text-color">
                  {{ $t('unit_code') }}
                </span>
                <div class="mt-2 text-lg font-medium text-black capitalize">
                  {{ unit?.reference }}
                </div>
              </div>
            </aside>

            <aside v-if="unit.project" class="col-span-1">
              <div class="mt-8">
                <span class="text-sm font-normal capitalize text-text-color">
                  {{ $t('project') }}
                </span>
                <div class="mt-2 text-lg font-medium text-black capitalize">
                  {{ unit?.project?.name }}
                </div>
              </div>
            </aside>

            <aside class="col-span-1">
              <div class="mt-8">
                <span class="text-sm font-normal capitalize text-text-color">
                  {{ $t('property_type') }}</span
                >
                <div class="mt-2 text-[17px] font-medium text-black capitalize">
                  {{ unit?.type }}
                </div>
              </div>
            </aside>

            <aside class="col-span-1">
              <div class="mt-8">
                <span class="text-sm font-normal capitalize text-text-color">
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

            <aside v-if="unit?.sale_type" class="col-span-1">
              <div class="mt-8">
                <span class="text-sm font-normal capitalize text-text-color">
                  {{ $t('sale_type') }}</span
                >
                <div class="mt-2 text-lg font-medium text-black capitalize">
                  {{ unit?.sale_type }}
                </div>
              </div>
            </aside>

            <aside v-if="unit.payment_type" class="col-span-1">
              <div class="mt-8">
                <span class="text-sm font-normal capitalize text-text-color">
                  {{ $t('payment_options') }}
                </span>
                <div class="mt-2 text-lg font-medium text-black capitalize">
                  {{ unit.payment_type }}
                </div>
              </div>
            </aside>
            <!-- End Item Text -->
          </div>
        </div>
        <!-- End Items -->
        <div class="w-full mt-8 lg:mt-16">
          <h2
            class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
          >
            {{ $t('description') }}
          </h2>

          <CommonReadMore :content="unit.description" />
        </div>
        <div class="w-full mt-16">
          <h2
            class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
          >
            {{ $t('developed_by') }}
          </h2>
          <div v-if="unit && unit?.developer" class="flex items-center mt-7">
            <div
              class="flex items-center justify-center w-20 h-20 overflow-hidden bg-white rounded-full ltr:mr-6 rtl:ml-6 drop-shadow-iconlogo"
            >
              <!-- class="flex items-center justify-center min-w-11/11 max-w-11/11 h-[88px] bg-white rounded-full ltr:mr-6 rtl:ml-6 drop-shadow-shadowlog" -->
              <CommonImageOnError
                v-if="unit.developer.logo"
                :image="unit.developer.logo"
                img-class="max-w-full max-h-full"
              />

              <IconsPlaceholderLogoIcon v-else class="w-8" />
            </div>

            <!-- End logo -->
            <div class="">
              <div class="text-base font-medium text-black">
                {{ unit?.developer?.name }}
              </div>
              <!-- <p class="mt-2 text-xs text-text-gray">
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
          </div>
        </div>

        <!-- End Items -->
        <div v-if="unit && unit?.lat && unit?.lng" class="w-full mt-8 lg:mt-8">
          <h2
            class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
          >
            {{ $t('location') }}
          </h2>
          <div class="w-full mt-6">
            <client-only>
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
            </client-only>
          </div>
          <!-- End Map -->
        </div>
        <div class="w-full mt-8 lg:mt-8">
          <LazyCommonContactForm
            :title="'request_more_info'"
            model_type="unit"
            :model_id="unit?.id"
            :model_name="unit?.developer?.name"
          />
        </div>

        <div
          v-if="unit.amenities && unit.amenities.length"
          class="w-full mt-8 lg:mt-16"
        >
          <h2
            class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
          >
            {{ $t('amenities') }}
          </h2>
          <CommonAmenitiesSection :amenities="unit?.amenities" />
          <!-- End list -->
        </div>

        <!-- Developer units  -->
        <section class="container mt-12 lg:mt-24" v-if="primaryMeta.total > 0">
          <div class="flex items-center justify-between mb-2 lg:mb-5">
            <h2
              class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
            >
              {{ $t('from_the_developers') }}
            </h2>
          </div>

          <div class="grid w-full grid-cols-1 md:grid-cols-2 gap-x-4">
            <LazyUnitsUnitCard
              v-for="item in primaryUnits"
              :key="item.slug"
              :unit="item"
              @click.native="$router.push(localePath(`/units/${item.slug}`))"
            />
          </div>

          <div
            v-if="primaryMeta.total === 0"
            class="py-16 text-sm font-medium text-slate-300"
          >
            No data ...
          </div>

          <div
            v-if="primaryMeta.current_page < primaryMeta.last_page"
            class="flex items-center justify-center w-full mt-6"
          >
            <button
              @click="getPrimaryUnits(primaryMeta.current_page + 1)"
              type="button"
              class="loadmoreButton"
            >
              Load More
            </button>
          </div>
        </section>

        <!-- Resale units  -->
        <section class="container mt-12 lg:mt-24" v-if="resaleMeta.total > 0">
          <div class="flex items-center justify-between mb-2 lg:mb-5">
            <h2
              class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
            >
              {{ $t('resale_units') }}
            </h2>
          </div>

          <div class="grid w-full grid-cols-1 md:grid-cols-2 gap-x-4">
            <LazyUnitsUnitCard
              v-for="item in resaleUnits"
              :key="item.slug"
              :unit="item"
              @click.native="$router.push(localePath(`/units/${item.slug}`))"
            />
          </div>

          <div
            v-if="resaleMeta.total === 0"
            class="py-16 text-sm font-medium text-slate-300"
          >
            No data ...
          </div>

          <div
            v-if="resaleMeta.current_page < resaleMeta.last_page"
            class="flex items-center justify-center w-full mt-6"
          >
            <button
              @click="getResaleUnits(resaleMeta.current_page + 1)"
              type="button"
              class="loadmoreButton"
            >
              Load More
            </button>
          </div>
        </section>

        <!-- actions bar  -->
        <nav
          class="absolute bottom-0 flex flex-wrap items-center justify-center w-full p-5 border-t gap-y-3 lg:justify-between lg:w-1/2 bg-slate-50"
          :class="$t('dir') == 'ltr' ? 'left-0' : 'right-0'"
        >
          <div class="flex gap-4">
            <a
              :href="`tel:${unit?.agent?.mobile}`"
              class="flex items-center gap-2 justify-center w-32 bg-text-green text-white min-w-[128px] h-11 rounded-lg text-sm font-medium capitalize hover:bg-text-green hover:text-white group duration-300"
            >
              <IconsCallIcon class="w-4 h-4" />

              {{ $t('call_now') }}
            </a>
            <a
              :href="`https://wa.me/${unit?.agent?.whatsapp}?text=Hello , I hope you are doing well , I am interested in ${unit?.title} with code ${unit?.reference}`"
              target="_blank"
              class="flex items-center gap-2 justify-center w-32 min-w-[128px] h-11 rounded-lg border border-text-green text-sm font-medium text-black capitalize hover:bg-text-green hover:text-white hover:border-text-green group duration-300"
            >
              <IconsWhatsappIcon class="w-4 h-4" />

              {{ $t('whatsapp') }}
            </a>
          </div>

          <div class="flex items-center gap-4">
            <CommonActionsBox :item="unit" type="unit" url="units" />
            <!-- <button
              class="flex items-center justify-center w-10 h-10 bg-white border rounded-full hover:bg-text-green border-slate-200 group"
              @click="favHandler(!isFav, 'unit', unit)"
            >
              <IconsFavIcon v-if="isFav" class="mt-[3px] fill-icon-red" />
              <IconsFavIcon
                v-else
                class="mt-[3px] text-[#BEBEBE] group-hover:text-white"
              />
            </button>
            <CommonShareList
              :item="unit"
              :url="'units'"
              :title-type="'title'"
              class="ltr:ml-auto rtl:mr-auto lg:flex-none"
            >
              <template #share-button>
                <a
                  class="flex items-center justify-center w-10 h-10 text-xs font-medium duration-300 border border-solid rounded-full border-slate-200 bg-wight drop-shadow-mapshadow border-bg-ofwight hover:bg-text-green hover:text-white hover:border-text-green group"
                >
                  <IconsShareIcon
                    class="fill-icon-header group-hover:fill-white"
                  />
                </a>
              </template>
            </CommonShareList> -->
          </div>
        </nav>
        <!-- End Items -->
      </div>
      <!-- End Item -->
    </div>
  </CommonTheDrawer>
</template>

<script>
import mapStyles from '~/constants/mapsConfig/index.js'

export default {
  props: {
    unit: {
      type: Object,
    },
  },
  data() {
    return {
      isFav: this.unit.favorite,
      defaultOptions: {
        zoomControl: false,
        fullscreenControl: false,
        scaleControl: true,
        disableDefaultUI: true,
        scrollwheel: true,
        gestureHandling: 'greedy',
        styles: mapStyles.styles,
      },
    }
  },
  computed: {
    resaleUnits() {
      return this.$store.state.unit.units3
    },
    resaleMeta() {
      return this.$store.state.unit.meta3
    },
    primaryUnits() {
      return this.$store.state.unit.units4
    },
    primaryMeta() {
      return this.$store.state.unit.meta4
    },
  },
  async created() {
    console.log(this.unit)
    await this.getResaleUnits(1)
    await this.getPrimaryUnits(1)
  },
  methods: {
    getResaleUnits(page) {
      // this.$store.dispatch('unit/getUnitsLoadMore', {
      //   page,
      //   per_page: 4,
      //   include: [
      //     'developer',
      //     'unitType',
      //     'city',
      //     'state',
      //     'project',
      //     'agent',
      //     'agent.company',
      //     'amenities',
      //     'amenitiesCount',
      //   ],
      //   filters: [
      //     { key: 'sale_type', value: 'resale' },
      //     { key: 'developer.id', value: this.unit.developer?.id },
      //   ],
      // })
    },
    getPrimaryUnits(page) {
      // this.$store.dispatch('unit/getUnitsLoadMore2', {
      //   page,
      //   per_page: 4,
      //   include: [
      //     'developer',
      //     'unitType',
      //     'city',
      //     'state',
      //     'project',
      //     'agent',
      //     'agent.company',
      //     'amenities',
      //     'amenitiesCount',
      //   ],
      //   filters: [
      //     { key: 'sale_type', value: 'sale' },
      //     { key: 'developer.id', value: this.unit.developer?.id },
      //   ],
      // })
    },
  },
}
</script>

<style scoped>
:deep(.drawer-content) {
  @apply pb-28;
}
:deep(.share-container) {
  @apply bottom-10 top-auto;
}
.loadmoreButton {
  @apply flex items-center justify-center px-4 w-64 h-10 text-sm rounded-full cursor-pointer duration-300 hover:text-white font-medium !text-white hover:bg-[#74D8AF] bg-emerald-600;
}
</style>
