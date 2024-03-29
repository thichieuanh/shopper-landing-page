<template>
  <div>
    <div class="container" v-if="productDetails">
      <Breadcrumbs></Breadcrumbs>

      <!-- PRODUCT DETAILS -->
      <v-row>
        <!-- Image -->
        <v-col cols="12" md="6" class="px-0">
          <v-row class="image-slider-group mb-6 mb-sm-10 mb-md-0">
            <v-col cols="2" class="pl-0 pr-1 pr-sm-2">
              <v-avatar
                v-for="(image, idx) in productDetails.variants[selectedVariant]
                  .variantImages"
                :key="idx"
                tile
                height="auto"
                width="100%"
                :class="[
                  'product-thumb',
                  { 'active-thumb': mainImageIndex === idx },
                ]"
                @click="mainImageIndex = idx"
              >
                <img :src="image" alt="" class="img-slider" />
              </v-avatar>
            </v-col>

            <v-col cols="10" class="px-1 px-sm-2">
              <transition name="fade" mode="out-in">
                <img
                  ref="mainImage"
                  id="main-image"
                  class="img-fluid"
                  :src="mainImageUrl"
                  :key="mainImageUrl"
                />
              </transition>
            </v-col>
          </v-row>
        </v-col>

        <!-- Product Infos -->
        <v-col cols="12" md="6" class="pr-0 pl-0 pl-md-8 pl-lg-10">
          <div class="d-flex justify-space-between align-center">
            <span>{{ productDetails.category }}</span>

            <div class="d-flex">
              <v-rating :value="averageReviewScore" half-increments>
                <template v-slot:item="props">
                  <Icon
                    width="20"
                    :icon="
                      props.isHalfFilled ? 'uim:star-half-alt' : 'uim:star'
                    "
                    :inline="true"
                    :style="{
                      color:
                        props.isFilled || props.isHalfFilled
                          ? '#111'
                          : '#bdbdbd',
                    }"
                  />
                </template>
              </v-rating>

              <a href="#reviews" class="ml-3">Reviews ({{ reviewCount }})</a>
            </div>
          </div>

          <ProductVariantAndSizeSelect
            :productDetails="productDetails"
            :isRenderedInModal="false"
          ></ProductVariantAndSizeSelect>

          <!-- Share -->
          <div class="d-flex">
            <span class="mr-4">Share:</span>
            <ul class="d-flex pa-0">
              <li
                v-for="(icon, socialIconsIdx) in socialIcons"
                :key="socialIconsIdx"
                class="
                  text-gray-350
                  d-flex
                  align-center
                  justify-center
                  btn-circle btn-xxs btn-light
                  mr-2
                "
              >
                <a href="">
                  <Icon :icon="icon.spec" width="16" :inline="true" />
                </a>
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>

      <!-- TABS -->
      <section class="pt-11">
        <div class="nav-tabs text-left text-md-center border-bottom py-4">
          <span
            v-for="(tab, tabIndex) in tabItems"
            :key="tabIndex"
            :class="[
              'tab-list font-weight-medium',
              { active: selectedTabIndex === tabIndex },
            ]"
            @click="selectedTabIndex = tabIndex"
          >
            {{ tab }}
          </span>
        </div>

        <v-row class="custom-row justify-center py-9">
          <v-col cols="12" md="10" lg="8">
            <transition name="fade" mode="out-in">
              <component :is="currentTab"></component>
            </transition>
          </v-col>
        </v-row>
      </section>

      <!-- RECOMMENDATION -->
      <section>
        <h4 class="mb-10 text-center">You might also like</h4>
        <v-row class="custom-row align-start">
          <v-col
            v-for="(product, productIdx) in recommendedProducts"
            :key="productIdx"
            cols="6"
            md="3"
            class="mb-7"
          >
            <Product :productDetails="product"></Product>
          </v-col>
        </v-row>
      </section>

      <!-- REVIEWS -->
      <section id="reviews" class="pt-9 pb-11">
        <!-- Header -->
        <h4 class="mb-10 text-center">Customer Reviews</h4>
        <v-row class="align-center">
          <v-col v-if="reviews.length" cols="10" class="px-0">
            <v-row>
              <v-col cols="12" md="3" class="px-0 mb-4 mb-md-0">
                <v-menu
                  transition="scroll-y-reverse-transition"
                  offset-y
                  content-class="dropdown-content"
                  :nudge-bottom="10"
                >
                  <template v-slot:activator="{ on, attrs }" elevation="0">
                    <a
                      v-bind="attrs"
                      v-on="on"
                      class="d-flex align-center font-weight-medium"
                    >
                      Sort by: {{ sortBy }}
                      <Icon
                        icon="jam:chevron-down"
                        width="18"
                        :inline="true"
                        class="ml-1"
                      />
                    </a>
                  </template>

                  <v-list class="pa-0">
                    <v-list-item
                      v-for="option in sortOptions"
                      :key="option"
                      link
                      class="border-top dropdown-item"
                      @click="sortReview(option)"
                    >
                      {{ option }}
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>

              <v-col
                cols="12"
                md="8"
                class="d-flex align-center justify-md-center px-0 mb-4 mb-md-0"
              >
                <v-rating :value="averageReviewScore" half-increments>
                  <template v-slot:item="props">
                    <Icon
                      width="30"
                      :icon="
                        props.isHalfFilled ? 'uim:star-half-alt' : 'uim:star'
                      "
                      :inline="true"
                      :style="{
                        color:
                          props.isFilled || props.isHalfFilled
                            ? '#111'
                            : '#bdbdbd',
                      }"
                    />
                  </template>
                </v-rating>

                <span class="ml-3 font-size-sm font-weight-medium">
                  Reviews ({{ reviewCount }})
                </span>
              </v-col>
            </v-row>
          </v-col>

          <v-col
            :class="['px-0', reviews.length ? 'text-md-right' : 'text-center']"
          >
            <div v-if="!reviews.length">
              <h1 class="mb-6">🙁</h1>
              <p class="mb-6">
                No reviews have been published. Place an order first now to
                write a review.
              </p>
            </div>
            <button class="btn btn-dark" @click="toggleReviewForm">
              Write Review
            </button>
          </v-col>
        </v-row>

        <!-- Review Form -->
        <form
          @submit.prevent="reviewSubmit"
          class="border-top mt-8 collapsible"
          id="collapsedReviewForm"
        >
          <v-row class="py-2">
            <!-- Rating form -->
            <v-col
              cols="12"
              class="d-flex flex-column align-center justify-center mb-6"
            >
              <p class="mb-1 mt-8">Score:</p>
              <v-rating v-model="formData.rating">
                <template v-slot:item="props">
                  <div @click="props.click">
                    <Icon
                      width="30"
                      icon="eva:star-fill"
                      :inline="true"
                      :style="{
                        color: props.isFilled ? '#111' : '#bdbdbd',
                      }"
                    />
                  </div>
                </template>
              </v-rating>
            </v-col>

            <!-- Input fields -->
            <v-col
              v-for="(reviewDetail, reviewIndex) in reviewDetails"
              :key="reviewIndex"
              cols="12"
              :md="reviewDetail.mdWidth"
              class="form-group"
            >
              <input
                :type="reviewDetail.type"
                :placeholder="reviewDetail.placeholder"
                required
                class="form-control form-control-sm"
                v-model="formData[reviewDetail.key]"
              />
            </v-col>

            <v-col cols="12" class="form-group">
              <textarea
                class="form-control form-control-sm font-size-xs"
                rows="5"
                placeholder="Review *"
                spellcheck="false"
                v-model="formData.text"
                required
              ></textarea>
            </v-col>

            <v-col cols="12" class="text-center">
              <button type="submit" class="btn btn-outline-dark">
                Post Review
              </button>
            </v-col>
          </v-row>
        </form>

        <!-- Review list -->
        <div class="mt-8">
          <div
            v-for="(review, reviewIndex) in reviews"
            :key="reviewIndex"
            class="review"
          >
            <ReviewCart :review="review"></ReviewCart>
          </div>
        </div>
      </section>
    </div>
    <div class="bg-light py-9">
      <Features></Features>
    </div>
  </div>
