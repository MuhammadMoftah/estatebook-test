<template>
  <div class="relative w-full h-full">
    <div
      class="flex items-center h-full gap-2 px-3 overflow-hidden bg-white cursor-pointer"
    >
      <IconsSearchIcon class="w-5 h-5 text-[#d6d6d6] shrink-0" />
      <div
        v-show="searchedNames && searchedNames.length > 0"
        class="flex items-center justify-between px-4 py-2 rounded-lg gap-0.5 max-w-[100px] bg-[#eeeeee]"
      >
        <p
          class="overflow-hidden text-sm font-light text-black text-ellipsis whitespace-nowrap"
        >
          {{ searchedNames[0]?.name }}
        </p>
        <a
          class="flex items-center justify-center cursor-pointer shrink-0"
          @click="removeName(0, searchedNames[0]?.type)"
          ><IconsCloseIcon2 class="w-3 h-3 text-black"
        /></a>
      </div>
      <div
        v-show="searchedNames.length > 1 && !moreSearched"
        class="flex cursor-pointer items-center justify-center gap-2 shrink-0 px-4 py-2 rounded-lg bg-[#eeeeee]"
        @click="openMoreSearched"
      >
        <p class="text-sm font-light text-black">
          {{ searchedNames.length - 1 }} {{ $t('more') }}
        </p>

        <a class="flex items-center justify-center">
          <IconsPlusIcon class="w-3 h-3 text-black" />
        </a>
      </div>
      <input
        v-model="searchName"
        class="w-full h-full focus:outline-none placeholder:text-sm"
        :placeholder="$t(`${placeholder}`)"
        @keyup.enter="setSearchName(searchName, 'search_keywords')"
        @keyup.delete="deleteSearchName()"
        @input="debouncedFetch(searchName)"
      />
    </div>
    <div
      v-if="menuShow"
      v-on-clickaway="menuAwayClose"
      class="absolute z-30 flex flex-col w-full max-w-full px-2 py-3 overflow-hidden bg-white shadow-md rounded-b-xl top-full"
    >
      <div class="max-h-[250px] overflow-y-auto">
        <div
          v-show="moreSearched"
          class="flex flex-wrap items-center w-full gap-2 p-2"
        >
          <div
            v-for="(sn, i) in searchedNames"
            :key="`search_${sn.type}`"
            class="flex items-center shrink-0 w-fit justify-between px-4 py-2 rounded-lg gap-2 bg-[#eeeeee]"
          >
            <p class="w-full text-sm font-light text-black">
              {{ sn.name }}
            </p>
            <a
              class="flex items-center justify-center cursor-pointer shrink-0"
              @click="removeName(i, sn.type)"
              ><IconsCloseIcon2 class="w-3 h-3 text-black"
            /></a>
          </div>
        </div>
        <div v-show="availableData">
          <div
            v-for="dev in searchResponse.developers"
            :key="`developer-${dev.id}`"
            class="flex items-center justify-between px-2 py-2 cursor-pointer hover:bg-gray-50"
            @click="setSearchName(dev.name, 'developer_id', dev.id)"
          >
            <div class="flex items-center gap-x-4">
              <!-- {{ dev }} -->
              <div
                class="flex items-center justify-center w-8 h-8 overflow-hidden rounded-full bg-gray-50"
              >
                <img
                  :src="dev.logo"
                  alt=""
                  class="object-contain object-center w-full h-full"
                />
              </div>
              <span class="flex-1 text-xs font-medium truncate">{{
                dev.name
              }}</span>
            </div>
            <span
              class="text-xs font-medium rounded-[5px] border border-black px-2 py-1 bg-primary text-black self-end capitalize"
              >developer</span
            >
          </div>
          <div
            v-for="pro in searchResponse.projects"
            :key="`project-${pro.id}`"
            class="flex items-center justify-between px-2 py-2 cursor-pointer hover:bg-gray-50"
            @click="setSearchName(pro.name, 'project_id', pro.id)"
          >
            <div class="flex items-center gap-x-4">
              <div
                class="flex items-center justify-center w-8 h-8 overflow-hidden rounded-full"
              >
                <img
                  :src="pro.logo"
                  alt=""
                  class="object-contain object-center w-full h-full"
                />
              </div>
              <span class="flex-1 text-xs font-medium truncate">{{
                pro.name
              }}</span>
            </div>
            <span
              class="text-xs font-medium rounded-[5px] px-2 py-1 border border-[#daa100] text-[#daa100] self-end capitalize"
              >project</span
            >
          </div>
          <div
            v-for="loc in searchResponse.locations"
            :key="`locations-${loc.id}`"
            class="flex items-center justify-between px-2 py-2 cursor-pointer hover:bg-gray-50"
            @click="setSearchName(loc.name, 'state_id', loc.id)"
          >
            <div class="flex items-center gap-x-4">
              <div
                class="flex items-center justify-center w-8 h-8 overflow-hidden rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="w-5 h-5 text-gray-400 fill-current"
                >
                  <path
                    d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z"
                    fill="#000"
                  ></path>
                </svg>
              </div>
              <span class="flex-1 text-xs font-medium truncate">{{
                loc.name
              }}</span>
            </div>
            <span
              class="text-xs font-medium rounded-[5px] px-2 py-1 border border-[#4cb087] text-[#4cb087] self-end capitalize"
              >Locations</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { debounce } from '~/helpers'

