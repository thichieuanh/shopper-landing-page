<template>
  <form @submit.prevent="handleSubmit">
    <h6 class="mb-7">{{ isEditing ? 'Edit' : 'Add' }} Address</h6>
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
          {{ isEditing ? 'Save changes' : 'Add Address' }}
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
    isEditing: undefined,
    inputFields: addressInputForm,
    addressId: undefined,
    isDefault: undefined,
    formData: {},
  }),

  computed: {
    ...mapState('accountInfo', ['address', 'defaultAddress']),
  },

  watch: {
    address: {
      immediate: true,
      handler() {
        this.fillData();
      },
    },
  },

  methods: {
    init() {
      if (this.$route.path.includes('edit')) this.isEditing = true;

      if (this.isEditing) {
        this.addressId = this.$route.params.id;
        this.$store.dispatch('accountInfo/getAddress', this.addressId);
        this.$store.dispatch('accountInfo/getDefaultAddress');

        this.isDefault = this.defaultAddress === this.addressId;
      }
    },

    fillData() {
      if (!this.address) return;

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
      } = this.address;

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
    },

    handleSubmit() {
      if (this.isEditing) {
        this.formData._id = this.addressId;
        this.$store.dispatch('accountInfo/editAddress', {
          id: this.addressId,
          newAddress: {
            isDefault: this.isDefault,
            data: this.formData,
          },
        });
      } else {
        this.$store.dispatch('accountInfo/addAddress', {
          isDefault: this.isDefault,
          data: this.formData,
        });
      }
      this.formData = {};
      this.$router.push('/account/addresses');
    },
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.$store.commit('accountInfo/address', null);
  },
};
</script>
