<template>
  <section id="top-sellers">
    <div class="container-control my-16">
      <!-- HEADING -->
      <v-row class="flex-column align-center justify-center">
        <h2 class="mb-4">Top month Sellers</h2>
      </v-row>

      <!-- TABS -->
      <v-tabs centered color="red accent-2">
        <v-tab v-for="item in items" :key="item">
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
                :imgUrl="womenProducts[index].img"
                :imgOnHoverUrl="womenProducts[index].imgOnHover"
                :category="womenProducts[index].category"
                :productName="womenProducts[index].name"
                :price="womenProducts[index].price"
                :discountedPrice="womenProducts[index].discountedPrice"
                :isNew="womenProducts[index].isNew"
                :isSale="isSale(womenProducts, index)"
                :badgeText="
                  womenProducts[index].isNew
                    ? 'NEW'
                    : isSale(womenProducts, index)
                    ? 'SALE'
                    : ''
                "
              ></product>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs>

      <!-- DISCOVER MORE -->
      <div class="text-center underline-wrapper mt-16">
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
      tab: null,
      items: ['Women', 'Men', 'Kids'],
    };
  },

  computed: {
    ...mapState(['womenProducts']),
  },

  methods: {
    isSale(arrray, idx) {
      if (arrray[idx].discountedPrice) return true;
    },
    isNew(arrray, idx) {
      if (arrray[idx].isNew) return true;
    },
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
  width: 25%;
  text-align: center;
  margin: auto;

  .link-underline {
    font-size: 1.25rem;
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
