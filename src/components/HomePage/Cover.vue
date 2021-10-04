<template>
  <section id="cover">
    <!-- COVER -->
    <article>
      <v-container fluid pa-0>
        <v-row no-gutters>
          <v-col v-for="n in 3" :key="n" cols="4">
            <v-card tile>
              <v-img
                :src="require(`@/assets/img/covers/cover${n}.jpeg`)"
                aspect-ratio="1"
                content-class="bg-hover img-with-button"
              >
                <v-card-text
                  class="text-center white--text font-weight-bold mb-16"
                  style="font-size: 3rem"
                  align="center"
                >
                  {{ coverTitles[n - 1] }}
                </v-card-text>
                <a
                  href="https://vuejs.org/v2/api/#transition"
                  target="_blank"
                  class="shop-button white-button mt-16 stretched-link"
                >
                  Shop {{ coverTitles[n - 1] }}
                  <v-icon class="shop-icon ml-2">mdi-arrow-right</v-icon>
                </a>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </article>

    <!-- FEATURES -->
    <article>
      <v-container class="mx-auto py-7 px-0 container-control">
        <v-row class="feature-row pb-7">
          <v-col v-for="(item, index) in features" :key="index" cols="3">
            <v-card class="feature-cards" tile flat>
              <v-icon class="red--text text-accent-2">{{ item.icon }}</v-icon>
              <div class="ml-6">
                <v-card-title
                  class="pa-0 font-weight-medium"
                  style="font-size: 14px; color: black"
                >
                  {{ item.title }}
                </v-card-title>
                <v-card-text class="pa-0">
                  {{ item.text }}
                </v-card-text>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </article>
  </section>
</template>

<script>
export default {
  name: 'Cover',

  data: () => ({
    coverTitles: ['Women', 'Men', 'Kids'],
    features: [
      {
        icon: 'mdi-truck-outline',
        title: 'FREE SHIPPING',
        text: 'From all orders over $100',
      },
      {
        icon: 'mdi-repeat',
        title: 'FREE RETURNS',
        text: 'Return money within 30 days',
      },
      {
        icon: 'mdi-lock-outline',
        title: 'SECURE SHOPPING',
        text: "You're in safe hands",
      },
      {
        icon: 'mdi-tag-outline',
        title: 'OVER 10,000 STYLES',
        text: 'We have everything you need',
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.8;
}

.row {
  margin: 0;
}

.feature-row {
  border-bottom: 1px rgb(229, 229, 229) solid;
}

.feature-cards {
  display: flex !important;
  //   align-items: start;
  & .v-icon {
    vertical-align: baseline !important;
    line-height: inherit;
    // color: #ff8a80;
  }
}
</style>
