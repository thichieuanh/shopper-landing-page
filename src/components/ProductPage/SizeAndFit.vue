<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        md="6"
        class="pl-0 pr-10"
        v-for="(list, listIndex) in lists"
        :key="listIndex"
      >
        <div class="font-weight-medium mb-4">{{ list.title }}</div>
        <ul
          :class="[
            'mb-7',
            { 'list-styled': listIndex === 0 },
            { 'pl-0': listIndex === 1 },
          ]"
        >
          <li
            v-for="(article, articleIndex) in list.details"
            :key="articleIndex"
            class="text-gray-500"
          >
            <span>{{ article }}</span>
          </li>
        </ul>

        <!-- Size chart -->
        <div v-if="listIndex === 1" class="mb-8 d-flex">
          <img src="/img/icons/icon-ruler.svg" alt="" />
          <p class="ml-3 underline-hover">Size chart</p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    lists: [
      {
        title: 'Fitting information',
        details: [
          "Upon seas hath every years have whose subdue creeping they're it were.",
          'Make great day bearing.',
          "For the moveth is days don't said days.",
        ],
      },
      {
        title: 'Model measurements:',
        details: [
          'Height: 1.80 m',
          'Bust/Chest: 89 cm',
          'Hips: 91 cm',
          'Waist: 65 cm',
          'Model size: M',
        ],
      },
    ],
  }),
};
</script>
