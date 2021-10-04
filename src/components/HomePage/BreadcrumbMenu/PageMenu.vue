<template>
  <ul class="menu-body font-size-sm">
    <li v-for="(item, idx) in options" :key="idx" class="menu-item">
      <a
        :href="item.href"
        class="menu-link d-flex align-center font-weight-regular pa-0"
      >
        {{ item.name }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  data: () => ({
    options: [
      { name: 'About', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Store Locator', href: '#' },
      { name: 'FAQs', href: '#' },
      { name: 'Coming soon', href: '#' },
      { name: '404', href: '#' },
    ],
  }),
};
</script>
