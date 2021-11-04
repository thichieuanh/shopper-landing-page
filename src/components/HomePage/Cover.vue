<template>
  <section>
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
    <!-- COVER -->
    <article>
      <v-row no-gutters>
        <v-col v-for="n in 3" :key="n" cols="4">
          <v-card tile>
            <v-img
              :src="`/img/covers/cover${n}.jpeg`"
              aspect-ratio="1.35"
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
    </article>

    <div class="py-7 container-control border-bottom">
      <Features></Features>
    </div>
  </section>
</template>

<script>
import Features from '@/components/Features';

export default {
  name: 'Cover',
  components: { Features },

  data: () => ({
    coverTitles: ['Women', 'Men', 'Kids'],
    features: [
      {
        icon: 'feather:truck',
        title: 'FREE SHIPPING',
        text: 'From all orders over $100',
      },
      {
        icon: 'akar-icons:arrow-repeat',
        title: 'FREE RETURNS',
        text: 'Return money within 30 days',
      },
      {
        icon: 'feather:lock',
        title: 'SECURE SHOPPING',
        text: "You're in safe hands",
      },
      {
        icon: 'akar-icons:tag',
        title: 'OVER 10,000 STYLES',
        text: 'We have everything you need',
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
#cover {
  height: 470px;
}

.happy-deal-banner {
  background-image: url('/img/backgroundPatterns/pattern1.svg') !important;
  background: #1f1f1f;
  font-size: 0.8125rem;
}
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
  & .v-icon {
    vertical-align: baseline !important;
    line-height: inherit;
  }
}
</style>
