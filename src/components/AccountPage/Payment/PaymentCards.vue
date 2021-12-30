<template>
  <div>
    <v-row class="custom-row">
      <v-col
        cols="12"
        md="6"
        v-for="(card, cardIndex) in paymentCards"
        :key="cardIndex"
      >
        <div class="card bg-light pa-7 mb-8">
          <h6 class="mb-6">
            Debit / Credit Card {{ cardIndex + 1 }}
            <span class="font-size-xxs" v-if="defaultPaymentCard === cardIndex">
              (Default)
            </span>
          </h6>
          <ul class="pl-0">
            <li v-for="(value, key, index) in card" :key="index" class="mb-5">
              <div class="font-weight-medium">{{ key | formatTitle }}:</div>
              <div class="text-muted">{{ value }}</div>
            </li>
          </ul>

          <div class="card-action card-action-right">
            <router-link :to="{ name: 'EditPayment', params: { id: 0 } }">
              <!-- fix here to get cardID router -->
              <button class="product-button mr-2">
                <Icon icon="clarity:edit-line" :inline="true" />
              </button>
            </router-link>
            <button
              class="product-button"
              @click="$store.commit('accountInfo/removePayment', cardIndex)"
            >
              <Icon icon="uim:multiply" :inline="true" />
            </button>
          </div>
        </div>
      </v-col>

      <v-col cols="12">
        <router-link :to="{ name: 'AddNewCard' }">
          <button class="btn btn-block btn-outline-border">
            Add Payment Method +
          </button>
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Icon } from '@iconify/vue2';

export default {
  components: {
    Icon,
  },

  computed: {
    ...mapState('accountInfo', ['paymentCards', 'defaultPaymentCard']),
  },

  methods: {},
  filters: {
    formatTitle(string) {
      return string;
      // const reg = /(?<=[a-z])[A-Z](?=[a-z])/g;
      // const capitalizeFirstLetter =
      //   string.charAt().toUpperCase() + string.substring(1);
      // const stringWithSpaces = capitalizeFirstLetter.replace(reg, ' ' + '$&');
      // return stringWithSpaces;
    },
  },
};
</script>
