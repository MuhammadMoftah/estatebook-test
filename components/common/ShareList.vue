<template>
  <div
    v-on-clickaway="menuAwayClose"
    class="relative cursor-pointer"
    :class="classes"
  >
    <a target="_blank" @click="menu = !menu">
      <slot name="share-button" />
    </a>

    <!-- <transition enter-active-class="scale-up-center" leave-active-class="fade"> -->
    <div
      v-if="menu === true"
      class="absolute share-container flex gap-10 items-center justify-center p-4 top-12 ltr:right-0 rtl:left-0 rounded-lg !z-50 max-w-md bg-black/20 backdrop-blur-md theme-shadow"
      :class="overlayClass"
      @click="menuAwayClose"
    >
      <transition
        enter-active-class="scale-up-center"
        leave-active-class="fade"
        appear
        delay="500"
        duration="500"
      >
        <button>
          <ShareNetwork
            network="facebook"
            :url="generatedUrl"
            :title="titleType === 'title' ? item.title : item.name"
            :description="item.description"
          >
            <span>
              <IconsFacebookIcon2
                class="w-8 h-8 text-white transition-colors duration-150 fill-current hover:text-blue-400"
              />
            </span>
          </ShareNetwork>
        </button>
      </transition>
      <transition
        enter-active-class="scale-up-center"
        leave-active-class="fade"
        appear
        delay="1000"
        duration="1000"
      >
        <button>
          <ShareNetwork
            network="whatsapp"
            :url="generatedUrl"
            :title="titleType === 'title' ? item.title : item.name"
            :description="item.description"
            :media="
              item.images && item.images[0]
                ? item.images[0]
                : 'https://tinypng.com/images/social/website.jpg'
            "
          >
            <span>
              <IconsWhatsappIcon2
                class="w-8 h-8 text-white transition-colors duration-150 fill-current hover:text-green-400"
              />
            </span>
          </ShareNetwork>
        </button>
      </transition>
      <transition
        enter-active-class="scale-up-center"
        leave-active-class="fade"
        appear
        delay="1500"
        duration="1500"
      >
        <button>
          <ShareNetwork
            network="twitter"
            :url="generatedUrl"
            :title="titleType === 'title' ? item.title : item.name"
            :description="item.description"
            :media="item.logo"
          >
            <span>
              <IconsTwitterIcon
                class="w-8 h-8 text-white transition-colors duration-150 fill-current hover:text-sky-400"
              />
            </span>
          </ShareNetwork>
        </button>
      </transition>
    </div>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
    url: {
      type: String,
    },
    titleType: {
      type: String,
      default: 'name',
    },
    overlayClass: {
      type: String,
    },
    classes: {
      type: String,
    },
  },
  data() {
    return {
      menu: false,
      hostName: '',
    }
  },
  //   <meta property="og:type" content="website">
  // <meta property="og:url" content="https://metatags.io/">
  // <meta property="og:title" content="Meta Tags — Preview, Edit and Generate">
  // <meta property="og:description" content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!">
  // <meta property="og:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png">
  // head() {
  //   if (this.$route?.matched[0]?.path !== this.localePath('/')) {
  //     return {
  //       // title: this.item.name,
  //       meta: [
  //         {
  //           hid: 'vue-description',
  //           name: 'description',
  //           content: this.item.description,
  //         },
  //         { hid: 'og:type', property: 'og:type', content: 'website' },
  //         { hid: 'og:url', property: 'og:url', content: this.generatedUrl },
  //         {
  //           hid: 'og:title',
  //           property: 'og:title',
  //           content:
  //             this.titleType === 'title' ? this.item.title : this.item.name,
  //         },
  //         {
  //           hid: 'og:description',
  //           property: 'og:description',
  //           content: this.item.description,
  //         },
  //         {
  //           hid: 'og:image',
  //           property: 'og:image',
  //           itemprop: 'image',
  //           content: this.item.logo,
  //         },
  //         {
  //           hid: 'og:site_name',
  //           property: 'og:site_name',
  //           content: 'EstateBook',
  //         },
  //         {
  //           hid: 'og:image:width',
  //           property: 'og:image:width',
  //           content: '300',
  //         },
  //         {
  //           hid: 'og:image:height',
  //           property: 'og:image:height',
  //           content: '300',
  //         },
  //         {
  //           hid: 'twitter:title',
  //           property: 'twitter:title',
  //           content:
  //             this.titleType === 'title' ? this.item.title : this.item.name,
  //         },
  //         {
  //           hid: 'twitter:description',
  //           property: 'twitter:description',
  //           content: this.item.description,
  //         },
  //         {
  //           hid: 'twitter:image',
  //           property: 'twitter:image',
  //           content: this.item.logo,
  //         },
  //         {
  //           hid: 'twitter:url',
  //           property: 'twitter:url',
  //           content: this.generatedUrl,
  //         },
  //         {
  //           hid: 'twitter:card',
  //           property: 'twitter:card',
  //           content: 'summary',
  //         },
  //       ],
  //     }
  //   }
  // },
  computed: {
    generatedUrl() {
      return `${this.hostName}/${this.url}/${this.item.slug}`
    },
  },
  mounted() {
    this.hostName = window.location.origin
  },
  methods: {
    menuAwayClose() {
      this.menu = false
    },
  },
}
</script>

<style>
.slide-right {
  -webkit-animation: slide-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
/* ----------------------------------------------
 * Generated by Animista on 2022-11-10 14:26:10
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation slide-right
 * ----------------------------------------
 */
@-webkit-keyframes slide-right {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  100% {
    -webkit-transform: translateX(10px);
    transform: translateX(10px);
  }
}
@keyframes slide-right {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  100% {
    -webkit-transform: translateX(0px);
    transform: translateX(10px);
  }
}

.scale-up-hor-center {
  -webkit-animation: scale-up-hor-center 0.4s
    cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: scale-up-hor-center 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@-webkit-keyframes scale-up-hor-center {
  0% {
    -webkit-transform: scaleX(0.4);
    transform: scaleX(0.4);
  }
  100% {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
}
@keyframes scale-up-hor-center {
  0% {
    -webkit-transform: scaleX(0.4);
    transform: scaleX(0.4);
  }
  100% {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
}

.scale-up-center {
  -webkit-animation: scale-up-center 0.4s cubic-bezier(0.39, 0.575, 0.565, 1)
    both;
  animation: scale-up-center 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}
/* ----------------------------------------------
 * Generated by Animista on 2022-11-14 9:28:12
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation scale-up-center
 * ----------------------------------------
 */
@-webkit-keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
