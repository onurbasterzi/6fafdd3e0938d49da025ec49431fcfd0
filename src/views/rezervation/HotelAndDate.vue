<template>
  <section class="section-container">
    <v-select :options="hotelsData" class="vSelect" v-model="selected_hotel" label="hotel_name" @input="(value) => readValue(value)" placeholder="Rezervasyon Yapmak İstediğiniz Oteli Seçiniz">
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
        <input type="number" min="0" class="input" v-model="adult" />
      </div>
      <div class="form-item">
        <label>Çocuk Sayısı</label>
        <input type="number" class="input" v-model="child" />
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
      datalar:null
    };
  },
  computed: {
    ...mapState({
      reservation: (state) => state.reservations.reservation,
      hotels: (state) => state.hotels,
    }),

    hotelsData() {
      return this.hotels.hotelsdata;
    },

    allreservations(){
    this.datalar=this.reservation
        return this.reservation
    },

    selected_hotel: {
      get() {
        if (this.reservation.hotel_id != 0) {
          return { id: this.reservation.hotel_id, hotel_name: this.reservation.hotel_name };
        } else {
          return null;
        }
      },
      set(value) {
        console.log("asdasdasd", value);
        // this.$store.commit("hotels/setSelectedHotel", { id: value.id, hotel_name: value.hotel_name });
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

    readValue(value) {
      if (value) {
        console.log("computed", this.selected_hotel);
        this.$store.dispatch("hotels/getDetails", value.id).then((res) => {
          this.$store.commit("reservations/setReservation", { hotel_id: res[0].hotel_id });
          console.log("rezervation info", this.reservation);
        });
      }
    },
  },

  created() {

    if (this.hotelsData.length == 0) {
      if (localStorage.getItem("reservation")) { 
        const savedData = JSON.parse(localStorage.getItem("reservation"));
        console.log(savedData);
        this.$store.commit("reservations/setReservation", savedData);
      } else {
      }
      this.$store.dispatch("hotels/get").then((res) => {
        console.log("commit");
      });
    } else {
      console.log("state");

      // SON GÖNDERİM ANINDA HOTEL NAME ALANINI SİL
    //   let dataaaa={...this.allreservations};
    //   delete dataaaa.hotel_name
    //     console.log('dataaaa',dataaaa);
    //         console.log('stateeeeee',this.allreservations);

    }
  },
};
</script>

<style></style>
