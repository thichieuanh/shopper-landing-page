<template>
  <v-app>
    <nav-bars></nav-bars>
    <v-main class="pa-0">
      <router-view />
    </v-main>

    <!-- fix snackbar, tự code lại -->
    <v-snackbar
      v-show="isShowNotification"
      :value="isShowNotification"
      transition="fade-transition"
      centered
      elevation="5"
      class="custom-notify"
      :content-class="isError ? 'error-noti' : ''"
      :light="isError"
      :timeout="1500"
      @input="hideNotification()"
    >
      <Icon :icon="notiIcon" width="28" :inline="true" class="mb-2" />
      <div>{{ notificationMessage }}</div>
    </v-snackbar>
  </v-app>
</template>

<script>
import NavBars from '@/components/NavBars';
import { Icon } from '@iconify/vue2';
import { mapGetters } from 'vuex';

export default {
  name: 'App',

  components: {
    NavBars,
    Icon,
  },

  data: () => ({}),

  computed: {
    ...mapGetters('notification', [
      'isShowNotification',
      'notificationType',
      'notificationMessage',
    ]),
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
