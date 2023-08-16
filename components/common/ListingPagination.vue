<template>
  <div class="flex items-center justify-center w-full gap-2 py-4 lg:gap-3">
    <div
      class="flex items-center justify-center w-10 h-10 bg-white border rounded-full cursor-pointer border-border-list hover:bg-[#74D8AF] hover:border-[#74D8AF] transition-all duration-300 hover:text-white text-[#BEBEBE] shrink-0"
      :class="{
        '!bg-gray-50 !pointer-events-none !cursor-not-allowed':
          currentPage == 1,
      }"
      @click="onClickPreviousPage"
    >
      <template v-if="$i18n.locale === 'en'">
        <LazyIconsLeftArrowCheveronIcon />
      </template>
      <template v-else>
        <LazyIconsRightArrowCheveronIcon />
      </template>
    </div>
    <div
      v-if="currentPage !== 1"
      class="flex items-center justify-center w-fit h-10 lg:text-sm text-sm text-black bg-white border rounded-full cursor-pointer border-border-list hover:bg-[#74D8AF] hover:border-[#74D8AF] transition-all duration-300 hover:text-white px-4 font-medium"
      @click="onClickFirstPage"
    >
      {{ $t('first') }}
    </div>
    <div v-for="page in pages" :key="`n-${page.name}`">
      <div
        v-if="page.name > 0"
        class="flex items-center shrink-0 justify-center w-10 h-10 text-sm text-black bg-white border rounded-full cursor-pointer border-border-list hover:bg-[#74D8AF] hover:border-[#74D8AF] transition-all duration-300 hover:text-white font-medium"
        :class="{
          '!border-[#74D8AF] !text-white !bg-[#74D8AF] pointer-events-none':
            page.isDisabled,
        }"
        @click="onClickPage(page.name)"
      >
        {{
          $numberFormat(
            page.name,
            $i18n.locale === 'en' ? 'en-US' : 'ar-EG',
            true
          )
        }}
      </div>
    </div>
    <div
      v-if="currentPage !== totalPages"
      class="flex items-center justify-center w-fit h-10 text-sm text-black bg-white border rounded-full cursor-pointer border-border-list hover:bg-[#74D8AF] hover:border-[#74D8AF] transition-all duration-300 hover:text-white px-4 font-medium"
      @click="onClickLastPage"
    >
      {{ $t('last') }}
    </div>
    <div
      class="flex items-center justify-center w-10 h-10 bg-white border rounded-full cursor-pointer border-border-list hover:bg-[#74D8AF] hover:border-[#74D8AF] transition-all duration-300 hover:text-white text-[#BEBEBE] shrink-0"
      :class="{
        '!bg-gray-50 !pointer-events-none !cursor-not-allowed':
          totalPages == currentPage,
      }"
      @click="onClickNextPage"
    >
      <template v-if="$i18n.locale === 'en'">
        <LazyIconsRightArrowCheveronIcon />
      </template>
      <template v-else>
        <LazyIconsLeftArrowCheveronIcon />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from 'vue'

export default defineComponent({
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: false,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    refs: {
      type: null,
      default: null,
      required: false,
    },
    enableRouting: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    startPage(): number {
      if (this.currentPage === 1) {
        return 1
      }
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1
      }
      return this.currentPage - 1
    },
    pages(): PaginationRange[] {
      const range = []

      for (
        let i = this.startPage;
        i <=
        Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
        i++
      ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        })
      }
      return range
    },
  },
  methods: {
    onClickPreviousPage(): void {
      this.moveWindow(this.currentPage - 1)
      this.$emit('pagechanged', this.currentPage - 1)
    },
    onClickFirstPage(): void {
      this.moveWindow(1)
      this.$emit('pagechanged', 1)
    },
    onClickPage(page: number): void {
      this.moveWindow(page)
      this.$emit('pagechanged', page)
    },
    onClickLastPage(): void {
      this.moveWindow(this.totalPages)
      this.$emit('pagechanged', this.totalPages)
    },
    onClickNextPage(): void {
      this.moveWindow(this.currentPage + 1)
      this.$emit('pagechanged', this.currentPage + 1)
    },
    moveWindow(page: number) {
      if (this.refs) {
        this.refs.scrollTop = 0
      }

      if (this.enableRouting) {
        this.$router.push({
          query: { page: `${page}` },
        })
        window.scrollTo({
          behavior: 'smooth',
          top: 0,
        })
      }
    },
  },
})
</script>
