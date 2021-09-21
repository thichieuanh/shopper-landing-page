<template>
  <v-hover v-slot:default="{ hover }">
    <v-card>
      <v-btn
        :class="{
          'animate__animated animate__fadeInUp animate__repeat-1': hover,
        }"
      >
        An animated element
      </v-btn>
    </v-card>
  </v-hover>
  <!-- <h1 class="animate__animated animate__fadeInUp animate__repeat-2">
    An animated element
  </h1> -->
</template>

<script>
import 'animate.css';
export default {
  data: () => ({}),
};
</script>
