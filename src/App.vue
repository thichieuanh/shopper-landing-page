<template>
  <v-app>
    <NavBars></NavBars>
    <v-main class="pa-0">
      <transition name="fade" mode="out-in" @after-leave="afterLeave">
        <router-view :key="$route.fullPath" />
      </transition>
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

    <!-- LOADING -->
    <Loading v-show="loading" />

    <!-- PRODUCT DIALOG -->
    <ProductDialog
      :isOpen="isDialogOpen"
      :productId="productId"
    ></ProductDialog>

    <!-- SIZE CHART -->
    <SizeChart :isOpen="isSizeChartOpen"></SizeChart>

    <!-- DRAWERS -->
    <SearchDrawer :isOpen.sync="isShowSearchDrawer"></SearchDrawer>
    <!-- Docs: https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier -->

    <CartDrawer
      v-model="isShowCartDrawer"
      :isHiddenWhenDialogShown="isEditingCart"
    ></CartDrawer>
    <!-- Docs: https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components -->

    <HomeFooter></HomeFooter>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import { Icon } from '@iconify/vue2';
import ProductDialog from '@/components/HomePage/Product/ProductDialog.vue';
import SizeChart from '@/components/ProductPage/SizeChart.vue';
import NavBars from '@/components/NavBars';
import SearchDrawer from '@/components/HomePage/SearchDrawer';
import CartDrawer from '@/components/HomePage/CartDrawer';
import HomeFooter from '@/components/HomePage/HomeFooter.vue';
import Loading from '@/components/Loading';

export default {
  name: 'App',

  components: {
    Icon,
    NavBars,
    HomeFooter,
    ProductDialog,
    SearchDrawer,
    CartDrawer,
    SizeChart,
    Loading,
  },

  data: () => ({
    isDialogOpen: false,
    isSizeChartOpen: false,
    isShowSearchDrawer: false,
    isShowCartDrawer: false,
    productId: null,
  }),

  computed: {
    ...mapGetters('notification', [
      'isShowNotification',
      'notificationType',
      'notificationMessage',
    ]),

    loading() {
      return this.$store.state.notification.loading;
    },

    notiIcon() {
      return this.isError
        ? 'fluent:error-circle-20-regular'
        : 'akar-icons:circle-check';
    },

    isError() {
      return this.notificationType === 'error';
    },

    isEditingCart() {
      return this.$store.state.productPrivateStore.isEditingCart;
    },
  },

  methods: {
    hideNotification() {
      this.$store.commit('notification/hideNotification');
    },

    styleHandlingWhenShowingModal(overlayElementId) {
      /*
      - The offsetWidth property returns the viewable width of an element in pixels,
      including padding, border and scrollbar, but not the margin.
      (offsetWidth = elementWidth + padding + border)

      - The innerWidth property returns the width of a window's content area.
      (innerWidth = offsetWidth + margin + scrollbar)

      - The outerWidth property returns the outer width of the browser window,
      including all interface elements (like toolbars/scrollbars).
      (outerWidth = innerWidth (including scrollbar) + devtool) */

      const scrollBarWidth = window.innerWidth - document.body.offsetWidth;
      if (scrollBarWidth) document.body.classList.add('showing-modal');

      this.$nextTick(function () {
        document.getElementById(overlayElementId).style.overflow = 'auto';
        if (overlayElementId === 'product-modal-overlay') {
          document.getElementById(
            overlayElementId
          ).style.paddingRight = `${scrollBarWidth}px`;
        }
      });
    },

    styleHandlingWhenClosingModal(overlayElementId) {
      document.body.classList.remove('showing-modal');
      document.getElementById(overlayElementId).style.overflow = 'hidden';
      if (overlayElementId === 'product-modal-overlay') {
        document.getElementById(overlayElementId).style.paddingRight = '0px';
      }
    },

    onShowSizeChart() {
      this.isSizeChartOpen = true;
      this.styleHandlingWhenShowingModal('sizeChart-modal-overlay');
    },

    onCloseSizeChart() {
      this.isSizeChartOpen = false;
      this.styleHandlingWhenClosingModal('sizeChart-modal-overlay');
    },

    afterLeave() {
      this.$root.$emit('triggerScroll');
    },
  },

  created() {
    this.eventHub.$on('showProductDialog', ({ productId }) => {
      this.productId = productId;
      this.isDialogOpen = true;
      this.styleHandlingWhenShowingModal('product-modal-overlay');
    });

    this.eventHub.$on('closeProductDialog', () => {
      this.productId = null;
      this.isDialogOpen = false;
      this.styleHandlingWhenClosingModal('product-modal-overlay');
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

    this.eventHub.$on('showSizeChart', () => this.onShowSizeChart());

    this.eventHub.$on('closeSizeChart', () => this.onCloseSizeChart());
  },

  beforeDestroy() {
    this.eventHub.$off();
  },

  mounted() {
    this.$store.dispatch('products/getProducts');
    this.$store.dispatch('orders/getOrders');
    this.$store.dispatch('productPrivateStore/getWishlistedProducts');
    this.$store.dispatch('productPrivateStore/getCart');
    this.$store.dispatch('accountInfo/getFullAccountInfo');
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
