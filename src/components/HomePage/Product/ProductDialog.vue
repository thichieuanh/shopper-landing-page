<template>
  <div v-if="productId" class="THITHI">
    <div
      class="modal-overlay"
      style="display: block"
      v-show="isOpen"
      @click="close"
    ></div>

    <div :class="modalClass" v-show="isOpen">
      <div class="modal-dialog">
        <button class="btn close" @click="close">
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

    modalClass() {
      return this.isOpen ? 'fade modal show' : 'fade modal';
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

  beforeDestroy() {
    this.eventHub.$off();
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
</style>
