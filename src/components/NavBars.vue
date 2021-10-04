<template>
  <div>
    <!-- MAIN NAV -->
    <nav class="top-navbar d-flex justify-center">
      <div class="container-control d-flex align-center">
        <!-- PROMO -->
        <section class="promo">
          <v-icon color="black" small class="mr-2"> mdi-truck-outline</v-icon>
          <span class="nav-heading heading-xxxs">FREE SHIPPING WORLDWIDE</span>
        </section>

        <div class="collasped d-flex align-center justify-space-between">
          <!-- DROPDOWN -->
          <section style="width: 50%">
            <ul class="dropdown px-0">
              <li
                class="mx-2"
                v-for="(dropdownVal, dropdownKey) in dropdownOptions"
                :key="dropdownKey"
              >
                <v-menu
                  transition="scroll-y-reverse-transition"
                  offset-y
                  open-on-hover
                >
                  <template v-slot:activator="{ on, attrs }" elevation="0">
                    <a
                      href="#"
                      class="d-flex align-center font-weight-medium"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <img
                        v-if="dropdownKey === 'countries'"
                        src="@/assets/img/flags/usa.svg"
                        alt="usa flag"
                        class="ma-2"
                      />
                      {{ dropdownVal[0].title }}
                      <v-icon color="black">mdi-chevron-down</v-icon>
                    </a>
                  </template>

                  <v-list class="pa-0">
                    <template v-for="(country, countryIdx) in dropdownVal">
                      <v-list-item :key="countryIdx" link>
                        <a
                          href="#"
                          class="d-flex align-center font-weight-regular"
                        >
                          <img
                            v-if="dropdownKey === 'countries'"
                            :src="country.imgUrl"
                            alt="flag image"
                            class="ma-2"
                          />
                          {{ country.title }}
                        </a>
                      </v-list-item>
                    </template>
                  </v-list>
                </v-menu>
              </li>
            </ul>
          </section>

          <!-- INFO -->
          <v-breadcrumbs
            :items="info"
            divider=""
            class="font-weight-medium mr-10"
          ></v-breadcrumbs>

          <!-- CONTACT -->
          <section>
            <v-btn
              v-for="(icon, socialIconsIdx) in socialIcons"
              :key="socialIconsIdx"
              small
              text
              icon
              plain
              color="grey"
              href="#"
              target="_blank"
            >
              <font-awesome-icon :icon="icon.spec" size="lg" />
            </v-btn>
          </section>
        </div>
      </div>
    </nav>

    <!-- BREADCUMS -->
    <div class="px-4 py-6">
      <div class="container-control">
        <div class="d-flex justify-space-between align-center">
          <span class="brand">Pineapple.</span>

          <div class="main-breadcrumbs">
            <ul class="d-flex pa-0">
              <li
                v-for="(breadcrumbVal, breadcrumbKey) in breadcrumbs"
                :key="breadcrumbKey"
                class="mx-2"
              >
                <v-menu
                  transition="scroll-y-reverse-transition"
                  offset-y
                  :close-on-click="true"
                  :close-on-content-click="false"
                  :content-class="
                    breadcrumbKey === 'Catalog' ? 'catalog-control' : undefined
                  "
                >
                  <template v-slot:activator="{ on, attrs }" elevation="0">
                    <div
                      v-bind="attrs"
                      v-on="on"
                      class="font-weight-medium px-4 py-2 red-hover-btn"
                    >
                      {{ breadcrumbKey }}
                    </div>
                  </template>

                  <component :is="currentMenu(breadcrumbKey)" />
                </v-menu>
              </li>
            </ul>
          </div>

          <!-- FUNCTIONAL ICONS -->
          <div class="d-flex">
            <ul class="pa-0 d-flex">
              <li
                v-for="(icon, functionalIconsIdx) in functionalIcons"
                :key="functionalIconsIdx"
              >
                <a
                  :href="icon.href"
                  target="_blank"
                  class="px-2 py-2 font-weight-light functional-icons"
                >
                  <font-awesome-icon :icon="icon.spec" class="red-hover-btn" />
                </a>
              </li>
            </ul>

            <a href="#" target="_blank" class="pl-2 font-weight-light">
              <v-badge color="red accent-2" content="6">
                <font-awesome-icon
                  :icon="['fas', 'shopping-cart']"
                  class="red-hover-btn"
                />
              </v-badge>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- HAPPY DEAL BANNER -->

    <v-banner
      single-line
      color="#1f1f1f"
      height="48"
      class="
        white--text
        font-weight-medium
        banner-heading
        mb-5
        happy-deal-banner
      "
    >
      ⚡️ HAPPY HOLIDAY DEALS ON EVERYTHING ⚡️
    </v-banner>
  </div>
</template>

<script>
import HomeMenu from '@/components/HomePage/BreadcrumbMenu/HomeMenu';
import PageMenu from '@/components/HomePage/BreadcrumbMenu/PageMenu';
import BlogMenu from '@/components/HomePage/BreadcrumbMenu/BlogMenu';
import CatalogMenu from '@/components/HomePage/BreadcrumbMenu/CatalogMenu';

export default {
  name: 'NavBars',
  components: { HomeMenu, PageMenu, BlogMenu, CatalogMenu },

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
    currentMenu(key) {
      switch (key) {
        case 'Home':
          return 'HomeMenu';
        case 'Catalog':
          return 'CatalogMenu';
        // case 'Shop':
        //   return 'ShopMenu';
        case 'Pages':
          return 'PageMenu';
        case 'Blog':
          return 'BlogMenu';
        default:
          return 'HomeMenu';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.top-navbar {
  width: 100%;
  height: 48px;
  background: var(--main-grey);
  font-size: 0.875rem;
}

.dropdown {
  display: flex;
  align-items: center;
  justify-items: center;
}

.promo {
  width: 25%;
}

.collasped {
  height: 100%;
  width: 100%;
}

.v-breadcrumbs__item {
  color: black !important;
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

.divider {
  height: 100%;
}

.happy-deal-banner {
  background-image: url('../assets/img/backgroundPatterns/pattern1.svg');
}

.red-hover-btn {
  transition: color 0.2s ease-in-out;
  &:hover {
    color: #ff5252;
  }
}

.functional-icons {
  color: #111 !important;
  font-weight: 200;
}

.catalog-control {
  top: calc(113px + 1.5rem) !important;
  left: 0px !important;
  min-width: 100vw !important;
  max-width: 100vw !important;
}
</style>
