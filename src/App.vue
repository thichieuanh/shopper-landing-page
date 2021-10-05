<template>
  <v-app>
    <nav-bars></nav-bars>
    <v-main class="pa-0">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavBars from '@/components/NavBars';
export default {
  name: 'App',

  components: {
    NavBars,
  },

  data: () => ({}),
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

.navbar-breadcrumbs {
  border-bottom: 1px rgb(229, 229, 229) solid !important;
  .v-toolbar__content {
    display: flex;
    justify-content: space-between;
  }
}

.brand {
  font-size: 1.75rem;
  font-weight: 600;
}

.banner-heading {
  text-align: center;
  .v-banner__wrapper {
    height: 100%;
  }
}
</style>
