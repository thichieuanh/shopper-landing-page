<template>
  <v-container fluid>
    <!-- HEADING -->
    <v-row class="flex-column align-center justify-center">
      <h2 class="mb-4">Top month Sellers</h2>
    </v-row>

    <!-- TABS -->
    <v-row>
      <v-tabs centered color="red accent-2">
        <v-tab v-for="item in items" :key="item"> {{ item }} </v-tab>
        <v-tab-item v-for="n in 3" :key="n" class="mx-16">
          <v-container fluid>
            <v-row>
              <v-col v-for="i in 6" :key="i" cols="12" md="3">
                <product></product>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-row>
  </v-container>
</template>

<script>
import Product from '@/components/HomePage/Product.vue';

export default {
  name: 'TopSellers',
  components: { Product },

  data() {
    return {
      tab: null,
      items: ['Women', 'Men', 'Kids'],
    };
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  transition: transform 0.3s ease-out;
  &:hover .v-image {
    transform: translatex(-0.2em);
  }
  &:hover .shop-icon {
    transform: translatex(0.2em);
  }
}

.card-circle {
  background: #ff6f61;
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
  color: white;
  text-align: center;
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
}
</style>
