<template>
  <div>
    <!-- TOP NAV -->
    <nav class="top-navbar d-flex justify-center">
      <div class="container-control d-flex align-center">
        <!-- PROMO -->
        <div class="promo">
          <Icon
            icon="feather:truck"
            width="15.75"
            :inline="true"
            class="mr-3"
          />
          <span class="nav-heading heading-xxxs">FREE SHIPPING WORLDWIDE</span>
        </div>

        <div class="collasped d-flex align-center justify-space-between">
          <!-- DROPDOWN -->
          <div style="width: 50%">
            <ul class="dropdown px-0 d-flex">
              <li
                class="dropdown-link d-flex"
                v-for="(dropdownVal, dropdownKey) in dropdownOptions"
                :key="dropdownKey"
              >
                <v-menu
                  transition="scroll-y-reverse-transition"
                  offset-y
                  open-on-hover
                  content-class="dropdown-content"
                >
                  <template v-slot:activator="{ on, attrs }" elevation="0">
                    <a href="#" v-bind="attrs" v-on="on">
                      <img
                        v-if="dropdownKey === 'countries'"
                        src="@/assets/img/flags/usa.svg"
                        alt="usa flag"
                        class="mb-1 mr-1"
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
                <v-divider vertical class="ml-5"></v-divider>
              </li>
            </ul>
          </div>

          <!-- INFO -->
          <ul class="d-flex">
            <li
              v-for="info in infos"
              :key="info"
              class="font-weight-medium px-4"
            >
              <a :href="info.href">
                {{ info.text }}
              </a>
            </li>
          </ul>

          <!-- CONTACT -->
          <div>
            <ul class="d-flex pa-0">
              <li
                v-for="(icon, socialIconsIdx) in socialIcons"
                :key="socialIconsIdx"
              >
                <a href="" class="detail-link">
                  <font-awesome-icon :icon="icon.spec" class="btn" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <!-- BREADCRUMS -->
    <div class="px-4 py-6">
      <div class="container-control">
        <!-- Brand name -->
        <div class="d-flex justify-space-between align-center">
          <span class="brand">Pineapple.</span>

          <!-- Middle breadcrums -->
          <div class="main-breadcrumbs d-flex align-center justify-center">
            <ul class="d-flex pa-0">
              <li
                v-for="(breadcrumb, breadcrumbIdx) in breadcrumbs"
                :key="breadcrumbIdx"
                class="mx-2"
              >
                <v-menu
                  :nudge-left="breadcrumb === 'Shop' ? '250' : 0"
                  transition="scroll-y-reverse-transition"
                  offset-y
                  open-on-hover
                  :close-on-content-click="false"
                  :close-delay="breadcrumb === 'Catalog' ? '100' : undefined"
                  :content-class="
                    breadcrumb === 'Catalog' ? 'catalog-control' : undefined
                  "
                >
                  <template v-slot:activator="{ on, attrs }" elevation="0">
                    <div
                      v-bind="attrs"
                      v-on="on"
                      class="font-weight-medium px-4 py-2 red-hover-btn"
                    >
                      {{ breadcrumb }}
                    </div>
                  </template>

                  <component :is="currentMenu(breadcrumb)" />
                </v-menu>
              </li>
            </ul>

            <a href="#" class="font-weight-medium px-4 py-2 red-hover-btn">
              Docs
            </a>
          </div>

          <!-- Functional icons -->
          <div class="d-flex">
            <!-- Search -->
            <a href="#" class="functional-icon">
              <Icon
                icon="ph:magnifying-glass"
                width="18"
                class="red-hover-btn"
                :inline="true"
              />
            </a>

            <a href="#" class="functional-icon">
              <Icon
                icon="feather:user"
                width="18"
                class="red-hover-btn"
                :inline="true"
              />
            </a>
            <a href="#" class="functional-icon">
              <Icon
                icon="ph:heart-straight"
                width="18"
                :inline="true"
                class="red-hover-btn"
              />
            </a>
            <!-- Shopping cart -->
            <a href="#" class="functional-icon shopping-cart">
              <Icon
                icon="ph:shopping-cart-simple"
                width="18"
                :inline="true"
                class="red-hover-btn"
              />
              <div class="badge">{{ cartCount }}</div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- HAPPY DEAL BANNER -->
    <div
      class="happy-deal-banner font-weight-medium mb-5 white--text text-center"
    >
      <v-row>
        <v-col cols="12" class="py-3">
          ⚡️ HAPPY HOLIDAY DEALS ON EVERYTHING ⚡️</v-col
        >
      </v-row>
    </div>
  </div>
</template>

<script>
import HomeMenu from '@/components/HomePage/BreadcrumbMenu/HomeMenu';
import PageMenu from '@/components/HomePage/BreadcrumbMenu/PageMenu';
import BlogMenu from '@/components/HomePage/BreadcrumbMenu/BlogMenu';
import CatalogMenu from '@/components/HomePage/BreadcrumbMenu/CatalogMenu';
import ShopMenu from '@/components/HomePage/BreadcrumbMenu/ShopMenu';
import { Icon } from '@iconify/vue2';

export default {
  name: 'NavBars',
  components: { HomeMenu, PageMenu, BlogMenu, CatalogMenu, ShopMenu, Icon },

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
    infos: [
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
        href: '/about',
        spec: ['far', 'user'],
      },
      {
        href: '/about',
        spec: ['far', 'heart'],
      },
    ],
    breadcrumbs: ['Home', 'Catalog', 'Shop', 'Pages', 'Blog'],
    cartCount: 2,
  }),
  methods: {
    currentMenu(key) {
      switch (key) {
        case 'Home':
          return 'HomeMenu';
        case 'Catalog':
          return 'CatalogMenu';
        case 'Shop':
          return 'ShopMenu';
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
  background: var(--main-grey);
  font-size: 0.875rem;
  padding: 0.25rem 1rem;
}

.dropdown {
  display: flex;
  align-items: center;
  justify-items: center;
  .dropdown-link {
    padding: 9px;
  }
}

.dropdown-content {
  font-size: 0.875rem !important;
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

.divider {
  height: 100%;
}

.happy-deal-banner {
  background-image: url('../assets/img/backgroundPatterns/pattern1.svg') !important;
  background: #1f1f1f;
  font-size: 0.8125rem;
}

.red-hover-btn {
  transition: color 0.2s ease-in-out;
  &:hover {
    color: #ff5252 !important;
  }
}

.functional-icon {
  padding: 0.5rem;
}

.shopping-cart {
  position: relative;
}

.badge {
  position: absolute;
  top: 10%;
  right: 0;
  background: #ff6f61;
  color: #fff;
  border-radius: 50%;
  width: 0.75rem;
  height: 0.75rem;
  font-size: 11px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.catalog-control {
  top: calc(113px + 1.5rem) !important;
  position: absolute;
  left: 0px !important;
  min-width: 100vw !important;
  max-width: 100vw !important;
}

.detail-link {
  color: #a6a6a6 !important;
  padding: 9px;
}
</style>
