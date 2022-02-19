<template>
  <section class="payment-container" v-if="hotels.hoteldetailsdata[0] && reservation.room_type">
    <Payment></Payment>
    <div class="preview-container">
      <h2>
        {{ reservation.hotel_name }} <span>({{ hotels.hoteldetailsdata[0].city }})</span>
      </h2>
      <div class="reservation-info">
        <div class="item">
          <label>Giriş Tarihi</label>
          <span>{{ reservation.start_date }}</span>
        </div>
        <div class="item">
          <label>Çıkış Tarihi</label>
          <span>{{ reservation.end_date }}</span>
        </div>
        <div class="item">
          <label>Yetişkin</label>
          <span>{{ reservation.adult }}</span>
        </div>
        <div class="item">
          <label>Çocuk</label>
          <span>{{ reservation.child }}</span>
        </div>
         <div class="item">
          <label>Oda Tipi</label>
          <span>{{ reservation.room_title }}</span>
        </div>
        <div class="item">
          <label>Manzara</label>
          <span>{{ reservation.scenic_title }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Payment from "./Payment.vue";
import { mapState } from "vuex";
export default {
  components: {
    Payment,
  },
  data() {
    return {
      isim: "Ad Soyad",
      numara: "################",
      cvv: false,
    };
  },
  computed: {
    ...mapState({
      reservation: (state) => state.reservations.reservation,
      hotels: (state) => state.hotels,
    }),
  },
};
</script>

<style></style>
