<template>
  <!-- TABS -->
  <v-tabs color="red accent-2">
    <div class="container-control d-flex">
      <v-tab v-for="item in tabItems" :key="item">
        {{ item }}
      </v-tab>
    </div>

    <v-tab-item
      v-for="(item, index) in tabItems"
      :key="index"
      transition="fade-transition"
    >
      <v-divider></v-divider>
      <v-row class="py-8">
        <div class="container-control d-flex justify-center align-center">
          <v-col cols="8" class="pa-0">
            <v-row>
              <v-col
                v-for="(catalog, catalogIdx) in catalogs"
                :key="catalogIdx"
                cols="3"
                class="pa-0"
              >
                <p class="font-weight-medium mb-5">{{ catalog.category }}</p>
                <ul class="pa-0 font-size-sm">
                  <li
                    v-for="(sub, subIdx) in catalog.subCategory"
                    :key="subIdx"
                    class="menu-item"
                  >
                    <a href="#" class="menu-link">
                      {{ sub }}
                    </a>
                  </li>
                </ul>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="4">
            <v-img
              :src="require(`@/assets/img/menu/women.jpeg`)"
              aspect-ratio="1"
              content-class="bg-hover img-with-button"
            >
              <a
                href="https://vuejs.org/v2/api/#transition"
                target="_blank"
                class="shop-button white-button mt-16 stretched-link"
              >
                Shop Sweater
                <v-icon class="shop-icon ml-2">mdi-arrow-right</v-icon>
              </a>
            </v-img>
          </v-col>
        </div>
      </v-row>
    </v-tab-item>
  </v-tabs>
</template>

<script>
export default {
  data: () => ({
    tabItems: ['Women', 'Men', 'Kids'],
    catalogs: [
      {
        category: 'Clothing',
        subCategory: [
          'All Clothing',
          'Blouses & Shirt',
          'Coats & Jackets',
          'Dresses',
          'Hoodies & Sweats',
          'Denim',
          'Jeans',
          'Jumpers & Cardigans',
          'Leggings',
        ],
      },
      {
        category: 'Shoes & Boots',
        subCategory: [
          'All Shoes & Boots',
          'Branded Shoes',
          'Boots',
          'Heels',
          'Trainers',
          'Sandals',
          'Shoes',
          'Wide Fit Shoes',
        ],
      },
      {
        category: 'Bags & Accessories',
        subCategory: [
          'All Bags & Accessories',
          'Accessories',
          'Bags & Purses',
          'Luggage',
          'Belts',
          'Hats',
          'Hair Accessories',
          'Jewellery',
          'Travel Accessories',
        ],
      },
      {
        category: 'Collections',
        subCategory: [
          'All Collections',
          'Occasionwear',
          'Going Out',
          'Workwear',
          'Holiday Shop',
          'Jean Fit Guide',
        ],
      },
    ],
  }),
};
</script>
