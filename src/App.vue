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
    <ProductDialog :isOpen="isDialogOpen"></ProductDialog>

    <!-- SIZE CHART -->
    <SizeChart :isOpen="isSizeChartOpen"></SizeChart>

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
import { Icon } from '@iconify/vue2';
import ProductDialog from '@/components/HomePage/Product/ProductDialog.vue';
import SizeChart from '@/components/ProductPage/SizeChart.vue';
import NavBars from '@/components/NavBars';
import SearchDrawer from '@/components/HomePage/SearchDrawer';
import CartDrawer from '@/components/HomePage/CartDrawer';
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
    SizeChart,
  },

  data: () => ({
    isDialogOpen: false,
    isSizeChartOpen: false,
    isUpdatingCart: false,
    isShowSearchDrawer: false,
    isShowCartDrawer: false,
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
  },

  methods: {
    hideNotification() {
      this.$store.commit('notification/hideNotification');
    },

    hideBodyScrollBar() {
      const scrollBarWidth = window.innerWidth - document.body.offsetWidth;
      document.body.style.marginRight = scrollBarWidth;
      document.body.classList.add('showing-modal');
    },

    showBodyScrollBar() {
      document.body.style.marginRight = '';
      document.body.classList.remove('showing-modal');
    },

    onShowSizeChart() {
      this.isSizeChartOpen = true;
      this.hideBodyScrollBar();
    },

    onCloseSizeChart() {
      this.isSizeChartOpen = false;
      this.showBodyScrollBar();
    },
  },

  created() {
    this.eventHub.$on('showProductDialog', ({ isUpdatingCart }) => {
      this.isDialogOpen = true;
      this.isUpdatingCart = isUpdatingCart;
      this.hideBodyScrollBar();
    });

    this.eventHub.$on('closeProductDialog', () => {
      this.isDialogOpen = false;
      this.isUpdatingCart = false;
      this.showBodyScrollBar();
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
