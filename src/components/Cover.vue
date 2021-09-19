<template>
  <v-container fluid pa-0>
    <v-row no-gutters>
      <v-col v-for="n in 3" :key="n" cols="4">
        <v-hover v-slot="{ hover }">
          <v-card tile :class="{ 'on-hover': hover }">
            <v-img
              :src="require(`@/assets/img/covers/cover${n}.jpeg`)"
              aspect-ratio="0.74468"
            >
              <v-row class="fill-height flex-column" justify="center">
                <v-card-text
                  class="text-center white--text font-weight-bold mb-16"
                  style="font-size: 3rem"
                  align="center"
                >
                  {{ coverTitles[n - 1] }}
                </v-card-text>
                <v-card-actions class="shop-buttons-group mx-auto pa-0">
                  <v-btn
                    tile
                    large
                    @click="shop"
                    class="px-10 py-8 font-weight-bold shop-button"
                    width="200"
                  >
                    Shop {{ coverTitles[n - 1] }}
                    <v-slide-y-transition>
                      <v-icon class="shop-icon ml-5">mdi-arrow-right</v-icon>
                    </v-slide-y-transition>
                  </v-btn>
                </v-card-actions>
              </v-row>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Cover',

  data: () => ({
    coverTitles: ['Women', 'Men', 'Kids'],
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

.shop-buttons-group {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  margin: auto;
}

.shop-button > .shop-icon {
  transition: transform 0.3s ease-out;
}

.shop-button:hover .shop-icon {
  transform: translatex(0.2em);
}
</style>
