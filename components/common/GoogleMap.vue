<template>
  <client-only>
    <GmapMap
      ref="mapRef"
      :zoom="zoom"
      :center="mapCenter"
      :options="Object.assign(defaultOptions, options)"
      map-type-id="terrain"
      class="relative w-full h-full"
      @tilesloaded="tilesloadedEvent"
      @zoom_changed="getCurrentZoom"
      @dragend="mapDragged"
    >
      <template #visible>
        <CommonMapsZoom
          v-model="zoom"
          class="absolute -translate-y-1/2 top-1/2"
        />
      </template>

      <!-- @center_changed="onCenterChange"
      @zoom_changed="getCurrentZoom"
      @mousedown.native="waitDragStop = true" -->
      <!-- neighborhoods Polygons -->
      <div v-if="zoom >= 4">
        <client-only>
          <gmap-polygon
            v-for="neighborhood in items"
            :key="neighborhood.slug"
            :path="neighborhood?.coords"
            :options="
              zoom >= 4 && zoom < 12
                ? polyoptions
                : {
                    clickable: true,
                    strokeColor: '#fff',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#4CB087',
                    fillOpacity: 0.2,
                  }
            "
            @click="neighborhoodHandler(neighborhood)"
          >
          </gmap-polygon>
        </client-only>
      </div>

      <!-- projects polygon -->
      <div v-if="zoom >= 12">
        <gmap-polygon
          v-for="(project, i) in items"
          ref="polygonRef"
          :key="i"
          :paths="project.coords"
          :options="
            selectedItem === project.id ? selectedPolyOptions : projectOptions
          "
          @click="polyHandler(poly, poly.id)"
        ></gmap-polygon>
      </div>

      <div v-if="zoom >= 14">
        <gmap-custom-marker
          v-for="(el, index) in fakeUnits"
          :key="index"
          :marker="{ lat: +el.lat, lng: +el.lng }"
          :clickable="true"
          :draggable="true"
          @click="$store.commit('map/SET_ITEM', el)"
        >
          <span>
            <IconsUnitMarkerIcon />
          </span>
        </gmap-custom-marker>
      </div>
    </GmapMap>
  </client-only>
</template>
<script lang="ts">
import Vue from 'vue'
import mapStyles from '~/constants/mapsConfig/index.js'
import fakeNeighborhoods from '~/constants/mapsConfig/fakeNeighborhoods.json'
import fakeProjects from '~/constants/mapsConfig/fakeProjects.json'
import fakeUnits from '~/constants/mapsConfig/fakeUnits.json'

