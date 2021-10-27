<template>
  <div class="THITHI">
    <div
      class="modal-overlay"
      style="display: block"
      v-show="isOpen"
      @click="close"
    ></div>

    <div :class="modalClass" v-show="isOpen">
      <div class="modal-dialog">
        <button class="close" @click="close">
          <Icon icon="clarity:close-line" width="27" :inline="true" />
        </button>

        <!-- Modal content -->
        <v-row class="product-dialog">
          <!-- Image -->
          <v-col
            cols="12"
            md="6"
            lg="5"
            class="px-0 py-5 text-left"
            style="max-height: 100%"
          >
            <img class="product-dialog-img" :src="productDetails.images.img" />
            <button class="btn btn-block btn-primary">
              <router-link :to="{ name: 'ProductPage' }">
                More Product Info
                <Icon
                  icon="ant-design:info-circle-outlined"
                  width="18"
                  :inline="true"
                />
              </router-link>
            </button>
          </v-col>

          <!-- Product info -->
          <v-col cols="12" md="6" lg="7" class="px-md-9 py-9 text-left">
            <h4 class="mb-3">{{ productDetails.name }}</h4>
            <div class="mb-7 d-flex align-baseline">
              <h5 class="mr-1">
                {{ productDetails.pricing.priceAfterDiscount }}
              </h5>
              <span>({{ getVariantStock }})</span>
            </div>

            <!-- Colors -->
            <div class="form-group">
              <p class="mb-6">
                Color:
                {{ productDetails.variants[selectedVariant].variantColor }}
              </p>

              <div class="d-flex mb-8">
                <v-avatar
                  v-for="(variant, index) in productDetails.variants"
                  :key="index"
                  tile
                  size="70"
                  :class="[
                    'mr-3',
                    'product-thumb',
                    { 'active-thumb': selectedVariant === index },
                  ]"
                  @click="selectVariant(index)"
                >
                  <img
                    :src="productDetails.variants[selectedVariant].variantImage"
                    alt="product thumb"
                  />
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
                    v-for="(size, sizeIdx) in productDetails.variants[
                      selectedVariant
                    ].stock"
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
              <v-col class="col-12 col-lg-2 px-md-0">
                <!-- Qty dropdown -->
                <select
                  name="orderQty"
                  id="orderQty"
                  class="custom-select form-control mb-0"
                  v-model="selectedQuantity"
                >
                  <option v-for="n in selectedSizeStock" :value="n" :key="n">
                    {{ n }}
                  </option>
                </select>

                <!-- Cart button -->
              </v-col>
              <v-col class="col-12 col-lg-5 px-0 px-lg-3">
                <button :class="cartButtonClass" @click="onUpdateCart">
                  {{ cartButtonInfo.text }}
                  <Icon :icon="cartButtonInfo.icon" width="18" :inline="true" />
                </button>
              </v-col>

              <!-- Wishlist button -->
              <v-col
                class="col-12 col-lg-5 px-0"
                @click="updateWishList(productId)"
              >
                <button class="btn btn-block btn-outline-dark">
                  {{ wishlistButtonInfo.text }}
                  <Icon
                    :icon="wishlistButtonInfo.icon"
                    width="18"
                    :inline="true"
                  />
                </button>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  components: { Icon },
  props: {
    isOpen: { type: Boolean, default: false },
    productId: { type: Number },
    isUpdatingCart: { type: Boolean, default: false },
    itemToUpdate: { type: Object, default: () => {} },
  },

  data: () => ({
    defaultSize: undefined,
    defaultVariantIdx: 0,
    selectedQuantity: 1,
  }),

  computed: {
    ...mapState('productPrivateStore', ['cart']),

    ...mapGetters({
      getProductById: 'products/getProductById',
      isWishlisted: 'productPrivateStore/isWishlisted',
      isItemInCart: 'productPrivateStore/isItemInCart',
    }),

    productDetails() {
      return this.getProductById(this.productId);
    },

    selectedSize: {
      get: function () {
        if (this.isUpdatingCart) {
          const { itemToUpdate, productDetails, selectedVariant } = this;
          const { size } = itemToUpdate;

          const foundSize = productDetails.variants[selectedVariant].stock.find(
            (item) => Object.keys(item)[0] === size
          );

          return foundSize;
        } else {
          return this.defaultSize;
        }
      },
      set: function (newValue) {
        this.defaultSize = newValue;
      },
    },

    selectedVariant: {
      get: function () {
        return this.defaultVariantIdx;
      },

      set: function (newValue) {
        this.defaultVariantIdx = newValue;
      },
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

    getVariantStock() {
      const stockArray =
        this.productDetails.variants[this.selectedVariant].stock;

      const totalStock = stockArray.reduce((sum, size) => {
        const sizeQty = Object.values(size)[0];
        sum += sizeQty;
        return sum;
      }, 0);
      return totalStock ? 'In Stock' : 'Sold Out';
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

    modalClass() {
      return this.isOpen ? 'fade modal show' : 'fade modal';
    },

    cartButtonClass() {
      return [
        'btn btn-block btn-outline-dark',
        { disableBtn: !this.selectedSizeStock },
      ];
    },
  },

  methods: {
    ...mapActions({
      updateWishList: 'productPrivateStore/updateWishList',
      showNotification: 'notification/showNotification',
    }),

    close() {
      this.eventHub.$emit('closeProductDialog');
      this.selectedSize = undefined;
      this.selectedQuantity = undefined;
    },

    isSizeOutOfStock(item) {
      return Object.values(item)[0] === 0;
    },

    selectSize(item) {
      if (!this.isSizeOutOfStock(item)) {
        this.selectedSize = item;
        this.selectedQuantity = 1;
      }
    },

    getDefaultVariant() {
      if (this.isUpdatingCart) {
        const { itemToUpdate, productDetails } = this;
        const updatedVariantIdx = productDetails.variants.findIndex(
          (variant) => variant.variantColor === itemToUpdate.variantColor
        );
        this.defaultVariantIdx = updatedVariantIdx;
      }
    },

    selectVariant(item) {
      this.selectedVariant = item;
      this.selectedSize = undefined;
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
        const productPayload = {
          productId: productId,
          image: productDetails.images.img,
          name: productDetails.name,
          variantColor: productDetails.variants[selectedVariant].variantColor,
          size: selectedSizeName,
          quantity: selectedQuantity,
          sizeStock: selectedSizeStock,
          price: productDetails.pricing.priceAfterDiscount,
        };

        this.$store.dispatch('productPrivateStore/updateCart', productPayload);
      }
    },
  },

  mounted() {
    this.getDefaultVariant();
  },
};
</script>
<style scoped lang="scss">
.modal {
  position: fixed;
  background: transparent;
  z-index: 100;
  top: 8%;
  left: 50%;
  transform: translate(-50%);
  width: 1140px;
  min-height: calc(100% - 3.5rem);
}

.modal-dialog {
  z-index: 100;
  position: absolute;
  top: 0;
  background: #fff;
  max-width: 90vw;
  height: auto;
  text-align: center;
  box-sizing: border-box;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

  &.visible {
    display: block;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  opacity: 0.3;
  background: black;
}

.product-dialog {
  height: 100%;
  max-width: 100%;
}

.product-dialog-img {
  max-height: 100%;
  max-width: 100%;
  margin-bottom: -1rem;
}
.product-thumb {
  opacity: 0.8;
  cursor: pointer;
}

.active-thumb {
  position: relative;
  opacity: 1;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 2px solid #111;
  }
}

.size-item {
  cursor: pointer;
  min-width: 3rem;
  padding: 0.5rem;
  margin: 0 1rem 0.5rem 0;
  text-align: center;
  border: 1px solid #ddd;
}

.active-size {
  color: #111;
  border: 1px solid #111;
}

.out-of-stock {
  background: #f5f5f5;
  text-decoration: line-through;
  cursor: not-allowed;
}

.disableBtn {
  cursor: not-allowed;
}
</style>
