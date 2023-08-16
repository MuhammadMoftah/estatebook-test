<template>
  <CommonTheDrawer :path="localePath(`/projects/${project.slug}`)">
    <div v-if="project && Object.keys(project)">
      <div class="flex items-center justify-between mt-3">
        <div>
          <h1
            class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
          >
            {{ project.name }}
          </h1>
        </div>
      </div>

      <div class="flex items-center justify-between mt-4">
        <div
          class="flex flex-col lg:items-center lg:flex-row gap-y-4 lg:gap-y-0 gap-x-4"
        >
          <div class="">
            <CommonImageOnError
              v-if="project && project.logo"
              :image="project.logo"
              parent-class="flex items-center justify-center w-20 h-20 overflow-hidden bg-white rounded-full ltr:mr-6 rtl:ml-6 drop-shadow-iconlogo"
            />
          </div>
          <!-- TODO: -->
          <div
            class="flex flex-col items-start lg:flex-row lg:gap-x-4 lg:gap-y-0 gap-y-5"
          >
            <div v-if="project && project.start_price" class="">
              <span
                class="overflow-hidden text-base font-normal capitalize text-text-gray whitespace-nowrap"
              >
                {{ $t('start_from') }}</span
              >
              <div
                class="flex items-end gap-2 mt-1 text-lg font-bold text-black lg:text-xl"
              >
                {{ $numberFormat(project.start_price) }}
                <span class="font-normal lg:text-lg text-[22px] uppercase">{{
                  $t('EGP')
                }}</span>
              </div>
            </div>
            <div v-if="project && project.min_down_payment" class="">
              <span
                class="overflow-hidden text-base font-normal capitalize text-text-gray whitespace-nowrap"
              >
                {{ $t('min_down_payment') }}</span
              >
              <div
                class="flex items-end gap-2 mt-1 text-lg font-bold text-black"
              >
                {{ $numberFormat(project.min_down_payment) }}

                <span class="text-lg font-normal uppercase">
                  {{ $t('EGP') }}
                </span>
              </div>
            </div>

            <div v-if="project && project.min_month_payment" class="">
              <span
                class="overflow-hidden text-base font-normal capitalize text-text-gray whitespace-nowrap"
              >
                {{ $t('min_monthly_payment') }}</span
              >
              <div
                class="flex items-end gap-2 mt-1 text-2xl font-bold text-black"
              >
                {{ $numberFormat(project.min_month_payment) }}

                <span class="text-lg font-normal uppercase">
                  {{ $t('EGP') }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="project.images && project.images[0]" class="h-[400px] my-5">
        <img :src="project.images[0]" class="w-full h-full rounded-md" />
      </div>
      <div class="w-full mt-8 lg:mt-16">
        <h2
          class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
        >
          {{ $t('description') }}
        </h2>

        <CommonReadMore :content="project.description" />
      </div>
      <div class="grid w-full grid-cols-2 gap-2 gap-x-4">
        <div class="col-span-4 lg:col-span-2">
          <div class="w-full mt-10 lg:mt-12">
            <h2
              class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
            >
              {{ $t('project_details') }}
            </h2>

            <div class="grid w-full grid-cols-2 gap-2 lg:grid-cols-3 gap-x-4">
              <div v-if="project.start_delivery" class="col-span-1">
                <div class="mt-8">
                  <span class="text-sm font-normal capitalize text-text-color">
                    {{ $t('delivery') }}</span
                  >
                  <div class="mt-2 text-lg font-medium text-black capitalize">
                    {{ project.start_delivery.slice(0, 4) }}
                  </div>
                </div>
              </div>

              <div class="col-span-1">
                <div class="mt-8">
                  <span class="text-sm font-normal capitalize text-text-color">
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
            v-if="
              project && project.project_types && project.project_types.length
            "
            class="grid w-full gap-4 mt-10 lg:grid-cols-3 lg:mt-12"
          >
            <h2
              class="text-xl font-semibold leading-none text-black capitalize lg:col-span-3 lg:text-2xl"
            >
              {{ $t('property_types') }}
            </h2>
            <div
              v-for="projectType in project.project_types"
              :key="projectType.id"
              class="flex items-center gap-4 px-5 h-[102px] drop-shadow-theme rounded-lg border border-border-list"
            >
              <CommonImageOnError
                :image="projectType.icon"
                img-class="w-20 h-20"
              />

              <span class="capitalize"> {{ projectType.name }}</span>
            </div>
          </div>

          <div v-if="project && project.developer" class="w-full mt-16">
            <h2
              class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
            >
              {{ $t('developed_by') }}
            </h2>
            <div class="flex items-center mt-7">
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
        <CommonAmenitiesSection :amenities="project.amenities" />
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
    </div>

    <!-- actions bar  -->
    <nav
      class="absolute bottom-0 flex flex-wrap items-center justify-center p-5 border-t gap-y-3 lg:justify-between lg:w-1/2 bg-slate-50"
      :class="$t('dir') == 'ltr' ? 'left-0' : 'right-0'"
    >
      <div class="flex gap-4">
        <a
          :href="`tel:${project?.agent?.mobile}`"
          class="flex items-center gap-2 justify-center w-32 bg-text-green text-white min-w-[128px] h-11 rounded-lg text-sm font-medium capitalize hover:bg-text-green hover:text-white group duration-300"
        >
          <IconsCallIcon class="w-4 h-4" />

          {{ $t('call_now') }}
        </a>
        <a
          :href="`https://wa.me/${project?.developer?.whatsapp}?text=Hello , I hope you are doing well , I am interested in ${project?.name}`"
          target="_blank"
          class="flex items-center gap-2 justify-center w-32 min-w-[128px] h-11 rounded-lg border border-text-green text-sm font-medium text-black capitalize hover:bg-text-green hover:text-white hover:border-text-green group duration-300"
        >
          <IconsWhatsappIcon class="w-4 h-4" />

          {{ $t('whatsapp') }}
        </a>
      </div>

      <div class="flex items-center gap-4">
        <a
          v-if="project.brochure"
          :href="project.brochure"
          target="_blank"
          class="flex items-center justify-center w-10 h-10 bg-white border rounded-full hover:bg-text-green border-slate-200 group"
        >
          <IconsDownloadIcon
            class="text-[#BEBEBE] w-5 h-5 group-hover:text-white"
          />
        </a>
        <CommonActionsBox :item="project" type="project" url="projects" />

        <!-- <button
          class="flex items-center justify-center w-10 h-10 bg-white border rounded-full hover:bg-text-green border-slate-200 group"
          @click="favHandler(!isFav, 'project', project)"
        >
          <IconsFavIcon v-if="isFav" class="mt-[3px] fill-icon-red" />
          <IconsFavIcon
            v-else
            class="mt-[3px] text-[#BEBEBE] group-hover:text-white"
          />
        </button>
        <CommonShareList
          :item="project"
          :url="'projects'"
          title-type="name"
          class="ltr:ml-auto rtl:mr-auto lg:flex-none"
        >
          <template #share-button>
            <a
              class="flex items-center justify-center w-10 h-10 text-xs font-medium duration-300 border border-solid rounded-full border-slate-200 bg-wight drop-shadow-mapshadow border-bg-ofwight hover:bg-text-green hover:text-white hover:border-text-green group"
            >
              <IconsShareIcon class="fill-icon-header group-hover:fill-white" />
            </a>
          </template>
        </CommonShareList> -->
      </div>
    </nav>
  </CommonTheDrawer>
</template>

<script>
export default {
  components: {},

  props: {
    project: {
      type: Object,
    },
  },

  data() {
    return {
      isFav: this.project.favorite,
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
    await this.getResaleUnits(1)
    await this.getPrimaryUnits(1)
  },
  methods: {
    getResaleUnits(page) {
      this.$store.dispatch('unit/getUnitsLoadMore', {
        page,
        per_page: 4,
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
        filters: [
          { key: 'project.id', value: this.project.id },
          { key: 'sale_type', value: 'resale' },
        ],
      })
    },
    getPrimaryUnits(page) {
      this.$store.dispatch('unit/getUnitsLoadMore2', {
        page,
        per_page: 4,
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
        filters: [
          { key: 'project.id', value: this.project.id },
          { key: 'sale_type', value: 'sale' },
        ],
      })
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
