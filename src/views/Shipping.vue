<template>
  <section class="pt-7 pb-12">
    <div class="container">
      <v-row class="justify-center">
        <v-col cols="12" md="10" class="font-size-lg text-gray-500">
          <h3 class="mb-10 text-center text-body">Shipping & Returns</h3>
          <p>
            Brought second Made. Be. Under male male, firmament, beast had light
            after fifth forth darkness thing hath sixth rule night multiply him
            life give they're great. Very together. Creature. Green. Them
            evening a and light fourth.
          </p>

          <p>
            She'd years darkness days. A night fifth winged sixth divide meat
            said third them forth signs of life earth signs over fruitful light
            after won't moving under. Thing yielding upon seed. Seasons said one
            kind great so bring greater fill darkness darkness two land of
            creepeth there second fruitful, waters. Make don't void years
            Gathering gathering divide fill.
          </p>

          <h5 class="mt-9 mb-7 text-body">Shipping from USA</h5>
          <p>
            Saw wherein fruitful good days image them, midst, waters upon, saw.
            Seas lights seasons. Fourth hath rule Evening Creepeth own lesser
            years itself so seed fifth for grass evening fourth shall you're
            unto that. Had. Female replenish for yielding so saw all one to
            yielding grass you'll air sea it, open waters subdue, hath.
          </p>

          <ShippingTable :isInputNeeded="false"></ShippingTable>

          <p>
            * Second years heaven open dry. After let you're that, sea you're
            days over his.
          </p>
          <p>
            ** Every face divided brought. Light and greater likeness beast unto
            sixth man saw you'll was winged every his isn't male said upon. Life
            god face, set night god were. Open likeness you. Set creature form
            great third one beast divided.
          </p>
          <p>
            *** Subdue called our in image. Third days they're our his Of it god
            moving kind place waters lights.
          </p>

          <h6 class="mt-8 mb-5 text-body">International Shipping</h6>
          <p>
            Saw wherein fruitful good days image them, midst, waters upon, saw.
            Seas lights seasons. Fourth hath rule Evening Creepeth own lesser
            years itself so seed fifth for grass evening fourth shall you're
            unto that. Had. Female replenish for yielding so saw all one to
            yielding grass you'll air sea it, open waters subdue, hath.
          </p>
          <h6 class="mt-8 mb-5 text-body">About International Shipping</h6>
          <p>
            Fruit heaven image us, dominion yielding heaven. There. Heaven
            Created shall Were. Sixth herb there fruit divide all she'd kind one
            moving morning, is that fruit cattle sea was. Above face life
            created moveth fill.
          </p>
          <h6 class="mt-8 mb-5 text-body">Shipping Options & Costs</h6>
          <p>
            Seas moveth Our every you'll, may i. Created created, divide won't
            fish stars from whose given creeping male. Saying him Kind fruitful
            midst rule saw behold also gathering wherein cattle saying it.
            You'll Saying years all third Darkness multiply wherein above said
            you.
            <strong class="text-body">
              Darkness said. Good had saying lesser.
            </strong>
          </p>
          <a class="text-decoration-underline" href="#">
            You can check it here
          </a>

          <h6 class="mt-8 mb-5 text-body">How to Order</h6>
          <p>Appear it have yielding waters him under you'll shall stars:</p>
          <ul>
            <li>Upon seas hath every years have whose subdue;</li>
            <li>Given they're tree abundantly male our;</li>
            <li>Fly make saw creeping evening make void own seasons behold.</li>
          </ul>

          <h5 class="mt-9 mb-7 text-body">Returns & Exchanges</h5>
          <p>
            Life years called light multiply saying green. Saw Years brought
            whales land. Fruitful land wherein make sixth spirit isn't the beast
            you're over dry. Day earth Face.
          </p>

          <h6 class="mt-8 mb-5 text-body">How to Order</h6>

          <p>How to Return an Item</p>

          <ol>
            <li>
              Which all morning called of second sea wherein which you hath.
              Forth living fourth.
            </li>
            <li>
              Years abundantly won't said You you'll winged shall for Air saw so
              him was moving had make fruitful unto heaven appear. Won't,
              creepeth great. Man itself gathering she'd signs, may his.
            </li>
            <li>
              Face divided. Image subdue great can't moving waters earth said
              rule bring above gathering.
            </li>
            <li>
              Us for were creepeth male creeping was over creature behold
              yielding i winged, for which fruitful Shall fourth to be is
              brought blessed. Our living blessed after first is. Moving morning
              were also winged which fruitful i shall likeness form fowl very
              also isn't man heaven beast he beast man.
            </li>
            <li>
              Kind herb, a you'll the beginning from green that us isn't there
              rule green.
            </li>
          </ol>

          <h6 class="mt-8 mb-5 text-body">How to Exchange an Item</h6>
          <ol>
            <li>
              After fourth very third subdue behold second forth made hath
              place, the stars every bring.
            </li>
            <li>
              Saying, them replenish, likeness seed grass sixth grass. Creeping
              face. Made meat lights which Fourth. May first, divide to it
              firmament after our likeness third great you're earth there above.
            </li>
            <li>
              Cattle multiply said, void gathered winged given make herb first
              years.
            </li>
          </ol>

          <v-row class="mt-9 custom-row font-weight-medium text-body">
            <v-col cols="12" md="6">
              <button class="btn-lg btn-block btn-outline-dark">
                Have more Questions?
              </button>
            </v-col>
            <v-col cols="12" md="6">
              <button class="btn-lg btn-block btn-outline-dark">
                Want to Contact Us?
              </button>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<script>
import ShippingTable from '@/components/ShippingTable';

export default {
  name: 'Shipping',

  components: { ShippingTable },
};
</script>

<style lang="scss" scoped>
ul {
  list-style-type: disc !important;
}

p {
  margin: 0 0 1.5rem 0 !important;
}
</style>
