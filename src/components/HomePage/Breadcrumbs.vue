<template>
  <div class="container">
    <v-breadcrumbs :items="breadList" class="px-0" large>
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :to="{ name: 'Home' }" :disabled="item.disabled">
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>

    <!-- <v-breadcrumbs :items="mybreadList" class="px-0">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :to="{ name: 'Home' }" :disabled="item.disabled">
          {{ item }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    mybreadList: ['Home'],
    breadList: [
      {
        text: 'This breadcrumb',
        disabled: false,
        to: { name: 'Home' },
      },
      {
        text: 'will be',
        disabled: false,
        href: 'breadcrumbs_link_1',
      },
      {
        text: 'updated later',
        disabled: true,
        href: 'breadcrumbs_link_2',
      },
    ],
  }),
  methods: {
    // getBreadcrumb() {
    //   this.mybreadList = ['Home'];
    //   //   const reg = /^\/shopping-cart\/checkout(?:\/(?=$))?$/i;
    //   //   const result = this.$route.path.match(reg);
    //   const result2 = this.$route.path.split('/');
    //   console.log(this.$route);
    //   console.log(result2);
    //   //   this.mybreadList.push(this.$route.name);
    //   //   console.log('check', this.mybreadList);
    // },
  },

  //   created() {
  //     this.getBreadcrumb();
  //   },
};
</script>

<style lang="scss" scoped>
</style>
