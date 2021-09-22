<template>
  <v-main>
    <cover></cover>
    <best-picks></best-picks>
    <top-sellers></top-sellers>
    <countdown-banner></countdown-banner>
    <reviews></reviews>
  </v-main>
</template>

<script>
import Cover from '@/components/HomePage/Cover';
import BestPicks from '@/components/HomePage/BestPicks.vue';
import TopSellers from '@/components/HomePage/TopSellers.vue';
import CountdownBanner from '@/components/HomePage/Countdown/CountdownBanner.vue';
import Reviews from '@/components/HomePage/Reviews.vue';

export default {
  name: 'Home',

  components: { Cover, BestPicks, TopSellers, CountdownBanner, Reviews },

  data: () => ({}),
};
</script>

<style lang="scss" scoped>
</style>
