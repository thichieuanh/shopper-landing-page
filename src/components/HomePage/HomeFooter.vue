<template>
  <v-footer
    padless
    dark
    color="#1f1f1f"
    id="home-footer"
    class="d-flex flex-column flex-nowrap"
  >
    <!-- FOOTER TOP -->
    <div class="py-12 mx-0 footer-top container-control">
      <v-card flat style="background: transparent">
        <v-row class="justify-center align-center flex-column text-center">
          <v-col cols="12" sm="12" md="7" lg="6" class="pa-0">
            <h5 class="mb-7">Want style Ideas and Treats?</h5>
            <form action="#" class="d-flex mb-11">
              <input
                type="email"
                placeholder="Enter Email *"
                required
                class="form-control mr-3"
              />
              <button class="subcribe-button btn px-10" type="submit">
                Subcribe
              </button>
            </form>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="3" class="pa-0">
            <h4 class="mb-6">Pineapple.</h4>
            <ul class="d-flex pa-0 mb-7">
              <li
                v-for="(icon, socialIconsIdx) in socialIcons"
                :key="socialIconsIdx"
              >
                <a href="" class="social-link mr-2 text-left">
                  <Icon :icon="icon.spec" width="20" :inline="true" />
                </a>
              </li>
            </ul>
          </v-col>

          <v-col cols="12" md="9" class="pa-0">
            <v-row>
              <v-col
                v-for="(content, idx) in contactDetails"
                :key="idx"
                cols="3"
                class="pa-0"
              >
                <h6 class="mb-4 heading-xxs">{{ content.title }}</h6>
                <ul class="pa-0">
                  <li
                    :key="detailIdx"
                    v-for="(detail, detailIdx) in content.details"
                  >
                    <a :href="detail.href" class="social-link">
                      {{ detail.article }}
                    </a>
                  </li>
                </ul>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </div>

    <!-- FOOTER BOTTOM -->
    <div class="py-6 mx-0 container-control">
      <v-row class="justify-space-between align-center">
        <v-col class="pa-0">
          <p class="my-auto font-size-xxs text-muted">
            © 2019 All rights reserved. Designed by Unvab.
          </p>
        </v-col>
        <v-col class="pa-0">
          <ul class="pa-0 d-flex justify-end">
            <li v-for="n in 6" :key="n" class="mx-1">
              <img :src="`/img/payments/payment${n}.svg`" alt="payment" />
            </li>
          </ul>
        </v-col>
      </v-row>
    </div>
  </v-footer>
</template>

<script>
import { Icon } from '@iconify/vue2';
export default {
  components: {
    Icon,
  },

  data: () => ({
    socialIcons: [
      {
        href: 'https://www.facebook.com/maytrongdem/',
        spec: 'la:facebook-f',
      },
      {
        href: 'https://www.facebook.com/maytrongdem/',
        spec: 'akar-icons:youtube-fill',
      },
      {
        href: '#',
        spec: 'akar-icons:twitter-fill',
      },
      {
        href: '#',
        spec: 'akar-icons:instagram-fill',
      },
      {
        href: '#',
        spec: 'ant-design:medium-square-filled',
      },
    ],
    contactDetails: [
      {
        title: 'SUPPORT',
        details: [
          { article: 'Contact Us', href: '#' },
          { article: 'FAQs', href: '#' },
          { article: 'Size Guide', href: '#' },
          { article: 'Shipping & Returns', href: '#' },
        ],
      },
      {
        title: 'SHOP',
        details: [
          { article: "Men's Shopping'", href: '#' },
          { article: "Women's Shopping", href: '#' },
          { article: "Kids' Shopping", href: '#' },
          { article: 'Shipping & Returns', href: '#' },
        ],
      },
      {
        title: 'COMPANY',
        details: [
          { article: 'Our Story', href: '#' },
          { article: 'Careers', href: '#' },
          { article: 'Terms & Conditions', href: '#' },
          { article: 'Privacy & Cookie policy', href: '#' },
        ],
      },
      {
        title: 'CONTACT',
        details: [
          { article: '1-202-555-0105', href: '#' },
          { article: '1-202-555-0106', href: '#' },
          { article: 'help@shopper.com', href: '#' },
        ],
      },
    ],
    payments: [],
  }),
};
</script>

<style lang="scss" scoped>
#home-footer {
  background-image: url('/img/backgroundPatterns/pattern2.svg');
  background-size: cover;
  background-position: center;
}

.footer-top {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #303030;
}

.form-control {
  background: #303030;
  color: #fff;
  padding: 1.0625rem 1.875rem;
  font-size: 1rem;
  line-height: 1.5;
  width: 100%;
}

.subcribe-button {
  background: #525252;
  padding: 0 10px;
}
</style>
