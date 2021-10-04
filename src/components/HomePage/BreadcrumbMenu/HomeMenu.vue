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
      { name: 'Default', href: '#' },
      { name: 'Classic', href: '#' },
      { name: 'Fashion', href: '#' },
      { name: 'Boxed', href: '#' },
      { name: 'Simple', href: '#' },
      { name: 'Asymetric', href: '#' },
      { name: 'Sidenav', href: '#' },
      { name: 'Landing', href: '#' },
    ],
  }),
};
</script>
