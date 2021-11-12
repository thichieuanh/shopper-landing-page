<template>
  <div>
    <!-- Shipping Details -->
    <table class="w-100 tablesm mb-6">
      <thead v-if="!isInputNeeded">
        <tr>
          <th v-for="(header, headerIndex) in headers" :key="headerIndex">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(shippingDetail, shippingIndex) in shippingDetails"
          :key="shippingIndex"
        >
          <td class="custom-control">
            <input
              v-if="isInputNeeded"
              type="radio"
              :id="shippingDetail.forAndIdAtrrs"
              :name="shippingDetail.name"
              :value="shippingDetail.value"
              v-model="shippingMethod"
            />
            <label
              :for="shippingDetail.forAndIdAtrrs"
              :class="[
                'custom-control-label',
                { 'pointer-cursor': isInputNeeded },
              ]"
            >
              {{ shippingDetail.label }}
            </label>
          </td>
          <td>{{ shippingDetail.deliveryDetails }}</td>
          <td class="text-center">
            {{ shippingDetail.deliveryPrice | currencyFormatter }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    isInputNeeded: { type: Boolean, default: true },
  },

  data: () => ({
    headers: ['Shipping Options', 'Delivery Time', 'Price'],
    shippingMethod: undefined,
    shippingDetails: [
      {
        forAndIdAtrrs: 'checkoutShippingStandard',
        name: 'shipping',
        label: 'Standard Shipping',
        value: 'standardShipping',
        deliveryDetails: 'Delivery in 5 - 7 working days',
        deliveryPrice: 8,
      },
      {
        forAndIdAtrrs: 'checkoutShippingExpress',
        name: 'shipping',
        label: 'Express Shipping',
        value: 'expressShipping',
        deliveryDetails: 'Delivery in 3-5 working days',
        deliveryPrice: 12,
      },
      {
        forAndIdAtrrs: 'checkoutShippingShort',
        name: 'shipping',
        value: 'shortShipping',
        label: '1-2 day Shipping',
        deliveryDetails: 'Delivery in 1-2 working days',
        deliveryPrice: 18,
      },
      {
        forAndIdAtrrs: 'checkoutShippingFree',
        name: 'shipping',
        label: 'Free Shipping',
        value: 'freeShipping',
        deliveryDetails:
          "Living won't the He one every subdue meat replenish face was you morning firmament darkness.",
        deliveryPrice: 0,
      },
    ],
  }),
};
</script>
