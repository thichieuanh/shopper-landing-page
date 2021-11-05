<template>
  <div>
    <section class="container-control pb-12">
      <Breadcrumbs></Breadcrumbs>

      <!-- Header -->
      <v-row class="pt-7">
        <v-col class="col-12 text-center">
          <h3 class="mb-10">Shopping Cart</h3>
        </v-col>
      </v-row>

      <!-- Body -->
      <v-row>
        <v-col cols="12" sm="7">
          <!-- Body: Empty -->
          <div v-if="!cart.length" class="text-center modal-body bg-light">
            <div class="mb-5">
              Your cart is empty 🥺... but it doesn't have to be 🤩!
            </div>
            <button class="btn btn-dark" @click="close">
              <router-link :to="{ name: 'ProductPage' }">
                SHOP NEW ARRIVALS
              </router-link>
            </button>
          </div>

          <!-- Items in cart -->
          <v-row
            v-else
            v-for="(item, index) in cart"
            :key="index"
            class="cart-item border-top border-bottom font-size-sm"
          >
            <!-- Image  -->
            <v-col class="col-3 pl-0">
              <img :src="item.image" alt="" class="cart-img" />
            </v-col>

            <!-- Item info -->
            <v-col
              class="
                py-0
                pr-0
                d-flex
                flex-column
                align-start
                justify-space-between
              "
            >
              <div
                class="
                  d-flex
                  w-100
                  justify-space-between
                  font-weight-medium
                  mb-2
                "
              >
                <router-link :to="{ name: 'ProductPage' }">
                  <div>{{ item.name }}</div>
                </router-link>
                <div>
                  {{ item.price | currencyFormatter }}
                </div>
              </div>

              <div class="text-muted mb-7">
                <div>Size: {{ item.sizeName }}</div>
                <div>Color: {{ item.variantColor }}</div>
              </div>

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

          <!-- Footer -->
          <v-row class="mt-7 d-flex align-end justify-space-between">
            <v-col class="px-0" cols="12" sm="7">
              <!-- Coupon -->
              <div class="font-size-sm font-weight-medium mb-2">
                Coupon code:
              </div>
              <v-row>
                <v-col cols="8" class="pl-0">
                  <input
                    type="text"
                    placeholder="Enter coupon code*"
                    required
                    class="form-control"
                    v-model="couponText"
                    title="Type anything in here then click Apply or press Enter"
                    @keyup.enter="applyCoupon"
                  />
                </v-col>

                <v-col cols="4">
                  <button class="btn btn-dark" @click="applyCoupon">
                    Apply
                  </button>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" md="auto">
              <button class="btn btn-outline-dark">Update Cart</button>
            </v-col>
          </v-row>

          <div class="mt-4 d-flex align-center" v-if="isCouponApplied">
            <Icon
              icon="fluent:tag-multiple-20-filled"
              width="20"
              :inline="true"
            />

            <span class="mx-2"> {{ currentlyAppliedCoupon }}</span>
            <button @click="removeCoupon" class="font-size-xs update-cart-btn">
              <Icon icon="clarity:close-line" width="18" :inline="true" />
            </button>
          </div>
        </v-col>

        <v-col cols="12" sm="5" md="4" class="offset-md-1">
          <!-- Subtotal -->
          <div class="bg-light pa-6 mb-9">
            <div class="subtotal-details">
              <div>Subtotal</div>
              <div class="d-flex flex-column align-end">
                <span :class="{ 'old-price font-size-xs': isCouponApplied }">
                  {{ cartSubtotal | currencyFormatter }}
                </span>
                <span v-if="isCouponApplied">
                  {{ (cartSubtotal * (1 - discountRate)) | currencyFormatter }}
                </span>
              </div>
            </div>

            <div class="subtotal-details">
              <span>Discount</span>
              <div :class="{ 'text-primary': isCouponApplied }">
                <span v-if="isCouponApplied">-</span>
                <span>
                  {{ (discountRate * cartSubtotal) | currencyFormatter }}
                </span>
              </div>
            </div>

            <div class="subtotal-details">
              <span>Tax</span>
              <span>{{ (cartSubtotal * 0.1) | currencyFormatter }}</span>
            </div>

            <div class="subtotal-details font-size-lg font-weight-bold">
              <span>Total</span>
              <span>
                {{ (cartSubtotal * 1.1) | currencyFormatter }}
              </span>
            </div>
            <div class="subtotal-details font-size-sm pb-0">
              Shipping cost calculated at Checkout *
            </div>
          </div>

          <!-- Checkout router -->
          <router-link :to="{ name: 'Checkout' }" class="w-100">
            <button
              role="link"
              :class="checkoutButtonClass"
              :disabled="!cart.length"
            >
              Proceed to Checkout
            </button>
          </router-link>

          <div class="px-0 shop-button font-size-sm">
            <router-link :to="{ name: 'ProductPage' }">
              <v-icon class="arrow-move-left shop-icon mr-3" size="1.125rem">
                mdi-arrow-left
              </v-icon>
              Continue shopping
            </router-link>
          </div>
        </v-col>
      </v-row>
    </section>

    <section class="bg-light py-9">
      <Features></Features>
    </section>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs';
import Features from '@/components/Features';
import { mapGetters, mapState } from 'vuex';
import { Icon } from '@iconify/vue2';

export default {
  components: {
    Breadcrumbs,
    Features,
    Icon,
  },
  data: () => ({
    couponText: '',
  }),

  computed: {
    ...mapGetters({
      cart: 'productPrivateStore/cart',
      cartSubtotal: 'productPrivateStore/cartSubtotal',
      itemIndexInCart: 'productPrivateStore/itemIndexInCart',
    }),

    ...mapState({
      isCouponApplied: (state) => state.productPrivateStore.isCouponApplied,
      discountRate: (state) => state.productPrivateStore.discountRateForCoupon,
      currentlyAppliedCoupon: (state) => state.productPrivateStore.coupon,
    }),

    checkoutButtonClass() {
      return ['btn btn-dark btn-block', { disableBtn: !this.cart.length }];
    },
  },

  methods: {
    changeQuantity(item, event) {
      const updatedQuantity = +event.target.value;
      const index = this.itemIndexInCart(item.variantColor, item.sizeName);

      this.$store.commit('productPrivateStore/changeQtyItemExistedInCart', {
        updatedQty: updatedQuantity,
        itemIndex: index,
      });
    },

    removeCart(index) {
      this.$store.commit('productPrivateStore/detachCart', index);
      this.$store.commit('notification/showNotification', {
        type: 'success',
        message: 'Product removed from cart',
      });
    },

    applyCoupon() {
      if (this.couponText && this.couponText !== this.currentlyAppliedCoupon) {
        this.$store.commit('productPrivateStore/applyCoupon', this.couponText);
      }
    },

    removeCoupon() {
      this.$store.commit('productPrivateStore/removeCoupon');
      this.currentlyAppliedCoupon = '';
      this.couponText = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-item {
  padding: 2rem 0;
}

.cart-item + .cart-item {
  border-top: none;
}

.cart-img {
  max-width: 100%;
  max-height: 18vh;
}
</style>