export default Vue.extend({
  props: {
    mapCenter: {
      type: Object,
      default: () => ({}),
    },
    defaultMapZoom: {
      type: [Number, String],
      default: 6,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    items: {
      type: Array,
      default: () => [],
    },
    page: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      defaultOptions: {
        zoomControl: false,
        fullscreenControl: false,
        scaleControl: true,
        disableDefaultUI: true,
        scrollwheel: true,
        mapTypeControl: true,
        gestureHandling: 'greedy',
        styles: mapStyles.styles,
      },
      polyoptions: {
        clickable: true,
        strokeColor: '#4CB087',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#4CB087',
        fillOpacity: 0.6,
        zIndex: 1,
      },
      projectOptions: {
        strokeOpacity: 0.8,
        strokeWeight: 2,
        strokeColor: '#fff',
        fillColor: '#4CB087',
        fillOpacity: 0.5,
        zIndex: 2,
      },
      selectedPolyOptions: {
        strokeOpacity: 0.8,
        strokeWeight: 2,
        strokeColor: '#4CB087',
        fillColor: '#4CB087',
        fillOpacity: 0.5,
      },
      zoom: this.defaultMapZoom,
      selectedItem: null,
      map: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: 0,
        },
      },
      InfoOpened: false,
      InfoPosition: null,
      closeModal: false,
      cameraCenter: {},
      projects: null,
      units: null,
      itemSlug: null,
      checkType: 'neighborhood',
      waitDragStop: false,
      fakeNeighborhoods,
      fakeProjects,
      fakeUnits,
    }
  },

  computed: {
    filteredNeighborhoods() {
      return fakeNeighborhoods
      // return this.items.filter(p => (p['map_type'] = 'neighborhood'))
    },
    filteredProjects() {
      return fakeProjects
    },
  },

  mounted() {
    // this.$nextTick(() => {
    // this.$refs.mapRef.$mapPromise.then(map => {
    //   this.map = map
    // })
  },
  methods: {
    mapDragged(e: any) {
      this.$emit('mapDragged')
    },
    getCurrentZoom(zoom: number) {
      this.zoom = zoom
      // this.waitDragStop = true
      // if (this.itemSlug) {
      //   if (this.zoom > 12) {
      //     this.checkType = 'project'
      //   } else {
      //     this.checkType = 'neighborhood'
      //   }
      //   this.getData()
      // }
    },
    getLocation() {
      if (this.checkType === 'neighborhood') {
        this.itemSlug = this.checkItemLocation(this.items)
      } else {
        this.itemSlug = this.checkItemLocation(this.projects)
      }
    },
    async getData() {
      await this.getLocation()
      if (this.itemSlug) {
        if (this.checkType === 'neighborhood') {
          this.getProjects(this.itemSlug)
        } else {
          this.getUnits(this.itemSlug)
        }
      }
    },
    async getProjects(itemSlug: any) {
      try {
        await this.$store.dispatch('neighbourhood/getNeighbourhood', {
          slug: itemSlug,
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
        const test = this.$store.state.neighbourhood.neighbourhood.projects
        this.projects = test.filter(p => (p.map_type = 'project'))
        // this.checkType = 'project'
      } catch (error) {}
    },
    async getUnits(itemSlug: any) {
      try {
        await this.$store.dispatch('project/getProject', {
          slug: itemSlug,
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
          ],
          per_page: 25,
        } as RequestPayload<ProjectAllowedInclude[]>)
        this.units = this.$store.state.project.project.units
      } catch (error) {}
    },
    panTo() {
      if (this.selectedItem) {
        const marker = {
          lat: this.selectedItem.geometry.location.lat(),
          lng: this.selectedItem.geometry.location.lng(),
        }
        const latLng = new this.google.maps.LatLng(marker)
        this.map.panTo(latLng)
      }
    },
    async neighborhoodHandler(neighborhood: any) {
      this.$store.commit('SET_MODAL', 'NeighborhoodDrawer')
      this.$store.commit('CHANGE_LOADING', true)

      const test = await this.$store.dispatch(
        'neighbourhood/getNeighbourhood',
        {
          slug: neighborhood.slug,
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
        } as RequestPayload<NeighbourhoodAllowedInclude[]>
      )
      this.$store.commit('CHANGE_LOADING', false)

      // this.selectedItem = neighborhood
      // this.$store.commit('map/SET_ITEM', test)

      this.InfoOpened = true
      this.InfoPosition = this.polyCenter(neighborhood?.coords)
    },
    polyHandler(neighborhood: any) {
      this.closeModal = false
      this.selectedItem = neighborhood
      this.$store.commit('SET_MODAL', 'ProjectDrawer')
      this.InfoOpened = true
      this.InfoPosition = this.polyCenter(neighborhood?.coords)
    },
    onCenterChange({ lat, lng }) {
      // this.cameraCenter = { lat: lat(), lng: lng() }
      // // if (this.waitDragStop) {
      // await this.getLocation()
      // await this.getData()

      this.$nextTick(() => {
        this.$refs.mapRef.$mapObject.getBounds().toJSON()
      })
      // }
      // this.waitDragStop = false
    },
    checkItemLocation(items: any) {
      const result = items.filter(polyPath =>
        window.google.maps.geometry.poly.containsLocation(
          this.cameraCenter,
          new window.google.maps.Polygon({
            paths: polyPath.coords,
          })
        )
      )
      if (result && result.length) {
        if (result[0].map_type) {
          this.checkType = result[0].map_type
        }

        return result[0].slug
      }
    },
    tilesloadedEvent() {
      this.$nextTick(() => {
        this.$refs.mapRef.$mapObject.getBounds().toJSON()
      })
    },
  },
})
</script>
