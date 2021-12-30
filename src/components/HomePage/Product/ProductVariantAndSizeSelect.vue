<template>
  <div>
    <h4 v-if="isRenderedInModal" class="mb-3">{{ productDetails.name }}</h4>
    <h3 v-else class="mb-3">{{ productDetails.name }}</h3>

    <div
      :class="[
        'mb-7 d-flex align-baseline',
        { 'text-gray-400': isWaitListNeeded },
      ]"
    >
      <h5
        :class="[
          ' font-weight-medium mr-2',
          { 'font-size-lg old-price': isSale(productDetails) },
        ]"
      >
        {{ productDetails.pricing.price | currencyFormatter }}
      </h5>

      <h5
        v-if="isSale(productDetails)"
        class="text-primary font-weight-medium mr-2"
      >
        {{ productDetails.pricing.priceAfterDiscount | currencyFormatter }}
      </h5>
      <span>({{ stockState }})</span>
    </div>

    <!-- Colors -->
    <div class="form-group">
      <p class="mb-6">
        Color:
        <span class="font-weight-medium">
          {{ productDetails.variants[selectedVariant].variantColor }}</span
        >
      </p>

      <div class="d-flex mb-8 ml-n1">
        <v-row>
          <v-col
            v-for="(variant, index) in productDetails.variants"
            :key="index"
            cols="3"
            class="px-1"
          >
            <v-avatar
              tile
              height="auto"
              width="100%"
              :class="[
                'mr-3',
                'product-thumb',
                { 'active-thumb': selectedVariant === index },
              ]"
              @click="selectVariant(index)"
            >
              <img :src="variant.variantImages[0]" alt="product thumb" />
            </v-avatar>
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- Sizes -->
    <div class="form-group">
      <p v-if="!selectedSize" class="mb-6">Select size</p>
      <v-row v-else class="mb-6">
        <v-col class="pa-0">
          <div>
            Size:
            <span class="font-weight-medium"> {{ selectedSizeName }} </span>
            <span class="font-weight-medium" v-if="showSizeRegion">US</span>
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
            {{ size.sizeName }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Size chart -->
    <div class="mb-8 d-flex" v-if="!isRenderedInModal">
      <img src="/img/icons/icon-ruler.svg" alt="" />
      <p class="ml-3 underline-hover" @click="eventHub.$emit('showSizeChart')">
        Size chart
      </p>
    </div>

    <!-- Quantity & Buttons -->
    <v-row class="mb-7">
      <v-col
        :class="[
          'col-12 px-0',
          isRenderedInModal ? 'col-lg-7' : isWaitListNeeded ? 'col-lg-6' : '',
        ]"
      >
        <v-row v-if="isWaitListNeeded">
          <v-col class="col-12 px-0 pr-lg-2 mb-2">
            <button class="btn btn-dark btn-block">
              <Icon icon="radix-icons:envelope-closed" :inline="true" />
              Wait List
            </button>
          </v-col>
        </v-row>
        <v-row v-else>
          <!-- Qty dropdown -->
          <v-col
            :class="[
              'col-12 px-0 mb-2',
              isRenderedInModal ? 'col-lg-4' : 'col-lg-3',
            ]"
          >
            <select
              name="orderQty"
              id="orderQty"
              class="custom-select form-control mb-0"
              @change="selectedQuantity = +$event.target.value"
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
          <v-col
            :class="[
              'col-12 px-0 px-lg-3 mb-2',
              isRenderedInModal ? 'col-lg-8' : 'col-lg-9',
            ]"
          >
            <button :class="cartButtonClass" @click="onUpdateCart">
              {{ cartButtonInfo.text }}
              <Icon :icon="cartButtonInfo.icon" width="18" :inline="true" />
            </button>
          </v-col>
        </v-row>
      </v-col>

      <!-- Wishlist button -->
      <v-col
        :class="['col-12 px-0', isRenderedInModal ? 'col-lg-5' : 'col-lg-6']"
        @click="wishlistClicked(productId)"
      >
        <button class="btn btn-block btn-outline-dark">
          {{ wishlistButtonInfo.text }}
          <Icon :icon="wishlistButtonInfo.icon" width="18" :inline="true" />
        </button>
      </v-col>
    </v-row>

    <div class="mb-7" v-if="isWaitListNeeded">
      <span class="text-gray-500"> Is your size/color sold out?</span>
      <span class="underline-hover ml-2">Join the Wait List! </span>
    </div>
  </div>
</template>

<script>
import getVariantStock from '@/utils/getVariantStock';
import { mapActions } from 'vuex';
import { Icon } from '@iconify/vue2';

