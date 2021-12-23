<template>
  <div v-if="order">
    <div class="border mb-5 pa-7 font-weight-medium">
      <OrderCardTopSummary
        :order="order"
        :orderAmount="orderAmount"
      ></OrderCardTopSummary>

      <!-- Items list -->
      <div class="pt-7">
        <!-- <h6 class="pb-7 ma-0">Order Item ({{ order.items.length }})</h6> -->

        <div class="list-group list-group-lg list-group-flush-x">
          <v-row
            v-for="(item, index) in order.items"
            :key="index"
            class="list-group-item"
          >
            <v-col cols="4" md="3" lg="2" class="pl-0">
              <router-link :to="`/product/${item.productId}`">
                <img :src="item.image" alt="" class="img-fluid" />
              </router-link>
            </v-col>

            <v-col
              class="
                py-0
                pr-0
                pl-4
                h-100
                d-flex
                flex-column
                align-start
                justify-space-between
                font-size-sm
              "
            >
              <div class="mb-4 font-weight-medium">
                <router-link :to="`/product/${item.productId}`">
                  <div>{{ item.name }} ✕ {{ item.quantity }}</div>
                </router-link>
                <div class="text-muted">
                  {{ item.price | currencyFormatter }}
                </div>
              </div>

              <div class="text-muted d-flex flex-column justify-end w-100">
                <div>Size: {{ item.size.sizeName }}</div>
                <div>Color: {{ item.variantColor }}</div>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>

    <!-- Subtotal -->
    <div class="border mb-5 pa-7">
      <h6 class="pb-7 ma-0">Order Total</h6>
      <div class="subtotal-details">
        <span>Subtotal</span>
        <div class="d-flex flex-column align-end">
          <span> {{ subtotal | currencyFormatter }} </span>
        </div>
      </div>

      <div class="subtotal-details">
        <span>Tax</span>
        <span>{{ (subtotal * 0.1) | currencyFormatter }}</span>
      </div>

      <div class="subtotal-details">
        <span>Shipping</span>
        <span>{{ order.shipping.shippingFee | currencyFormatter }}</span>
      </div>

      <div class="subtotal-details font-size-lg font-weight-medium pb-0">
        <span>Total</span>
        <span>
          {{
            (subtotal * 1.1 + order.shipping.shippingFee) | currencyFormatter
          }}
        </span>
      </div>
    </div>

    <!-- Billing and Shipping -->
    <div class="border pa-7">
      <h6 class="pb-7 ma-0">Billing & Shipping Details</h6>

      <v-row>
        <v-col cols="12" sm="4" class="pl-0">
          <p class="mb-4 font-weight-medium">Billing Address</p>
          <ul class="pl-0 text-gray-500">
            <li
              v-for="(value, key, index) in addressMainInfo(
                order.addresses.billing
              )"
              :key="index"
            >
              {{ value }}<span v-if="key !== 'country'">,</span>
            </li>
          </ul>
        </v-col>

        <v-col cols="12" sm="4">
          <p class="mb-4 font-weight-medium">Shipping Address</p>
          <ul class="pl-0 text-gray-500">
            <li
              v-for="(value, key, index) in addressMainInfo(
                order.addresses.shipping
              )"
              :key="index"
            >
              {{ value }}<span v-if="key !== 'country'">,</span>
            </li>
          </ul>
        </v-col>

        <v-col cols="12" sm="4" class="pr-0">
          <p class="mb-4 font-weight-medium">Shipping Method</p>
          <p class="mb-7 text-gray-500">{{ order.shipping.shippingMethod }}</p>
          <p class="mb-4 font-weight-medium">Payment Method</p>
          <p class="text-gray-500">{{ order.paymentMethod }}</p>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import OrderCardTopSummary from '@/components/AccountPage/Orders/OrderCardTopSummary.vue';
import { mapGetters, mapState } from 'vuex';

export default {
  components: {
    OrderCardTopSummary,
  },

  data: () => ({
    orderNo: undefined,
  }),

  computed: {
    ...mapGetters('orders', ['getOrderByOrderNo']),
    ...mapState('orders', ['orders', 'order']),

    subtotal() {
      return this.orderAmount(this.order).slice(1).replace(/,/g, '');
    },
  },

  methods: {
    orderAmount(order) {
      if (!order) return;
      const result = order.items.reduce(
        (sum, item) => (sum += item.price * item.quantity),
        0
      );
      return this.$options.filters.currencyFormatter(result);
    },

    addressMainInfo(address) {
      const {
        firstName,
        lastName,
        phone,
        addressLine1,
        city,
        zipCode,
        country,
      } = address;

      return {
        fullName: firstName + ' ' + lastName,
        phone,
        addressLine1,
        city,
        zipCode,
        country,
      };
    },
  },

  async mounted() {
    this.orderNo = this.$route.params.orderNo;
    this.$store.dispatch('orders/getOrder', this.orderNo);
  },
};
</script>

<style lang='scss' scoped>
.list-group-item {
  &:last-child {
    border-bottom: none;
  }
}
</style>