</template>

<script>
import API from '@/api';
import toggleCollapsibleElement from '@/utils/toggleCollapsibleElement';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductVariantAndSizeSelect from '@/components/HomePage/Product/ProductVariantAndSizeSelect';
import Description from '@/components/ProductPage/Description';
import SizeAndFit from '@/components/ProductPage/SizeAndFit';
import ShippingAndReturn from '@/components/ProductPage/ShippingAndReturn';
import ReviewCart from '@/components/ProductPage/ReviewCart.vue';
import Product from '@/components/HomePage/Product/Product.vue';
import Features from '@/components/Features';

import { Icon } from '@iconify/vue2';
import { mapGetters, mapState } from 'vuex';
import { random } from 'lodash';

export default {
  components: {
    Breadcrumbs,
    ProductVariantAndSizeSelect,
    Description,
    SizeAndFit,
    ShippingAndReturn,
    Product,
    ReviewCart,
    Features,
    Icon,
  },

  computed: {
    ...mapGetters({
      getAllProducts: 'products/getAllProducts',
    }),

    ...mapState({
      womenProducts: (state) => state.products.womenProducts,
      menProducts: (state) => state.products.menProducts,
      kidsProducts: (state) => state.products.kidsProducts,
      products: (state) => state.products.products,
      reviews: (state) => state.reviews.reviews,
    }),

    mainImageUrl() {
      return this.productDetails.variants[this.selectedVariant].variantImages[
        this.mainImageIndex
      ];
    },

    currentTab() {
      switch (this.selectedTabIndex) {
        case 0:
          return 'Description';
        case 1:
          return 'SizeAndFit';
        default:
          return 'ShippingAndReturn';
      }
    },

    recommendedProducts() {
      const Ids = [];
      let index;
      let randomId;
      let filteringArray;
      let result;

      if (this.productDetails) {
        switch (this.productDetails.productGroup) {
          case 'women':
            filteringArray = this.womenProducts;
            break;
          case 'men':
            filteringArray = this.menProducts;
            break;
          case 'kids':
            filteringArray = this.kidsProducts;
            break;
        }

        const totalProduct = filteringArray.length;
        if (totalProduct === 0) return;

        const arrayId = filteringArray.map((product) => product._id);

        while (Ids.length < 4) {
          index = random(0, totalProduct - 1);
          randomId = arrayId[index];
          if (!Ids.includes(randomId) & (randomId !== this.productId)) {
            Ids.push(randomId);
          }
        }

        result = filteringArray.filter((product) => Ids.includes(product._id));
      }

      return result;
    },

    reviewCount() {
      return this.reviews.length;
    },

    averageReviewScore() {
      return (
        this.reviews.reduce((sum, review) => {
          sum += review.rating;
          return sum;
        }, 0) / this.reviews.length
      );
    },
  },

  data: () => ({
    selectedVariant: 0,
    mainImageIndex: 0,
    selectedSize: undefined,
    productDetails: undefined,
    socialIcons: [
      {
        href: '#',
        spec: 'akar-icons:twitter-fill',
      },
      {
        href: 'https://www.facebook.com/maytrongdem/',
        spec: 'la:facebook-f',
      },
      {
        href: '#',
        spec: 'dashicons:pinterest',
      },
    ],
    tabItems: ['Description', 'Size & Fit', 'Shipping & Return'],
    selectedTabIndex: 0,
    isShowReviewForm: false,
    reviewDetails: [
      {
        type: 'text',
        placeholder: 'Your Name *',
        mdWidth: 6,
        key: 'reviewer',
      },
      {
        type: 'email',
        placeholder: 'Your Email *',
        mdWidth: 6,
        key: 'email',
      },
      {
        type: 'text',
        placeholder: 'Review Title *',
        mdWidth: 12,
        key: 'title',
      },
    ],
    formData: {
      rating: 5,
      reviewer: '',
      email: '',
      title: '',
      text: '',
    },
    sortOptions: ['Newest', 'Oldest'],
    sortBy: 'Newest',
  }),

  methods: {
    toggleReviewForm() {
      this.isShowReviewForm = !this.isShowReviewForm;
      toggleCollapsibleElement(!this.isShowReviewForm, 'collapsedReviewForm');
    },

    async init() {
      this.productId = this.$route.params.id;
      const data = await API.getProduct(this.productId);
      this.productDetails = data;

      if (data) {
        this.$store.dispatch('reviews/getReviews', this.productId);
      }
    },

    sortReview(opt) {
      this.sortBy = opt;
      this.reviews.sort((a, b) => {
        return opt === 'Oldest'
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      });
    },

    getSelectedVariant() {
      return this.selectedVariant;
    },

    setSelectedVariant(data) {
      this.selectedVariant = data;
    },

    reviewSubmit() {
      const { rating, reviewer, title, text } = this.formData;
      const date = new Date();

      const payload = {
        productId: this.productId,
        reviewDetails: {
          date,
          rating,
          reviewer,
          title,
          text,
          commentCount: 0,
          likeCount: 0,
          dislikeCount: 0,
        },
      };

      this.$store.dispatch('reviews/addReview', payload);

      this.formData = {
        rating: 5,
        reviewer: '',
        email: '',
        title: '',
        text: '',
      };
    },
  },

  provide() {
    return {
      getSelectedVariant: this.getSelectedVariant,
      setSelectedVariant: this.setSelectedVariant,
    };
  },

  watch: {
    getAllProducts: {
      immediate: true,
      handler() {
        this.init();
      },
    },

    $route() {
      this.init();
      this.mainImageIndex = 0;
      this.selectedVariant = 0;
    },

    'reviews.length': function () {
      this.sortReview(this.sortBy);
    },

    selectedVariant() {
      this.mainImageIndex = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.image-slider-group {
  min-height: 400px; // fixed height for image wrapper to prevent jerky when applying transition

  @media (min-width: 370px) {
    min-height: 420px;
  }
  @media (min-width: 676px) {
    min-height: 632px;
  }

  @media (min-width: 768px) {
    min-height: 840px;
  }
}
.img-slider {
  height: auto;
  max-width: 100%;
}

.product-thumb + .product-thumb {
  margin-top: 10px;
}
</style>
