<template>
  <div id="count-down" class="mt-16 pl-15 d-flex flex-column justify-start">
    <h3 class="my-16 cd-title">Get -50% from <br />Summer Collection</h3>
    <flip-countdown :deadline="deadline"></flip-countdown>

    <v-btn
      color="black"
      tile
      large
      class="white--text px-10 py-8 mt-16 font-weight-bold shop-button"
      width="200"
    >
      Shop now
      <v-icon class="shop-icon ml-5"> mdi-arrow-right </v-icon>
    </v-btn>
  </div>
</template>

<script>
import FlipCountdown from '@/components/HomePage/Countdown/FlipCountdown.vue';
import format from 'date-fns/format';
import add from 'date-fns/add';
const fmt = 'yyyy-MM-dd HH:mm:ss';

export default {
  name: 'CountdownBanner',

  components: { FlipCountdown },

  data: () => ({
    deadline: format(
      add(new Date(), {
        years: 0,
        months: 3,
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
  height: 20%;
  background-image: url('../../../assets/img/covers/countdown.jpeg');
  background-size: cover;
  background-position: center;
}

.cd-title {
  width: 50%;
  font-size: 2rem;
}

.shop-button {
  // background: black;
  // color: white;
  .shop-icon {
    transition: transform 0.3s ease-out;
  }
}

.shop-button:hover .shop-icon {
  transform: translatex(0.2em);
}
</style>
