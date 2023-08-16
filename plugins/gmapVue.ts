import Vue from 'vue'
import GmapVue from 'gmap-vue'

Vue.use(GmapVue, {
  load: {
    // [REQUIRED] This is the unique required value by Google Maps API
    key: 'AIzaSyB856peP08lQRSDviy6o_aqg0L7val7xLI',

    libraries: 'places,geometry',
  },

  autoBindAllEvents: false,

  installComponents: true,

  dynamicLoad: false,
})