export default {
  name: 'ProductVariantAndSizeSelect',

  props: {
    productDetails: { type: Object },
    isRenderedInModal: { type: Boolean, default: true },
  },

  components: {
    Icon,
  },

  data: () => ({
    selectedSize: undefined,
    selectedQuantity: undefined,
    isEditingCart: null,
    updatingItemInCart: {
      sizeName: undefined,
      variantColor: undefined,
      quantity: undefined,
    },
  }),

  computed: {
    productId() {
      return this.productDetails._id;
    },

    wishlist() {
      return this.$store.state.productPrivateStore.wishlist;
    },

    isWishlisted() {
      return this.$store.state.productPrivateStore.wishlist.some(
        (product) => product._id === this.productId
      );
    },

    selectedVariant: {
      get() {
        return this.getSelectedVariant();
      },
      set(newValue) {
        this.setSelectedVariant(newValue);
      },
    },

    stockState() {
      return getVariantStock(this.productDetails, this.selectedVariant);
    },

    isWaitListNeeded() {
      return this.stockState === 'Out of Stock';
    },

    cartButtonClass() {
      return [
        'btn btn-block btn-outline-dark',
        { disableBtn: !this.selectedSizeStock },
      ];
    },

    cartButtonInfo() {
      return this.isEditingCart
        ? { text: 'Update cart', icon: 'bi:cart' }
        : { text: 'Add to cart', icon: 'bi:cart' };
    },

    wishlistButtonInfo() {
      return this.isWishlisted
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
      return this.selectedSize ? this.selectedSize.sizeName : undefined;
    },

    selectedSizeStock() {
      return this.selectedSize ? this.selectedSize.sizeStock : undefined;
    },
  },

  inject: ['getSelectedVariant', 'setSelectedVariant'], // ref: https://codepen.io/fimion/pen/BxxpxZ?editors=1010

  methods: {
    ...mapActions({
      showNotification: 'notification/showNotification',
    }),

    isSizeOutOfStock(item) {
      return item.sizeStock === 0;
    },

    isSale(product) {
      if (product.pricing.discount) return true;
    },

    selectSize(item) {
      let quantity = 1; // for case add new item to cart

      if (this.isEditingCart) {
        const newSizeStock = item.sizeStock;
        quantity =
          this.selectedQuantity < newSizeStock
            ? this.selectedQuantity
            : newSizeStock;
      }
      if (!this.isSizeOutOfStock(item)) {
        this.selectedSize = item;
        this.selectedQuantity = quantity;
      }
    },

    selectVariant(index) {
      this.selectedVariant = index;
      this.selectedSize = undefined;
    },

    sizeClass(size) {
      return [
        'size-item',
        'text-muted',
        { 'active-size': this.selectedSize === size },
        { 'size-out-of-stock': this.isSizeOutOfStock(size) },
      ];
    },

    onUpdateCart() {
      const {
        productDetails,
        selectedSize,
        selectedQuantity,
        selectedVariant,
        productId,
      } = this;

      if (this.selectedSize) {
        const payload = {
          productId: productId,
          image: productDetails.variants[selectedVariant].variantImages[0],
          name: productDetails.name,
          variantColor: productDetails.variants[selectedVariant].variantColor,
          size: selectedSize,
          quantity: selectedQuantity,
          price: productDetails.pricing.priceAfterDiscount,
        };

        this.$store.dispatch('productPrivateStore/updateCart', payload);
      }
    },

    getDefaultItemInDialog() {
      if (this.isEditingCart) {
        const {
          updatingItemInCart: { sizeName, variantColor, quantity },
          productDetails,
        } = this;

        const updatingVariantIdx = productDetails.variants.findIndex(
          (variant) => variant.variantColor === variantColor
        );

        const updatingSize = productDetails.variants[
          updatingVariantIdx
        ].stock.find((item) => item.sizeName === sizeName);

        this.selectedVariant = updatingVariantIdx;
        this.selectedSize = updatingSize;
        this.selectedQuantity = quantity;
      }
    },

    wishlistClicked(productId) {
      this.$store.commit('notification/loading', true);

      this.$store.dispatch(
        'productPrivateStore/updateProductWishlistState',
        productId
      );
    },
  },

  mounted() {
    this.isEditingCart = this.$store.state.productPrivateStore.isEditingCart;
    this.updatingItemInCart =
      this.$store.state.productPrivateStore.updatingItemInCart;
    this.getDefaultItemInDialog();
  },

  beforeDestroy() {
    const payload = {
      isEditingCart: false,
      updatingItemInCart: {},
    };
    this.$store.commit('productPrivateStore/toggleEditCart', payload);
    this.selectedVariant = 0;
    this.selectedSize = undefined;
  },
};
</script>
