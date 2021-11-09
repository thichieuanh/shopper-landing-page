<template>
  <div>
    <div class="container-control">
      <Breadcrumbs></Breadcrumbs>

      <v-row>
        <!-- Image -->
        <v-col cols="12" sm="6">
          <v-row>
            <v-col cols="2">
              <img
                v-for="(image, idx) in productDetails.variants[selectedVariant]
                  .variantImages"
                :key="idx"
                :src="image"
                alt=""
                class="img-slider"
              />
            </v-col>

            <v-col cols="10">
              <img
                class="img-fluid"
                :src="productDetails.variants[selectedVariant].variantImages[0]"
                alt=""
            /></v-col>
          </v-row>
        </v-col>

        <!-- Product Infos -->
        <v-col cols="12" sm="6" class="pl-md-10">
          <div class="d-flex justify-space-between align-center">
            <span>{{ productDetails.category }}</span>

            <div class="d-flex">
              <v-rating :value="3">
                <template v-slot:item="props">
                  <Icon
                    width="20"
                    icon="eva:star-fill"
                    :inline="true"
                    :style="{
                      color: props.isFilled ? '#ff9736' : '#bdbdbd',
                    }"
                  />
                </template>
              </v-rating>

              <span class="ml-3">Reviews ({{ reviewCount }})</span>
            </div>
          </div>

          <!-- Name -->
          <h3 class="mb-2">{{ productDetails.name }}</h3>

          <!-- Price -->
          <div class="mb-7 d-flex align-baseline">
            <h5 class="mr-1">
              {{
                productDetails.pricing.priceAfterDiscount | currencyFormatter
              }}
            </h5>
            <span> ({{ stockState }}) </span>
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
        </v-col>
        <div>{{ productDetails }}</div>
      </v-row>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs';
import { Icon } from '@iconify/vue2';
import { mapGetters } from 'vuex';
import getVariantStock from '@/utils/getVariantStock';

export default {
  data: () => ({
    selectedVariant: 0,
    reviewCount: 0,
    selectedSize: undefined,
  }),

  components: {
    Breadcrumbs,
    Icon,
  },

  computed: {
    ...mapGetters({
      getProductById: 'products/getProductById',
    }),

    productId() {
      return +this.$route.params.id;
    },

    stockState() {
      return getVariantStock(this.productDetails, this.selectedVariant);
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
    sizeClass(size) {
      return [
        'size-item',
        'text-muted',
        { 'active-size': this.selectedSize === size },
        { 'out-of-stock': this.isSizeOutOfStock(size) },
      ];
    },

    isSizeOutOfStock(item) {
      return Object.values(item)[0] === 0;
    },
  },

  created() {
    const product = this.getProductById(this.productId);
    this.productDetails = product;
  },
};
</script>

<style lang="scss" scoped>
.img-slider {
  height: 12.5%;
  width: 100%;
}
</style>
