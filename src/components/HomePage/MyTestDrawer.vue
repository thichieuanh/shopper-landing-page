<template>
  <v-navigation-drawer
    :value="a"
    @input="$emit('update:a', $event)"
    app
    temporary
    right
  >
    DRAWER
  </v-navigation-drawer>

  <!--
  <v-navigation-drawer
    :value="value"
    @input="$emit('input', $event)"
    app
    temporary
    right
  >
    DRAWER
  </v-navigation-drawer> -->
</template>

<script>
export default {
  props: {
    a: { type: Boolean },
    // value: { type: Boolean },
  },
};
</script>
