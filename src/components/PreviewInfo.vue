<template>
  <div v-if="hotels.hoteldetailsdata[0] && reservation.room_type">
    <h2>
      {{ reservation.hotel_name }} <span>({{ hotels.hoteldetailsdata[0].city }})</span>
    </h2>
    <div class="reservation-info">
      <div class="item">
        <label>Giriş Tarihi</label>
        <span>{{ reservation.start_date | moment("DD.MM.YYYY") }}</span>
      </div>
      <div class="item">
        <label>Çıkış Tarihi</label>
        <span>{{ reservation.end_date | moment("DD.MM.YYYY") }}</span>
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

    <div class="totals">
      <hr />
      <div class="item">
        <label>Oda Fiyatı</label>
        <span>{{ reservation.room_price.toLocaleString() }} TL</span>
      </div>
      <div class="item">
        <label>Fiyat Etki Oranı</label>
        <span>% {{ reservation.price_rate }}</span>
      </div>
      <div class="item">
        <label>Konaklama ({{ totalDays  }} Gün)</label>
        <span>{{ accomodationPrice.toLocaleString() }} TL</span>
      </div>
      <div class="item">
        <label>İndirim</label>
        <span>-{{ reservation.discount_ammount }} TL</span>
      </div>
      <hr />
      <div class="item">
        <h3>TOPLAM TUTAR</h3>
        <h3>{{ totalPrice.toLocaleString() }} TL</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { dateDiff } from "../tools/index";
export default {
  computed: {
    ...mapState({
      reservation: (state) => state.reservations.reservation,
      hotels: (state) => state.hotels,
    }),

    totalDays() {
      return dateDiff(this.reservation.start_date, this.reservation.end_date);
    },

    accomodationPrice() {
      return this.reservation.room_price * this.totalDays;
    },

    totalPrice() {
      // Hesaplama yapılırken oda fiyatı baz alınmıştır.Kişi sayısının fiyata etkisi yoktur.
      return Math.round(this.accomodationPrice * (1 + this.reservation.price_rate / 100) - this.reservation.discount_ammount);
    },
  },

  methods: {
    ...mapMutations({ setReservation: "reservations/setReservation" }),
  },

  created() {
    this.setReservation({ price: this.totalPrice });
  },
};
</script>

<style></style>
