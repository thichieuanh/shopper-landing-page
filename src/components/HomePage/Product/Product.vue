<template>
  <v-hover v-slot:default="{ hover }">
    <div>
      <div class="image-wrapper">
        <v-img
          :src="productDetails.variants[0].variantImages[0]"
          aspect-ratio="0.85"
        >
        </v-img>

        <!-- <router-link
          :to="{ name: 'ProductPage', params: { id: productDetails._id } }"
        > -->
        <v-img
          :src="productDetails.variants[0].variantImages[1]"
          aspect-ratio="0.85"
          class="image-hover pointer-cursor"
          @click="goToProductDetails"
        >
        </v-img>
        <!-- </router-link> -->

        <div class="product-button-group d-flex justify-center ma-0">
          <div
            @click="iconClicked(functionalIconsIdx)"
            v-for="(item, functionalIconsIdx) in functionalIcons"
            :key="functionalIconsIdx"
            :class="buttonClass(hover, functionalIconsIdx)"
          >
            <Icon :icon="item.spec" width="16.875" :inline="true" />
          </div>
        </div>

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
      </div>

      <v-card-subtitle class="pa-0 mt-4 mb-0">
        <a href="" class="text-muted">
          {{ productDetails.category }}
        </a>
      </v-card-subtitle>

      <v-card-title class="pa-0 mt-1 mb-0">
        <a href="" style="font-size: 1rem; word-break: break-word">
          {{ productDetails.name }}
        </a>
      </v-card-title>
      <v-card-subtitle
        class="pa-0 mt-1 mb-0 font-weight-medium"
        style="font-size: 1rem"
      >
        <span :class="['text-muted', { 'old-price': isSale(productDetails) }]">
          {{ productDetails.pricing.price | currencyFormatter }}
        </span>
        <span v-if="isSale(productDetails)" class="text-primary">
          {{ productDetails.pricing.priceAfterDiscount | currencyFormatter }}
        </span>
      </v-card-subtitle>
    </div>
  </v-hover>
</template>

<script>
import 'animate.css';
import { Icon } from '@iconify/vue2';
import { mapGetters } from 'vuex';

export default {
  components: { Icon },

  data: () => ({
    functionalIcons: [
      {
        href: '#',
        spec: 'feather:eye',
        type: 'type-open',
      },
      {
        href: '#',
        spec: 'ph:shopping-cart-simple',
        type: 'type-cart',
      },
      {
        href: '#',
        spec: 'ph:heart-straight',
        type: 'type-wishlist',
      },
    ],
  }),

  props: {
    productDetails: { type: Object, default: () => ({}) },
  },

  computed: {
    ...mapGetters({
      isProductIdInCart: 'productPrivateStore/isProductIdInCart',
      isWishlisted: 'productPrivateStore/isWishlisted',
    }),
  },

  methods: {
    iconClicked(index) {
      switch (index) {
        case 0:
        case 1:
          this.eventHub.$emit('showProductDialog', {
            productId: this.productDetails._id,
          });
          break;
        case 2:
          this.$store.dispatch(
            'productPrivateStore/updateProductWishlistState',
            this.productDetails._id
          );
          break;
      }
    },

    isSale(product) {
      if (product.pricing.discount) return true;
    },

    buttonClass(isHover, index) {
      let state = '';
      if (index === 1 && this.isProductIdInCart(this.productDetails._id)) {
        state = 'added-to-cart';
      }
      if (index === 2 && this.isWishlisted(this.productDetails._id)) {
        state = 'added-to-wishlist';
      }
      return (
        `product-button ${state} d-flex justify-center align-center mx-1` +
        (isHover
          ? ' animate__animated animate__fadeInUp animate__faster' +
            ` animate__delay-${index}s`
          : ' animate__animated animate__fadeOutDown animate__faster' +
            ` animate__delay-${index}s`)
      );
    },

    goToProductDetails() {
      this.$router.replace({
        name: 'ProductPage',
        params: { id: this.productDetails._id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.product-button-group {
  z-index: 10;
  width: 100%;
  position: absolute;
  bottom: 0.5rem;
}

.image-wrapper {
  position: relative;
}
.image-hover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.4s ease;

  &:hover {
    opacity: 1;
  }
}
</style>
