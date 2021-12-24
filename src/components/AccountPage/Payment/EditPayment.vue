<template>
  <form @submit.prevent="handleSubmit">
    <h6 class="mb-7">{{ isEditing ? 'Edit' : 'Add' }} Debit / Credit Card</h6>

    <v-row class="custom-row mb-9">
      <v-col cols="12" md="6" class="form-group">
        <label>Card Number *</label>
        <br />
        <input
          type="text"
          placeholder="Card Number"
          required
          class="form-control form-control-sm mt-2"
          v-model="formData.cardNumber"
        />
      </v-col>

      <v-col cols="12" md="6" class="form-group">
        <label>Name On Card *</label>
        <br />
        <input
          type="text"
          placeholder="Name On Card"
          required
          class="form-control form-control-sm mt-2"
          v-model="formData.nameOnCard"
        />
      </v-col>

      <v-col cols="12" md="6" class="form-group">
        <label>Expiry Date *</label>
        <br />
        <v-menu
          ref="isShownDateMenu"
          v-model="isShownDateMenu"
          :close-on-content-click="false"
          :return-value.sync="formData.expiryDate"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateFormatted"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>

          <v-date-picker
            v-model="formData.expiryDate"
            type="month"
            no-title
            scrollable
            color="black"
          >
            <v-spacer></v-spacer>
            <v-btn text color="black" @click="isShownDateMenu = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="black"
              @click="$refs.isShownDateMenu.save(formData.expiryDate)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" md="6" class="form-group">
        <div class="input-group input-group-merge">
          <input
            type="text"
            placeholder="CVV *"
            required
            class="form-control form-control-sm mt-2"
            v-model="cvv"
          />

          <div class="input-group-append">
            <span class="input-group-text tooltip">
              <Icon
                icon="radix-icons:question-mark-circled"
                width="18"
                :inline="true"
              />
              <span class="tooltip-text">
                The CVV Number on your credit card or debit card is a 3 digit
                number on VISA, MasterCard and Discover branded credit and debit
                cards.
              </span>
            </span>
          </div>
        </div>
      </v-col>

      <v-col cols="12">
        <div class="form-group">
          <input type="checkbox" v-model="isDefault" />
          <label
            :class="['custom-control-label', { 'text-muted': !isDefault }]"
            @click="isDefault = !isDefault"
          >
            Default payment method?
          </label>
        </div>
      </v-col>
      <v-col>
        <button class="btn btn-dark">
          {{ isEditing ? 'Save changes' : 'Add Card' }}
        </button>
      </v-col>
    </v-row>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import { Icon } from '@iconify/vue2';

export default {
  components: {
    Icon,
  },

  data: () => ({
    isEditing: undefined,
    dateFormatted: '',
    isShownDateMenu: false,
    paymentIndex: undefined,
    isDefault: undefined,
    isDefaultSinceInit: true,
    cvv: undefined,
    formData: {},
  }),

  computed: {
    ...mapState('accountInfo', ['paymentCards', 'defaultPaymentCard']),
  },

  watch: {
    'formData.expiryDate': function () {
      this.dateFormatted = this.formatDate(this.formData.expiryDate);
    },
  },

  methods: {
    init() {
      if (this.$route.path.includes('edit')) this.isEditing = true;

      if (this.isEditing) {
        this.paymentIndex = +this.$route.params.index;
        this.isDefault = this.defaultPaymentCard === this.paymentIndex;
        this.isDefaultSinceInit = this.isDefault;

        if (!this.paymentCards[this.paymentIndex]) return;

        const { cardNumber, expiryDate, nameOnCard } =
          this.paymentCards[this.paymentIndex];

        this.formData = {
          cardNumber,
          expiryDate,
          nameOnCard,
        };

        this.dateFormatted = this.formatDate(expiryDate);
      }
    },

    formatDate(date) {
      if (!date) return null;

      const [year, month] = date.split('-');
      return `${month}/${year}`;
    },

    handleSubmit() {
      if (this.isEditing) {
        const defaultStateRemoved = this.isDefaultSinceInit !== this.isDefault;
        if (defaultStateRemoved) {
          this.$store.commit('accountInfo/setDefaultPayment', undefined);
        }
        this.$store.dispatch('accountInfo/updatePayment', {
          index: this.paymentIndex,
          payment: this.formData,
        });
      } else {
        this.$store.dispatch('accountInfo/addPayment', this.formData);
        this.paymentIndex = this.paymentCards.length - 1;
        this.formData = {};
        this.$router.push('/account/payment-methods');
      }

      if (this.isDefault) {
        this.$store.commit('accountInfo/setDefaultPayment', this.paymentIndex);
      }
    },
  },

  mounted() {
    this.init();
  },
};
</script>
