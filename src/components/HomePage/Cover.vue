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
        <v-col v-for="n in 3" :key="n" cols="12" md="6" lg="4">
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
                href="#"
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
</style>
