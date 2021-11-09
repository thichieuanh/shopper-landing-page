<template>
  <div>
    <h4 class="mb-3">{{ productDetails.name }}</h4>
    <div class="mb-7 d-flex align-baseline">
      <h5 class="mr-1">
        <span :class="{ 'old-price': isSale(productDetails) }">
          {{ productDetails.pricing.price | currencyFormatter }}
        </span>
        <span v-if="isSale(productDetails)" class="text-primary ml-1">
          {{ productDetails.pricing.priceAfterDiscount | currencyFormatter }}
        </span>
      </h5>
      <span> ({{ stockState }}) </span>
    </div>

    <!-- Colors -->
    <div class="form-group">
      <p class="mb-6">
        Color:
        <span class="font-weight-medium">
          {{ productDetails.variants[selectedVariant].variantColor }}
        </span>
      </p>

      <div class="d-flex mb-8">
        <v-avatar
          v-for="(variant, index) in productDetails.variants"
          :key="index"
          tile
          height="6vh"
          width="5vh"
          :class="[
            'mr-3',
            'product-thumb',
            { 'active-thumb': selectedVariant === index },
          ]"
          @click="eventHub.$emit('selectVariant', index)"
        >
          <img :src="variant.variantImages[0]" alt="product thumb" />
        </v-avatar>
      </div>
    </div>

    <!-- Sizes -->
    <div class="form-group">
      <p v-if="!selectedSize">Select size</p>
      <v-row v-else class="mb-6">
        <v-col class="pa-0">
          <div>
            Size: {{ selectedSizeName }}
            <span v-if="showSizeRegion">US</span>
          </div>
        </v-col>
        <v-col class="pa-0">
          <div>Stock: {{ selectedSizeStock }}</div>
        </v-col>
      </v-row>

      <div>
        <ul class="d-flex flex-wrap pa-0 mb-2">
          <li
            v-for="(size, sizeIdx) in productDetails.variants[selectedVariant]
              .stock"
            :key="sizeIdx"
            :class="sizeClass(size)"
            @click="selectSize(size)"
          >
            {{ Object.keys(size)[0] }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Quantity & Buttons -->
    <v-row>
      <!-- Qty dropdown -->
      <v-col class="col-12 col-lg-2 px-md-0">
        <select
          name="orderQty"
          id="orderQty"
          class="custom-select form-control mb-0"
          :value="selectedQuantity"
          @input="$emit('update:selectedQuantity', +$event.target.value)"
        >
          <option
            v-for="n in selectedSizeStock"
            :value="n"
            :key="n"
            :selected="n === selectedQuantity"
          >
            {{ n }}
          </option>
        </select>
      </v-col>

      <!-- Cart button -->
      <v-col class="col-12 col-lg-5 px-0 px-lg-3">
        <button :class="cartButtonClass" @click="onUpdateCart">
          {{ cartButtonInfo.text }}
          <Icon :icon="cartButtonInfo.icon" width="18" :inline="true" />
        </button>
      </v-col>

      <!-- Wishlist button -->
      <v-col class="col-12 col-lg-5 px-0" @click="updateWishList(productId)">
        <button class="btn btn-block btn-outline-dark">
          {{ wishlistButtonInfo.text }}
          <Icon :icon="wishlistButtonInfo.icon" width="18" :inline="true" />
        </button>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import getVariantStock from '@/utils/getVariantStock';
import { mapGetters, mapActions } from 'vuex';
import { Icon } from '@iconify/vue2';

export default {
  props: {
    productDetails: { type: Object, default: () => {} },
    productId: { type: Number },
    isUpdatingCart: { type: Boolean, default: false },
    selectedVariant: { type: Number, default: 0 },
    selectedSize: { type: Object, default: () => {} },
    selectedQuantity: { type: Number },
    itemIndexToUpdate: { type: Number },
  },

  components: {
    Icon,
  },

  computed: {
    ...mapGetters({
      isWishlisted: 'productPrivateStore/isWishlisted',
    }),

    stockState() {
      return getVariantStock(this.productDetails, this.selectedVariant);
    },

    cartButtonClass() {
      return [
        'btn btn-block btn-outline-dark',
        { disableBtn: !this.selectedSizeStock },
      ];
    },

    cartButtonInfo() {
      return this.isUpdatingCart
        ? { text: 'Update cart', icon: 'bi:cart' }
        : { text: 'Add to cart', icon: 'bi:cart' };
    },

    wishlistButtonInfo() {
      return this.isWishlisted(this.productId)
        ? { text: 'Remove from wishlist', icon: 'mdi:heart-minus-outline' }
        : { text: 'Add to wishlist', icon: 'ph:heart-straight' };
    },

    showSizeRegion() {
      return (
        (this.productDetails.category === 'Shoes' ||
          this.productDetails.category === 'Sneaker') &&
        this.selectedSize !== undefined
      );
    },

    selectedSizeName() {
      return this.selectedSize ? Object.keys(this.selectedSize)[0] : undefined;
    },

    selectedSizeStock() {
      return this.selectedSize
        ? Object.values(this.selectedSize)[0]
        : undefined;
    },
  },

  methods: {
    ...mapActions({
      updateWishList: 'productPrivateStore/updateWishList',
      showNotification: 'notification/showNotification',
    }),

    isSizeOutOfStock(item) {
      return Object.values(item)[0] === 0;
    },

    isSale(product) {
      if (product.pricing.discount) return true;
    },

    selectSize(item) {
      let quantity = 1; // for case add new item to cart

      if (this.isUpdatingCart) {
        const newSizeStock = Object.values(item)[0];
        quantity =
          this.selectedQuantity < newSizeStock
            ? this.selectedQuantity
            : newSizeStock;
      }

      if (!this.isSizeOutOfStock(item)) {
        this.eventHub.$emit('selectSize', { size: item, quantity: quantity });
      }

      console.log('selectedSize', this.selectedSize);
    },

    sizeClass(size) {
      return [
        'size-item',
        'text-muted',
        { 'active-size': this.selectedSize === size },
        { 'out-of-stock': this.isSizeOutOfStock(size) },
      ];
    },

    onUpdateCart() {
      const {
        productDetails,
        selectedSizeName,
        selectedQuantity,
        selectedSizeStock,
        selectedVariant,
        productId,
      } = this;

      if (this.selectedSize) {
        const payload = {
          productId: productId,
          image: productDetails.variants[selectedVariant].variantImages[0],
          name: productDetails.name,
          variantColor: productDetails.variants[selectedVariant].variantColor,
          sizeName: selectedSizeName,
          quantity: selectedQuantity,
          sizeStock: selectedSizeStock,
          price: productDetails.pricing.priceAfterDiscount,
        };

        this.$store.dispatch('productPrivateStore/updateCart', {
          isUpdatingCart: this.isUpdatingCart,
          itemIndexToUpdate: this.itemIndexToUpdate,
          productPayload: payload,
        });

        if (this.isUpdatingCart) this.close();
      }
    },
  },
};
</script>
