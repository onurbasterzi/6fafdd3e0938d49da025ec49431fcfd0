<template>
  <div class="card-info-container">
    <div class="credit-card">
      <div class="front" :style="cvv ? 'transform:perspective(1000px) rotateY(180deg);' : 'transform:perspective(1000px) rotateY(0);'">
        <div class="logo">
          <!-- <img src="../../assets/chip.png" alt=""> -->
          <p>KREDI KARTI</p>
          <img src="../../assets/master.png" alt="" />
        </div>
        <div class="card-number">
          <img src="../../assets/chip.png" alt="" />
          <span>{{ card_number | cardnumber }}</span>
        </div>
        <div class="card-info">
          <div class="item">
            <label>Kart Sahibi</label>
            <div class="card-holder">{{ card_name }}</div>
          </div>
          <div class="item">
            <label>Son Kullanma Tarihi</label>
            <span>{{card_date_month}}/</span>
            <span>{{card_date_year}}</span>
          </div>
        </div>
      </div>
      <div class="back" :style="!cvv ? 'transform:perspective(1000px) rotateY(-180deg);' : 'transform:perspective(1000px) rotateY(0);'">
        <div class="stripe"></div>
        <div class="item">
          <span>CVV: {{card_cvv}}</span>
          <div class="cvv-box"></div>
          <img src="../../assets/master.png" alt="" />
        </div>
      </div>
    </div>
    <div class="card-item">
      <label>Kart Üzerindeki İsim</label>
      <input type="text" class="input" v-model="card_name" />
    </div>
    <div class="card-item">
      <label>Kart Numarası</label>
      <input type="text" class="card-number input" v-model="card_number" />
    </div>
    <div class="card-item-flex">
      <div class="flex-item">
        <label>Son Kullanma Tarihi</label>
        <select v-model="card_date_month" name="" id="" class="input">
          <option value="Ay" selected disabled>Ay</option>
          <option v-for="item in 12" :key="item" :value="item.toString().length == 1 ? '0' + item : item">{{ item.toString().length == 1 ? "0" + item : item }}</option>
        </select>
      </div>
      <div class="flex-item year">
        <select v-model="card_date_year" name="" id="" class="card-year input">
          <option value="Yıl" selected disabled>Yıl</option>
          <option v-for="item in 2030 - 2021" :key="item" :value="item + 2021">{{ item + 2021 }}</option>
        </select>
      </div>
      <div class="flex-item">
        <label>CVV</label>
        <input v-model="card_cvv" type="text" class="card-cvv input" @focus="cvv = true" @blur="cvv = false" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      isim: "Ad Soyad",
      numara: "################",
      cvv: false,
    };
  },
  filters:{
    cardnumber(value){
      if(value) return value.match(/.{1,4}/g).join(' ')
    }
  },
  computed: {
    ...mapState({
      reservation: (state) => state.reservations.reservation,
    }),
    card_name: {
      get() {
        return this.reservation.card_name;
      },
      set(value) {
        this.setReservation({ card_name: value });
      },
    },
    card_number: {
      get() {
        return this.reservation.card_number;
      },
      set(value) {
        this.setReservation({ card_number: value });
      },
    },
    card_date_month: {
      get() {
        return this.reservation.card_date_month;
      },
      set(value) {
        this.setReservation({ card_date_month: value });
      },
    },
    card_date_year: {
      get() {
        return this.reservation.card_date_year;
      },
      set(value) {
        this.setReservation({ card_date_year: value.toString() });
      },
    },
    card_cvv: {
      get() {
        return this.reservation.card_cvv;
      },
      set(value) {
        this.setReservation({ card_cvv: value });
      },
    },
  },
  methods: {
    ...mapMutations({ setReservation: "reservations/setReservation" }),
  },
};
</script>

<style></style>
