<template>
  <div class="product-wrapper" v-if="productDetails">
    <!-- Image -->
    <v-img
      :src="productDetails.variants[0].variantImages[0]"
      aspect-ratio="0.85"
      class="card-img"
    >
      <!-- Buttons -->
      <button
        class="product-button card-action card-action-right"
        @click="
          $store.commit(
            'productPrivateStore/detachWishlist',
            productDetails._id
          )
        "
      >
        <Icon icon="uim:multiply" :inline="true" />
      </button>

      <button
        class="btn btn-block btn-dark btn-xs card-btn"
        @click="
          eventHub.$emit('showProductDialog', {
            productId: productDetails._id,
            isUpdatingCart: false,
          })
        "
      >
        <Icon icon="akar-icons:eye" :inline="true" />
        Quick view
      </button>
    </v-img>

    <!-- Badge -->
    <div
      :class="[
        { 'new-badge': productDetails.isNewProduct },
        { 'sale-badge': isSale(productDetails) },
        'product-badge',
      ]"
    >
      {{
        productDetails.isNewProduct
          ? 'NEW'
          : isSale(productDetails)
          ? 'SALE'
          : ''
      }}
    </div>

    <!-- Product Info -->
    <div class="pa-6 font-weight-medium text-center">
      {{ productDetails.name }}
      <span :class="[{ 'old-price': isSale(productDetails) }, 'text-muted']">
        {{ productDetails.pricing.price | currencyFormatter }}
      </span>
      <span v-if="isSale(productDetails)" class="text-primary">
        {{ productDetails.pricing.priceAfterDiscount | currencyFormatter }}
      </span>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';

export default {
  props: {
    productDetails: { type: Object },
  },

  components: {
    Icon,
  },

  methods: {
    isSale(product) {
      if (product.pricing.discount) return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.product-wrapper {
  position: relative;
}
</style>
