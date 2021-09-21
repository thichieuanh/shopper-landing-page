<template>
  <v-main>
    <cover></cover>
    <best-picks class="py-16"></best-picks>
    <top-sellers class="py-16 pa-0"></top-sellers>
  </v-main>
</template>

<script>
import Cover from '@/components/HomePage/Cover';
import BestPicks from '@/components/HomePage/BestPicks.vue';
import TopSellers from '@/components/HomePage/TopSellers.vue';

export default {
  name: 'Home',

  components: { Cover, BestPicks, TopSellers },

  data: () => ({}),
};
</script>

<style lang="scss" scoped>
</style>
