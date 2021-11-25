<template>
  <div>
    <form @submit.prevent="personalInfoUpdated">
      <v-row>
        <v-col
          v-for="(personalInfo, personalInfoIndex) in personalInfos"
          :key="personalInfoIndex"
          cols="12"
          :md="personalInfo.mdWidth"
          class="form-group"
        >
          <label> {{ personalInfo.label }} </label>
          <input
            :type="personalInfo.type"
            :placeholder="
              personalInfo.key === 'currentPassword'
                ? 'Hint: thixinhxinh'
                : personalInfo.label
            "
            class="form-control form-control-sm mt-2"
            v-model="formData[personalInfo.key]"
            :required="isInputRequired(personalInfo)"
          />
        </v-col>

        <v-col cols="6" class="mb-7">
          <label for="">Date of Birth</label>
          <v-menu
            ref="isShownDateMenu"
            v-model="isShownDateMenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateFormatted"
                hint="DD/MM/YYYY format"
                persistent-hint
                v-bind="attrs"
                @blur="date = parseDate(dateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>

            <v-date-picker
              v-model="formData.dateOfBirth"
              no-title
              @input="isShownDateMenu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="6">
          <label>Gender</label>
          <br />
          <button
            v-for="gender in genders"
            :key="gender"
            :class="[
              'btn btn-sm btn-outline-border mr-2',
              { active: formData.gender === gender },
            ]"
            @click.prevent="formData.gender = gender"
          >
            {{ gender }}
          </button>
        </v-col>

        <v-col>
          <button class="btn btn-dark">Save changes</button>
        </v-col>
      </v-row>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    dateFormatted: '',
    isShownDateMenu: false,
    genders: ['Male', 'Female'],
    personalInfos: [
      {
        label: 'First Name *',
        type: 'text',
        mdWidth: 6,
        key: 'firstName',
      },
      {
        label: 'Last Name *',
        type: 'text',
        mdWidth: 6,
        key: 'lastName',
      },
      {
        label: 'Email *',
        type: 'email',
        mdWidth: 12,
        key: 'email',
      },
      {
        label: 'Current Password *',
        type: 'password',
        mdWidth: 4,
        key: 'currentPassword',
      },
      {
        label: 'New Password',
        type: 'password',
        mdWidth: 4,
        key: 'newPassword',
      },
      {
        label: 'Re-enter new password',
        type: 'password',
        mdWidth: 4,
        key: 'newPasswordRepeat',
      },
    ],
    formData: {},
  }),

  computed: {
    ...mapState('accountInfo', ['personalInfo']),

    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  watch: {
    'formData.dateOfBirth': function () {
      this.dateFormatted = this.formatDate(this.formData.dateOfBirth);
    },
  },

  methods: {
    isInputRequired(field) {
      if (
        field.key === 'newPasswordRepeat' &&
        this.formData.newPassword !== ''
      ) {
        return true;
      } else if (
        field.key === 'newPassword' ||
        field.key === 'newPasswordRepeat'
      ) {
        return false;
      } else {
        return true;
      }
    },

    init() {
      const { firstName, lastName, email, dateOfBirth, gender } =
        this.personalInfo;

      this.formData = {
        firstName,
        lastName,
        email,
        currentPassword: '',
        newPassword: '',
        newPasswordRepeat: '',
        dateOfBirth,
        gender,
      };

      this.dateFormatted = this.formatDate(dateOfBirth);
    },

    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },

    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },

    personalInfoUpdated() {
      const {
        firstName,
        lastName,
        email,
        dateOfBirth,
        gender,
        currentPassword,
        newPassword,
        newPasswordRepeat,
      } = this.formData;

      const [year, month, day] = dateOfBirth.split('-');

      // check password
      if (currentPassword !== this.personalInfo.password) {
        this.$store.dispatch(
          'notification/showNotification',
          {
            type: 'error',
            message: 'Incorrect password, please try again.',
          },
          { root: true }
        );
      } else {
        if (newPassword !== '' && newPassword !== newPasswordRepeat) {
          this.$store.dispatch(
            'notification/showNotification',
            {
              type: 'error',
              message: 'New password is not matching.',
            },
            { root: true }
          );
        } else {
          const payload = {
            firstName,
            lastName,
            email,
            dateOfBirth: new Date(year, month - 1, day - 1)
              .toISOString()
              .substr(0, 10),
            gender,
            password: newPassword !== '' ? newPassword : currentPassword,
          };
          this.$store.commit('accountInfo/updatePersonalInfo', payload);
          this.$store.dispatch(
            'notification/showNotification',
            {
              type: 'success',
              message: 'All changes have been saved',
            },
            { root: true }
          );
          this.formData.currentPassword = '';
          this.formData.newPassword = '';
          this.formData.newPasswordRepeat = '';
        }
      }
    },
  },

  mounted() {
    this.init();
  },
};
</script>
