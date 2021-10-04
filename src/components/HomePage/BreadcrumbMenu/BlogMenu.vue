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
      { name: 'Blog', href: '#' },
      { name: 'Blog Post', href: '#' },
    ],
  }),
};
</script>
