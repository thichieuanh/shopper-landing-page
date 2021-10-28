<template>
  <v-sheet height="400" class="overflow-hidden" style="position: relative">
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-btn color="pink" dark @click="drawer = !drawer"> Toggle </v-btn>
      </v-row>
    </v-container>

    <v-navigation-drawer v-model="drawer" app temporary right>
      DRAWER
    </v-navigation-drawer>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      items: [
        { title: 'Home', icon: 'mdi-view-dashboard' },
        { title: 'About', icon: 'mdi-forum' },
      ],
    };
  },
};
</script>
