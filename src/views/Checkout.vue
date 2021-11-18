<template>
  <div>
    <div class="container-control">
      <Breadcrumbs></Breadcrumbs>

      <!-- Header -->
      <v-row class="pt-7">
        <v-col class="text-center">
          <h3 class="mb-4">Checkout</h3>
          <p class="mb-10">
            Already have account?
            <a href="" class="font-weight-medium">Click here to login</a>
          </p>
        </v-col>
      </v-row>

      <!-- Body -->
      <v-row>
        <v-col cols="12" sm="7">
          <!-- Billing Details -->
          <h6 class="mb-7">Billing Details</h6>
          <v-row class="custom-row mb-9">
            <v-col
              v-for="(billingDetail, billingIndex) in billingDetails"
              :key="billingIndex"
              cols="12"
              :md="billingDetail.mdWidth"
              class="form-group"
            >
              <label :for="billingDetail.forAndIdAtrrs">
                {{ billingDetail.label }}
              </label>
              <br />
              <input
                :type="billingDetail.type"
                :id="billingDetail.forAndIdAtrrs"
                :name="billingDetail.forAndIdAtrrs"
                :placeholder="billingDetail.placeholder"
                :required="billingDetail.label.slice(-1) === '*'"
                class="form-control form-control-sm"
              />
            </v-col>
          </v-row>

          <!-- Shipping Details -->
          <h6 class="mb-7">Shipping Details</h6>
          <ShippingTable></ShippingTable>

          <div class="mb-9">
            <input
              type="checkbox"
              id="checkoutShippingAddress"
              name="checkoutShippingAddress"
              value="checkoutShippingAddress"
              v-model="isShippedToDifferentAddress"
              class="mb-6"
              @input="toggleDifferentAddressForm($event)"
            />
            <label
              for="checkoutShippingAddress"
              :class="[
                'custom-control-label',
                { 'text-muted': !isShippedToDifferentAddress },
              ]"
            >
              Ship to a different address?
            </label>

            <v-row class="custom-row collapsible" id="collapsedAddressForm">
              <v-col
                v-for="(
                  shippingDetail, shippingIndex
                ) in differentShippingAddressDetails"
                :key="shippingIndex"
                cols="12"
                :md="shippingDetail.mdWidth"
                class="form-group"
              >
                <label :for="shippingDetail.forAndIdAtrrs">
                  {{ shippingDetail.label }}
                </label>
                <br />
                <input
                  :type="shippingDetail.type"
                  :id="shippingDetail.forAndIdAtrrs"
                  :name="shippingDetail.forAndIdAtrrs"
                  :placeholder="shippingDetail.placeholder"
                  :required="shippingDetail.label.slice(-1) === '*'"
                  class="form-control form-control-sm"
                />
              </v-col>

              <v-col cols="12">
                <button class="btn btn-outline-dark">Save address</button>
              </v-col>
            </v-row>
          </div>

          <!-- Payment -->
          <h6 class="mb-7">Payment</h6>
          <div class="list-group list-group-sm mb-7">
            <div
              :class="[
                'list-group-item d-flex align-center',
                { selected: paymentMethod === 'payByCard' },
              ]"
              id="creditCardRadio"
            >
              <input
                type="radio"
                id="checkoutPaymentCard"
                name="payment"
                v-model="paymentMethod"
                value="payByCard"
                @input="togglePaymentForm($event)"
              />
              <label for="checkoutPaymentCard" class="custom-control-label">
                Credit Card
              </label>
              <img src="/img/payments/cards.svg" alt="cards" class="ml-2" />
            </div>

            <div class="list-group-item collapsible" id="collapsedPaymentForm">
              <v-row class="py-5">
                <v-col cols="12">
                  <input
                    type="text"
                    placeholder="Card Number *"
                    class="form-control form-control-sm form-group"
                    required
                  />
                </v-col>

                <v-col cols="12">
                  <input
                    type="text"
                    placeholder="Name on Card *"
                    class="form-control form-control-sm form-group"
                    required
                  />
                </v-col>

                <v-col cols="12" sm="4">
                  <select class="custom-select form-control mb-0">
                    <option
                      v-for="(month, monthIndex) in months"
                      :value="month"
                      :key="monthIndex"
                    >
                      {{ month }}
                    </option>
                  </select>
                </v-col>

                <v-col cols="12" sm="4">
                  <select class="custom-select form-control mb-0">
                    <option
                      v-for="(year, yearIndex) in year"
                      :value="year"
                      :key="yearIndex"
                    >
                      {{ year }}
                    </option>
                  </select>
                </v-col>

                <v-col cols="12" sm="4">
                  <div class="input-group input-group-merge">
                    <input
                      type="text"
                      placeholder="CVV *"
                      class="form-control form-control-sm"
                      required
                    />

                    <div class="input-group-append">
                      <span class="input-group-text tooltip">
                        <Icon
                          icon="radix-icons:question-mark-circled"
                          width="18"
                          :inline="true"
                        />
                        <span class="tooltip-text">
                          The CVV Number on your credit card or debit card is a
                          3 digit number on VISA, MasterCard and Discover
                          branded credit and debit cards.
                        </span>
                      </span>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>

            <div class="list-group-item d-flex align-center">
              <input
                type="radio"
                id="checkoutPaymentPaypal"
                name="payment"
                value="payByPaypal"
                v-model="paymentMethod"
                @input="togglePaymentForm($event)"
              />
              <label for="checkoutPaymentPaypal" class="custom-control-label">
              </label>
              <img src="/img/payments/paypal.svg" alt="cards" class="ml-2" />
            </div>
          </div>

          <textarea
            class="form-control form-control-sm mb-12 font-size-xs"
            rows="5"
            placeholder="Order Notes (optional)"
            spellcheck="false"
          ></textarea>
        </v-col>

        <!-- Order items -->
        <v-col cols="12" sm="5" md="4" class="offset-md-1">
          <h6 class="mb-7">Order Items ({{ cart.length }})</h6>
          <v-row
            v-for="(item, index) in cart"
            :key="index"
            class="cart-item border-top font-size-sm"
          >
            <v-col class="col-4 pl-0">
              <img :src="item.image" alt="" class="img-fluid" />
            </v-col>

            <v-col
              class="
                py-0
                pr-0
                d-flex
                flex-column
                align-start
                justify-space-between
                font-size-sm font-weight-medium
              "
            >
              <div>
                <router-link :to="{}">
                  <div>{{ item.name }}</div>
                </router-link>
                <div class="text-muted">
                  {{ item.price | currencyFormatter }}
                </div>
              </div>

              <div class="text-muted d-flex flex-column justify-end w-100">
                <div>Size: {{ item.sizeName }}</div>
                <div>Color: {{ item.variantColor }}</div>
                <div>Quantity: {{ item.quantity }}</div>
              </div>
            </v-col>
          </v-row>

          <div class="bg-light pa-6 mb-9">
            <div class="subtotal-details">
              <span>Subtotal</span>
              <div class="d-flex flex-column align-end">
                <span :class="{ 'old-price font-size-xs': isCouponApplied }">
                  {{ cartSubtotal | currencyFormatter }}
                </span>
                <span v-if="isCouponApplied">
                  {{ (cartSubtotal * (1 - discountRate)) | currencyFormatter }}
                </span>
              </div>
            </div>

            <div class="subtotal-details">
              <span>Tax</span>
              <span>{{
                (cartSubtotal * 0.1 * (1 - discountRate)) | currencyFormatter
              }}</span>
            </div>

            <div class="subtotal-details">
              <span>Shipping</span>
              <span>{{ shippingFee | currencyFormatter }}</span>
            </div>

            <div class="subtotal-details font-size-lg font-weight-bold pb-0">
              <span>Total</span>
              <span>
                {{
                  (cartSubtotal * 1.1 * (1 - discountRate) + shippingFee)
                    | currencyFormatter
                }}
              </span>
            </div>
          </div>

          <p class="font-size-xs text-gray-500 mb-7">
            Your personal data will be used to process your order, support your
            experience throughout this website, and for other purposes described
            in our privacy policy.
          </p>

          <button class="btn btn-block btn-dark">Place Order</button>
        </v-col>
      </v-row>
    </div>

    <div class="bg-light py-9">
      <Features></Features>
    </div>
  </div>
