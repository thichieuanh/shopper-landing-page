<template>
  <div>
    <div
      v-for="(order, orderIndex) in orders"
      :key="orderIndex"
      class="border mb-5 pa-7 font-weight-medium"
    >
      <OrderCardTopSummary
        :order="order"
        :orderAmount="orderAmount"
      ></OrderCardTopSummary>

      <v-row class="pt-7">
        <v-row class="align-center">
          <v-col cols="12" md="6" class="px-0">
            <v-row class="custom-row pr-2">
              <v-col
                cols="3"
                v-for="(item, idx) in thumbnails(order.items)"
                :key="idx"
                class="pr-0 thumbnails-row"
              >
                <img :src="item.image" alt="" class="thumbnails" />
              </v-col>

              <v-col
                cols="3"
                class="thumbnails-row"
                v-if="order.items.length >= 4"
              >
                <router-link
                  :to="{
                    name: 'OrderDetails',
                    params: { orderNo: order.orderNo },
                  }"
                  class="thumbnails"
                >
                  <div
                    class="
                      thumbnails
                      bg-light
                      font-size-xxs
                      d-flex
                      align-center
                      text-center
                      pointer-cursor
                      pa-2
                    "
                  >
                    +
                    {{ order.items.length - thumbnails(order.items).length }}
                    more
                  </div>
                </router-link>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="6" class="px-0">
            <v-row>
              <v-col cols="6">
                <router-link
                  :to="{
                    name: 'OrderDetails',
                    params: { orderNo: order.orderNo },
                  }"
                >
                  <button class="btn btn-sm btn-outline-dark">
                    Order Details
                  </button>
                </router-link>
              </v-col>

              <v-col cols="6">
                <button class="btn btn-sm btn-outline-dark">Track Order</button>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-row>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import OrderCardTopSummary from '@/components/AccountPage/Orders/OrderCardTopSummary.vue';

export default {
  components: {
    OrderCardTopSummary,
  },

  computed: {
    ...mapState('orders', ['orders']),
  },

  methods: {
    thumbnails(itemList) {
      const items = itemList.length >= 4 ? itemList.slice(0, 3) : itemList;

      return items;
    },

    orderAmount(order) {
      const result = order.items.reduce(
        (sum, item) => (sum += item.price * item.quantity),
        0
      );
      return this.$options.filters.currencyFormatter(result);
    },
  },
};
</script>
