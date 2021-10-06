<template>
  <section id="count-down" class="pl-15 py-10 d-flex flex-column justify-start">
    <h3 class="mt-16 mb-10 cd-title">Get -50% from <br />Summer Collection</h3>
    <countdown :deadline="deadline"></countdown>

    <a
      href="https://vuejs.org/v2/api/#transition"
      target="_blank"
      class="shop-button dark-button mt-8"
    >
      Shop Now
      <v-icon class="shop-icon ml-2">mdi-arrow-right</v-icon>
    </a>
  </section>
</template>

<script>
import Countdown from '@/components/HomePage/Countdown/Countdown.vue';
import format from 'date-fns/format';
import add from 'date-fns/add';
const fmt = 'yyyy-MM-dd HH:mm:ss';

export default {
  name: 'CountdownBanner',

  components: { Countdown },

  data: () => ({
    deadline: format(
      add(new Date(), {
        years: 0,
        months: 0,
        weeks: 0,
        days: 7,
        hours: 5,
        minutes: 9,
        seconds: 30,
      }),
      fmt
    ),
  }),
};
</script>

<style lang="scss" scoped>
#count-down {
  min-height: 95vh;
  background-image: url('../../../assets/img/covers/countdown.jpeg');
  background-size: cover;
  background-position: center;
}

@media (min-width: 1500px) {
  #count-down {
    min-height: 60vh;
  }
}

.cd-title {
  width: 50%;
  font-size: 2rem;
}

.shop-button {
  width: 10rem;
  .shop-icon {
    transition: transform 0.2s ease-out;
  }
}

.shop-button:hover .shop-icon {
  transform: translatex(0.2em);
}
</style>
