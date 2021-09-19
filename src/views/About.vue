<template>
  <v-container>
    <v-row>
      <v-col col="12">
        <v-card>
          <v-list two-line>
            <template v-for="(item, index) in items.slice(0, 6)">
              <v-divider
                v-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>
              <v-list-item v-else :key="index">
                <v-list-item-avatar>
                  <img :src="item.avatar" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="item.subtitle"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'HelloWorld',
  data: () => ({
    items: [
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'title',
        subtitle: 'subtitle',
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'title',
        subtitle: 'subtitle',
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'title',
        subtitle: 'subtitle',
      },
    ],
  }),
};
</script>
