<template>
  <div>
    <section class="top-navbar" style="height: 48px">
      <v-app-bar color="grey lighten-4" absolute dense flat app class="px-15">
        <div class="d-flex align-center">
          <v-icon color="black" small class="mr-2"> mdi-truck-outline</v-icon>
          <span class="nav-heading">FREE SHIPPING WORLDWIDE</span>
        </div>

        <v-toolbar class="hidden-sm-and-down" color="grey lighten-4" dense flat>
          <!-- DROPDOWN -->
          <v-toolbar color="grey lighten-4" dense flat>
            <v-toolbar-items
              v-for="(dropdownVal, dropdownKey) in dropdownOptions"
              :key="dropdownKey"
              class="mx-2"
            >
              <v-menu
                transition="scroll-y-reverse-transition"
                offset-y
                open-on-hover
              >
                <template v-slot:activator="{ on, attrs }" elevation="0">
                  <a
                    href="#"
                    class="nav-link d-flex align-center font-weight-medium"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <img
                      v-if="dropdownKey === 'countries'"
                      src="@/assets/img/flags/usa.svg"
                      alt="usa flag"
                      class="ma-2"
                    />
                    <!-- fix here to show selected opt from dropdown -->
                    {{ dropdownVal[0].title }}
                    <v-icon color="black">mdi-chevron-down</v-icon>
                  </a>
                </template>

                <v-list class="pa-0">
                  <template v-for="(country, countryIdx) in dropdownVal">
                    <v-list-item :key="countryIdx" link>
                      <a
                        href="#"
                        class="nav-link d-flex align-center font-weight-regular"
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
                    <v-divider
                      :key="'div' + countryIdx"
                      v-if="countryIdx < dropdownKey.length"
                    ></v-divider>
                  </template>
                </v-list>
              </v-menu>
              <v-divider
                inset
                vertical
                class="mx-1"
                v-if="dropdownKey !== 'languagues'"
              ></v-divider>
            </v-toolbar-items>
            <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
            <!-- for collasped, update later -->
          </v-toolbar>
          <!-- DROPDOWN ENDS -->

          <!-- INFO -->
          <v-breadcrumbs
            :items="info"
            divider=""
            class="font-weight-medium mr-10"
          ></v-breadcrumbs>
          <!-- INFO ENDS -->

          <!-- CONTACT -->
          <div>
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
          </div>
          <!-- CONTACT ENDS-->
        </v-toolbar>
      </v-app-bar>
    </section>

    <section class="navbar-breadcrumbs">
      <v-toolbar flat class="px-15" height="100">
        <span class="brand">Shopper.</span>
        <div class="main-breadcrumbs">
          <v-toolbar dense flat>
            <v-toolbar-items
              v-for="(breadcrumbVal, breadcrumbKey) in breadcrumbs"
              :key="breadcrumbKey"
              class="mx-2"
            >
              <v-menu transition="scroll-y-transition" offset-y open-on-hover>
                <template v-slot:activator="{ on, attrs }" elevation="0">
                  <v-btn
                    depressed
                    plain
                    text
                    color="black"
                    class="nav-link d-flex align-center font-weight-medium"
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ breadcrumbKey }}
                  </v-btn>
                </template>

                <v-list class="pa-0">
                  <template v-for="(item, breadcrumbValIdx) in breadcrumbVal">
                    <v-list-item :key="breadcrumbValIdx">
                      <a
                        href="#"
                        class="nav-link d-flex align-center font-weight-regular"
                      >
                        {{ item }}
                      </a>
                    </v-list-item>
                  </template>
                </v-list>
              </v-menu>
            </v-toolbar-items>
          </v-toolbar>
        </div>

        <!-- FUNCTIONAL ICONS -->
        <div>
          <v-btn
            v-for="(icon, functionalIconsIdx) in functionalIcons"
            :key="functionalIconsIdx"
            small
            text
            icon
            plain
            color="grey"
            :href="icon.href"
            target="_blank"
          >
            <font-awesome-icon :icon="icon.spec" size="lg" />
          </v-btn>

          <v-btn small text icon plain color="grey" href="#" target="_blank">
            <v-badge color="red accent-2" content="6">
              <font-awesome-icon :icon="['fas', 'shopping-cart']" size="lg"
            /></v-badge>
          </v-btn>
        </div>
      </v-toolbar>
    </section>

    <section class="happy-deal-banner">
      <v-banner
        single-line
        @click:icon="alert"
        color="black"
        height="48"
        class="white--text font-weight-medium banner-heading mb-5"
      >
        ⚡️ HAPPY HOLIDAY DEALS ON EVERYTHING ⚡️
      </v-banner>
    </section>
  </div>
</template>

<script>
export default {
  name: 'NavBars',

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
    alert() {
      alert('Hello, World!');
    },
  },
};
</script>

<style lang="scss" scoped>
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
