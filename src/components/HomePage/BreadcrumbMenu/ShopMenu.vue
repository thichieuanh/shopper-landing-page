<template>
  <v-row class="menu-body" style="min-width: 650px">
    <v-col
      cols="4"
      v-for="(option, index) in options"
      :key="index"
      class="pa-0"
    >
      <div v-for="(subOption, subIdx) in option" :key="subIdx">
        <p class="font-weight-medium mb-5">{{ subOption.title }}</p>
        <ul :class="'pa-0 font-size-sm' + (subIdx ? '' : ' mb-7')">
          <li
            v-for="(item, itemIdx) in subOption.list"
            :key="itemIdx"
            class="menu-item"
          >
            <a href="" class="menu-link">
              {{ item }}
            </a>
          </li>
        </ul>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    options: [
      [
        {
          title: 'Shop',
          list: ['Default', 'Topbar', 'Collapse', 'Simple', 'Masonry'],
          href: '#',
        },
        {
          title: 'Product',
          list: [
            'Default',
            'Images Left',
            'Image Grid',
            'Image Slider',
            'Images Stacked',
          ],
          href: '#',
        },
      ],
      [
        {
          title: 'Support',
          list: [
            'ShoppingCart',
            'Checkout',
            'Order Completed',
            'Shipping & Returns',
          ],
          href: '#',
        },
        {
          title: 'Account',
          list: [
            'Order',
            'Orders',
            'Wishlist',
            'Personal Info',
            'Addresses',
            'Addresses: New',
          ],
          href: '#',
        },
      ],
      [
        {
          title: 'Payment',
          list: ['Payment: New', 'Payment: Choose', 'Auth'],
          href: '#',
        },
        {
          title: 'Modals',
          list: [
            'Newsletter: Horizontal',
            'Newsletter: Vertical',
            'Product',
            'Search',
            'ShoppingCart',
            'Size Chart',
            'Wait List',
          ],
          href: '#',
        },
      ],
    ],
  }),
};
</script>
