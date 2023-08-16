<template>
  <div class="container px-3 mt-8 lg:mt-10">
    <CommonPageBreadcrumb
      :breadcrumb-links="[
        {
          id: 1,
          name: $t('home'),
          link: localePath('/'),
          active: false,
        },
        {
          id: 2,
          name: $t('compare'),
          link: localePath('/compare'),
          active: true,
        },
      ]"
    />
    <div class="items-center justify-between block mt-5 lg:flex lg:mb-5">
      <h1 class="text-xl font-semibold text-black capitalize lg:text-2xl">
        {{ $t('compare_list') }}
      </h1>

      <!-- <div class="items-center block mt-6 md:flex lg:mt-0">
        <div
          class="flex items-center justify-center p-3 mt-2 bg-white border rounded-lg h-11 border-border-list lg:w-48 md:mt-0"
        >
          <input
            type="checkbox"
            class="required:border-red-500 ltr:mr-3 rtl:ml-3"
          />
          <p class="text-xs font-normal text-text-gray">
            Only show differences
          </p>
        </div>
      </div> -->
    </div>
    <!-- End headtitle -->
    <CommonPagePreloader v-if="loading" />
    <template v-else>
      <div v-if="compareType === 'units'">
        <CommonLoadersLoaderLayout :data-length="items.length">
          <div
            v-if="items.length > 0"
            class="w-full max-w-2xl overflow-x-auto md:max-w-5xl lg:max-w-full"
          >
            <div class="flex flex-col gap-4 w-full lg:min-w-full min-w-[800px]">
              <div
                class="grid w-full gap-4"
                :class="{
                  'grid-cols-4': items.length === 4,
                  'grid-cols-3': items.length === 3,
                  'grid-cols-2': items.length === 2,
                  'grid-cols-1': items.length === 1,
                }"
              >
                <div
                  v-for="u in items"
                  :key="`image-${u.id}`"
                  class="relative w-full min-h-[160px] h-full overflow-hidden rounded-t-[10px] flex flex-col justify-between gap-4"
                >
                  <a
                    class="absolute z-30 flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full cursor-pointer top-4 right-5"
                    @click="removeCompareItem(u)"
                  >
                    <IconsCloseIcon2 class="w-3 h-3 text-white fill-white" />
                  </a>
                  <NuxtLink
                    :to="localePath(`/units/${u.slug}`)"
                    class="relative flex w-full h-44"
                  >
                    <CommonImageOnError
                      :image="u.main_image"
                      class="flex items-center justify-center overflow-hidden rounded-t-lg"
                      type="image"
                      img-class="object-cover !w-full min-h-[200px] h-full duration-150 group-hover:scale-110"
                    />
                    <div
                      class="absolute z-30 flex items-center justify-center w-12 h-12 overflow-hidden bg-white rounded-full ltr:-translate-x-1/2 -bottom-5 drop-shadow-shadcom inset-x-1/2 rtl:translate-x-1/2"
                    >
                      <CommonImageOnError
                        v-if="u.project"
                        :image="u.project.logo"
                        parent-class="w-full h-full"
                        class="w-full h-full"
                        img-class="object-cover object-center w-full h-full max-w-full max-h-full"
                      />
                    </div>
                  </NuxtLink>
                  <h2
                    class="mt-1 text-xl font-semibold text-center text-black capitalize"
                  >
                    {{ u.title ? u.title : '---' }}
                  </h2>
                  <a
                    class="flex items-center justify-center px-4 mt-4 ml-auto mr-auto text-xs font-medium text-black capitalize duration-150 border rounded-lg cursor-pointer w-52 h-9 border-text-green hover:bg-text-green hover:text-white group"
                    :class="{
                      '!pointer-events-none !bg-gray-50 !text-gray-300 !fill-gray-300 !border-gray-300': true,
                    }"
                  >
                    <IconsDownloadIcon
                      class="duration-150 fill-black group-hover:fill-white ltr:mr-2 rtl:ml-2"
                      :class="{ '!fill-gray-300': true }"
                    />

                    {{ $t('download_brochoure') }}
                  </a>
                </div>
              </div>
              <div
                class="flex items-center justify-start w-full px-4 py-4 mt-4 bg-bg-icons"
              >
                <p class="text-xl font-semibold text-black capitalize">
                  {{ $t('start_price') }}
                </p>
              </div>
              <div
                class="grid w-full gap-4"
                :class="{
                  'grid-cols-4': items.length === 4,
                  'grid-cols-3': items.length === 3,
                  'grid-cols-2': items.length === 2,
                  'grid-cols-1': items.length === 1,
                }"
              >
                <div
                  v-for="u in items"
                  :key="`price-${u.id}`"
                  class="flex items-center justify-center w-full py-4 text-base font-normal text-black ltr:border-r-2 border-border-input ltr:last:border-r-0 ltr:last:border-l-0 rtl:border-l-2 rtl:last:border-r-0 rtl:last:border-l-0"
                >
                  {{
                    u.price
                      ? parseFloat(u.price).toLocaleString() + ' ' + $t('EGP')
                      : '---'
                  }}
                </div>
              </div>
              <div
                class="flex items-center justify-start w-full px-4 py-4 bg-bg-icons"
              >
                <p class="text-xl font-semibold text-black capitalize">
                  {{ $t('min_down_payment') }}
                </p>
              </div>
              <div
                class="grid w-full gap-4"
                :class="{
                  'grid-cols-4': items.length === 4,
                  'grid-cols-3': items.length === 3,
                  'grid-cols-2': items.length === 2,
                  'grid-cols-1': items.length === 1,
                }"
              >
                <div
                  v-for="u in items"
                  :key="`min-payment-${u.id}`"
                  class="flex items-center justify-center w-full py-4 text-base font-normal text-black ltr:border-r-2 border-border-input ltr:last:border-r-0 ltr:last:border-l-0 rtl:border-l-2 rtl:last:border-r-0 rtl:last:border-l-0"
                >
                  {{
                    u.min_down_payment
                      ? parseFloat(u.min_down_payment).toLocaleString() +
                        ' ' +
                        $t('EGP')
                      : '---'
                  }}
                </div>
              </div>
              <div
                class="flex items-center justify-start w-full px-4 py-4 bg-bg-icons"
              >
                <p class="text-xl font-semibold text-black capitalize">
                  {{ $t('min_month_payment') }}
                </p>
              </div>
              <div
                class="grid w-full gap-4"
                :class="{
                  'grid-cols-4': items.length === 4,
                  'grid-cols-3': items.length === 3,
                  'grid-cols-2': items.length === 2,
                  'grid-cols-1': items.length === 1,
                }"
              >
                <div
                  v-for="u in items"
                  :key="`min-month-${u.id}`"
                  class="flex items-center justify-center w-full py-4 text-base font-normal text-black ltr:border-r-2 border-border-input ltr:last:border-r-0 ltr:last:border-l-0 rtl:border-l-2 rtl:last:border-r-0 rtl:last:border-l-0"
                >
                  {{
                    u.min_month_payment
                      ? parseFloat(u.min_month_payment).toLocaleString() +
                        ' ' +
                        $t('EGP')
                      : '---'
                  }}
                  / {{ $t('per_month') }}
                </div>
              </div>
              <div
                class="flex items-center justify-start w-full px-4 py-4 bg-bg-icons"
              >
                <p class="text-xl font-semibold text-black capitalize">
                  {{ $t('property_type') }}
                </p>
              </div>
              <div
                class="grid w-full gap-4"
                :class="{
                  'grid-cols-4': items.length === 4,
                  'grid-cols-3': items.length === 3,
                  'grid-cols-2': items.length === 2,
                  'grid-cols-1': items.length === 1,
                }"
              >
                <div
                  v-for="u in items"
                  :key="`unit-type-${u.id}`"
                  class="flex items-center justify-center w-full py-4 text-base font-normal text-black ltr:border-r-2 border-border-input ltr:last:border-r-0 ltr:last:border-l-0 rtl:border-l-2 rtl:last:border-r-0 rtl:last:border-l-0"
                >
                  {{ u.unitType && u.unitType.name ? u.unitType.name : '---' }}
                </div>
              </div>
              <div
                class="flex items-center justify-start w-full px-4 py-4 bg-bg-icons"
              >
                <p class="text-xl font-semibold text-black capitalize">
                  {{ $t('unit_type') }}
                </p>
              </div>
              <div
                class="grid w-full gap-4"
                :class="{
                  'grid-cols-4': items.length === 4,
                  'grid-cols-3': items.length === 3,
                  'grid-cols-2': items.length === 2,
                  'grid-cols-1': items.length === 1,
                }"
              >
                <div
                  v-for="u in items"
                  :key="`sale-type-${u.id}`"
                  class="flex items-center justify-center w-full py-4 text-base font-normal text-black ltr:border-r-2 border-border-input ltr:last:border-r-0 ltr:last:border-l-0 rtl:border-l-2 rtl:last:border-r-0 rtl:last:border-l-0"
                >
                  <!-- {{ u.sale_type ? u.sale_type : '---' }} -->
                  {{
                    u?.sale_type.replace(
                      new RegExp('\\b' + 'sale' + '\\b'),
                      $t('primary')
                    )
                  }}
                </div>
              </div>
              <div
                class="flex items-center justify-start w-full px-4 py-4 bg-bg-icons"
              >
                <p class="text-xl font-semibold text-black capitalize">
                  {{ $t('area') }}
                </p>
              </div>
              <div
                class="grid w-full gap-4"
                :class="{
                  'grid-cols-4': items.length === 4,
                  'grid-cols-3': items.length === 3,
                  'grid-cols-2': items.length === 2,
                  'grid-cols-1': items.length === 1,
                }"
              >
                <div
                  v-for="u in items"
                  :key="`area-${u.id}`"
                  class="flex items-center justify-center w-full py-4 text-base font-normal text-black ltr:border-r-2 border-border-input ltr:last:border-r-0 ltr:last:border-l-0 rtl:border-l-2 rtl:last:border-r-0 rtl:last:border-l-0"
                >
                  {{ u.area ? parseFloat(u.area).toLocaleString() : '---' }}
                  {{ $t('m_2') }} <sup>2</sup>
                </div>
              </div>
              <div
                class="flex items-center justify-start w-full px-4 py-4 bg-bg-icons"
              >
                <p class="text-xl font-semibold text-black capitalize">
                  {{ $t('description') }}
                </p>
              </div>
              <div
                class="grid w-full gap-4"
                :class="{
                  'grid-cols-4': items.length === 4,
                  'grid-cols-3': items.length === 3,
                  'grid-cols-2': items.length === 2,
                  'grid-cols-1': items.length === 1,
                }"
              >
                <div
                  v-for="u in items"
                  :key="`short-description-${u.id}`"
                  class="flex items-center justify-center w-full px-4 py-4 text-base font-normal text-center text-black ltr:border-r-2 border-border-input ltr:last:border-r-0 ltr:last:border-l-0 rtl:border-l-2 rtl:last:border-r-0 rtl:last:border-l-0"
                >
                  {{ u.short_description ? u.short_description : '---' }}
                </div>
              </div>
              <div
                class="flex items-center justify-start w-full px-4 py-4 bg-bg-icons"
              >
                <p class="text-xl font-semibold text-black capitalize">
                  {{ $t('developer') }}
                </p>
              </div>
              <div
                class="grid w-full gap-4"
                :class="{
                  'grid-cols-4': items.length === 4,
                  'grid-cols-3': items.length === 3,
                  'grid-cols-2': items.length === 2,
                  'grid-cols-1': items.length === 1,
                }"
              >
                <!-- TODO:----------------------- -->
                <div
                  v-for="u in items"
                  :key="`developer-${u.id}`"
                  class="flex items-center justify-center w-full py-4 text-base font-normal text-black ltr:border-r-2 border-border-input ltr:last:border-r-0 ltr:last:border-l-0 rtl:border-l-2 rtl:last:border-r-0 rtl:last:border-l-0"
                >
                  <div class="flex items-center gap-x-3">
                    <div
                      class="flex items-center justify-center w-12 h-12 overflow-hidden rounded-full"
                    >
                      <img
                        :src="u.developer.logo"
                        alt=""
                        class="object-cover object-center w-full h-full"
                      />
                    </div>
                    <nuxt-link
                      v-if="u.developer"
                      :to="localePath(`/developers/${u.developer.slug}`)"
                      class="underline"
                      >{{
                        u.developer && u.developer.name
                          ? u.developer.name
                          : '---'
                      }}</nuxt-link
                    >
                  </div>
                </div>
              </div>
              <div
                class="flex items-center justify-start w-full px-4 py-4 bg-bg-icons"
              >
                <p class="text-xl font-semibold text-black capitalize">
                  {{ $t('project') }}
                </p>
              </div>
              <div
                class="grid w-full gap-4"
                :class="{
                  'grid-cols-4': items.length === 4,
                  'grid-cols-3': items.length === 3,
                  'grid-cols-2': items.length === 2,
                  'grid-cols-1': items.length === 1,
                }"
              >
                <div
                  v-for="u in items"
                  :key="`project-${u.id}`"
                  class="flex items-center justify-center w-full py-4 text-base font-normal text-black ltr:border-r-2 border-border-input ltr:last:border-r-0 ltr:last:border-l-0 rtl:border-l-2 rtl:last:border-r-0 rtl:last:border-l-0"
                >
                  <div class="flex items-center gap-x-3">
                    <div
                      class="flex items-center justify-center w-12 h-12 overflow-hidden rounded-full"
                    >
                      <img
                        :src="u.project.logo"
                        alt=""
                        class="object-cover object-center w-full h-full"
                      />
                    </div>
                    <nuxt-link
                      v-if="u.project"
                      :to="localePath(`/projectss/${u.project.slug}`)"
                      class="underline"
                      >{{ u.project ? u.project.name : '---' }}</nuxt-link
                    >
                  </div>
                </div>
              </div>
              <div
                class="flex items-center justify-start w-full px-4 py-4 bg-bg-icons"
              >
                <p class="text-xl font-semibold text-black capitalize">
                  {{ $t('location') }}
                </p>
              </div>
              <div
                class="grid w-full gap-4"
                :class="{
                  'grid-cols-4': items.length === 4,
                  'grid-cols-3': items.length === 3,
                  'grid-cols-2': items.length === 2,
                  'grid-cols-1': items.length === 1,
                }"
              >
                <div
                  v-for="u in items"
                  :key="`address-${u.id}`"
                  class="flex items-center justify-center w-full py-4 text-base font-normal text-center text-black ltr:border-r-2 border-border-input ltr:last:border-r-0 ltr:last:border-l-0 rtl:border-l-2 rtl:last:border-r-0 rtl:last:border-l-0"
                >
                  <div class="flex items-center gap-x-3">
                    {{ u.address ? u.address : '---' }}
                    <a
                      v-if="u.lat && u.lng"
                      :href="`https://www.google.com/maps/search/?api=1&query=${u.lat},${u.lng}`"
                      target="_blank"
                      class="flex items-center justify-center h-8 gap-2 text-xs font-semibold capitalize border border-green-600 rounded-lg group group1 shrink-0 hover:text-white hover:bg-text-green w-36"
                    >
                      <IconsMapIcon
                        class="duration-300 fill-black group-hover:fill-white"
                      />
                      {{ $t('view_on_map') }}
                    </a>
                  </div>
                </div>
              </div>
              <div
                class="flex items-center justify-start w-full px-4 py-4 bg-bg-icons"
              >
                <p class="text-xl font-semibold text-black capitalize">
                  {{ $t('amenities') }}
                </p>
              </div>
              <div
                class="grid w-full gap-4"
                :class="{
                  'grid-cols-4': items.length === 4,
                  'grid-cols-3': items.length === 3,
                  'grid-cols-2': items.length === 2,
                  'grid-cols-1': items.length === 1,
                }"
              >
                <div
                  v-for="u in items"
                  :key="`amenity-${u.id}`"
                  class="flex w-full py-2 ltr:border-r-2 border-border-input ltr:last:border-r-0 ltr:last:border-l-0 rtl:border-l-2 rtl:last:border-r-0 rtl:last:border-l-0"
                >
                  <div
                    v-if="u.amenities && u.amenities.length > 0"
                    class="grid grid-col-3"
                  >
                    <div
                      v-for="amn in u.amenities"
                      :key="`amen-${amn.name}`"
                      class="min-w-[74px] max-w-[74px] ltrtl:mr-5 ltr:ml-5 flex items-center gap-1 flex-col"
                    >
                      <div
                        class="flex items-center justify-center w-full h-[72px] drop-shadow-formrequest rounded-lg border border-border-list"
                      >
                        <CommonImageOnError
                          :image="amn.logo"
                          img-class="w-10 h-10"
                        />
                      </div>
                      <h4 class="text-sm font-normal text-center text-black">
                        {{ amn.name }}
                      </h4>
                    </div>
                  </div>
                  <p v-else class="text-sm font-normal text-black">
                    {{ '---' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CommonLoadersLoaderLayout>
      </div>
      <div v-if="compareType === 'projects'">
        <CommonLoadersLoaderLayout :data-length="items.length">
          <div
            v-if="items.length > 0"
            class="w-full max-w-2xl overflow-x-auto md:max-w-5xl lg:max-w-full"
          >
            <div class="flex flex-col gap-4 w-full lg:min-w-full min-w-[800px]">
              <div
                class="grid w-full gap-4"
                :class="{
                  'grid-cols-4': items.length === 4,
                  'grid-cols-3': items.length === 3,
                  'grid-cols-2': items.length === 2,
                  'grid-cols-1': items.length === 1,
                }"
              >
                <div
                  v-for="u in items"
                  :key="`image-${u.id}`"
                  class="relative w-full min-h-[160px] h-full overflow-hidden rounded-t-[10px] flex flex-col justify-between gap-4"
                >
                  <a
                    class="absolute z-30 flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full cursor-pointer top-4 right-5"
                    @click="removeCompareItem(u)"
                  >
                    <IconsCloseIcon2 class="w-3 h-3 text-white fill-white" />
                  </a>
                  <NuxtLink
                    :to="localePath(`/projects/${u.slug}`)"
                    class="relative flex w-full h-44"
                  >
                    <CommonImageOnError
                      :image="u.images[0]"
                      class="w-full h-full overflow-hidden rounded-t-lg"
                      img-class="object-cover !w-full min-h-[200px] h-full duration-150 group-hover:scale-110"
                    />
                    <div
                      class="absolute z-30 flex items-center justify-center w-12 h-12 overflow-hidden bg-white rounded-full ltr:-translate-x-1/2 -bottom-5 drop-shadow-shadcom inset-x-1/2 rtl:translate-x-1/2"
                    >
                      <CommonImageOnError
                        :image="u.logo"
                        parent-class="w-full h-full"
                        class="w-full h-full"
                        img-class="object-cover object-center w-full h-full max-w-full max-h-full"
                      />
                    </div>
                  </NuxtLink>
                  <h2
                    class="mt-1 text-xl font-semibold text-center text-black capitalize"
                  >
                    {{ u.name ? u.name : '---' }}
                  </h2>
                  <a
                    class="flex items-center justify-center px-4 mt-4 ml-auto mr-auto text-xs font-medium text-black capitalize duration-150 border rounded-lg cursor-pointer w-52 h-9 border-text-green hover:bg-text-green hover:text-white group"
                    :class="{
                      '!pointer-events-none !bg-gray-50 !text-gray-300 !fill-gray-300 !border-gray-300': true,
                    }"
                  >
                    <IconsDownloadIcon
                      class="duration-150 fill-black group-hover:fill-white ltr:mr-2 rtl:ml-2"
                      :class="{ '!fill-gray-300': true }"
                    />

                    {{ $t('download_brochoure') }}
                  </a>
                </div>
              </div>
              <div
                class="flex items-center justify-start w-full px-4 py-4 mt-4 bg-bg-icons"
              >
                <p class="text-xl font-semibold text-black capitalize">
                  {{ $t('start_price') }}
                </p>
              </div>
              <div
                class="grid w-full gap-4"
                :class="{
                  'grid-cols-4': items.length === 4,
                  'grid-cols-3': items.length === 3,
                  'grid-cols-2': items.length === 2,
                  'grid-cols-1': items.length === 1,
                }"
              >
                <div
                  v-for="u in items"
                  :key="`price-${u.id}`"
                  class="flex items-center justify-center w-full py-4 text-base font-normal text-black ltr:border-r-2 border-border-input ltr:last:border-r-0 ltr:last:border-l-0 rtl:border-l-2 rtl:last:border-r-0 rtl:last:border-l-0"
                >
                  {{
                    u.start_price
                      ? parseFloat(u.start_price).toLocaleString() +
                        ' ' +
                        $t('EGP')
                      : '---'
                  }}
                </div>
              </div>
              <div
                class="flex items-center justify-start w-full px-4 py-4 bg-bg-icons"
              >
                <p class="text-xl font-semibold text-black capitalize">
                  {{ $t('min_down_payment') }}
                </p>
              </div>
              <div
                class="grid w-full gap-4"
                :class="{
                  'grid-cols-4': items.length === 4,
                  'grid-cols-3': items.length === 3,
                  'grid-cols-2': items.length === 2,
                  'grid-cols-1': items.length === 1,
                }"
              >
                <div
                  v-for="u in items"
                  :key="`min-payment-${u.id}`"
                  class="flex items-center justify-center w-full py-4 text-base font-normal text-black ltr:border-r-2 border-border-input ltr:last:border-r-0 ltr:last:border-l-0 rtl:border-l-2 rtl:last:border-r-0 rtl:last:border-l-0"
                >
                  {{
                    u.min_down_payment
                      ? parseFloat(u.min_down_payment).toLocaleString() +
                        ' ' +
                        $t('EGP')
                      : '---'
                  }}
                </div>
              </div>
              <div
                class="flex items-center justify-start w-full px-4 py-4 bg-bg-icons"
              >
                <p class="text-xl font-semibold text-black capitalize">
                  {{ $t('min_month_payment') }}
                </p>
              </div>
              <div
                class="grid w-full gap-4"
                :class="{
                  'grid-cols-4': items.length === 4,
                  'grid-cols-3': items.length === 3,
                  'grid-cols-2': items.length === 2,
                  'grid-cols-1': items.length === 1,
                }"
              >
                <div
                  v-for="u in items"
                  :key="`min-month-${u.id}`"
                  class="flex items-center justify-center w-full py-4 text-base font-normal text-black ltr:border-r-2 border-border-input ltr:last:border-r-0 ltr:last:border-l-0 rtl:border-l-2 rtl:last:border-r-0 rtl:last:border-l-0"
                >
                  {{
                    u.min_month_payment
                      ? parseFloat(u.min_month_payment).toLocaleString() +
                        ' ' +
                        $t('EGP')
                      : '---'
                  }}
                  / {{ $t('per_month') }}
                </div>
              </div>
              <div
                class="flex items-center justify-start w-full px-4 py-4 bg-bg-icons"
              >
                <p class="text-xl font-semibold text-black capitalize">
                  {{ $t('property_type') }}
                </p>
              </div>
              <div
                class="grid w-full gap-4"
                :class="{
                  'grid-cols-4': items.length === 4,
                  'grid-cols-3': items.length === 3,
                  'grid-cols-2': items.length === 2,
                  'grid-cols-1': items.length === 1,
                }"
              >
                <div
                  v-for="u in items"
                  :key="`unit-type-${u.id}`"
                  class="flex items-center justify-center w-full py-4 text-base font-normal text-black ltr:border-r-2 border-border-input ltr:last:border-r-0 ltr:last:border-l-0 rtl:border-l-2 rtl:last:border-r-0 rtl:last:border-l-0"
                >
                  <span v-for="ut in u.unit_types" :key="`unit-type-${ut.id}`">
                    {{ ut.name }},
                  </span>
                </div>
              </div>
              <div
                class="flex items-center justify-start w-full px-4 py-4 bg-bg-icons"
              >
                <p class="text-xl font-semibold text-black capitalize">
                  {{ $t('description') }}
                </p>
              </div>
              <div
                class="grid w-full gap-4"
                :class="{
                  'grid-cols-4': items.length === 4,
                  'grid-cols-3': items.length === 3,
                  'grid-cols-2': items.length === 2,
                  'grid-cols-1': items.length === 1,
                }"
              >
                <div
                  v-for="u in items"
                  :key="`short-description-${u.id}`"
                  class="flex items-center justify-center w-full px-4 py-4 text-base font-normal text-center text-black ltr:border-r-2 border-border-input ltr:last:border-r-0 ltr:last:border-l-0 rtl:border-l-2 rtl:last:border-r-0 rtl:last:border-l-0"
                >
                  {{ u.description ? u.description : '---' }}
                </div>
              </div>
              <div
                class="flex items-center justify-start w-full px-4 py-4 bg-bg-icons"
              >
                <p class="text-xl font-semibold text-black capitalize">
                  {{ $t('developer') }}
                </p>
              </div>
              <div
                class="grid w-full gap-4"
                :class="{
                  'grid-cols-4': items.length === 4,
                  'grid-cols-3': items.length === 3,
                  'grid-cols-2': items.length === 2,
                  'grid-cols-1': items.length === 1,
                }"
              >
                <div
                  v-for="u in items"
                  :key="`developer-${u.id}`"
                  class="flex items-center justify-center w-full py-4 text-base font-normal text-black ltr:border-r-2 border-border-input ltr:last:border-r-0 ltr:last:border-l-0 rtl:border-l-2 rtl:last:border-r-0 rtl:last:border-l-0"
                >
                  <div class="flex items-center gap-x-3">
                    <div
                      class="flex items-center justify-center w-12 h-12 overflow-hidden rounded-full"
                    >
                      <img
                        :src="u.logo"
                        alt=""
                        class="object-cover object-center w-full h-full"
                      />
                    </div>
                    <nuxt-link
                      v-if="u.developer"
                      :to="localePath(`/developers/${u.developer.slug}`)"
                      class="underline"
                      >{{
                        u.developer && u.developer.name
                          ? u.developer.name
                          : '---'
                      }}</nuxt-link
                    >
                  </div>
                </div>
              </div>
              <div
                class="flex items-center justify-start w-full px-4 py-4 bg-bg-icons"
              >
                <p class="text-xl font-semibold text-black capitalize">
                  {{ $t('location') }}
                </p>
              </div>
              <div
                class="grid w-full gap-4"
                :class="{
                  'grid-cols-4': items.length === 4,
                  'grid-cols-3': items.length === 3,
                  'grid-cols-2': items.length === 2,
                  'grid-cols-1': items.length === 1,
                }"
              >
                <div
                  v-for="u in items"
                  :key="`address-${u.id}`"
                  class="flex items-center justify-center w-full py-4 text-base font-normal text-center text-black ltr:border-r-2 border-border-input ltr:last:border-r-0 ltr:last:border-l-0 rtl:border-l-2 rtl:last:border-r-0 rtl:last:border-l-0"
                >
                  {{ u.location ? `${u.address}, ${u.location.name}` : '---' }}
                </div>
              </div>
              <div
                class="flex items-center justify-start w-full px-4 py-4 bg-bg-icons"
              >
                <p class="text-xl font-semibold text-black capitalize">
                  {{ $t('amenities') }}
                </p>
              </div>
              <div
                class="grid w-full gap-4"
                :class="{
                  'grid-cols-4': items.length === 4,
                  'grid-cols-3': items.length === 3,
                  'grid-cols-2': items.length === 2,
                  'grid-cols-1': items.length === 1,
                }"
              >
                <div
                  v-for="u in items"
                  :key="`amenity-${u.id}`"
                  class="grid grid-cols-1 gap-4 py-2 md:grid-cols-2 lg:grid-cols-3 ltr:border-r-2 border-border-input ltr:last:border-r-0 ltr:last:border-l-0 rtl:border-l-2 rtl:last:border-r-0 rtl:last:border-l-0"
                >
                  <template v-if="u.amenities && u.amenities.length > 0">
                    <div
                      v-for="amn in u.amenities"
                      :key="`amen-${amn.name}`"
                      class="min-w-[74px] max-w-[74px]"
                    >
                      <div
                        class="flex items-center justify-center w-full h-[72px] drop-shadow-formrequest rounded-lg border border-border-list"
                      >
                        <CommonImageOnError
                          :image="amn.logo"
                          img-class="w-10 h-10"
                          parent-class="flex items-center justify-center w-full h-full"
                        />
                      </div>
                      <h4 class="text-sm font-normal text-center text-black">
                        {{ amn.name }}
                      </h4>
                    </div>
                  </template>
                  <p v-else class="text-sm font-normal text-black">
                    {{ '---' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CommonLoadersLoaderLayout>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    items() {
      return this.$store.state.compare.items as Unit[] | Project[]
    },
    loading(): boolean {
      return this.$store.state.loading
    },
    compareType() {
      return this.$store.state.compare.compare_type
    },
  },
  mounted() {
    this.$store.commit('CHANGE_LOADING', true)
    this.$store.dispatch('compare/init')
    const items = this.$auth.$storage.getLocalStorage('compare_ids')
    this.$store.commit('compare/SET_LOCALESOTRAGE_ITEMS', items)
    this.$store.commit('compare/SET_LOCALESTORAGE_ITEMS_COUNT', items.length)
    this.$store.commit('CHANGE_LOADING', false)
    // }
  },
  methods: {
    removeCompareItem(item: Unit | Project) {
      this.$store.dispatch('compare/removeItem', item)
    },
  },
})
</script>
