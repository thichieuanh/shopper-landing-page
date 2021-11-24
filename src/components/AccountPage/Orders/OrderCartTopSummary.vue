<template>
  <v-row class="bg-light pa-5">
    <v-col cols="6" md="3">
      <h6 class="heading-xxxs text-muted">ORDER NO:</h6>
      <p>{{ order.orderNo }}</p>
    </v-col>

    <v-col cols="6" md="3">
      <h6 class="heading-xxxs text-muted">SHIPPED DATE:</h6>
      <p>{{ order.shippedDate.toDateString().slice(4) }}</p>
    </v-col>

    <v-col cols="6" md="3">
      <h6 class="heading-xxxs text-muted">STATUS</h6>
      <p>{{ order.status }}</p>
    </v-col>

    <v-col cols="6" md="3">
      <h6 class="heading-xxxs text-muted">ORDER AMOUNT</h6>
      <p>{{ orderAmount(order) }}</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      default: () => {},
    },
    orderAmount: {
      type: Function,
    },
  },
};
</script>
