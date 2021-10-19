<template>
  <div>
    <div
      class="modal-overlay"
      style="display: block"
      v-show="isOpen"
      @click="close"
    ></div>

    <div class="modal-wrapper" v-show="isOpen">
      <div class="modal animate__animated">
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
              <a href="/product">
                More Product Info
                <Icon
                  icon="ant-design:info-circle-outlined"
                  width="18"
                  :inline="true"
                />
              </a>
            </button>
          </v-col>

          <!-- Product info -->
          <v-col cols="12" md="6" lg="7" class="px-md-9 py-9 text-left">
            <h4 class="mb-3">{{ productDetails.name }}</h4>
            <div class="mb-7 d-flex align-baseline">
              <h5 class="mr-1">{{ productDetails.pricing.price }}</h5>
              <span>(In Stock)</span>
            </div>

            <!-- Colors -->
            <div class="form-group">
              <p class="mb-6">
                Color:
                {{ productDetails.variants[selectedVariant].variantColor }}
              </p>

              <div class="d-flex mb-8">
                <v-avatar
                  v-for="(color, index) in productDetails.colors"
                  :key="index"
                  tile
                  size="70"
                  :class="[
                    'mr-3',
                    'product-thumb',
                    { 'active-thumb': selectedVariant === index },
                  ]"
                  @click="selectedVariant = index"
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
              <p v-if="selectedSize === undefined">Select size</p>
              <p v-else class="mb-6">
                Size: {{ selectedSizeName }}
                <span v-if="showSizeRegion">US</span>
              </p>
              <div>
                <ul class="d-flex flex-wrap pa-0 mb-2">
                  <li
                    v-for="(size, sizeIdx) in productDetails.variants[
                      selectedVariant
                    ].stock"
                    :key="sizeIdx"
                    :class="[
                      'size-item',
                      'text-muted',
                      { 'active-size': selectedSize === size },
                      { 'out-of-stock': isSizeOutOfStock(size) },
                    ]"
                    @click="selectSize(size, sizeIdx)"
                  >
                    {{ Object.keys(size)[0] }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Quantity & Buttons -->
            <v-row>
              <v-col class="col-12 col-lg-3 px-md-0">
                <!-- Qty dropdown -->
                <select
                  name="orderQty"
                  id="orderQty"
                  class="custom-select form-control mb-0"
                >
                  <option v-for="n in 5" :value="n" :key="n">
                    {{ n }}
                  </option>
                </select>
              </v-col>
              <v-col class="col-12 col-lg-5 px-0 px-lg-3">
                <button class="btn btn-block btn-dark">
                  Add to Cart
                  <Icon
                    icon="ph:shopping-cart-simple"
                    width="18"
                    :inline="true"
                  />
                </button>
              </v-col>
              <v-col class="col-12 col-lg-4 px-0">
                <button class="btn btn-block btn-outline-dark">
                  Wishlist
                  <Icon icon="ph:heart-straight" width="18" :inline="true" />
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
import { mapGetters } from 'vuex';

export default {
  components: { Icon },
  props: {
    isOpen: { type: Boolean, default: false },
    id: { type: Number },
  },

  data: () => ({
    selectedVariant: 0,
    selectedSize: undefined,
  }),
  computed: {
    ...mapGetters(['getAllProducts', 'getProductById']),
    productDetails() {
      return this.getProductById(this.id);
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
  },
  methods: {
    close() {
      this.$emit('closeProductDialog');
      this.selectedSize = undefined;
    },
    isSizeOutOfStock(item) {
      return Object.values(item)[0] === 0;
    },
    selectSize(item) {
      if (!this.isSizeOutOfStock(item)) this.selectedSize = item;
    },
  },
};
</script>
<style scoped lang="scss">
.modal-wrapper {
  position: fixed;
  background: transparent;
  z-index: 100;
  top: 8%;
  left: 50%;
  transform: translate(-50%);
  width: 1140px;
  min-height: calc(100% - 3.5rem);
}

.modal {
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
}
</style>
