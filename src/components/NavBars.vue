<template>
  <div>
    <!-- TOP NAV -->
    <nav class="navbar navbar-topbar navbar-expand-xl bg-light">
      <div class="container">
        <!-- PROMO -->
        <div class="promo">
          <Icon
            icon="feather:truck"
            width="15.75"
            :inline="true"
            class="mr-3"
          />
          <span class="heading-xxxs">FREE SHIPPING WORLDWIDE</span>
        </div>

        <!-- Navbar Toggler -->
        <div
          class="navbar-toggler"
          @click="toggleCollapsedNavbar"
          v-show="isLgAndDownViewport"
        >
          <Icon class="navbar-toggler-icon" icon="octicon:three-bars-16" />
        </div>

        <div
          :class="['navbar-collapse', { collapsible: isLgAndDownViewport }]"
          id="collapsedNavbar"
        >
          <!-- DROPDOWN -->
          <ul class="nav navbar-nav nav-divided mr-auto px-0">
            <li
              :class="[
                'dropdown font-weight-medium',
                { 'nav-item': !isLgAndDownViewport },
              ]"
              v-for="(dropdownVal, dropdownKey) in dropdownOptions"
              :key="dropdownKey"
            >
              <v-menu
                transition="scroll-y-reverse-transition"
                offset-y
                :open-on-hover="!isLgAndDownViewport"
                content-class="dropdown-content"
                :nudge-bottom="!isLgAndDownViewport ? 10 : undefined"
                close-delay="100"
              >
                <template v-slot:activator="{ on, attrs }" elevation="0">
                  <a v-bind="attrs" v-on="on" class="nav-link dropdown-toggle">
                    <img
                      v-if="dropdownKey === 'countries'"
                      src="/img/flags/usa.svg"
                      alt="usa flag"
                      class="mr-1"
                    />
                    {{ dropdownVal[0].title }}
                    <Icon
                      icon="jam:chevron-down"
                      :inline="true"
                      class="dropdown-toggle-icon"
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
                    <a href="" class="d-flex align-center font-weight-regular">
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
            </li>
          </ul>

          <!-- INFO -->
          <ul class="nav navbar-nav mr-8">
            <li
              v-for="(info, infoIdx) in infos"
              :key="infoIdx"
              class="font-weight-medium"
            >
              <router-link :to="{ name: info.name }" class="nav-link">
                {{ info.text }}
              </router-link>
            </li>
          </ul>

          <!-- CONTACT -->
          <ul class="nav navbar-nav d-flex flex-row">
            <li
              class="nav-item"
              v-for="(icon, socialIconsIdx) in socialIcons"
              :key="socialIconsIdx"
            >
              <a href="" class="social-link">
                <Icon :icon="icon.spec" :inline="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Breadcrumbs -->
    <div class="navbar navbar-expand-lg border-bottom">
      <div class="container">
        <!-- Brand name -->

        <router-link :to="{ name: 'Home' }" class="brand">
          Pineapple
        </router-link>

        <!-- Breadcrumb Toggler -->
        <div
          class="navbar-toggler"
          @click="toggleCollapsedBreadcrumb"
          v-show="isMdAndDownViewport"
        >
          <Icon class="navbar-toggler-icon" icon="octicon:three-bars-16" />
        </div>

        <!-- Middle Breadcrumbs -->
        <div
          :class="['navbar-collapse', { collapsible: isMdAndDownViewport }]"
          id="collapsedBreadcrumb"
        >
          <!-- Breadcrumbs header -->
          <div class="navbar-nav mx-auto">
            <ul
              :class="['d-flex pa-0', { 'flex-column': isMdAndDownViewport }]"
            >
              <li
                v-for="(Breadcrumbb, BreadcrumbbIdx) in Breadcrumbbs"
                :key="BreadcrumbbIdx"
                class="nav-item dropdown"
              >
                <v-menu
                  :nudge-left="Breadcrumbb === 'Shop' ? '250' : 0"
                  transition="scroll-y-reverse-transition"
                  offset-y
                  :open-on-hover="!isMdAndDownViewport"
                  :close-on-content-click="false"
                  :close-delay="Breadcrumbb === 'Catalog' ? '100' : undefined"
                  :content-class="
                    Breadcrumbb === 'Catalog' ? 'catalog-control' : undefined
                  "
                >
                  <template v-slot:activator="{ on, attrs }" elevation="0">
                    <div
                      v-bind="attrs"
                      v-on="on"
                      class="nav-link font-weight-medium red-hover-btn"
                    >
                      {{ Breadcrumbb }}
                    </div>
                  </template>

                  <component :is="currentMenu(Breadcrumbb)" />
                </v-menu>
              </li>
            </ul>

            <a href="" class="font-weight-medium nav-link red-hover-btn">
              Docs
            </a>
          </div>

          <!-- Functional icons -->
          <div class="navbar-nav flex-row">
            <!-- Search -->
            <a class="functional-icon" @click="eventHub.$emit('searchClicked')">
              <Icon
                icon="ph:magnifying-glass"
                width="18"
                class="red-hover-btn"
                :inline="true"
              />
            </a>

            <!-- Account -->
            <router-link :to="'/account'" class="functional-icon">
              <Icon
                icon="feather:user"
                width="18"
                class="red-hover-btn"
                :inline="true"
              />
            </router-link>

            <!-- Wishlist -->
            <router-link
              :to="{ name: 'AccountWishlist' }"
              class="functional-icon"
            >
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

