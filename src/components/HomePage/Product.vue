<template>
  <v-hover v-slot:default="{ hover }">
    <v-card tile flat class="mx-auto" max-width="344">
      <div class="image-wrapper">
        <v-img :src="imgUrl" aspect-ratio="0.85"></v-img>
        <v-img :src="imgOnHoverUrl" aspect-ratio="0.85" class="image-hover">
          <div class="product-button-group d-flex justify-center ma-0">
            <div
              v-for="(icon, functionalIconsIdx) in functionalIcons"
              :key="functionalIconsIdx"
              :class="
                'product-button d-flex justify-center align-center mx-1' +
                (hover
                  ? ' animate__animated animate__fadeInUp animate__faster' +
                    ` animate__delay-${functionalIconsIdx}s`
                  : ' animate__animated animate__fadeOutDown animate__faster' +
                    ` animate__delay-${functionalIconsIdx}s`)
              "
            >
              <font-awesome-icon
                :icon="icon.spec"
                :key="'icon' + functionalIconsIdx"
              />
            </div></div
        ></v-img>
        <div :class="[{ new: isNew }, { sale: isSale }, 'product-badge']">
          {{ badgeText }}
        </div>
      </div>

      <v-card-subtitle class="pa-0 mt-4 mb-0">
        <a href="#" class="grey--text text--darken-2">{{ category }}</a>
      </v-card-subtitle>
      <v-card-title class="pa-0 mt-1 mb-0">
        <a href="#" style="font-size: 1.2rem; word-break: break-word">
          {{ productName }}
        </a>
      </v-card-title>
      <v-card-subtitle
        class="pa-0 mt-1 mb-0 font-weight-medium"
        style="font-size: 1.2rem"
      >
        <span :class="{ 'old-price': isSale }"> {{ price }}</span>
        <span class="red--text red-accent-2"> {{ discountedPrice }}</span>
      </v-card-subtitle>
    </v-card>
  </v-hover>
</template>

<script>
import 'animate.css';
export default {
  data: () => ({
    functionalIcons: [
      {
        href: '#',
        spec: ['far', 'eye'],
      },
      {
        href: '#',
        spec: ['fas', 'shopping-cart'],
      },
      {
        href: '#',
        spec: ['far', 'heart'],
      },
    ],
  }),
  props: {
    imgUrl: String,
    imgOnHoverUrl: String,
    productName: String,
    category: String,
    price: String,
    discountedPrice: String,
    isNew: Boolean,
    isSale: Boolean,
    badgeText: String,
  },
};
</script>

<style lang="scss" scoped>
.product-button-group {
  width: 100%;
  position: absolute;
  bottom: 0.5em;
}

.product-button {
  background: white;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background: #ff8a80;
    color: white;
  }
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.image-hover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.image-hover:hover {
  opacity: 1;
}

.product-badge {
  position: absolute;
  top: 5%;
  left: 0;
  width: 30%;
  text-align: center;
  font-weight: 500;
}

.new {
  background: white;
}

.sale {
  background: black;
  color: white;
}

.old-price {
  text-decoration: line-through;
  font-size: 1rem;
  color: #a6a6a6 !important;
}
</style>
