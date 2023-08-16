<template>
  <div>
    <LazyHydrate when-visible>
      <LazyCommonPagePreloader v-if="loading" />
      <div v-else class="container px-3 mt-8 lg:mt-10">
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
              link: localePath('/blogs?page=1'),
              active: false,
            },
            {
              id: 2,
              name: blog.title,
              link: '/',
              active: true,
            },
          ]"
        />
        <!-- End breadcrumb -->

        <div class="flex items-center justify-between mt-6">
          <div>
            <h2
              class="text-xl font-semibold leading-none text-black capitalize lg:text-2xl"
            >
              {{ blog && blog ? blog.title : null }}
            </h2>
            <div class="flex items-center mt-2">
              <p
                class="relative text-sm text-text-gray font-normal tracking-[0.0015em] capitalize after:content-['|'] after:absolute ltr:after:right-0 rtl:after:left-0 after:text-icon-header ltr:pr-2 rtl:pl-2"
              >
                {{ $t('by') }}:
                {{ blog && blog && blog.author ? blog.author.name : null }}
              </p>
              <p
                class="relative text-sm text-text-gray font-normal tracking-[0.0015em] capitalize ltr:ml-2 rtl:mr-2"
              >
                {{ $t('published') }}:
                {{
                  blog && blog && blog.created_at
                    ? blog.created_at.split(' ')[0].replaceAll('-', '/')
                    : null
                }}
              </p>
            </div>
          </div>
          <LazyCommonShareList
            :item="blog"
            url="blogs"
            title-type="title"
            class="px-4 ltr:ml-auto rtl:mr-auto lg:flex-none"
          >
            <template #share-button>
              <a
                class="flex items-center gap-2 text-base font-normal capitalize duration-300 text-text-gray hover:text-text-green"
              >
                <LazyIconsShareIcon
                  class="fill-icon-header group-hover:fill-white"
                />
                {{ $t('share') }}
              </a>
            </template>
          </LazyCommonShareList>
          <!-- <a
            class="flex items-center text-base font-normal capitalize duration-300 text-text-gray hover:text-text-green"
          >
            <IconsShareIcon class="w-4 h-4 fill-text-gray" />
            {{ $t('share') }}
          </a> -->
        </div>
        <!-- End headtitle -->
        <div class="grid w-full grid-cols-3 gap-2 gap-x-4">
          <div
            class="col-span-4 pr-0 mt-8 lg:col-span-2 ltr:lg:pr-12 rtl:lg:pl-12"
          >
            <div
              class="block overflow-hidden relative bg-slate-200 rounded-lg w-full lg:h-[502px] md:h-[484px] h-[334px]"
            >
              <img
                v-if="blog && blog && blog && blog.blog_image"
                :src="blog.blog_image"
                class="object-cover w-full h-full duration-300 group-hover:scale-110"
                :alt="blog.slug"
              />
              <div
                v-else
                class="object-cover w-full h-full min-h-[200px] flex items-center justify-center bg-gray-100 duration-300 group-hover:scale-110"
              >
                <img
                  src="~/assets/images/logo.svg"
                  class="max-w-[114px] lg:max-w-[156px] md:max-w-[178px]"
                  alt="Estate Book"
                />
              </div>
            </div>

            <!-- End photo -->

            <section class="mt-8 lg:mt-12" v-html="blog.description"></section>

            <nav
              v-if="blog && blog && blog.category"
              class="flex items-center w-full mt-8 mb-6 overflow-hidden overflow-x-scroll lg:flex-wrap"
            >
              <p
                class="flex items-center justify-center w-fit min-w-[128px] h-11 rounded-lg border border-border-list text-sm font-medium text-black capitalize hover:bg-border-list hover:border-border-list duration-150 ltr:mr-2 rtl:ml-2 mt-2 px-2"
              >
                {{ blog.category.name }}
              </p>
            </nav>
            <!-- End List -->
          </div>
          <!-- End Item -->
          <div class="col-span-4 mt-0 lg:mt-8 lg:col-span-1">
            <div class="">
              <h2
                class="text-black font-semibold text-xl lg:text-[22px] capitalize"
              >
                {{ $t('similar_articles') }}
              </h2>
              <nav v-if="similarBlogs">
                <LazyBlogsSideBlogCard
                  v-for="sBlog in similarBlogs"
                  :key="`s-${sBlog.slug}`"
                  :item="sBlog"
                />
              </nav>
            </div>
            <div class="mt-8">
              <h2
                class="text-black font-semibold text-xl lg:text-[22px] capitalize"
              >
                {{ $t('more_reads') }}
              </h2>
              <nav v-if="similarBlogs">
                <LazyBlogsSideBlogCard
                  v-for="sBlog in similarBlogs"
                  :key="`s-${sBlog.slug}`"
                  :item="sBlog"
                />
              </nav>
            </div>
          </div>
          <!-- End Item -->
        </div>
        <!-- End All Items -->

        <LazyBlogsOtherBlogs v-if="similarBlogs" :items="similarBlogs" />
      </div>
    </LazyHydrate>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {}
  },
  async fetch() {
    // const slug =
    //   this.$i18n.locale === 'en'
    //     ? this.$route.params.slug
    //     : encodeURI(this.$route.params.slug)

    this.$store.commit('CHANGE_LOADING', true)
    const blog = await this.$store.dispatch('blog/getBlog', {
      slug: encodeURI(this.$route.params.slug),
      include: ['author', 'category'],
    } as RequestPayload<BlogAllowedInclude[]>)
    await this.$store.dispatch('blog/getBlogs', {
      filters: [{ key: 'category.id', value: blog?.data?.category?.id }],
      per_page: 4,
      include: ['author', 'category'],
    } as RequestPayload<BlogAllowedInclude[]>)
    this.$store.commit('CHANGE_LOADING', false)
  },
  computed: {
    blog() {
      return this.$store.state.blog.blog
    },
    similarBlogs() {
      return this.$store.state.blog.blogs
    },
    loading() {
      return this.$store.state.loading
    },
  },
})
</script>
