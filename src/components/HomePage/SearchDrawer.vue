<template>
  <!-- SEARCH DRAWER -->
  <v-navigation-drawer
    width="455"
    :value="isOpen"
    @input="$emit('update:isOpen', $event)"
    app
    right
    temporary
  >
    <div class="search-wrapper">
      <!-- Header -->
      <div class="modal-header border-bottom">
        Search Products

        <!-- Close -->
        <button class="close" @click="eventHub.$emit('closeSearch')">
          <Icon icon="clarity:close-line" width="27" :inline="true" />
        </button>
      </div>

      <!-- Body: Form -->
      <div class="modal-body">
        <!-- Categories dropdown -->
        <select
          name="modalSearchCategories"
          id="modalSearchCategories"
          class="custom-select form-control"
          v-model="selectedCategory"
        >
          <option
            v-for="category in categories"
            :value="category"
            :key="category"
          >
            {{ category }}
          </option>
        </select>

        <!-- Searh bar -->
        <div class="input-group input-group-merge">
          <input
            type="Search"
            placeholder="Search"
            class="form-control"
            v-model="searchText"
          />
          <div class="input-group-append">
            <button class="search-btn">
              <Icon icon="ph:magnifying-glass" width="16" />
            </button>
          </div>
        </div>
      </div>

      <!-- Body: Results -->
      <div class="modal-body border-top font-size-sm">
        <div v-if="!searchText">
          Please enter product name onto above search bar.
        </div>
        <div v-else>
          <!-- Found -->
          <div v-if="resultProducts(selectedCategory).length">
            <p>Search Results:</p>
            <v-row
              v-for="(product, index) in resultProducts(selectedCategory)"
              :key="index"
            >
              <v-list-item class="pa-0 mb-6">
                <v-list-item-avatar tile size="80" class="mr-8">
                  <v-img :src="product.variants[0].variantImages[0]"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    class="mb-1 font-weight-medium font-size-sm"
                    style="white-space: normal"
                  >
                    {{ product.name }}
                  </v-list-item-title>

                  <v-list-item-title>
                    <router-link
                      :to="{}"
                      :class="
                        'stretched-link ' +
                        (isSale(product) ? 'text-primary' : 'text-muted')
                      "
                    >
                      {{
                        product.pricing.priceAfterDiscount | currencyFormatter
                      }}
                    </router-link>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-row>

            <div class="pa-0 shop-button font-size-lg">
              <router-link :to="{ name: 'Shop' }">
                View All
                <v-icon class="shop-icon ml-3" size="1.125rem">
                  mdi-arrow-right
                </v-icon>
              </router-link>
            </div>
          </div>
          <!-- Not found -->
          <div v-else>
            <p class="mb-3 font-size-sm text-center">
              Nothing matches your search
            </p>
            <p class="mb-0 font-size-sm text-center">😞</p>
          </div>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { Icon } from '@iconify/vue2';
import { mapState, mapGetters } from 'vuex';

export default {
  props: {
    isOpen: { type: Boolean },
  },

  components: {
    Icon,
  },

  data: () => ({
    searchText: '',
    categories: ['All Categories', 'Women', 'Men', 'Kids'],
    selectedCategory: 'All Categories',
  }),

  computed: {
    ...mapState('products', ['womenProducts', 'menProducts', 'kidsProducts']),
    ...mapGetters('products', ['getAllProducts']),
  },

  methods: {
    isSale(product) {
      if (product.pricing.discount) return true;
    },

    resultProducts(category) {
      let searchArray;
      switch (category) {
        case 'Women':
          searchArray = this.womenProducts;
          break;
        case 'Men':
          searchArray = this.menProducts;
          break;
        case 'Kids':
          searchArray = this.kidsProducts;
          break;
        default:
          searchArray = this.getAllProducts;
          break;
      }
      let result = searchArray.filter((item) =>
        item.name.toLowerCase().includes(this.searchText.toLowerCase())
      );

      if (result.length > 8) result = result.slice(0, 7); // to avoid showing too many products
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
.search-btn {
  padding: 0.875rem 1.75rem;
}
</style>
