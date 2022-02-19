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
        <div v-for="item in hotels.hoteldetailsdata[0].room_type" :key="item.id" :class="selectedRoom === item.id ? 'selected' : ''" class="room-types-item" @click="setRoomType(item.id, item.title)">
          <h3>{{ item.title }}</h3>
          <img :src="item.photo" alt="" />
          <div class="details">
            <p>
              {{ item.price * getNumberOfDays }} TL <br />
              {{ getNumberOfDays }} Gün
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
          @click="setScenic(item.id, item.title)"
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

    getNumberOfDays() {
      const date1 = new Date(this.reservation.start_date);
      const date2 = new Date(this.reservation.end_date);

      // One day in milliseconds
      const oneDay = 1000 * 60 * 60 * 24;

      // Calculating the time difference between two dates
      const diffInTime = date2.getTime() - date1.getTime();

      // Calculating the no. of days between two dates
      const diffInDays = Math.round(diffInTime / oneDay);

      return diffInDays;
    },
  },

  methods: {
    ...mapMutations({ setReservation: "reservations/setReservation" }),

    setRoomType(roomTypeId, title) {
      this.selectedRoom = roomTypeId;
      this.setReservation({ room_type: roomTypeId, room_title: title });
    },
    setScenic(scenicTypeId, title) {
      this.selectedScenic = scenicTypeId;
      this.setReservation({ room_scenic: scenicTypeId, scenic_title: title });
    },
  },

  created() {
    this.selectedRoom = this.reservation.room_type;
    this.selectedScenic = this.reservation.room_scenic;
  },
};
</script>

<style></style>
