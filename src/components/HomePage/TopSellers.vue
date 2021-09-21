<template>
  <v-container fluid id="top-sellers">
    <!-- HEADING -->
    <v-row class="flex-column align-center justify-center">
      <h2 class="mb-4">Top month Sellers</h2>
    </v-row>

    <!-- TABS -->
    <v-tabs centered color="red accent-2">
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
      <v-tab-item v-for="n in 3" :key="n" class="mt-16">
        <v-container fluid class="pa-0">
          <v-row>
            <v-col
              v-for="(item, index) in womenProducts"
              :key="index"
              cols="12"
              md="3"
              class="px-4"
            >
              <product
                :imgUrl="womenProducts[index].img"
                :imgOnHoverUrl="womenProducts[index].imgOnHover"
                :category="womenProducts[index].category"
                :productName="womenProducts[index].name"
                :price="womenProducts[index].price"
              ></product>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-container>
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
};
</script>

<style lang="scss" scoped>
#top-sellers {
  width: 75%;
}

@media (max-width: 1300px) {
  #top-sellers {
    width: 90%;
  }
}

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
