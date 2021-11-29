<template>
  <form @submit.prevent="addressSubmitted">
    <h6 class="mb-7">
      {{ isEdittingAddress ? 'Edit Address' : 'Add Address' }}
    </h6>
    <v-row class="custom-row mb-9">
      <v-col
        v-for="(inputField, inputFieldIndex) in inputFields"
        :key="inputFieldIndex"
        cols="12"
        :md="inputField.mdWidth"
        class="form-group"
      >
        <label>{{ inputField.label }}</label>
        <br />
        <input
          :type="inputField.type"
          :placeholder="inputField.placeholder"
          :required="inputField.label.slice(-1) === '*'"
          class="form-control form-control-sm"
          v-model="formData[inputField.key]"
        />
      </v-col>

      <v-col cols="12">
        <div class="form-group">
          <input type="checkbox" v-model="isDefault" />
          <label
            :class="['custom-control-label', { 'text-muted': !isDefault }]"
            @click="isDefault = !isDefault"
          >
            Default shipping address?
          </label>
        </div>
      </v-col>
      <v-col>
        <button class="btn btn-dark">
          {{ isEdittingAddress ? 'Save changes' : 'Add Address' }}
        </button>
      </v-col>
    </v-row>
  </form>
</template>

<script>
import addressInputForm from '@/assets/data/addressInputForm';
import { mapState } from 'vuex';

export default {
  data: () => ({
    inputFields: addressInputForm,
    addressIndex: undefined,
    isEdittingAddress: undefined,
    isDefault: undefined,
    isDefaultSinceInit: true,
    formData: {},
  }),

  computed: {
    ...mapState('accountInfo', ['addresses', 'defaultAddress']),
  },

  methods: {
    init() {
      if (this.$route.path.includes('edit')) this.isEdittingAddress = true;

      if (this.isEdittingAddress) {
        this.addressIndex = +this.$route.params.index;
        this.isDefault = this.defaultAddress === this.addressIndex;
        this.isDefaultSinceInit = this.isDefault;

        if (!this.addresses[this.addressIndex]) return;
        const {
          firstName,
          lastName,
          email,
          addressLine1,
          addressLine2,
          city,
          zipCode,
          country,
          phone,
          companyName,
        } = this.addresses[this.addressIndex];

        this.formData = {
          firstName,
          lastName,
          email,
          addressLine1,
          addressLine2,
          city,
          zipCode,
          country,
          phone,
          companyName,
        };
      }
    },

    addressSubmitted() {
      if (this.isEdittingAddress) {
        const defaultStateRemoved = this.isDefaultSinceInit !== this.isDefault;
        if (defaultStateRemoved) {
          this.$store.commit('accountInfo/setDefaultAddress', undefined);
        }
        this.$store.dispatch('accountInfo/updateAddress', {
          index: this.addressIndex,
          address: this.formData,
        });
      } else {
        this.$store.dispatch('accountInfo/addAddress', this.formData);
        this.addressIndex = this.addresses.length - 1;
        this.formData = {};
        this.$router.push('/account/addresses');
      }

      if (this.isDefault) {
        this.$store.commit('accountInfo/setDefaultAddress', this.addressIndex);
      }
    },
  },

  mounted() {
    this.init();
  },
};
</script>
