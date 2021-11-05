<template>
  <v-app>
    <NavBars></NavBars>
    <v-main class="pa-0">
      <router-view />
    </v-main>

    <!-- fix snackbar, tự code lại, lỗi mất animation khi thông báo ẩn đi -->
    <v-snackbar
      v-show="isShowNotification"
      :value="isShowNotification"
      transition="fade-transition"
      centered
      elevation="5"
      class="custom-notify"
      :content-class="isError ? 'error-noti' : ''"
      :light="isError"
      :timeout="isError ? 2000 : 1000"
      @input="hideNotification()"
    >
      <Icon :icon="notiIcon" width="28" :inline="true" class="mb-2" />
      <div>{{ notificationMessage }}</div>
    </v-snackbar>

    <!-- PRODUCT DIALOG -->
    <ProductDialog
      v-if="productId"
      :productId="productId"
      :isOpen="isDialogOpen"
      :isUpdatingCart="isUpdatingCart"
      :selectedVariant="defaultVariantIdx"
      :selectedSize="defaultSize"
      :selectedQuantity.sync="defaultQuantity"
      :itemIndexToUpdate="updatingItemInCart.itemIndexToUpdate"
    ></ProductDialog>

    <!-- DRAWERS -->
    <SearchDrawer :isOpen.sync="isShowSearchDrawer"></SearchDrawer>
    <!-- Docs: https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier -->

    <CartDrawer
      v-model="isShowCartDrawer"
      :isHiddenWhenDialogShown="isUpdatingCart"
    ></CartDrawer>
    <!-- Docs: https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components -->

    <HomeFooter></HomeFooter>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import ProductDialog from '@/components/HomePage/Product/ProductDialog.vue';
import NavBars from '@/components/NavBars';
import SearchDrawer from '@/components/HomePage/SearchDrawer';
import CartDrawer from '@/components/HomePage/CartDrawer';
import { Icon } from '@iconify/vue2';
import HomeFooter from '@/components/HomePage/HomeFooter.vue';

export default {
  name: 'App',

  components: {
    Icon,
    NavBars,
    HomeFooter,
    ProductDialog,
    SearchDrawer,
    CartDrawer,
  },

  data: () => ({
    isDialogOpen: false,
    isUpdatingCart: false,
    isShowSearchDrawer: false,
    isShowCartDrawer: false,
    productId: 0,
    defaultVariantIdx: 0,
    defaultSize: undefined,
    defaultQuantity: undefined,
    updatingItemInCart: {
      itemIndexToUpdate: undefined,
      sizeName: undefined,
      variantColor: undefined,
      quantity: undefined,
    },
  }),

  computed: {
    ...mapGetters('notification', [
      'isShowNotification',
      'notificationType',
      'notificationMessage',
    ]),

    ...mapGetters({
      getProductById: 'products/getProductById',
    }),

    notiIcon() {
      return this.isError
        ? 'fluent:error-circle-20-regular'
        : 'akar-icons:circle-check';
    },

    isError() {
      return this.notificationType === 'error';
    },

    productDetails() {
      return this.getProductById(this.productId);
    },
  },

  methods: {
    hideNotification() {
      this.$store.commit('notification/hideNotification');
    },

    getDefaultItemInDialog() {
      if (this.isUpdatingCart) {
        const {
          updatingItemInCart: { sizeName, variantColor, quantity },
          productDetails,
        } = this;

        const updatingVariantIdx = productDetails.variants.findIndex(
          (variant) => variant.variantColor === variantColor
        );

        const updatingSize = productDetails.variants[
          updatingVariantIdx
        ].stock.find((item) => Object.keys(item)[0] === sizeName);

        this.defaultVariantIdx = updatingVariantIdx;
        this.defaultSize = updatingSize;
        this.defaultQuantity = quantity;
      }
    },

    onShowProductDialog({
      isUpdatingCart,
      productId,
      variantColor,
      sizeName,
      quantity,
      itemIndexToUpdate,
    }) {
      this.isDialogOpen = true;
      this.productId = productId;
      this.isUpdatingCart = isUpdatingCart;
      if (isUpdatingCart) {
        this.updatingItemInCart.variantColor = variantColor;
        this.updatingItemInCart.sizeName = sizeName;
        this.updatingItemInCart.quantity = quantity;
        this.updatingItemInCart.itemIndexToUpdate = itemIndexToUpdate;
        this.$nextTick(this.getDefaultItemInDialog());
      }
    },

    onCloseProductDialog() {
      this.isDialogOpen = false;
      this.defaultVariantIdx = 0;
      this.defaultSize = undefined;
      this.defaultQuantity = 1;
      this.isUpdatingCart = false;
    },
  },

  created() {
    this.eventHub.$on('showProductDialog', this.onShowProductDialog);
    this.eventHub.$on('closeProductDialog', this.onCloseProductDialog);

    this.eventHub.$on('selectVariant', (index) => {
      this.defaultVariantIdx = index;
      this.defaultSize = undefined;
    });

    this.eventHub.$on('selectSize', ({ size, quantity }) => {
      this.defaultSize = size;
      this.defaultQuantity = quantity;
    });

    this.eventHub.$on(
      'cartClicked',
      () => (this.isShowCartDrawer = !this.isShowCartDrawer)
    );
    this.eventHub.$on('closeCart', () => (this.isShowCartDrawer = false));

    this.eventHub.$on(
      'searchClicked',
      () => (this.isShowSearchDrawer = !this.isShowSearchDrawer)
    );
    this.eventHub.$on('closeSearch', () => (this.isShowSearchDrawer = false));
  },

  async mounted() {
    await this.$store.dispatch('products/getProducts');
  },

  beforeDestroy() {
    this.eventHub.$off();
  },
};
</script>

<style lang="scss">
.nav-heading {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.v-menu__content {
  box-shadow: none !important;
  border-radius: 0 !important;
  border: 1px #e0e0e0 solid;
}

.v-breadcrumbs__item {
  color: black !important;
}

.custom-notify {
  .v-snack__wrapper {
    min-width: auto;
    & > .v-snack__content {
      text-align: center !important;
    }
  }
}
.error-noti {
  color: #ff4c3b;
}
</style>
