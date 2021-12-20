<template>
  <div>
    <p v-if="!wishlist.length">You haven't add any product to your wishlist.</p>
    <v-row v-else>
      <v-col
        cols="6"
        sm="4"
        v-for="(product, productIndex) in wishlist"
        :key="productIndex"
      >
        <WishlistProductCard :productDetails="product"></WishlistProductCard>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WishlistProductCard from '@/components/AccountPage/Wishlist/WishlistProductCard';

export default {
  components: {
    WishlistProductCard,
  },

  computed: {
    ...mapState('productPrivateStore', ['wishlist']),
  },
};
</script>
