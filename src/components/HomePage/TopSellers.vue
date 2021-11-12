<template>
  <section id="top-sellers">
    <div class="container-control">
      <!-- HEADING -->
      <v-row class="flex-column align-center justify-center">
        <h2 class="mb-4">Top month Sellers</h2>
      </v-row>

      <!-- TABS -->
      <div class="text-center mb-10">
        <span
          v-for="(tab, tabIndex) in tabItems"
          :key="tabIndex"
          :class="['tab-list', { active: selectedIndex === tabIndex }]"
          @click="selectedIndex = tabIndex"
        >
          {{ tab }}
        </span>
      </div>

      <div
        :class="['tab-pane fade', { show: selectedIndex === productGroupIdx }]"
        v-for="(productGroup, productGroupIdx) in allProducts"
        :key="productGroupIdx"
      >
        <v-row v-show="selectedIndex === productGroupIdx">
          <v-col
            v-for="(product, productIdx) in productGroup"
            :key="productIdx"
            cols="12"
            md="3"
            class="px-4 py-0 mb-7"
          >
            <Product :productDetails="product"></Product>
          </v-col>
        </v-row>
      </div>

      <!-- DISCOVER MORE -->
      <div class="text-center underline-wrapper mt-7">
        <a class="link-underline" href="#!">Discover more</a>
        <div class="line"></div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import Product from '@/components/HomePage/Product/Product.vue';

export default {
  name: 'TopSellers',
  components: { Product },

  data() {
    return {
      tabItems: ['Women', 'Men', 'Kids'],
      selectedIndex: 0,
      productId: 0,
      selected: '',
    };
  },

  computed: {
    ...mapState('products', ['womenProducts', 'menProducts', 'kidsProducts']),

    allProducts() {
      return [
        [...this.womenProducts],
        [...this.menProducts],
        [...this.kidsProducts],
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  transition: transform 0.4s ease-out;
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

.underline-wrapper {
  position: relative;
  width: 15%;
  text-align: center;
  margin: auto;

  .link-underline {
    font-weight: 500;
  }

  .line {
    position: absolute;
    top: calc(100% + 5px);
    height: 1px;
    width: 100%;
    background: black;
    margin: 0 auto;
    transition: all 0.15s cubic-bezier(0.29, 0.18, 0.26, 0.83);
  }

  &:hover > .line {
    right: 0;
    width: 0%;
  }
}
</style>
