<template>
  <div>
    <div class="container-control">
      <Breadcrumbs></Breadcrumbs>
      <section class="pt-7 pb-12">
        <!-- Heading -->
        <h3 class="mb-10 text-center">My Account</h3>

        <v-row>
          <v-col
            cols="12"
            sm="3"
            class="list-group list-group-sm list-group-flush-x mb-10 mb-md-0"
          >
            <router-link
              v-for="route in navbarItems"
              :key="route.path"
              :to="route.path"
              :class="[
                'list-group-item justify-space-between text-muted',
                {
                  'list-group-item--active': route.isActive,
                },
              ]"
            >
              {{ route.text }}
              <Icon icon="feather:chevron-right" :inline="true" />
            </router-link>
          </v-col>
          <v-col cols="12" sm="9" md="8" class="offset-md-1">
            <router-view />
          </v-col>
        </v-row>
      </section>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs';

import { Icon } from '@iconify/vue2';

export default {
  components: {
    Breadcrumbs,
    Icon,
  },

  data: () => ({}),

  computed: {
    navbarItems() {
      const paths = this.$route.fullPath.split('/');
      const mode = paths[paths.length - 1];

      const routes = [
        'orders',
        'wishlist',
        'personal-info',
        'addresses',
        'payment-methods',
        'logout',
      ];

      return routes.map((route) => ({
        path: route === 'logout' ? '' : `/account/${route}`,
        text: route.split('-').join(' '),
        isActive: mode === route,
      }));
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
