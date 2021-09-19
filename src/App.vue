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

  data: () => ({
    dropdownOptions: {
      countries: [
        {
          imgUrl: require('@/assets/img/flags/usa.svg'),
          title: 'United States',
        },
        {
          imgUrl: require('@/assets/img/flags/canada.svg'),
          title: 'Canada',
        },
        {
          imgUrl: require('@/assets/img/flags/germany.svg'),
          title: 'Germany',
        },
      ],
      currencies: [{ title: 'USD' }, { title: 'EUR' }],
      languagues: [
        { title: 'English' },
        { title: 'French' },
        { title: 'German' },
      ],
    },
    info: [
      { text: 'Shipping', href: '#' },
      { text: 'FAQ', href: '#' },
      { text: 'Contact', href: '#' },
    ],
    socialIcons: [
      {
        href: 'https://www.facebook.com/maytrongdem/',
        spec: ['fab', 'facebook-f'],
      },
      {
        href: '#',
        spec: ['fab', 'twitter'],
      },
      {
        href: '#',
        spec: ['fab', 'instagram'],
      },
      {
        href: '#',
        spec: ['fab', 'medium'],
      },
    ],
    functionalIcons: [
      {
        href: '#',
        spec: ['fas', 'search'],
      },
      {
        href: '#',
        spec: ['far', 'user'],
      },
      {
        href: '#',
        spec: ['far', 'heart'],
      },
      {
        href: '#',
        spec: ['fas', 'shopping-cart'],
      },
    ],
    breadcrumbs: {
      Home: ['Default', 'Classic'],
      Catalog: ['Default', 'Classic'],
      Shop: ['Default', 'Classic'],
      Pages: ['Default', 'Classic'],
      Blog: ['Default', 'Classic'],
      Docs: ['Default', 'Classic'],
    },
  }),
  methods: {
    alert() {
      alert('Hello, World!');
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

.nav-link {
  text-decoration: none;
  color: black !important;
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
