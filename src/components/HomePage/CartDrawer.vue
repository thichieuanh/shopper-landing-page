<template>
  <v-navigation-drawer
    width="455"
    :value="value"
    @input="$emit('input', $event)"
    app
    right
    temporary
    :permanent="isHiddenWhenDialogShown"
    class="font-size-sm"
  >
    <!-- Header -->
    <div class="modal-header font-size-lg border-bottom mx-auto text-center">
      Your Cart ({{ cartTotal }})

      <button class="close" @click="close()">
        <Icon icon="clarity:close-line" width="27" :inline="true" />
      </button>
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
    <div v-else class="cart-list">
      <v-row
        v-for="(item, index) in cart"
        :key="index"
        class="cart-item border-top font-size-sm"
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
            <div class="text-muted font-size-xs">Size: {{ item.sizeName }}</div>
          </router-link>

          <div class="d-flex w-100 justify-space-between">
            <select
              name="orderQty"
              :id="`orderQty-${index}`"
              class="custom-select custom-select-xxs w-auto mb-0"
              @change="changeQuantity(item, $event)"
            >
              <option
                v-for="n in item.sizeStock"
                :value="n"
                :key="n"
                :selected="n === item.quantity"
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

    <div
      class="
        cart-footer
        bg-light
        d-flex
        align-center
        justify-space-between
        font-weight-medium
        mt-auto
      "
    >
      <span>Subtotal</span>
      <span>$90</span>
    </div>

    <div class="modal-body d-flex flex-column">
      <button class="btn btn-dark btn-block">
        <router-link :to="{ name: 'Checkout' }">
          Continue to Checkout
        </router-link>
      </button>
      <button class="btn btn-outline-dark btn-block">
        <router-link :to="{ name: 'ShoppingCart' }"> View Cart </router-link>
      </button>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { Icon } from '@iconify/vue2';
import { mapGetters } from 'vuex';

export default {
  props: {
    value: { type: Boolean },
    isHiddenWhenDialogShown: { type: Boolean },
  },
  components: {
    Icon,
  },
  data: () => ({}),
  computed: {
    ...mapGetters({
      getProductById: 'products/getProductById',
      cart: 'productPrivateStore/cart',
      itemIndexInCart: 'productPrivateStore/itemIndexInCart',
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
    //   ];
    //   // .sort((a, b) => a.productId - b.productId);
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

    changeQuantity(item, event) {
      const updatedQuantity = +event.target.value;
      const index = this.itemIndexInCart(item.variantColor, item.sizeName);

      this.$store.commit('productPrivateStore/changeQtyItemExistedInCart', {
        updatedQty: updatedQuantity,
        itemIndex: index,
      });
    },

    editCart(item) {
      const index = this.itemIndexInCart(item.variantColor, item.sizeName);

      this.eventHub.$emit('showProductDialog', {
        isUpdatingCart: true,
        itemIndexToUpdate: index,
        productId: item.productId,
        variantColor: item.variantColor,
        sizeName: item.sizeName,
        quantity: item.quantity,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-list {
  max-height: 600px;
  min-height: 600px;
  overflow-y: auto;
}

.cart-item {
  padding: 1.5rem 2rem;
  &:first-child {
    border: 0;
  }
}

.cart-footer {
  padding: 1.5rem 2rem;
}
</style>
