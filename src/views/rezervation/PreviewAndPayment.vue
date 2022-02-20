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
      <div class="coupon">
        <input type="text" placeholder="Kupon Kodu" class="input" v-model="coupon_code" />
        <button @click="checkCoupon">Kodu Kullan</button>
      </div>
      <div class="coupon-status" :style="reservation.discount_ammount!=0?'color:green':'color:red'">{{ coupon_status }}</div>

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
          <label>Konaklama ({{totalDays}} Gün)</label>
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
  </section>
</template>

<script>
import Payment from "./Payment.vue";
import { mapState, mapMutations } from "vuex";
import { dateDiff } from "../../tools";
export default {
  components: {
    Payment,
  },
  data() {
    return {
      isim: "Ad Soyad",
      numara: "################",
      cvv: false,

      couponCode: "",
  
    };
  },
  computed: {
    ...mapState({
      reservation: (state) => state.reservations.reservation,
      hotels: (state) => state.hotels,
    }),

    

    coupon_code:{
      get(){
         return this.reservation.coupon_code;
      },
      set(value){
        this.setReservation({coupon_code:value})
      }
    },

    coupon_status:{
      get(){
         return this.reservation.coupon_status;
      },
    
    },


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

    checkCoupon() {
      
      this.$store.dispatch("reservations/GET_COUPON", this.coupon_code).then((res) => {
        const data = [...res.data];
        if (data.length > 0) {
          var BreakException = {};
          try {
            data.forEach((element) => {
              const exp_date = new Date(element.expiration_at);
              const now = new Date();
              if (exp_date >= now) {
                this.setReservation({ coupon_code: element.code, discount_ammount: element.discount_ammount,coupon_status:'İndirim kodu uygulandi.' });
                throw BreakException;
              }
              this.setReservation({ coupon_code: "-", discount_ammount: "0",coupon_status:'Süresi geçmiş kupon kodu.' });
          
            });
          } catch (e) {
            if (e !== BreakException) throw e;
          }
        } else {
          this.setReservation({ coupon_code: "-", discount_ammount: "0",coupon_status:'Geçersiz kupon kodu' });
         
        }
      });
    },
  },

  created() {
    this.setReservation({ price: this.totalPrice });
    console.log(this.reservation);
  },
};
</script>

<style></style>
