<template>
  <section class="section-container" v-if="hotels.hoteldetailsdata[0] && reservation.room_type">
    <div class="hotel-info">
      <h2>
        {{ reservation.hotel_name }} <span>({{ hotels.hoteldetailsdata[0].city }})</span>
      </h2>
      <ul>
        <li>Giriş Tarihi: {{ reservation.start_date }}</li>
        <li>Çıkış Tarihi: {{ reservation.end_date }}</li>
        <li>Yetişkin Sayısı: {{ reservation.adult }}</li>
        <li>Çocuk Sayısı {{ reservation.child }}</li>
      </ul>
    </div>
    <div class="room-types">
      <h2>Oda Tipi Seçimi</h2>
      <div class="room-types-item-container">
        <div
          v-for="item in hotels.hoteldetailsdata[0].room_type"
          :key="item.id"
          :class="selectedRoom === item.id ? 'selected' : ''"
          class="room-types-item"
          @click="setRoomType(item.id, item.title, item.price)"
        >
          <h3>{{ item.title }}</h3>
          <img :src="item.photo" alt="" />
          <div class="details">
            <p>
              {{ (item.price * totalDays).toLocaleString() }} TL <br />
              {{ totalDays }} Gün
            </p>
            <p>
              {{ reservation.adult }} Yetişkin <br />
              {{ reservation.child }} Çocuk
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="room-types">
      <h2>Manzara Seçimi</h2>
      <div class="room-types-item-container">
        <div
          v-for="item in hotels.hoteldetailsdata[0].room_scenic"
          :class="selectedScenic === item.id ? 'selected' : ''"
          :key="item.id"
          class="room-types-item"
          @click="setScenic(item.id, item.title, item.price_rate)"
        >
          <h3>{{ item.title }}</h3>
          <img :src="item.photo" alt="" />
          <div class="details">
            <p>Fiyat Etki Oranı %{{ item.price_rate }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="section-container" v-else>Loading...</section>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { dateDiff } from "../../tools";
export default {
  data() {
    return {
      selectedRoom: 0,
      selectedScenic: 0,
    };
  },
  computed: {
    ...mapState({
      reservation: (state) => state.reservations.reservation,
      hotels: (state) => state.hotels,
    }),

    accomodationPrice() {
      return this.reservation.room_price * this.totalDays;
    },

    totalDays() {
      return dateDiff(this.reservation.start_date, this.reservation.end_date);
    },
  },

  methods: {
    ...mapMutations({ setReservation: "reservations/setReservation" }),

    setRoomType(roomTypeId, title, price) {
      this.selectedRoom = roomTypeId;
      this.setReservation({ room_type: roomTypeId, room_title: title, room_price: price });
    },
    setScenic(scenicTypeId, title, price_rate) {
      this.selectedScenic = scenicTypeId;
      this.setReservation({ room_scenic: scenicTypeId, scenic_title: title, price_rate: price_rate });
    },
  },

  created() {
    this.selectedRoom = this.reservation.room_type;
    this.selectedScenic = this.reservation.room_scenic;
  },
};
</script>

<style></style>
