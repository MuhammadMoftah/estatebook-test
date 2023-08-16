<template>
  <div>
    <div
      v-if="sliderList && sliderList.length"
      class="grid w-full grid-cols-1 gap-3 mt-0 lg:grid-cols-3 lg:mt-6"
    >
      <div
        class="flex items-center justify-center w-full col-span-2 rounded-lg bg-gray-50 h-[390px] lg:h-96"
        @click="open(0)"
      >
        <CommonImageOnError
          v-if="images && images.length && images[0]"
          :image="images[0]"
          type="image"
          img-class="object-cover w-full h-full duration-300 cursor-pointer group-hover:scale-110"
          parent-class="relative block rounded-lg w-full h-[390px] lg:h-96 overflow-hidden group "
        />
        <div
          v-else
          class="relative bg-gray-50 flex items-center justify-center rounded-lg w-full h-[390px] lg:h-96 overflow-hidden group mt-4"
        >
          <IconsPlaceholderImageIcon />
        </div>
      </div>
      <div class="grid items-end grid-cols-1 col-span-1 gap-3">
        <div class="hidden col-span-1 md:block lg:col-span-1">
          <div v-if="images && images.length && images[1]" @click="open(3)">
            <CommonImageOnError
              :image="images[1]"
              type="image"
              img-class="object-cover w-full h-full duration-300 cursor-pointer group-hover:scale-110"
              parent-class="relative  rounded-lg w-full h-[229px] lg:h-[170px] overflow-hidden group"
            />
          </div>

          <div
            v-else
            class="relative rounded-lg w-full h-[229px] lg:h-[170px] overflow-hidden group bg-gray-50 flex items-center justify-center"
          >
            <IconsPlaceholderImageIcon />
          </div>

          <div
            class="relative block rounded-lg w-full h-[160px] lg:h-[214px] overflow-hidden group"
          >
            <div v-if="images && images.length && images[2]" @click="open(4)">
              <CommonImageOnError
                :image="images[2]"
                type="image"
                img-class="object-cover w-full h-full duration-300 cursor-pointer group-hover:scale-110"
                parent-class="relative block rounded-lg w-full h-[160px] lg:h-[214px] overflow-hidden group mt-4"
              />
            </div>

            <div
              v-else
              class="relative rounded-lg w-full h-[160px] lg:h-[214px] mt-4 overflow-hidden group flex items-center justify-center bg-gray-50"
            >
              <IconsPlaceholderImageIcon />
            </div>

            <div
              v-if="images && images.length > 5"
              class="absolute top-0 left-0 flex items-center justify-center w-full h-full text-2xl font-semibold text-white lg:text-4xl bg-bg-overlay"
            >
              +{{ images.length - 5 }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition
      :enter-active-class="$t('dir') === 'ltr' ? 'slide-top' : 'slide-top'"
      :leave-active-class="
        $t('dir') === 'ltr' ? 'slide-bottom' : 'slide-bottom'
      "
      appear
    >
      <div
        v-if="showModal"
        class="fixed inset-0 top-0 left-0 min-h-screen z-[1100] bg-black/90 text-white"
      >
        <div class="relative top-5 ltr:left-5 rtl:right-5">
          <button class="flex w-full" @click="showModal = false">
            <IconsCloseIcon />
          </button>
        </div>
        <div class="w-full mx-auto my-10 max-w-7xl md:my-20">
          <div class="relative">
            <LazyUiFlickingWrapper
              :options="{
                duration: 1000,
                circular: true,
              }"
            >
              <div
                v-for="(image, i) in sliderList"
                :key="'image' + i"
                class="w-full"
              >
                <CommonImageOnError
                  v-if="image && image.type == 'image' && !errorDetected"
                  :image="image.url"
                  type="image"
                  img-class="h-[500px] max-w-2xl rounded-lg mx-auto "
                />
                <!-- @errorDetected="errorDetected = true" -->
                <!-- @errorDetected="errorDetected = true" -->
                <a
                  v-else
                  :href="image.url"
                  target="_blank"
                  class="relative h-[500px] max-w-2xl rounded-lg mx-auto"
                >
                  <iframe
                    class="h-[500px] lg:w-[700px] w-full rounded-lg mx-auto"
                    :src="`https://www.youtube.com/embed/${getYoutubeIdFromURL(
                      image.url
                    )}`"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </a>
              </div>
            </LazyUiFlickingWrapper>
            <!-- <VueSlickCarousel v-bind="settings" ref="carouselSection">
              <div
                v-for="(image, i) in sliderList"
                :key="'image' + i"
                class="w-full"
              >
                <CommonImageOnError
                  v-if="image && image.type == 'image' && !errorDetected"
                  :image="image.url"
                  type="image"
                  img-class="h-[500px] max-w-2xl rounded-lg mx-auto "
                />
               
                <a
                  v-else
                  :href="image.url"
                  target="_blank"
                  class="relative h-[500px] max-w-2xl rounded-lg mx-auto"
                >
                  <iframe
                    class="h-[500px] lg:w-[700px] w-full rounded-lg mx-auto"
                    :src="`https://www.youtube.com/embed/${getYoutubeIdFromURL(
                      image.url
                    )}`"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </a>
              </div>
            </VueSlickCarousel> -->
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue, { computed } from 'vue'
import { PropOptions } from 'vue/types/umd'

export default Vue.extend({
  props: {
    images: {
      type: Array,
      required: false,
      defualt: [],
    } as PropOptions<string[]>,
    videos: {
      type: Array,
      required: false,
      defualt: [],
    } as PropOptions<Video[]>,
  },
  data() {
    return {
      showModal: false,
      errorDetected: false,
      settings: {
        dots: true,
        dotsClass: 'slick-dots custom-dot-class',
        edgeFriction: 0.35,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        pagination: false,
        focusOnSelect: true,
      },
      caroselRef: this.$refs,
    }
  },
  computed: {
    sliderList() {
      let images: any = []
      let videos: any = []

      if (this.images && this.images.length) {
        images = this.images?.map(item => {
          return { type: 'image', url: item }
        })
      }

      if (this.videos && this.videos.length) {
        videos = this.videos?.map(item => {
          return { type: 'video', url: item.url }
        })
      }

      return images?.concat(videos)
    },
  },
  watch: {},
  methods: {
    getYoutubeIdFromURL(url: string) {
      const tempUrl = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
      return tempUrl[2] !== undefined
        ? tempUrl[2].split(/[^0-9a-z_]/i)[0]
        : tempUrl[0]
    },
    open(idx: number) {
      this.showModal = true

      // this.$nextTick(() => {
      //   this.$refs.carouselSection.goTo(idx)
      // })
    },
    onInitCarousel() {},
    openSlide(i: number) {
      // this.$refs.carousel.goTo(i)
    },
  },
})
</script>

<style>
.carousel__prev,
.carousel__next {
  @apply bg-white rounded-full;
}

.carousel__prev {
  @apply left-[10%];
}
.carousel__next {
  @apply right-[10%];
}
</style>
