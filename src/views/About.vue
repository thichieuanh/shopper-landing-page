<template>
  <div>
    <ul class="d-flex">
      <li v-for="item in array" :key="item" class="mx-2 mx-md-10">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    array: ['thi', 'thi 2', 'thi 3'],
  }),
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
// .list {
//   display: flex;
// }

// .list-item {
//   margin: 5px;
// }
</style>
