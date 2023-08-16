<template>
  <div class="container px-3 mt-8 lg:mt-10">
    <LazyHydrate when-visible>
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
            name: $t('blogs'),
            link: localePath('/blogs'),
            active: true,
          },
        ]"
      />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <LazyCommonPageHeader
        :title="$t('blogs')"
        :placeholder="$t('search_for_blogs')"
        store-path="blog/getBlogs"
        :enable-sort="false"
        :search-with="'title'"
      />
    </LazyHydrate>

    <nav
      ref="scrollContainer"
      class="relative flex items-center w-full pb-2 mt-6 mb-6 overflow-x-auto cursor-grab"
      @mousedown="mouseDownHandler"
    >
      <a
        v-for="cat in categories"
        :key="cat.name"
        class="flex items-center justify-center px-2 mt-2 mr-2 text-sm text-black capitalize duration-300 border rounded-lg cursor-pointer min-w-fit h-11 border-border-list hover:bg-text-green hover:text-white hover:border-text-green"
        :class="{
          '!bg-text-green !text-white': categoriesID.find(el => el === cat.id),
        }"
        @click="setCategoryID(cat.id)"
        >{{ cat.name }}
      </a>
    </nav>

    <LazyHydrate when-visible>
      <LazyCommonLoadersLoaderLayout :data-length="blogs.length">
        <template #loader>
          <div
            class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"
          >
            <LazyCommonBlogCardSkeleton
              v-for="i in 20"
              :key="i"
              :class="{
                'col-span-2 !h-full': i < 2,
                'h-[392px] mt-4': i % 2 !== 0 && i > 1,
                'h-[502px] mt-4': i % 2 === 0 && i > 1,
                'mt-[-94px]  h-[502px]': i % 2 !== 0 && i > 5,
                'h-[392px]': i % 2 === 0 && i > 5,
              }"
            />
          </div>
        </template>
        <div
          class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"
        >
          <LazyBlogsBlogCard
            v-for="(blog, i) in blogs"
            :key="blog.slug"
            :class="{
              'col-span-1 md:col-span-2 !h-full': i < 2,
              'h-[392px] mt-4': i % 2 !== 0 && i > 1,
              'h-[502px] mt-4': i % 2 === 0 && i > 1,
              'mt-[-94px]  h-[502px]': i % 2 !== 0 && i > 5,
              'h-[392px]': i % 2 === 0 && i > 5,
            }"
            :item="blog"
          />
        </div>
      </LazyCommonLoadersLoaderLayout>
    </LazyHydrate>

    <div class="flex items-center justify-center w-full mt-6">
      <LazyHydrate when-visible>
        <LazyCommonListingPagination
          v-if="blogs.length"
          :total-pages="meta.last_page"
          :current-page="currentPage"
        />
      </LazyHydrate>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      pending: false,
      page: 1,
      title: '',
      categories: [] as { id: number; name: string }[],
      categoriesID: [] as number[],
      pos: { top: 0, left: 0, x: 0, y: 0 },
      ele: {},
    }
  },
  computed: {
    blogs(): Blog[] {
      return this.$store.state.blog.blogs
    },
    meta(): Meta {
      return this.$store.state.blog.meta
    },
    currentPage() {
      return +(this.$route.query.page ? this.$route.query.page : 1) as number
    },
  },
  watch: {
    $route: {
      handler(newVal) {
        const page = +(newVal?.query?.page ? newVal?.query?.page : 1) as number
        this.loadMore(page)
      },
      deep: true,
    },
  },
  async mounted() {
    this.ele = this.$refs.scrollContainer
    this.page = +(this.$route.query.page ? this.$route.query.page : 1) as number
    this.$store.commit('CHANGE_LOADING', true)
    await this.$store.dispatch('blog/getBlogs', {
      page: this.page,
      include: ['author', 'category'],
      per_page: 26,
    } as RequestPayload<BlogAllowedInclude[]>)
    const res = await this.$axios.get('/categories')
    this.categories = res?.data?.data
    this.$store.commit('CHANGE_LOADING', false)
  },
  methods: {
    async setCategoryID(value: number) {
      this.$store.commit('CHANGE_LOADING', true)
      const index: number = this.categoriesID.findIndex(el => el === value)
      if (index > -1) {
        this.categoriesID.splice(index, 1)
      } else {
        this.categoriesID.push(value)
      }
      await this.$store.dispatch('blog/getBlogs', {
        page: 1,
        include: ['author', 'category'],
        per_page: 25,
        filters: [{ key: 'category.id', value: this.categoriesID.join(',') }],
      } as RequestPayload<BlogAllowedInclude[]>)
      this.$store.commit('CHANGE_LOADING', false)
    },
    async loadMore(value: number) {
      this.page = value
      this.$store.commit('CHANGE_LOADING', true)
      await this.$store.dispatch('blog/getBlogs', {
        page: this.page,
        include: ['category', 'author'],
        per_page: 26,
        filters: [
          { key: 'category.id', value: this.categoriesID.join(',') },
        ].filter(el => el.value),
      } as RequestPayload<BlogAllowedInclude[]>)
      this.$store.commit('CHANGE_LOADING', false)
    },
    mouseDownHandler(e) {
      this.pos = {
        // The current scroll
        left: this.ele.scrollLeft,
        top: this.ele.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
      }
      this.ele.style.cursor = 'grabbing'
      this.ele.style.userSelect = 'none'
      document.addEventListener('mousemove', this.mouseMoveHandler)
      document.addEventListener('mouseup', this.mouseUpHandler)
    },
    mouseUpHandler() {
      document.removeEventListener('mousemove', this.mouseMoveHandler)
      document.removeEventListener('mouseup', this.mouseUpHandler)
      this.ele.style.cursor = 'grab'
      this.ele.style.removeProperty('user-select')
    },
    mouseMoveHandler(e) {
      // How far the mouse has been moved
      const dx = e.clientX - this.pos.x
      const dy = e.clientY - this.pos.y

      // Scroll the element
      this.ele.scrollTop = this.pos.top - dy
      this.ele.scrollLeft = this.pos.left - dx
    },
  },
})
</script>
