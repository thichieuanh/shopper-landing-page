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
                class="dropdown-link d-flex font-weight-medium"
                v-for="(dropdownVal, dropdownKey) in dropdownOptions"
                :key="dropdownKey"
              >
                <v-menu
                  transition="scroll-y-reverse-transition"
                  offset-y
                  open-on-hover
                  content-class="dropdown-content"
                  :nudge-bottom="10"
                >
                  <template v-slot:activator="{ on, attrs }" elevation="0">
                    <a v-bind="attrs" v-on="on" class="d-flex align-center">
                      <img
                        v-if="dropdownKey === 'countries'"
                        src="/img/flags/usa.svg"
                        alt="usa flag"
                        class="mr-2"
                      />
                      {{ dropdownVal[0].title }}
                      <Icon
                        icon="jam:chevron-down"
                        width="18"
                        :inline="true"
                        class="ml-1"
                      />
                    </a>
                  </template>

                  <v-list class="pa-0">
                    <v-list-item
                      link
                      class="border-top dropdown-item"
                      v-for="(country, countryIdx) in dropdownVal"
                      :key="countryIdx"
                    >
                      <a
                        href=""
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
                  </v-list>
                </v-menu>
                <v-divider
                  vertical
                  class="ml-5"
                  v-if="dropdownKey !== 'languagues'"
                ></v-divider>
              </li>
            </ul>
          </div>

          <!-- INFO -->
          <ul class="d-flex">
            <li
              v-for="(info, infoIdx) in infos"
              :key="infoIdx"
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
                <a href="" class="social-link nav-link py-0">
                  <Icon :icon="icon.spec" width="16" :inline="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <!-- BREADCRUMS -->
    <div class="px-4 py-6 border-bottom">
      <div class="container-control">
        <!-- Brand name -->
        <div class="d-flex justify-space-between align-center">
          <router-link :to="{ name: 'Home' }" class="brand">
            Pineapple
          </router-link>

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

            <a href="" class="font-weight-medium px-4 py-2 red-hover-btn">
              Docs
            </a>
          </div>

          <!-- Functional icons -->
          <div class="d-flex">
            <!-- Search -->
            <a class="functional-icon" @click="eventHub.$emit('searchClicked')">
              <Icon
                icon="ph:magnifying-glass"
                width="18"
                class="red-hover-btn"
                :inline="true"
              />
            </a>

            <!-- Acount -->
            <router-link
              :to="{ name: 'AccountOrders' }"
              class="functional-icon"
            >
              <Icon
                icon="feather:user"
                width="18"
                class="red-hover-btn"
                :inline="true"
              />
            </router-link>

            <!-- Wishlist -->
            <router-link :to="{ name: 'Wishlist' }" class="functional-icon">
              <Icon
                icon="ph:heart-straight"
                width="18"
                :inline="true"
                class="red-hover-btn"
              />
            </router-link>

            <!-- Shopping cart -->
            <a
              class="functional-icon shopping-cart"
              @click="eventHub.$emit('cartClicked')"
            >
              <Icon
                icon="ph:shopping-cart-simple"
                width="18"
                :inline="true"
                class="red-hover-btn"
              />
              <div class="badge">{{ cartLength }}</div>
            </a>
          </div>
        </div>
      </div>
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
import { mapGetters } from 'vuex';

export default {
  name: 'NavBars',
  components: {
    HomeMenu,
    PageMenu,
    BlogMenu,
    CatalogMenu,
    ShopMenu,
    Icon,
  },

  data: () => ({
    dropdownOptions: {
      countries: [
        {
          imgUrl: '/img/flags/usa.svg',
          title: 'United States',
        },
        {
          imgUrl: '/img/flags/canada.svg',
          title: 'Canada',
        },
        {
          imgUrl: '/img/flags/germany.svg',
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
        spec: 'la:facebook-f',
      },
      {
        href: '#',
        spec: 'akar-icons:twitter-fill',
      },
      {
        href: '#',
        spec: 'akar-icons:instagram-fill',
      },
      {
        href: '#',
        spec: 'ant-design:medium-square-filled',
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
    items: [
      { title: 'Home', icon: 'mdi-view-dashboard' },
      { title: 'About', icon: 'mdi-forum' },
    ],
  }),
  computed: {
    ...mapGetters('productPrivateStore', ['cartLength']),
  },
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

.nav-link {
  padding: 0.5rem;
}
</style>
