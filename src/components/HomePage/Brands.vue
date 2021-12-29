<template>
  <section id="brands" class="py-12">
    <div class="container-control">
      <!-- HEADING -->
      <v-row class="flex-column align-center justify-center text-center">
        <h2 class="mb-4">@pineapple</h2>
        <p class="text-gray-500 mb-10 font-size-lg">
          Appear, dry there darkness they're seas, dry waters.
        </p>
      </v-row>

      <!-- PICS -->
      <v-row class="mb-10 mx-n1">
        <v-col v-for="n in 6" :key="n" cols="6" sm="4" md="2" class="px-1">
          <v-hover v-slot="{ hover }">
            <v-card tile :class="[{ 'on-hover': hover }, 'mb-2']">
              <v-img
                :src="`/img/brands/brandPictures/brand${n}.jpeg`"
                aspect-ratio="1"
              >
                <v-row class="fill-height flex-column" justify="center">
                  <a href="" class="img-overlay">
                    <div class="white--text font-size-xxs mr-4">
                      <v-icon color="white" class="mr-2">
                        mdi-heart-outline
                      </v-icon>
                      {{ likeCount }}
                    </div>

                    <div class="white--text font-size-xxs">
                      <v-icon color="white" class="mr-2">
                        mdi-message-outline
                      </v-icon>
                      {{ commentCount }}
                    </div>
                  </a>
                </v-row>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <!-- LOGOS -->
      <v-row>
        <v-col
          v-for="img in brandLogos"
          :key="img"
          class="col-4 col-sm-3 col-md text-center mb-7 mb-md-0"
        >
          <img :src="img" class="img-fluid" />
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    likeCount: 248,
    commentCount: 7,
    brandLogos: [
      '/img/brands/brandLogos/mango.svg',
      '/img/brands/brandLogos/zara.svg',
      '/img/brands/brandLogos/reebok.svg',
      '/img/brands/brandLogos/asos.svg',
      '/img/brands/brandLogos/stradivarius.svg',
      '/img/brands/brandLogos/adidas.svg',
      '/img/brands/brandLogos/bershka.svg',
    ],
  }),
};
</script>

<style lang="scss" scoped>
#brands {
  background: var(--main-grey);
}

.img-overlay {
  background: rgba(31, 31, 31, 0.4);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.2s ease-in-out;
  opacity: 0;

  &:hover {
    opacity: 1;
  }
}

.v-icon {
  font-size: inherit;
}

.img-fluid {
  max-width: 100%;
  vertical-align: middle;
}
</style>
