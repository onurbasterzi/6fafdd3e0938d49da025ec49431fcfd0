<template>
  <section class="section-container">
    <v-select :options="hotels.hotelsdata" class="vSelect" v-model="selected_hotel" label="hotel_name" @input="(value) => hotelChange(value)" placeholder="Rezervasyon Yapmak İstediğiniz Oteli Seçiniz">
      <template #no-options="{}"> Eşleşen kayıt bulunamadı. </template>
    </v-select>
    <div class="form">
      <div class="form-item">
        <label>Giriş Tarihi</label>
        <date-picker v-model="start_date" valueType="format"></date-picker>
      </div>
      <div class="form-item">
        <label>Çıkış Tarihi</label>
        <date-picker v-model="end_date" valueType="format"></date-picker>
      </div>
      <div class="form-item">
        <label>Yetişkin Sayısı</label>
        <input type="number" min="0" :max="max_adult_size" class="input" v-model="adult" />
      </div>
      <div class="form-item">
        <label>Çocuk Sayısı</label>
        <input type="number" class="input" min="0" max="5" :disabled="child_status === 1" v-model="child" />
      </div>
    </div>
  </section>
</template>

<script>
import "vue-select/dist/vue-select.css";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

import { mapMutations, mapState } from "vuex";
export default {
  components: {
    DatePicker,
  },
  
  data() {
    return {
      max_adult_size: 5,
      child_status: 1,
    };
  },

  computed: {
    ...mapState({
      reservation: (state) => state.reservations.reservation,
      hotels: (state) => state.hotels,
    }),

    selected_hotel: {
      get() {
        if (this.reservation.hotel_id != 0) {
          return { id: this.reservation.hotel_id, hotel_name: this.reservation.hotel_name };
        } else {
          return null;
        }
      },
      set(value) {
        this.setReservation({ hotel_name: value.hotel_name });
      },
    },

    start_date: {
      get() {
        return this.reservation.start_date;
      },
      set(value) {
        this.setReservation({ start_date: value });
      },
    },

    end_date: {
      get() {
        return this.reservation.end_date;
      },
      set(value) {
        this.setReservation({ end_date: value });
      },
    },
    adult: {
      get() {
        return this.reservation.adult;
      },
      set(value) {
        this.setReservation({ adult: value });
      },
    },
    child: {
      get() {
        return this.reservation.child;
      },
      set(value) {
        this.setReservation({ child: value });
      },
    },
  },

  methods: {
    ...mapMutations({ setReservation: "reservations/setReservation" }),

    hotelChange(value) {
      if (value) {
        console.log("computed", this.selected_hotel);
        this.$store.dispatch("hotels/getDetails", value.id).then((res) => {
          this.$store.commit("reservations/setReservation", { hotel_id: res[0].hotel_id });
          this.max_adult_size = this.hotels.hoteldetailsdata[0].max_adult_size;
          this.child_status = this.hotels.hoteldetailsdata[0].child_status ? 0 : 1;
          this.setReservation({ adult: "0" });
          this.setReservation({ child: "0" });
          this.setReservation({ room_scenic: "0" });
          this.setReservation({ room_type: "0" });
          console.log("max adult size", this.max_adult_size);
        });
      }
    },
  },

  created() {},
};
</script>

<style></style>
