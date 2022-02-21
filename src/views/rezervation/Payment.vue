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
            <label>S.K. Tarihi</label>
            <span>{{ card_date_month }}/</span>
            <span>{{ card_date_year }}</span>
          </div>
        </div>
      </div>
      <div class="back" :style="!cvv ? 'transform:perspective(1000px) rotateY(-180deg);' : 'transform:perspective(1000px) rotateY(0);'">
        <div class="stripe"></div>
        <div class="item">
          <span>CVV: {{ card_cvv }}</span>
          <div class="cvv-box"></div>
          <img src="../../assets/master.png" alt="" />
        </div>
      </div>
    </div>
    <div class="card-item" :class="{ 'form-group--error': $v.card_name.$error }">
      <label>Kart Üzerindeki İsim</label>
      <input type="text" class="input" v-model.trim="$v.card_name.$model" />
    </div>
    <div class="card-item" :class="{ 'form-group--error': $v.card_number.$error }">
      <label>Kart Numarası</label>
      <input type="number" class="card-number input" v-model.trim="$v.card_number.$model" />
      <div class="error" v-if="$v.card_number.$error">Kart numaraı 16 haneli olmalıdır.</div>
    </div>
    <div class="card-item-flex">
      <div class="flex-item" :class="{ 'form-group--error': $v.card_date_month.$error }">
        <label>S.K. Tarihi</label>
        <select v-model="card_date_month" name="" id="" class="input">
          <option value="" selected disabled>Ay</option>
          <option v-for="item in 12" :key="item" :value="item.toString().length == 1 ? '0' + item : item">{{ item.toString().length == 1 ? "0" + item : item }}</option>
        </select>
      </div>
      <div class="flex-item year" :class="{ 'form-group--error': $v.card_date_year.$error }">
        <select v-model="card_date_year" name="" id="" class="card-year input">
          <option value="" selected disabled>Yıl</option>
          <option v-for="item in 2030 - 2021" :key="item" :value="item + 2021">{{ item + 2021 }}</option>
        </select>
      </div>
      <div class="flex-item" :class="{ 'form-group--error': $v.card_cvv.$error }">
        <label>CVV</label>
        <input v-model="card_cvv" type="number" class="card-cvv input" @focus="cvv = true" @blur="cvv = false" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { required, maxLength, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
 
      cvv: false,
    };
  },

  validations() {
    return {
      card_name: {
        required,
      },
      card_number: {
        required,
        minLength: minLength(16),
        maxLength: maxLength(16),
      },
      card_date_month: {
        required,
      },
      card_date_year: {
        required,
      },
      card_cvv: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(3),
      },
    };
  },

  filters: {
    cardnumber(value) {
      if (value) return value.match(/.{1,4}/g).join(" ");
    },
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
    ...mapMutations({ setReservation: "reservations/setReservation",setLoader:"reservations/setLoader" }),
  },

  created() {
    this.$emit("validation", this.$v);
    this.setLoader('hide')
  },
};
</script>

<style></style>
