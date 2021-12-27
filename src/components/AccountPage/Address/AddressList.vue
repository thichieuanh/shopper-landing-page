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
          <div class="mb-6">
            <h6 class="mb-2">Address {{ addressIndex + 1 }}</h6>
            <div class="font-size-xxs" v-if="defaultAddress == address._id">
              (Default)
            </div>
          </div>

          <ul class="pl-0 text-muted">
            <li
              class="address-details"
              v-for="(value, _key, index) in addressMainInfo(address)"
              :key="index"
            >
              {{ value }}
            </li>
          </ul>

          <div class="card-action card-action-right">
            <router-link
              :to="{ name: 'EditAddress', params: { id: address._id } }"
            >
              <button class="product-button mr-2">
                <Icon icon="clarity:edit-line" :inline="true" />
              </button>
            </router-link>
            <button
              class="product-button"
              @click="$store.dispatch('accountInfo/deleteAddress', address._id)"
            >
              <Icon icon="uim:multiply" :inline="true" />
            </button>
          </div>
        </div>
      </v-col>

      <v-col cols="12">
        <router-link :to="{ name: 'AddNewAddress' }">
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
    ...mapState('accountInfo', ['addresses', 'defaultAddress']),
  },

  methods: {
    addressMainInfo(address) {
      const {
        firstName,
        lastName,
        phone,
        addressLine1,
        city,
        zipCode,
        country,
      } = address;

      return {
        fullName: firstName + ' ' + lastName,
        phone,
        addressLine1,
        city,
        zipCode,
        country,
      };
    },
  },

  mounted() {
    this.$store.dispatch('accountInfo/getAddresses');
    this.$store.dispatch('accountInfo/getDefaultAddress');
  },
};
</script>

<style lang="scss" scoped>
.address-details {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
