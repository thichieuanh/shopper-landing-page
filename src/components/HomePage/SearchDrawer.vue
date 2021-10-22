<template>
  <!-- SEARCH DRAWER -->
  <v-navigation-drawer width="455" v-model="drawer" app temporary right>
    <!-- Close -->
    <button class="close" @click="closeSearch()">
      <Icon icon="clarity:close-line" width="27" :inline="true" />
    </button>

    <!-- Header -->
    <div class="font-size-lg modal-header border-bottom mx-auto text-center">
      Search Products
    </div>

    <!-- Body: Form -->
    <div class="modal-body">
      <!-- Categories dropdown -->
      <select
        name="modalSearchCategories"
        id="modalSearchCategories"
        class="custom-select form-control"
      >
        <option value="all">All Categories</option>
        <option value="women">Women</option>
        <option value="men">Men</option>
        <option value="kids">Kids</option>
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

    <!-- Body: Result -->
    <div class="modal-body border-top font-size-sm">
      <p>Search Results:</p>
      <v-row v-for="(product, index) in resultProducts" :key="index">
        <v-list-item class="pa-0 mb-6">
          <v-list-item-avatar tile size="80" class="mr-8">
            <v-img :src="product.img"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title
              class="mb-1 font-weight-medium font-size-sm"
              style="white-space: normal"
            >
              {{ product.name }}
            </v-list-item-title>

            <v-list-item-subtitle>
              <a
                href="#"
                class="
                  grey--text
                  text--darken-2
                  font-size-sm font-weight-medium
                "
              >
                {{ product.price }}
              </a>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-row>
      <div class="pa-0 shop-button" style="font-size: 1.125rem">
        <a href="#"> View All </a>
        <v-icon class="shop-icon ml-3" size="1.125rem">
          mdi-arrow-right
        </v-icon>
      </div>
    </div>
    <!-- Body: Empty: Add d-none class to hide this -->
    <div class="modal-body">
      <!-- Text -->
      <p class="mb-3 font-size-sm text-center">Nothing matches your search</p>
      <p class="mb-0 font-size-sm text-center">😞</p>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { Icon } from '@iconify/vue2';
import { mapState } from 'vuex';
export default {
  props: {
    drawer: { type: Boolean, default: false },
  },
  components: {
    Icon,
  },
  data: () => ({
    searchText: '',
  }),
  computed: {
    ...mapState('products', ['womenProducts']),

    // Temp use for hard-coding
    // resultProducts() {
    //   return this.womenProducts.filter((item, index) => index <= 4);
    // },
    resultProducts() {
      return this.womenProducts;
    },
  },

  methods: {
    closeSearch() {
      this.$emit('closePopup');
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-header {
  padding: 1.5rem 2rem;
}

.border-top {
  border-top: 1px solid #e5e5e5;
}

.modal-body {
  padding: 2rem;
}

.input-group {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
}

.input-group-append {
  margin-left: -1px;
  display: flex;
}

.input-group-merge {
  border: 1px solid #e5e5e5;
  transition-property: border-color;
  transition: all 0.1s ease-in-out;
  &:focus-within {
    border-color: #555;
  }
}

.search-btn {
  padding: 0.875rem 1.75rem;
}
</style>
