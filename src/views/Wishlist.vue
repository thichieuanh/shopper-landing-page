<template>
  <div>
    <div>WISHLIST: {{ wishlist }}</div>
    <div>CART: {{ cart }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data: () => ({}),
  computed: {
    ...mapState('productPrivateStore', ['wishlist', 'cart']),
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
