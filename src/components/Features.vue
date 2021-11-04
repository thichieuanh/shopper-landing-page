<template>
  <!-- FEATURES -->
  <div class="mx-auto px-0 container-control">
    <v-row class="feature-row">
      <v-col v-for="(item, index) in features" :key="index" cols="3">
        <div class="d-flex">
          <Icon
            :icon="item.icon"
            width="20.25"
            color="ff6f61"
            :inline="true"
            class="mr-3"
          />
          <div class="ml-6">
            <h6 class="heading-xxs mb-1">{{ item.title }}</h6>
            <div class="font-size-sm text-muted">{{ item.text }}</div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';
export default {
  components: {
    Icon,
  },
  data: () => ({
    features: [
      {
        icon: 'feather:truck',
        title: 'FREE SHIPPING',
        text: 'From all orders over $100',
      },
      {
        icon: 'akar-icons:arrow-repeat',
        title: 'FREE RETURNS',
        text: 'Return money within 30 days',
      },
      {
        icon: 'feather:lock',
        title: 'SECURE SHOPPING',
        text: "You're in safe hands",
      },
      {
        icon: 'akar-icons:tag',
        title: 'OVER 10,000 STYLES',
        text: 'We have everything you need',
      },
    ],
  }),
};
</script>
