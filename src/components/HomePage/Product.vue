<template>
  <v-hover v-slot:default="{ hover }">
    <v-card tile flat class="mx-auto" max-width="344">
      <v-img
        src="@/assets/img/products/productFirst/product1.jpeg"
        aspect-ratio="0.85"
      >
        <transition name="slide-fade">
          <div
            class="product-button-group d-flex justify-center ma-0"
            v-if="hover"
          >
            <div
              v-for="(icon, functionalIconsIdx) in functionalIcons"
              :key="functionalIconsIdx"
              class="product-button d-flex justify-center align-center mx-1"
            >
              <font-awesome-icon
                :icon="icon.spec"
                :key="'icon' + functionalIconsIdx"
              />
            </div>
          </div>
        </transition>
      </v-img>

      <v-card-subtitle class="pa-0 mt-4 mb-0">
        <a href="#" class="grey--text text--darken-2">Shoes</a>
      </v-card-subtitle>
      <v-card-title class="pa-0 mt-1 mb-0">
        <a href="#">Leather mid-heel Sandals</a>
      </v-card-title>
      <v-card-subtitle
        class="pa-0 mt-1 mb-0 font-weight-medium"
        style="font-size: 1.2rem"
      >
        $129.00
      </v-card-subtitle>
    </v-card>
  </v-hover>
</template>

<script>
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
    add: function () {
      this.items.push({
        id: Math.random(),
      });
    },
    items: [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.product-button-group {
  width: 100%;
  position: absolute;
  bottom: 1em;
}

.product-button {
  background: white;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;

  &:hover {
    background: #ff8a80;
    color: white;
  }
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.3s linear;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translatey(50%);
  opacity: 0;
}
</style>
