<template>
  <form>
    <h6 class="mb-7">Add Address</h6>
    <v-row class="custom-row mb-9">
      <v-col
        v-for="(inputField, inputFieldIndex) in inputFields"
        :key="inputFieldIndex"
        cols="12"
        :md="inputField.mdWidth"
        class="form-group"
      >
        <label :for="inputField.forAndIdAtrrs">
          {{ inputField.label }}
        </label>
        <br />
        <input
          :type="inputField.type"
          :id="inputField.forAndIdAtrrs"
          :name="inputField.forAndIdAtrrs"
          :placeholder="inputField.placeholder"
          :required="inputField.label.slice(-1) === '*'"
          class="form-control form-control-sm"
        />
      </v-col>

      <v-col cols="12">
        <div class="form-group">
          <input type="checkbox" v-model="isDefaultShippingAddress" />
          <label
            :class="[
              'custom-control-label',
              { 'text-muted': !isDefaultShippingAddress },
            ]"
            @click="isDefaultShippingAddress = !isDefaultShippingAddress"
          >
            Default shipping address?
          </label>
        </div>
      </v-col>
      <v-col>
        <button class="btn btn-dark">Add Address</button>
      </v-col>
    </v-row>
  </form>
</template>

<script>
import addressInputForm from '@/assets/data/addressInputForm';

export default {
  data: () => ({
    inputFields: addressInputForm,
    isDefaultShippingAddress: false,
  }),
};
</script>
