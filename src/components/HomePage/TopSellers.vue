<template>
  <section id="top-sellers">
    <div class="container-control">
      <!-- HEADING -->
      <v-row class="flex-column align-center justify-center">
        <h2 class="mb-4">Top month Sellers</h2>
      </v-row>

      <!-- TABS -->
      <v-tabs centered color="red accent-2">
        <v-tab v-for="item in tabItems" :key="item">
          {{ item }}
        </v-tab>

        <v-tab-item
          v-for="n in 3"
          :key="n"
          class="my-16"
          transition="fade-transition"
        >
          <v-row>
            <v-col
              v-for="(item, index) in womenProducts"
              :key="index"
              cols="12"
              md="3"
              class="px-4 py-10"
            >
              <product
                :imgUrl="item.images.img"
                :imgOnHoverUrl="item.images.imgOnHover"
                :category="item.category"
                :productName="item.name"
                :price="'$' + item.pricing.price"
                :discountedPrice="discountedPrice(item)"
                :isNew="item.isNew"
                :isSale="isSale(item)"
                :badgeText="item.isNew ? 'NEW' : isSale(item) ? 'SALE' : ''"
              ></product>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs>

      <!-- DISCOVER MORE -->
      <div class="text-center underline-wrapper">
        <a class="link-underline" href="#!">Discover more</a>
        <div class="line"></div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import Product from '@/components/HomePage/Product.vue';

export default {
  name: 'TopSellers',
  components: { Product },

  data() {
    return {
      tabItems: ['Women', 'Men', 'Kids'],
    };
  },

  computed: {
    ...mapState(['womenProducts']),
  },

  methods: {
    isSale(item) {
      if (item.pricing.discount) return true;
    },
    isNew(arrray, idx) {
      if (arrray[idx].isNew) return true;
    },
    discountedPrice(item) {
      return item.pricing.discount
        ? '$' + (item.pricing.price * (1 - item.pricing.discount)).toFixed(2)
        : '';
    },
  },

  async mounted() {
    await this.$store.dispatch('getProducts');
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
