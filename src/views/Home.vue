<template>
  <v-main>
    <cover></cover>
    <best-picks class="pt-12"></best-picks>
  </v-main>
</template>

<script>
import Cover from '@/components/HomePage/Cover';
import BestPicks from '../components/HomePage/BestPicks.vue';

export default {
  name: 'Home',

  components: { Cover, BestPicks },

  data: () => ({}),
};
</script>

<style lang="scss" scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.8;
}

.row {
  margin: 0;
}

.shop-buttons-group {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  margin: auto;
}

.shop-button > .shop-icon {
  transition: transform 0.3s ease-out;
}

.shop-button:hover .shop-icon {
  transform: translatex(0.2em);
}
</style>
