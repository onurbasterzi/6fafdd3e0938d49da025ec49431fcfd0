<template>
  <div class="main-container">
    <section class="section-container">
      <v-select
        :options="hotels.hotelsdata"
        class="vSelect"
        :class="{ 'form-group--error': $v.selected_hotel.$error }"
        v-model="selected_hotel"
        label="hotel_name"
        @input="(value) => hotelChange(value)"
        placeholder="Rezervasyon Yapmak İstediğiniz Oteli Seçiniz"
      >
        <template #no-options="{}"> Eşleşen kayıt bulunamadı. </template>
      </v-select>
      <div class="form">
        <div class="form-item" :class="{ 'form-group--error': $v.start_date.$error }">
          <label>Giriş Tarihi</label>
          <date-picker v-model="$v.start_date.$model" valueType="format" format="YYYY-MM-DD"></date-picker>
          <div class="error" v-if="!$v.start_date.today">Geçmiş tarih seçilemez.</div>
        </div>
        <div class="form-item" :class="{ 'form-group--error': $v.end_date.$error }">
          <label>Çıkış Tarihi</label>
          <date-picker v-model="$v.end_date.$model" valueType="format" format="YYYY-MM-DD"></date-picker>
          <div class="error" v-if="$v.end_date.$error">Ç.Tarihi G.Tarihinden büyük olmalıdır.</div>
        </div>
        <div class="form-item" :class="{ 'form-group--error': $v.adult.$error }">
          <label>Yetişkin Sayısı</label>
          <input type="number" min="1" :max="max_adult_size" class="input" v-model.trim.lazy="$v.adult.$model" />
          <div class="error" v-if="!$v.adult.between">Yetişkin sayısı Min:{{ $v.adult.$params.between.min }} Max: {{ $v.adult.$params.between.max }}</div>
        </div>

        <div class="form-item" :class="{ 'form-group--error': $v.child.$error }">
          <label>Çocuk Sayısı</label>
          <input type="number" class="input" min="0" max="5" :disabled="child_status === 1" v-model.trim.lazy="$v.child.$model" />
          <div class="error" v-if="!$v.child.between">Maximum çocuk sayısı 5.</div>
          <div class="child" v-if="child_status === 1">Çocuk ziyaretçi kabul edilmiyor!</div>
        </div>
      </div>
    </section>
    <rezervation-footer :validation="$v"></rezervation-footer>
  </div>
</template>

<script>
import "vue-select/dist/vue-select.css";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/locale/tr";
import RezervationFooter from "../../components/RezervationFooter.vue";
import "vue2-datepicker/index.css";

import { mapActions, mapMutations, mapState } from "vuex";
import { required, between } from "vuelidate/lib/validators";
export default {
  components: {
    DatePicker,
    RezervationFooter,
  },

  data() {
    return {
      child_status: 0,
    };
  },

  validations() {
    return {
      adult: {
        between: between(1, this.max_adult_size),
        required,
      },
      child: {
        between: between(0, 5),
      },
      start_date: {
        today() {
          return new Date(this.start_date + ", 23:59:59") <= new Date(Date.now()) ? false : true;
        },
        required,
      },
      end_date: {
        compare_date() {
          return new Date(this.end_date) > new Date(this.start_date) ? true : false;
        },
        required,
      },
      selected_hotel: {
        required,
      },
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

    max_adult_size: {
      get() {
        return this.reservation.max_adult_size;
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
        this.setReservation({ adult: parseInt(value) });
      },
    },
    child: {
      get() {
        return this.reservation.child;
      },
      set(value) {
        this.setReservation({ child: parseInt(value) });
      },
    },
  },

  methods: {
    ...mapMutations({ setReservation: "reservations/setReservation", setLoader: "reservations/setLoader" }),
    ...mapActions({ GET_HOTEL_DETAILS: "hotels/GET_HOTEL_DETAILS" }),

    hotelChange(value) {
      if (value) {
    
        this.setLoader("show");
        this.GET_HOTEL_DETAILS(value.id)
          .then((res) => {
            this.setReservation({ hotel_id: res[0].hotel_id });
            this.setReservation({ max_adult_size: this.hotels.hoteldetailsdata[0].max_adult_size });
            this.child_status = this.hotels.hoteldetailsdata[0].child_status ? 0 : 1;
            this.setReservation({ child: 0 });
            this.setReservation({ room_scenic: 0 });
            this.setReservation({ room_type: 0 });
            this.setLoader("hide");
          })
          .catch((err) => {
            this.setLoader("hide");
            this.$toast.error(`Hata:${err.message}`);
          });
      }
    },
  },


};
</script>

<style></style>
