<template>
  <div
    class="fixed inset-0 flex lg:items-center justify-center w-full min-h-screen overflow-hidden z-[1100] bg-black/40"
  >
    <transition name="slide-in-Y" appear>
      <div
        class="relative flex flex-col w-full max-w-3xl gap-4 px-5 py-2 bg-white rounded-md"
      >
        <div
          class="flex items-center justify-between w-full py-2 border-b border-[#DDDDDD]"
        >
          <p class="text-base text-black">{{ $t('filter_by') }}</p>
          <!-- , resetAll() -->
          <a
            class="flex items-center justify-center cursor-pointer"
            @click="$store.commit('SET_MODAL', '')"
          >
            <IconsCloseIcon2 class="w-4 h-4 text-black" />
          </a>
        </div>
        <div class="flex flex-col max-h-[500px] overflow-y-auto gap-5 py-2">
          <div class="w-full px-3">
            <div class="flex items-center gap-2 my-6 lg:my-2">
              <IconsBedIcon class="w-5 h-5 text-[#D6D6D6] shrink-0" />
              <span>{{ $t('amenities') }}</span>
            </div>

            <div
              v-if="loading"
              class="flex flex-col items-center justify-center"
            >
              <IconsLoadingIcon class="w-6 h-6 text-text-green" />
            </div>
            <div v-else class="grid grid-cols-4 gap-4">
              <div
                v-for="amenity in amenities"
                :key="amenity.slug"
                class="flex items-center gap-1 px-3 py-1 text-xs font-light text-black capitalize transition-all duration-300 bg-white border rounded-lg cursor-pointer min-h-[35px]"
                :class="[
                  selectedAmenities.find(el => el.id == amenity.id)
                    ? ' bg-green-50 !border-text-green'
                    : '  border-[#DDDDDD]',
                ]"
                @click="setAmenity(amenity)"
              >
                <!-- <div
                  v-if="selectedAmenities.find(el => el.id == amenity.id)"
                  class="flex items-center"
                ></div> -->
                <!-- <img :src="amenity.logo" class="w-8 h-8" /> -->

                <span>
                  {{ amenity.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end w-full gap-2 px-3 py-3">
          <button
            class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-normal text-black border rounded-md cursor-pointer border-text-green"
            @click="resetAll"
          >
            <IconsResetIcon class="w-4 h-4 text-icon shrink-0" />
            {{ $t('reset_all') }}
          </button>
          <button
            class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-white border rounded-md cursor-pointer border-text-green bg-text-green"
            @click="showResult"
          >
            {{ $t('apply') }}
            <!-- {{ $t('results') }} -->
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    baseType: {
      type: String,
      default: 'search',
    },
  },
  data() {
    return {
      loading: false,
      amenities: [],
      selectedAmenities: [],
    }
  },

  computed: {
    filters() {
      return [...this.$store.state.filter.selectedFilters]
    },
  },

  async mounted() {
    this.loading = true
    const {
      data: { data: amenities },
    } = await this.$axios.get('/amenities?filter[is_filterable]=1', {
      params: {
        per_page: '25',
      },
    })
    this.amenities = amenities
    this.loading = false

    this.initFilters()
  },
  methods: {
    initFilters() {
      this.filters.forEach(item => {
        switch (item.key) {
          case 'amenities': {
            this.amenities.forEach(amenity => {
              if (item.value.includes(amenity.name))
                this.selectedAmenities.push(amenity)
            })
            break
          }
        }
      })
    },

    setAmenity(amenity: any) {
      const index = this.selectedAmenities.indexOf(amenity)
      if (index > -1) {
        this.selectedAmenities.splice(index, 1)
      } else {
        this.selectedAmenities.push(amenity)
      }
    },

    resetAll() {
      this.selectedAmenities = []
      const payload = {
        path: 'search',
        filters: ['bedroom', 'unitType.id', 'bathroom', 'area_range'],
      }
      this.$store.commit('filter/RESET', payload)
    },
    showResult() {
      // amenities
      const amenitiespayload = this.selectedAmenities.map(item => {
        return 'amenities.id = ' + item.id
      })
      this.$store.commit('filter/ADD_SELECTED_FILTERS', {
        key: 'amenities',
        range: true,
        q: [[amenitiespayload]],
        value: [...this.selectedAmenities.map(item => item.name)],
      })

      this.$store.commit('filter/APPLY')
      // this.$router.push(this.localePath('/discover?page=1'))
      this.$store.commit('SET_MODAL', '')
    },
  },
})
</script>
