Skip to content
Search or jump to…
Pull requests
Issues
Marketplace
Explore

@anhthichieu
anhthichieu
/
shopper-landing-page
Public
1
00
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
Settings
shopper-landing-page/src/components/HomePage/BestPicks2.vue

Thi Chieu temp push
Latest commit 3668288 22 hours ago
 History
 0 contributors
133 lines (124 sloc)  3.55 KB

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
        <v-col v-for="n in 4" :key="n" cols="12">
          <!-- Card -->
          <div
            class="card"
            :style="{
              height: '400px',
            }"
          >
            <!-- Background -->
            <div class="card-bg">
              <div
                class="card-bg-img"
                :style="{
                  'background-image': `url(${require(`@/assets/img/collection/collection${n}.jpeg`)})`,
                }"
              ></div>
            </div>
            <!-- Body  -->
            <div class="my-auto text-center">
              <!-- Heading  -->
              <h4>{{ coverTitles[n - 1] }}</h4>
              <!-- Link  -->
              <span class="shop-button">
                <a href="#" class="font-weight-bold"> Shop Now </a>
                <v-icon class="shop-icon ml-3"> mdi-arrow-right </v-icon>
              </span>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="n in 4" :key="n" :cols="n === 2 || n === 3 ? 8 : 4">
          <v-card tile flat max-height="400">
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

                <v-card-actions class="mx-auto pa-0">
                  <span class="shop-button">
                    <a href="#" :class="textColor(n) + ' font-weight-bold'">
                      Shop Now
                    </a>
                    <v-icon :class="textColor(n) + ' shop-icon ml-3'">
                      mdi-arrow-right
                    </v-icon>
                  </span>
                </v-card-actions>
              </v-row>
            </v-img>
          </v-card>
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
  transition: all 3s linear;
  &:hover .v-image {
    transform: translatex(-0.3em);
  }
  // Tun fixed, note bo scoped
  // &:hover .v-image__image {
  //   background-position: 10% 50% !important;
  // }
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
© 2021 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
Loading complete
