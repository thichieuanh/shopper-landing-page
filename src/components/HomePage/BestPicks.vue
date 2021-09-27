<template>
  <section id="best-picks">
    <div class="container-control">
      <!-- HEADING -->
      <v-row class="flex-column align-center justify-center">
        <h6 class="grey--text mb-3">NEW COLLECTION</h6>
        <h2 class="mb-4">Best Picks 2021</h2>
        <p class="grey--text text--darken-3 mb-10">
          Appear, dry there darkness they're seas, dry waters thing fly midst.
          Beast, above fly brought Very green.
        </p>
      </v-row>

      <!-- COLLECTIONS -->
      <v-row>
        <v-col v-for="n in 4" :key="n" :cols="n === 2 || n === 3 ? 8 : 4">
          <v-hover v-slot="{ hover }">
            <v-card tile flat max-height="400" :class="{ 'on-hover': hover }">
              <v-img
                :src="require(`@/assets/img/collection/collection${n}.jpeg`)"
                height="400"
              >
                <div v-if="n === 2" class="card-circle">
                  <h3 class="font-weight-regular">save</h3>
                  <h2 class="font-weight-regular">30%</h2>
                </div>
                <v-row class="fill-height flex-column" justify="center">
                  <v-card-text
                    :class="textColor(n) + ' text-center font-weight-bold'"
                    style="font-size: 2rem"
                  >
                    {{ coverTitles[n - 1] }}
                  </v-card-text>

                  <v-card-actions class="shop-buttons-group mx-auto pa-0">
                    <span class="shop-button">
                      <a href="#" :class="textColor(n) + ' font-weight-bold'">
                        Shop now
                      </a>
                      <v-icon :class="textColor(n) + ' shop-icon ml-3'"
                        >mdi-arrow-right</v-icon
                      >
                    </span>
                  </v-card-actions>
                </v-row>
              </v-img>
            </v-card>
          </v-hover>
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
      return idx === 1 || idx === 3 ? 'white--text' : 'black--text';
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  transition: transform 0.3s ease-out;
  &:hover .v-image {
    transform: translatex(-0.2em);
  }
  &:hover .shop-icon {
    transform: translatex(0.2em);
  }
}

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
</style>
