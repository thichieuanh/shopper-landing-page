<template>
  <!-- CART DRAWER -->
  <v-navigation-drawer width="455" :value="cartDrawer" app temporary right>
    <!-- Close -->
    <button class="close" @click="close()">
      <Icon icon="clarity:close-line" width="27" :inline="true" />
    </button>

    <!-- Header -->
    <div class="font-size-lg modal-header border-bottom mx-auto text-center">
      Your Cart ({{ cartTotal }})
    </div>

    <!-- Body: Empty -->
    <div v-if="!cartTotal" class="text-center">
      <div class="mb-4">
        Your shopping bag is empty... but it doesn't have to be 🤩!
      </div>
      <button class="btn btn-block btn-dark" @click="close()">
        <router-link :to="{ name: 'ProductPage' }">
          SHOP NEW ARRIVALS
        </router-link>
      </button>
    </div>

    <!-- Body: Cart list -->
    <div v-else>
      <v-row
        v-for="(item, index) in cart"
        :key="index"
        class="border-bottom list-group-item font-size-sm"
      >
        <v-col class="pa-0 col-4">
          <img :src="item.image" alt="" class="img-fluid" />
        </v-col>

        <v-col
          class="py-0 pr-0 d-flex flex-column align-start justify-space-between"
        >
          <router-link :to="{ name: 'ProductPage' }" class="font-weight-medium">
            <div>{{ item.name }}</div>
            <div class="text-muted font-size-xs">{{ item.price }}</div>
            <div class="text-muted font-size-xs">
              Color: {{ item.variantColor }}
            </div>
            <div class="text-muted font-size-xs">Size: {{ item.size }}</div>
          </router-link>

          <div class="d-flex w-100 justify-space-between">
            <select
              name="orderQty"
              id="orderQty"
              class="custom-select custom-select-xxs w-auto mb-0"
            >
              <option
                v-for="n in item.sizeStock"
                :value="n"
                :key="n"
                :selected="item.quantity === n"
              >
                {{ n }}
              </option>
            </select>

            <button
              class="d-flex align-center font-size-xs update-cart-btn"
              @click="editCart(item)"
            >
              <Icon
                icon="grommet-icons:edit"
                width="16"
                :inline="true"
                class="mr-1"
              />
              Edit
            </button>
            <button class="d-flex align-center font-size-xs update-cart-btn">
              <Icon
                icon="clarity:close-line"
                width="18"
                :inline="true"
                class="mr-1"
              />
              Remove
            </button>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { Icon } from '@iconify/vue2';
import { mapGetters } from 'vuex';

export default {
  props: {
    cartDrawer: { type: Boolean, default: false },
  },
  components: {
    Icon,
  },
  data: () => ({
    searchText: '',
    categories: ['All Categories', 'Women', 'Men', 'Kids'],
    selectedCategory: 'All Categories',
    selectedQuantity: undefined,
  }),
  computed: {
    // ...mapGetters('productPrivateStore', ['cart', 'cartTotal']),

    ...mapGetters({
      getProductById: 'products/getProductById',
      cart: 'productPrivateStore/cart',
    }),

    // cart() {
    //   return [
    //     {
    //       productId: 2,
    //       image: '/img/products/women/product2a.jpeg',
    //       name: "Nobody's Child mini shift dress",
    //       variantColor: 'White',
    //       size: 'M',
    //       quantity: 1,
    //       sizeStock: 5,
    //       price: '$438.00',
    //     },
    //     {
    //       productId: 4,
    //       image: '/img/products/women/product4a.jpeg',
    //       name: 'Baby Angel oversized full-zip sweatshirt with hood',
    //       variantColor: 'White',
    //       size: 'XL',
    //       quantity: 3,
    //       sizeStock: 5,
    //       price: '$148.20',
    //     },
    //     {
    //       productId: 5,
    //       image: '/img/products/women/product5a.jpeg',
    //       name: 'Pinafore with lurex and squared neckline',
    //       variantColor: 'White',
    //       size: 'S',
    //       quantity: 2,
    //       sizeStock: 2,
    //       price: '$268.00',
    //     },
    //     {
    //       productId: 1,
    //       image: '/img/products/women/product1a.jpeg',
    //       name: 'Leather mid-heel Sandals',
    //       variantColor: 'White',
    //       size: '7',
    //       quantity: 1,
    //       sizeStock: 1,
    //       price: '$160.05',
    //     },
    //   ].sort((a, b) => a.productId - b.productId);
    // },

    cartTotal() {
      return this.cart.length;
    },
  },

  methods: {
    close() {
      this.eventHub.$emit('closeCart');
    },

    isSale(product) {
      if (product.pricing.discount) return true;
    },

    editCart(item) {
      this.eventHub.$emit('showProductDialog', {
        productId: item.productId,
        isUpdatingCart: true,
        itemToUpdate: {
          variantColor: item.variantColor,
          size: item.size,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-header {
  padding: 1.5rem 2rem;
  line-height: 1.5rem !important;
}

.border-top {
  border-top: 1px solid #e5e5e5;
}

.list-group-item {
  padding: 1.5rem 2rem;
}
</style>