</template>

<script>
import toggleCollapsibleElement from '@/utils/toggleCollapsibleElement';
import Breadcrumbs from '@/components/Breadcrumbs';
import Features from '@/components/Features';
import ShippingTable from '@/components/ShippingTable';
import { mapGetters, mapState } from 'vuex';
import { Icon } from '@iconify/vue2';

export default {
  components: {
    Breadcrumbs,
    Features,
    ShippingTable,
    Icon,
  },
  data: () => ({
    billingDetails: [
      {
        forAndIdAtrrs: 'checkoutBillingFirstName',
        label: 'First name *',
        inputType: 'text',
        placeholder: 'First Name',
        mdWidth: 6,
      },
      {
        forAndIdAtrrs: 'checkoutBillingLastName',
        label: 'Last name *',
        inputType: 'text',
        placeholder: 'Last Name',
        mdWidth: 6,
      },
      {
        forAndIdAtrrs: 'checkoutBillingEmail',
        label: 'Email *',
        inputType: 'email',
        placeholder: 'Email',
        mdWidth: 12,
      },
      {
        forAndIdAtrrs: 'checkoutBillingCompany',
        label: 'Company name',
        inputType: 'text',
        placeholder: 'Company name (optional)',
        mdWidth: 12,
      },
      {
        forAndIdAtrrs: 'checkoutBillingCountry',
        label: 'Country *',
        inputType: 'text',
        placeholder: 'Country',
        mdWidth: 12,
      },
      {
        forAndIdAtrrs: 'checkoutBillingAddress',
        label: 'Address Line 1 *',
        inputType: 'text',
        placeholder: 'Address Line 1',
        mdWidth: 12,
      },
      {
        forAndIdAtrrs: 'checkoutBillingAddressTwo',
        label: 'Address Line 2 *',
        inputType: 'text',
        placeholder: 'Address Line 2 (Optional)',
        mdWidth: 12,
      },
      {
        forAndIdAtrrs: 'checkoutBillingTown',
        label: 'Town / City *',
        inputType: 'text',
        placeholder: 'Town / City',
        mdWidth: 6,
      },
      {
        forAndIdAtrrs: 'checkoutBillingZip',
        label: 'ZIP / Postcode *',
        inputType: 'text',
        placeholder: 'ZIP / Postcode',
        mdWidth: 6,
      },
      {
        forAndIdAtrrs: 'checkoutBillingPhone',
        label: 'Mobile Phone *',
        inputType: 'tel',
        placeholder: 'Mobile Phone',
        mdWidth: 12,
      },
    ],

    isShippedToDifferentAddress: false,
    months: ['January', 'February', 'March'],
    year: ['2019', '2020', '2021'],
    paymentMethod: undefined,
  }),

  computed: {
    ...mapGetters({
      cart: 'productPrivateStore/cart',
      cartSubtotal: 'productPrivateStore/cartSubtotal',
    }),

    ...mapState({
      isCouponApplied: (state) => state.productPrivateStore.isCouponApplied,
      discountRate: (state) => state.productPrivateStore.discountRateForCoupon,
    }),

    differentShippingAddressDetails() {
      const result = this.billingDetails.reduce((array, item, index) => {
        if (index >= 4 && index < 9) {
          item.forAndIdAtrrs = item.forAndIdAtrrs.replace(
            'Billing',
            'ShippingAddress'
          );
          array.push(item);
        }
        return array;
      }, []);

      return result;
    },

    shippingFee() {
      switch (this.shippingMethod) {
        case 'standardShipping':
          return 8;
        case 'expressShipping':
          return 12;
        case 'shortShipping':
          return 12;
        default:
          return 0;
      }
    },
  },
  methods: {
    toggleDifferentAddressForm(event) {
      const nextState = !event.target.checked;
      toggleCollapsibleElement(nextState, 'collapsedAddressForm');
    },

    togglePaymentForm(event) {
      const isPaymentFormCollapsed = event.target.value !== 'payByCard';
      toggleCollapsibleElement(isPaymentFormCollapsed, 'collapsedPaymentForm');
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-item {
  padding: 2rem 0;
  &:first-child {
    border: 0;
  }
}

#creditCardRadio {
  transition: border-bottom-width 0.5s ease;
  &:not(.selected) {
    border-bottom-width: 0;
  }
}
</style>
