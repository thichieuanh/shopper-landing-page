<template>
  <section id="brands" class="py-12">
    <div class="container-control">
      <!-- HEADING -->
      <v-row class="flex-column align-center justify-center">
        <h2 class="mb-4">@pineapple</h2>
        <p class="grey--text text--darken-3 mb-10">
          Appear, dry there darkness they're seas, dry waters.
        </p>
      </v-row>

      <!-- PHOTOS -->
      <article>
        <v-container fluid pa-0>
          <!-- Pics -->
          <v-row class="mb-10">
            <v-col v-for="n in 6" :key="n" cols="2">
              <v-hover v-slot="{ hover }">
                <v-card tile :class="[{ 'on-hover': hover }]">
                  <v-img
                    :src="
                      require(`@/assets/img/brands/brandPictures/brand${n}.jpeg`)
                    "
                    aspect-ratio="1"
                  >
                    <v-row class="fill-height flex-column" justify="center">
                      <a href="#" class="img-overlay">
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

          <!-- Logos -->
          <v-row>
            <v-col
              v-for="img in brandLogos"
              :key="img"
              class="col-4 col-sm-3 col-md text-center"
            >
              <img :src="img" class="img-fluid" />
            </v-col>
          </v-row>
        </v-container>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    likeCount: 248,
    commentCount: 7,
    brandLogos: [
      require('@/assets/img/brands/brandLogos/mango.svg'),
      require('@/assets/img/brands/brandLogos/zara.svg'),
      require('@/assets/img/brands/brandLogos/reebok.svg'),
      require('@/assets/img/brands/brandLogos/asos.svg'),
      require('@/assets/img/brands/brandLogos/stradivarius.svg'),
      require('@/assets/img/brands/brandLogos/adidas.svg'),
      require('@/assets/img/brands/brandLogos/bershka.svg'),
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
