<template>
  <section>
    <!-- empty case  -->
    <div
      v-if="units.length <= 0"
      class="flex flex-col items-center justify-center gap-4"
    >
      <EmptyEstate />
      <p class="font-medium text-md text-text-gray">
        {{ $t('your_wishlist_is_empty') }}
      </p>
      <NuxtLink :to="localePath('/units')" class="text-xs text-text-green">
        {{ $t('click_here_to_start_browsing') }} {{ $t('units') }}</NuxtLink
      >
    </div>

    <section
      v-else
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <UnitsUnitCard
        v-for="(unit, i) in units"
        :key="'unit' + i"
        :unit="unit"
        local-storage-fav
        @click.native="$router.push(localePath(`/units/${unit.slug}`))"
      />
    </section>
  </section>
</template>

<script>
import EmptyEstate from '~/components/icons/emptyStates/EmptyWishlist.vue'
export default {
  name: 'UnitsList',
  components: {
    EmptyEstate,
  },
  data() {
    return {
      // units: null,
    }
  },
  computed: {
    units() {
      return this.$store.state.wishlist.units
    },
  },
  mounted() {
    this.$store.dispatch('wishlist/GET_UNITS')
  },
}
</script>

<style></style>