import toggleCollapsibleElement from '@/utils/toggleCollapsibleElement';

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
    isLgAndDownViewport: null,
    isMdAndDownViewport: null,
    isShownCollapsedNavbar: null,
    isShownCollapsedBreadcrumb: null,
    windowWidth: null,
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
      { text: 'Shipping', name: 'ShippingAndReturns' },
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
    Breadcrumbbs: ['Home', 'Catalog', 'Shop', 'Pages', 'Blog'],
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

    checkScreen() {
      this.windowWidth = window.innerWidth;
      const navbarElement = document.getElementById('collapsedNavbar');
      const breadcrumbElement = document.getElementById('collapsedBreadcrumb');

      if (this.windowWidth < 992) {
        this.isLgAndDownViewport = true;
        this.isMdAndDownViewport = true;
        if (navbarElement) {
          document.getElementById('collapsedNavbar').style.height = '0px';
        }
        if (breadcrumbElement) {
          document.getElementById('collapsedBreadcrumb').style.height = '0px';
        }
        return;
      }

      if (this.windowWidth < 1200) {
        this.isLgAndDownViewport = true;
        this.isMdAndDownViewport = false;
        if (navbarElement) {
          document.getElementById('collapsedNavbar').style.height = '0px';
        }
        if (breadcrumbElement) {
          document.getElementById('collapsedBreadcrumb').style.height = '0px';
        }
        return;
      }

      this.isMdAndDownViewport = false;
      this.isLgAndDownViewport = false;
      this.isShownCollapsedNavbar = false;
      this.isShownCollapsedBreadcrumb = false;
      if (navbarElement) {
        document.getElementById('collapsedNavbar').style.height = 'auto';
      }
      if (breadcrumbElement) {
        document.getElementById('collapsedBreadcrumb').style.height = 'auto';
      }
    },

    toggleCollapsedNavbar() {
      this.isShownCollapsedNavbar = !this.isShownCollapsedNavbar;
      toggleCollapsibleElement(!this.isShownCollapsedNavbar, 'collapsedNavbar');
    },

    toggleCollapsedBreadcrumb() {
      this.isShownCollapsedBreadcrumb = !this.isShownCollapsedBreadcrumb;
      toggleCollapsibleElement(
        !this.isShownCollapsedBreadcrumb,
        'collapsedBreadcrumb'
      );
    },
  },

  created() {
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1rem;

  .container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }
}
.navbar-topbar {
  font-size: 0.875rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

.navbar-collapse {
  flex-basis: 100%;
  flex-grow: 1;
  align-items: center;
}

.social-link {
  font-size: 1rem;
}

@media (max-width: 991.98px) {
  .navbar-expand-lg {
    .navbar-collapse {
      &::before {
        content: '';
        display: block;
        margin-top: 0.5rem;
      }
    }
    .container {
      padding-right: 0;
      padding-left: 0;
    }
  }
}

@media (min-width: 992px) {
  .navbar-expand-lg {
    .navbar-collapse {
      display: flex !important;
      flex-basis: auto;
    }

    .navbar-nav {
      flex-direction: row;
      .nav-link {
        padding-right: 1rem;
        padding-left: 1rem;
      }
    }
  }
}

@media (max-width: 1199.98px) {
  .navbar.navbar-expand-xl {
    .navbar-collapse {
      &::before {
        content: '';
        display: block;
        margin-top: 0.5rem;
      }
    }
  }

  .navbar-expand-xl > .container {
    padding-right: 0;
    padding-left: 0;
  }

  .nav-item:not(.dropdown) {
    &:first-child {
      margin-left: -0.25rem;
    }

    &:not(:first-child) {
      margin-left: 1rem;
    }
  }

  .social-link {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
}

@media (min-width: 1200px) {
  .promo {
    margin-right: 2.5rem;
    white-space: nowrap;
  }
  .navbar-expand-xl {
    flex-flow: row nowrap;
    justify-content: flex-start;

    > .container {
      flex-wrap: nowrap;
    }

    .navbar-collapse {
      display: flex !important;
      flex-basis: auto;
    }

    .navbar-nav {
      flex-direction: row;

      .nav-link {
        padding-right: 1rem;
        padding-left: 1rem;
      }

      .social-link {
        padding-right: 0.5rem;
        padding-left: 0.5rem;
      }
    }
  }
}

.dropdown {
  display: inline-block;
}

.dropdown-toggle {
  overflow: hidden;
}
.dropdown-toggle-icon {
  float: right;
  margin-left: 0.25rem;
}

.navbar-toggler {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.25rem 0;
  .navbar-toggler-icon {
    font-size: 1.5rem;
  }
}

.v-Breadcrumbbs__item {
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
  &:first-child {
    padding-left: 0;
  }
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
</style>
