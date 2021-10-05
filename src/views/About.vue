<template>
  <div>
    <input
      type="text"
      placeholder="Add new cat"
      v-model="newCat"
      @keyup.13="addCat"
    />
    <br />
    <button @click="addCat">ADD CAT</button>
    <br />
    <button @click="removeCat">REMOVE CAT</button>

    <h2>Cat List:</h2>

    <div v-for="cat in cats" :key="cat">
      <label for="">
        <input type="checkbox" v-model="selected" :value="cat" />
        {{ cat }}
      </label>
    </div>

    <h4>Selected: {{ selected }}</h4>
  </div>
</template>

<script>
export default {
  data: () => ({
    newCat: '',
    cats: ['foo', 'bar'],
    selected: [],
  }),
  methods: {
    addCat() {
      if (this.newCat !== '') {
        this.cats.push(this.newCat);
        this.newCat = '';
      }
    },
    removeCat() {
      this.cats = this.cats.filter((item) => !this.selected.includes(item));
    },
  },
};
</script>
