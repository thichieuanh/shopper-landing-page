<template>
  <div>
    <p class="text-grey-500 mb-7">{{ description }}</p>
    <v-row>
      <v-col
        cols="12"
        md="6"
        class="pl-0"
        v-for="(list, listIndex) in lists"
        :key="listIndex"
      >
        <ul class="px-0">
          <li v-for="(article, articleIndex) in list" :key="articleIndex">
            <span class="font-weight-medium">{{ article.title }}</span
            >:
            <span>{{ article.details }}</span>
          </li>
        </ul>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    description:
      "Won't herb first male seas, beast. Let upon, female upon third fifth every. Man subdue rule after years herb after form. And image may, morning. Behold in tree day sea that together cattle whose. Fifth gathering brought bearing. Abundantly creeping whose. Beginning form have void two. A whose.",
    lists: [
      [
        {
          title: 'SKU',
          details: '#61590437',
        },
        {
          title: 'Occasion',
          details: 'Lifestyle, Sport',
        },
        {
          title: 'Country',
          details: 'Italy',
        },
      ],
      [
        {
          title: 'Outer',
          details: 'Leather 100%, Polyamide 100%',
        },
        {
          title: 'Lining',
          details: 'Polyester 100%',
        },
        {
          title: 'CounSoletry',
          details: 'Rubber 100%',
        },
      ],
    ],
  }),
};
</script>
