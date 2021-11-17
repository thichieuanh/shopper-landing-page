<template>
  <div v-if="productId">
    <div class="modal-overlay" v-show="isOpen" @click="close">
      <div class="modal-dialog modal-xl" v-show="isOpen" @click.stop="">
        <button class="close" @click="close">
          <Icon icon="clarity:close-line" width="27" :inline="true" />
        </button>

        <!-- Modal content -->
        <v-row class="product-dialog-content">
          <!-- Image -->
          <v-col
            cols="12"
            md="6"
            lg="5"
            class="px-0 py-5 text-left"
            style="max-height: 100%"
          >
            <img
              class="product-dialog-img"
              :src="productDetails.variants[selectedVariant].variantImages[0]"
            />
            <button class="btn btn-block btn-primary" @click="close">
              <router-link :to="`/product/${productDetails.id}`">
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
            <ProductVariantAndSizeSelect
              v-if="productId"
              :productDetails="productDetails"
              :productId="productId"
            ></ProductVariantAndSizeSelect>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';
import { mapGetters, mapActions, mapState } from 'vuex';
import ProductVariantAndSizeSelect from '@/components/HomePage/Product/ProductVariantAndSizeSelect';

export default {
  components: { Icon, ProductVariantAndSizeSelect },
  props: {
    isOpen: { type: Boolean, default: false },
  },

  data: () => ({
    selectedVariant: 0,
    productId: undefined,
  }),

  computed: {
    ...mapState('productPrivateStore', ['cart']),

    ...mapGetters({
      getProductById: 'products/getProductById',
      isWishlisted: 'productPrivateStore/isWishlisted',
    }),

    productDetails() {
      return this.getProductById(this.productId);
    },
  },

  methods: {
    ...mapActions({
      updateWishList: 'productPrivateStore/updateWishList',
      showNotification: 'notification/showNotification',
    }),

    getSelectedVariant() {
      return this.selectedVariant;
    },

    setSelectedVariant(data) {
      this.selectedVariant = data;
    },

    close() {
      this.eventHub.$emit('closeProductDialog');
    },

    onShowProductDialog({ productId }) {
      this.productId = productId;
    },
  },

  provide() {
    return {
      getSelectedVariant: this.getSelectedVariant,
      setSelectedVariant: this.setSelectedVariant,
    };
  },

  created() {
    this.eventHub.$on('showProductDialog', this.onShowProductDialog);
  },
};
</script>
<style scoped lang="scss">
.product-dialog-content {
  height: 100%;
  max-width: 100%;
}

.product-dialog-img {
  max-height: 100%;
  max-width: 100%;
  margin-bottom: -1rem;
}
</style>
