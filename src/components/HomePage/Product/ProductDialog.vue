<template>
  <div class="productDialog">
    <transition name="modal-fade" appear>
      <div
        class="modal-overlay"
        id="product-modal-overlay"
        v-show="isOpen"
        @click="close"
      >
        <transition name="slide-fade" appear v-if="productDetails">
          <div
            class="modal-dialog modal-dialog-centered modal-xl"
            v-if="productDetails"
            @click.stop=""
          >
            <button class="close" @click="close">
              <Icon icon="clarity:close-line" width="27" :inline="true" />
            </button>

            <!-- Modal content -->
            <div class="px-4 px-lg-0">
              <v-row class="product-dialog-content align-center">
                <!-- Image -->
                <v-col
                  cols="12"
                  md="6"
                  lg="5"
                  class="px-lg-0 py-4 py-lg-0 text-left"
                  style="max-height: 100%"
                >
                  <img
                    class="product-dialog-img"
                    :src="
                      productDetails.variants[selectedVariant].variantImages[0]
                    "
                  />
                  <button class="btn btn-block btn-primary" @click="close">
                    <router-link :to="`/product/${productDetails._id}`">
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
                  <!-- <ProductVariantAndSizeSelect
                    :productDetails="productDetails"
                    :productId="productId"
                  ></ProductVariantAndSizeSelect> -->
                </v-col>
              </v-row>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';
import { mapGetters, mapActions, mapState } from 'vuex';
// import ProductVariantAndSizeSelect from '@/components/HomePage/Product/ProductVariantAndSizeSelect';

export default {
  components: {
    Icon,
    // ProductVariantAndSizeSelect,
  },

  props: {
    isOpen: { type: Boolean, default: false },
    productId: { type: String },
  },

  data: () => ({
    selectedVariant: 0,
  }),

  computed: {
    ...mapState('productPrivateStore', ['cart']),

    ...mapGetters({
      isWishlisted: 'productPrivateStore/isWishlisted',
    }),

    productDetails() {
      return this.$store.state.productPrivateStore.product;
    },
  },

  methods: {
    ...mapActions({
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

  watch: {
    productId: {
      immediate: true,
      handler() {
        if (this.productId) {
          this.$store.dispatch(
            'productPrivateStore/getProduct',
            this.productId
          );
        } else {
          this.$store.commit('productPrivateStore/product', null);
        }
      },
    },
  },
};
</script>
<style scoped lang="scss">
.product-dialog-content {
  height: 100%;
  max-width: 100%;
}

.product-dialog-img {
  // max-height: 100%;
  height: auto;
  max-width: 100%;
  margin-bottom: -1rem;
}
</style>
