<template>
  <section id="reviews" class="py-12">
    <div class="container-control">
      <!-- HEADING -->
      <v-row class="flex-column align-center justify-center">
        <h6 class="text-gray-400 heading-xxs mb-3">WHAT BUYERS SAY</h6>
        <h2 class="mb-10">Latest buyers Reviews</h2>
      </v-row>

      <!-- SLIDE -->
      <v-row class="review-slider">
        <splide :options="options">
          <splide-slide v-for="review in reviews" :key="review.img">
            <v-card flat outlined class="mx-auto pa-8">
              <v-list-item three-line class="pa-0 mb-6">
                <v-list-item-avatar tile size="60">
                  <v-img :src="review.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-subtitle>
                    <a href="" class="grey--text text--darken-2">
                      {{ review.category }}
                    </a>
                  </v-list-item-subtitle>

                  <v-list-item-title
                    class="mb-1 font-weight-medium"
                    style="white-space: normal; font-size: 1rem"
                  >
                    {{ review.productName }}
                  </v-list-item-title>

                  <v-rating
                    :value="review.rating"
                    readonly
                    class="font-size-xxs"
                  >
                    <template v-slot:item="props">
                      <font-awesome-icon
                        icon="star"
                        :style="{
                          color: props.isFilled ? '#ff9736' : '#bdbdbd',
                        }"
                      />
                    </template>
                  </v-rating>
                </v-list-item-content>
              </v-list-item>

              <blockquote>
                <p class="pa-0 mb-6 grey--text text--darken-2">
                  {{ review.reviewText }}
                </p>

                <v-card-text class="pa-0 grey--text text--darken-2">
                  {{ review.reviewer }} , {{ review.reviewTime }}
                </v-card-text>
              </blockquote>
            </v-card>
          </splide-slide>
        </splide>
      </v-row>
    </div>
  </section>
</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { mapState } from 'vuex';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

export default {
  components: {
    Splide,
    SplideSlide,
  },

  data: () => ({
    options: {
      width: '100%',
      perPage: 3,
      gap: '1.2rem',
      arrows: false,
      type: 'loop',
      breakpoints: {
        600: {
          perPage: 1,
        },
        990: {
          perPage: 2,
        },
      },
    },
  }),
  computed: {
    ...mapState('products', ['reviews']),
  },
};
</script>

<style lang="scss">
.splide__track {
  margin-bottom: 3rem;
}

.splide__pagination__page {
  background: #d8d8d8;
  &.is-active {
    background: red;
    transform: none;
  }
}
</style>
