<template>
  <div dir="ltr" class="relative">
    <div
      class="hidden absolute cursor-pointer items-center justify-center w-12 h-12 bg-white shadow-md border rounded-full border-slate-200 lg:-right-16 -right-4 z-20 top-[40%] lg:flex"
      @click="next"
    >
      <IconsAngleRightIcon class="w-4 h-4 text-gray-400" />
    </div>
    <div
      class="hidden absolute cursor-pointer items-center justify-center w-12 h-12 bg-white border shadow-md rounded-full border-slate-200 lg:-left-16 -left-4 z-20 top-[40%] lg:flex"
      @click="prev"
    >
      <IconsAngleLeftIcon class="w-4 h-4 text-gray-400" />
    </div>

    <Flicking
      ref="carouselSection"
      :options="overrideOptions"
      :plugins="pluginInstances"
      :class="classes"
    >
      <slot></slot>

      <template v-if="arrow">
        <span
          slot="viewport"
          class="flicking-arrow-prev"
          :class="[`is-${arrowType}`]"
        ></span>
        <span
          slot="viewport"
          class="flicking-arrow-next"
          :class="[`is-${arrowType}`]"
        ></span>
      </template>
      <template v-else-if="pagination">
        <div
          slot="viewport"
          class="flicking-pagination"
          :class="paginationClasses"
        ></div>
      </template>
    </Flicking>

    <!-- <template v-if="arrow && arrowType === 'outside'">
      <span
        slot="viewport"
        class="flicking-arrow-prev"
        :class="[`is-${arrowType}`]"
      ></span>
      <span
        slot="viewport"
        class="flicking-arrow-next"
        :class="[`is-${arrowType}`]"
      ></span>
    </template> -->
  </div>
</template>

<script>
import { Flicking, FlickingError, ERROR_CODE } from '@egjs/vue-flicking'

export default {
  name: 'FlickingWrapper',
  components: {
    Flicking,
  },
  props: {
    options: {
      type: Object,
      default: null,
    },
    plugins: {
      type: String,
      default: '',
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    parallax: {
      type: Boolean,
      default: false,
    },
    fade: {
      type: Boolean,
      default: false,
    },
    arrow: {
      type: Boolean,
      default: false,
    },
    pagination: {
      type: Boolean,
      default: false,
    },
    sync: {
      type: Boolean,
      default: false,
    },
    perspective: {
      type: Boolean,
      default: false,
    },
    typeOptions: {
      type: Object,
      default: () => ({}),
    },
    arrowType: {
      type: String,
      validator(value) {
        return ['circle', 'outside', 'thin'].includes(value)
      },
    },
    classes: {
      type: String,
      default: '',
    },
    paginationClasses: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      /** @type {import('@egjs/vue-flicking').FlickingOptions} */
      defaultOptions: {
        align: 'prev',
        circular: false,
        renderOnlyVisible: true,
        duration: 250,
      },
      pluginInstances: [],
    }
  },
  computed: {
    overrideOptions() {
      return Object.assign(this.defaultOptions, this.options)
    },
  },
  created() {
    const { options: _1, plugins: _2, ...props } = this.$props

    const types = Object.keys(props).filter(key => this.$props[key])

    const typeMapping = {
      autoplay: 'AutoPlay',
      parallax: 'Parallax',
      fade: 'Fade',
      arrow: 'Arrow',
      pagination: 'Pagination',
      sync: 'Sync',
      perspective: 'Perspective',
    }

    if (types.length > 0) {
      for (const type of types) {
        const typeRef = require('@egjs/flicking-plugins')[
          `${typeMapping[type]}`
        ]

        if (typeRef) {
          // eslint-disable-next-line new-cap
          this.pluginInstances.push(new typeRef(this.typeOptions[type]))
        }
      }
    }
  },
  methods: {
    async next() {
      try {
        await this.$refs.carouselSection.next()
      } catch (error) {
        if (error instanceof FlickingError) {
          if (error.code === ERROR_CODE.ANIMATION_ALREADY_PLAYING) {
            // ignore exception
          } else if (error.code === ERROR_CODE.ANIMATION_INTERRUPTED) {
            // ignore exception
          }
        }
      }
    },
    async prev() {
      try {
        await this.$refs.carouselSection.prev()
      } catch (error) {
        if (error instanceof FlickingError) {
          if (error.code === ERROR_CODE.ANIMATION_ALREADY_PLAYING) {
            // ignore exception
          } else if (error.code === ERROR_CODE.ANIMATION_INTERRUPTED) {
            // ignore exception
          }
        }
      }
    },
  },
}
</script>
