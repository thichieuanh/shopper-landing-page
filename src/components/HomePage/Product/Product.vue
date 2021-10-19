<template>
  <v-hover v-slot:default="{ hover }">
    <v-card tile flat class="mx-auto" max-width="344">
      <div class="image-wrapper">
        <v-img :src="productData.images.img" aspect-ratio="0.85"></v-img>
        <v-img
          :src="productData.images.imgOnHover"
          aspect-ratio="0.85"
          class="image-hover"
        >
          <div class="product-button-group d-flex justify-center ma-0">
            <div
              @click.prevent="iconClicked(functionalIconsIdx)"
              v-for="(item, functionalIconsIdx) in functionalIcons"
              :key="functionalIconsIdx"
              :class="
                'product-button d-flex justify-center align-center mx-1' +
                (hover
                  ? ' animate__animated animate__fadeInUp animate__faster' +
                    ` animate__delay-${functionalIconsIdx}s`
                  : ' animate__animated animate__fadeOutDown animate__faster' +
                    ` animate__delay-${functionalIconsIdx}s`)
              "
            >
              <Icon :icon="item.spec" width="16.875" :inline="true" />
            </div></div
        ></v-img>
        <div
          :class="[
            { new: productData.isNew },
            { sale: isSale(productData) },
            'product-badge',
          ]"
        >
          {{ productData.isNew ? 'NEW' : isSale(productData) ? 'SALE' : '' }}
        </div>
      </div>

      <v-card-subtitle class="pa-0 mt-4 mb-0">
        <a href="#" class="grey--text text--darken-2">{{
          productData.category
        }}</a>
      </v-card-subtitle>
      <v-card-title class="pa-0 mt-1 mb-0">
        <a href="#" style="font-size: 1rem; word-break: break-word">
          {{ productData.name }}
        </a>
      </v-card-title>
      <v-card-subtitle
        class="pa-0 mt-1 mb-0 font-weight-medium"
        style="font-size: 1rem"
      >
        <span :class="{ 'old-price': isSale(productData) }">
          {{ productData.pricing.price }}</span
        >
        <span class="red--text red-accent-2">
          {{ productData.pricing.discountedPrice }}
        </span>
      </v-card-subtitle>
    </v-card>
  </v-hover>
</template>

<script>
import 'animate.css';
import { Icon } from '@iconify/vue2';

export default {
  components: { Icon },

  data: () => ({
    functionalIcons: [
      {
        href: '#',
        spec: 'feather:eye',
      },
      {
        href: '#',
        spec: 'ph:shopping-cart-simple',
      },
      {
        href: '#',
        spec: 'ph:heart-straight',
      },
    ],
  }),
  props: {
    productData: { type: Object, default: () => ({}) },
  },
  methods: {
    iconClicked(index) {
      switch (index) {
        case 0:
          this.$emit('showProductDialog', this.productData.id);
          break;
        case 1:
          this.$emit('addToCart');
          break;
        case 2:
          this.$emit('addToWishList');
          break;
      }
    },
    discountedPrice(product) {
      return product.pricing.discount
        ? '$' +
            (product.pricing.price * (1 - product.pricing.discount)).toFixed(2)
        : '';
    },
    isSale(product) {
      if (product.pricing.discount) return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.product-button-group {
  width: 100%;
  position: absolute;
  bottom: 0.5em;
}

.product-button {
  background: white;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background: #ff8a80;
    color: white;
  }
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.image-hover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.image-hover:hover {
  opacity: 1;
}

.product-badge {
  position: absolute;
  top: 5%;
  left: 0;
  text-align: center;
  font-weight: 500;
  font-size: 0.6875em;
  padding: 0.5em 1em;
}

.new {
  background: white;
}

.sale {
  background: black;
  color: white;
}

.old-price {
  text-decoration: line-through;
  font-size: 1rem;
  color: #a6a6a6 !important;
}
</style>
