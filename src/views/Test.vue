<template>
  <div>
    thi thi
    <v-select :items="['Canada', 'United States']"></v-select>
    <v-select :items="[{ label: 'Canada', code: 'ca' }]"></v-select>
  </div>
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
