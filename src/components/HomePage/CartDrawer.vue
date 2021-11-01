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
      Your Cart ({{ cart.length }})

      <button class="close" @click="eventHub.$emit('closeCart')">
        <Icon icon="clarity:close-line" width="27" :inline="true" />
      </button>
    </div>

    <!-- Body: Empty -->
    <div v-if="!cart.length" class="text-center modal-body">
      <div class="mb-5">
        Your shopping bag is empty... but it doesn't have to be 🤩!
      </div>
      <button
        class="btn btn-block btn-dark"
        @click="eventHub.$emit('closeCart')"
      >
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
            <div class="text-muted font-size-xs">
              {{ item.price | currencyFormatter }}
            </div>
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
              @click="editCart(item, index)"
            >
              <Icon
                icon="grommet-icons:edit"
                width="16"
                :inline="true"
                class="mr-1"
              />
              Edit
            </button>
            <button
              class="d-flex align-center font-size-xs update-cart-btn"
              @click="removeCart(item)"
            >
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
      <span>{{ cartSubtotal | currencyFormatter }}</span>
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

  computed: {
    ...mapGetters({
      getProductById: 'products/getProductById',
      cart: 'productPrivateStore/cart',
      itemIndexInCart: 'productPrivateStore/itemIndexInCart',
      cartSubtotal: 'productPrivateStore/cartSubtotal',
    }),

    // cart() {
    //   return [
    //     {
    //       productId: 1,
    //       image: '/img/products/women/product1a.jpeg',
    //       name: 'Leather mid-heel Sandals',
    //       variantColor: 'White',
    //       sizeName: '7.5',
    //       quantity: 1,
    //       sizeStock: 3,
    //       price: 40,
    //     },
    //     {
    //       productId: 1,
    //       image: '/img/products/women/product1a.jpeg',
    //       name: 'Leather mid-heel Sandals',
    //       variantColor: 'White',
    //       sizeName: '8.5',
    //       quantity: 1,
    //       sizeStock: 1,
    //       price: 40,
    //     },
    //     {
    //       productId: 1,
    //       image: '/img/products/women/product1a.jpeg',
    //       name: 'Leather mid-heel Sandals',
    //       variantColor: 'White',
    //       sizeName: '9',
    //       quantity: 1,
    //       sizeStock: 1,
    //       price: 40,
    //     },
    //     {
    //       productId: 1,
    //       image: '/img/products/women/product1a.jpeg',
    //       name: 'Leather mid-heel Sandals',
    //       variantColor: 'White',
    //       sizeName: '9.5',
    //       quantity: 1,
    //       sizeStock: 5,
    //       price: 40,
    //     },
    //   ];
    //   // .sort((a, b) => a.productId - b.productId);
    // },
  },

  methods: {
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

    editCart(item, index) {
      this.eventHub.$emit('showProductDialog', {
        isUpdatingCart: true,
        itemIndexToUpdate: index,
        productId: item.productId,
        variantColor: item.variantColor,
        sizeName: item.sizeName,
        quantity: item.quantity,
      });
    },

    removeCart(index) {
      this.$store.commit('productPrivateStore/detachCart', index);
      this.$store.commit('notification/showNotification', {
        type: 'success',
        message: 'Product removed from cart',
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
