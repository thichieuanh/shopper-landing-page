<template>
  <section class="pt-12" id="best-picks">
    <div class="container-control">
      <!-- HEADING -->
      <v-row class="custom-row justify-center">
        <v-col cols="12" sm="10" md="8" lg="6" class="text-center">
          <h6 class="heading-xxs text-gray-400 mb-3">NEW COLLECTION</h6>
          <h2 class="mb-4">Best Picks 2021</h2>
          <p class="text-gray-500 mb-10">
            Appear, dry there darkness they're seas, dry waters thing fly midst.
            Beast, above fly brought Very green.
          </p>
        </v-col>
      </v-row>

      <!-- COLLECTIONS -->
      <v-row>
        <v-col
          class="px-md-4"
          v-for="n in 4"
          :key="n"
          cols="12"
          :md="n === 2 || n === 3 ? 7 : 5"
          :lg="n === 2 || n === 3 ? 8 : 4"
        >
          <div class="card bg-hover mb-7 d-flex flex-column align-center">
            <!-- Card background -->
            <div
              class="card-bg"
              :style="{
                'background-image': `url(/img/collection/collection${n}.jpeg)`,
                'background-position': 'center center',
                'background-size': 'cover',
                'background-repeat': 'no-repeat',
                height: '400px',
              }"
            ></div>

            <!-- Card body -->
            <v-row
              class="card-body my-auto text-center h-100 w-100 px-0 px-md-10"
              justify="center"
              align="center"
            >
              <div :class="textColor(n) + ' w-100'">
                <h4 class>{{ coverTitles[n - 1] }}</h4>

                <div class="pa-0 shop-button" style="font-size: 1.125rem">
                  <router-link :to="{ name: 'Shop' }" class="stretched-link">
                    Shop Now
                  </router-link>
                  <v-icon class="shop-icon ml-3" size="1.125rem">
                    mdi-arrow-right
                  </v-icon>
                </div>
              </div>
            </v-row>

            <!-- Promotion badgle -->
            <div v-if="n === 2" class="card-circle">
              <h3 class="font-weight-regular">save</h3>
              <h2 class="font-weight-regular">30%</h2>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BestPicks',

  data: () => ({
    coverTitles: [
      'Bag Collections',
      'Printed Men Shirts',
      "Basic Women's Dresses",
      'Sweatshirts',
    ],
  }),

  methods: {
    textColor(idx) {
      return idx === 1 || idx === 4
        ? 'white--text'
        : 'black--text text-md-left';
    },
  },
};
</script>

<style lang="scss" scoped>
// .v-card {
//   .v-image__image {
//     transition: transform 0.2s ease-in-out;
//     width: calc(100% + 0.3rem);
//     overflow: hidden;
//   }

//   &:hover .v-image__image {
//     transform: translatex(-0.3rem);
//   }

//   &:hover .shop-icon {
//     transform: translatex(0.2em);
//   }
// }

.card-circle {
  background: #ff6f61;
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
  color: white;
  text-align: center;
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
}

.card-bg {
  width: calc(100% + 0.3rem);
  transition: transform 0.2s ease-in-out;
}

.card-body {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.bg-hover {
  overflow: hidden;
  &:hover .card-bg {
    transform: translatex(-0.3rem);
  }
}
</style>
