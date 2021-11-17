<template>
  <div class="sizeChart">
    <transition name="modal-fade">
      <div
        class="modal-overlay"
        id="sizeChart-modal-overlay"
        v-show="isOpen"
        @click="close"
      >
        <transition name="slide-fade">
          <div class="modal-dialog modal-lg" v-show="isOpen" @click.stop="">
            <!-- Header -->
            <div class="modal-header border-bottom">
              Size Chart

              <!-- Close -->
              <button class="close" @click="close">
                <Icon icon="clarity:close-line" width="27" :inline="true" />
              </button>
            </div>

            <!-- Body -->
            <!-- Clothing table -->
            <div class="modal-body border-bottom">
              <!-- Body Heading -->
              <div class="d-flex mb-7 justify-space-between">
                <h5>Clothing</h5>
                <div class="font-size-xxxs font-weight-medium">
                  <button
                    v-for="unit in units"
                    :key="unit"
                    :class="[
                      'btn-square btn-xxs btn-outline-dark ml-2',
                      { 'btn-dark': clothingUnit === unit },
                    ]"
                    @click="clothingUnit = unit"
                  >
                    {{ unit }}
                  </button>
                </div>
              </div>

              <!-- Tables -->
              <table class="w-100 tablesm mb-6">
                <thead>
                  <tr>
                    <th
                      v-for="(header, headerIndex) in clothingTableHeaders"
                      :key="headerIndex"
                    >
                      {{ header }}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="(dimension, dimensionIndex) in clothingDimensions(
                      clothingUnit
                    )"
                    :key="dimensionIndex"
                  >
                    <td>
                      {{ dimension.size }}
                    </td>
                    <td>
                      {{ dimension.US }}
                    </td>
                    <td>{{ dimension.bust[0] }} - {{ dimension.bust[1] }}</td>
                    <td>{{ dimension.waist[0] }} - {{ dimension.waist[1] }}</td>
                    <td>{{ dimension.hips[0] }} - {{ dimension.hips[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Shoes table -->
            <div class="modal-body border-bottom">
              <!-- Body Heading -->
              <div class="d-flex mb-7 justify-space-between">
                <h5>Shoes</h5>
                <div class="font-size-xxxs font-weight-medium">
                  <button
                    v-for="unit in units"
                    :key="unit"
                    :class="[
                      'btn-square btn-xxs btn-outline-dark ml-2',
                      { 'btn-dark': shoesUnit === unit },
                    ]"
                    @click="shoesUnit = unit"
                  >
                    {{ unit }}
                  </button>
                </div>
              </div>

              <!-- Table -->
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                  v-for="(table, index) in shoesFootLength(shoesUnit)"
                  :key="index"
                >
                  <table class="w-100 tablesm mb-6">
                    <thead>
                      <tr>
                        <th
                          v-for="(header, headerIndex) in shoesTableHeaders"
                          :key="headerIndex"
                        >
                          {{ header }}
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr
                        v-for="(shoesSizeDetail, shoesSizeDetailIndex) in table"
                        :key="shoesSizeDetailIndex"
                      >
                        <td>
                          {{ shoesSizeDetail.size }}
                        </td>
                        <td>
                          {{ shoesSizeDetail.US }}
                        </td>
                        <td>{{ shoesSizeDetail.length }}</td>
                      </tr>
                    </tbody>
                  </table>
                </v-col>
              </v-row>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';
import { round } from 'lodash';

export default {
  props: {
    isOpen: { type: Boolean, default: false },
  },

  components: {
    Icon,
  },

  data: () => ({
    clothingTableHeaders: ['Size', 'US', 'Bust', 'Waist', 'Hips'],
    shoesTableHeaders: ['Size', 'US', 'Foot length'],
    units: ['IN', 'CM'],
    clothingUnit: 'IN',
    shoesUnit: 'CM',
    clothingSizeDetails: [
      { size: 'XS', US: '2' },
      { size: 'S', US: '4' },
      { size: 'M', US: '6' },
      { size: 'L', US: '8' },
      { size: 'XL', US: '10' },
      { size: 'XXL', US: '12' },
    ],
    shoesSizeDetails: [
      [
        { size: '36', US: '5' },
        { size: '36.5', US: '5.5' },
        { size: '37', US: '6' },
        { size: '37.5', US: '6.5' },
        { size: '38', US: '7' },
        { size: '38.5', US: '7.5' },
      ],
      [
        { size: '39', US: '8' },
        { size: '39.5', US: '8' },
        { size: '40', US: '9' },
        { size: '40.5', US: '9.5' },
        { size: '41', US: '10' },
        { size: '42', US: '10.5' },
      ],
    ],
  }),

  computed: {},

  methods: {
    close() {
      this.eventHub.$emit('closeSizeChart');
    },

    clothingDimensions(unit) {
      let bustMin = 30;
      let waistMin = 22;
      let hipsMin = 31;
      let bustMax, waistMax, hipsMax;

      const unitFactor = unit === 'IN' ? 1 : 2.54;

      if (unit === 'CM') {
        bustMin *= unitFactor;
        waistMin *= unitFactor;
        hipsMin *= unitFactor;
      }

      const result = this.clothingSizeDetails.reduce((array, size, index) => {
        bustMin += 2 * unitFactor;
        bustMax = bustMin + 1 * unitFactor;

        waistMin += 2 * unitFactor;
        waistMax = waistMin + 1 * unitFactor;

        if (index >= 2 && index % 2 === 0) {
          hipsMin += 3 * unitFactor;
          hipsMax = hipsMin + 2 * unitFactor;
        } else if (index >= 2 && index % 2 !== 0) {
          hipsMin += 4 * unitFactor;
          hipsMax = hipsMin + 2 * unitFactor;
        } else {
          hipsMin += 2 * unitFactor;
          hipsMax = hipsMin + 1 * unitFactor;
        }

        size.bust = [round(bustMin, 1), round(bustMax, 1)];
        size.waist = [round(waistMin, 1), round(waistMax, 1)];
        size.hips = [round(hipsMin, 1), round(hipsMax, 1)];

        array.push(size);
        return array;
      }, []);

      return result;
    },

    shoesFootLength(unit) {
      const footLength = [
        22.8, 23.1, 23.5, 23.8, 24.1, 24.5, 25, 25.1, 25.4, 25.7, 26, 26.5,
      ];

      const unitFactor = unit === 'CM' ? 1 : 1 / 2.54;

      const result = [];

      for (const table of this.shoesSizeDetails) {
        const tempArray = table.reduce((array, size, index) => {
          size.length = round(footLength[index] * unitFactor, 1);
          array.push(size);
          return array;
        }, []);

        result.push(tempArray);
      }

      return result;
    },
  },
};
</script>