export default Vue.extend({
  props: {
    baseType: {
      type: String,
      default: 'search_criteria',
    },
    filterBase: {
      type: String,
      default: 'search',
    },
    filterType: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      timeOut: null as any,
      searchName: '',
      searchedNames: [],
      availableData: false,
      awaitingSearch: false,
      moreSearched: false,
      // data: [] as Unit[],
      menuShow: false,
      searchResponse: [],
      searchPayload: [],
      loading: true,
    }
  },
  computed: {
    filters() {
      return [...this.$store.state.filter.selectedFilters]
    },
  },

  // watch: {
  //   searchName(...args) {
  //     this.debouncedFetch(...args)
  //   },
  // },
  created() {
    this.$nuxt.$on('submitSearch', () => {
      this.searchedNames = []
      this.initFilters()
    })

    this.$nextTick(function () {
      this.initFilters()
      ;(this as any).debouncedFetch = debounce((newValue: string) => {
        if (!newValue) {
          this.menuShow = false
          this.availableData = false
          return
        }

        this.$axios
          .get(`/${this.baseType}`, {
            params: {
              [`filter[${this.filterType}]`]: newValue,
            },
          })
          .then(res => {
            this.searchResponse = res.data
            this.menuShow = true
            this.availableData = true
          })
      }, 150)
    })
  },
  methods: {
    initFilters() {
      this.filters.forEach(item => {
        switch (item.key) {
          case 'developer': {
            item.value.forEach(innerItem => {
              this.searchedNames.push({
                name: innerItem,
                type: 'developer_id',
              })
            })
            break
          }
          case 'project': {
            item.value.forEach(innerItem => {
              this.searchedNames.push({
                name: innerItem,
                type: 'project_id',
              })
            })
            break
          }
          case 'state': {
            item.value.forEach(innerItem => {
              this.searchedNames.push({
                name: innerItem,
                type: 'state_id',
              })
            })
            break
          }
          case 'search_keywords': {
            item.value.forEach(innerItem => {
              this.searchedNames.push({
                name: innerItem,
                type: 'search_keywords',
              })
            })
            break
          }
        }
      })
      this.searchedNames.forEach(item => {
        this.searchPayload.push({ key: item.type, name: item.name })
      })
    },
    saveFilters() {
      const originalPayload = this.filterData('project_id')
      const duplicatedPayload = originalPayload.map(item =>
        item.replace('project_id', 'project.parent_id')
      )
      const finalPayload = [...originalPayload, ...duplicatedPayload]

      this.$store.commit('filter/ADD_SELECTED_FILTERS', {
        key: 'project',
        range: true,
        q: [[finalPayload]],
        value: [
          ...this.searchPayload
            .filter(item => item.key === 'project_id')
            .map(item => item.name),
        ],
      })
      // developer
      this.$store.commit('filter/ADD_SELECTED_FILTERS', {
        key: 'developer',
        range: true,
        q: [[[...this.filterData('developer_id')]]],
        /* eslint no-sparse-arrays: "error" */
        value: [
          ...this.searchPayload
            .filter(item => item.key === 'developer_id')
            .map(item => item.name),
        ],
      })
      // locations
      this.$store.commit('filter/ADD_SELECTED_FILTERS', {
        key: 'state',
        range: true,
        q: [[[...this.filterData('state_id')]]],
        value: [
          ...this.searchPayload
            .filter(item => item.key === 'state_id')
            .map(item => item.name),
        ],
      })

      this.$store.commit('filter/ADD_SELECTED_FILTERS', {
        key: 'search_keywords',
        value: [
          ...this.searchPayload
            .filter(item => item.key === 'search_keywords')
            .map(item => item.name),
        ],
      })
    },
    setSearchName(name: string, key: string, id: number) {
      if (name == null || name === '') return

      const payload = {
        key,
        value: id,
        name,
      }
      if (!this.searchedNames.includes(name)) {
        this.searchedNames.push({ name, type: key })
        this.searchPayload.push(payload)
      }

      this.saveFilters()

      this.searchName = ''
      this.menuAwayClose()
    },

    deleteSearchName() {
      if (!this.searchName) {
        this.searchedNames.splice(-1)
        this.searchPayload.splice(-1)
        this.saveFilters()
      }
    },
    filterData(key: string) {
      const filterArray = this.searchPayload
        .filter(item => {
          return item.key === key
        })
        .map(item => {
          return item.key + ' = ' + item.value
        })
      return filterArray
    },
    menuAwayClose() {
      this.menuShow = false
      this.availableData = false
      this.moreSearched = false
    },
    openMoreSearched() {
      this.menuShow = true
      this.moreSearched = true
    },
    removeName(idx: number, type: string) {
      this.searchedNames.splice(idx, 1)
      this.searchPayload.splice(idx, 1)

      switch (type) {
        case 'developer_id': {
          this.$store.commit('filter/ADD_SELECTED_FILTERS', {
            key: 'developer',
            range: true,
            q: [[[...this.filterData('developer_id')]]],
            /* eslint no-sparse-arrays: "error" */
            value: [
              ...this.searchPayload
                .filter(item => item.key === 'developer_id')
                .map(item => item.name),
            ],
          })
          break
        }
        case 'project_id': {
          this.$store.commit('filter/ADD_SELECTED_FILTERS', {
            key: 'project',
            range: true,
            q: [[[...this.filterData('project_id')]]],
            value: [
              ...this.searchPayload
                .filter(item => item.key === 'project_id')
                .map(item => item.name),
            ],
          })
          break
        }
        case 'state_id': {
          this.$store.commit('filter/ADD_SELECTED_FILTERS', {
            key: 'state',
            range: true,
            q: [[[...this.filterData('state_id')]]],
            value: [
              ...this.searchPayload
                .filter(item => item.key === 'state_id')
                .map(item => item.name),
            ],
          })
          break
        }
        case 'search_keywords': {
          this.$store.commit('filter/ADD_SELECTED_FILTERS', {
            key: 'search_keywords',
            value: [
              ...this.searchPayload
                .filter(item => item.key === 'search_keywords')
                .map(item => item.name),
            ],
          })
          break
        }
      }
    },
  },
})
</script>
