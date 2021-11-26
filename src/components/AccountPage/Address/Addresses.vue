<template>
  <div>
    <v-row class="custom-row">
      <v-col
        cols="12"
        md="6"
        v-for="(address, addressIndex) in addresses"
        :key="addressIndex"
      >
        <div class="card bg-light pa-7 mb-8">
          <h6 class="mb-6">Address {{ addressIndex + 1 }}</h6>
          <ul class="pl-0 text-muted">
            <li v-for="(item, index) in address" :key="index">
              {{ item }}<span v-if="index !== address.length - 1">, </span>
            </li>
          </ul>

          <div class="card-action card-action-right">
            <router-link :to="{ name: 'EditAddress' }">
              <button class="product-button mr-2">
                <Icon icon="clarity:edit-line" :inline="true" />
              </button>
            </router-link>
            <button class="product-button">
              <Icon icon="uim:multiply" :inline="true" />
            </button>
          </div>
        </div>
      </v-col>

      <v-col cols="12">
        <router-link :to="{ name: 'EditAddress' }">
          <button class="btn btn-block btn-outline-border">
            Add Address +
          </button>
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';

import { mapState } from 'vuex';
export default {
  components: {
    Icon,
  },

  computed: {
    ...mapState('accountInfo', ['addresses']),
  },
};
</script>
