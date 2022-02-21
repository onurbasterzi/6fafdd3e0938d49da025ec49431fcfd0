<template>
  <div class="main-container">
    <section class="payment-container" v-if="hotels.hoteldetailsdata[0] && reservation.room_type">
      <Payment @validation="getValidation"></Payment>
      <div class="preview-container">
        <PreviewInfo></PreviewInfo>
        <div class="coupon">
          <input type="text" placeholder="Kupon Kodu" class="input" v-model="coupon_code" />
          <button @click="checkCoupon">Kodu Kullan</button>
        </div>
        <div class="coupon-status" :style="reservation.discount_ammount != 0 ? 'color:green' : 'color:#ff6464'">{{ coupon_status }}</div>
      </div>
    </section>
    <rezervation-footer :validation="validation"></rezervation-footer>
  </div>
</template>

<script>
import Payment from "./Payment.vue";
import { mapState, mapMutations,mapActions } from "vuex";
import PreviewInfo from "../../components/PreviewInfo.vue";
import RezervationFooter from "../../components/RezervationFooter.vue";
export default {
  components: {
    Payment,
    PreviewInfo,
    RezervationFooter,
  },

  data() {
    return {
      validation: null,
      coupon_status:''
    };
  },

  computed: {
    ...mapState({
      reservation: (state) => state.reservations.reservation,
      hotels: (state) => state.hotels,
    }),

    coupon_code: {
      get() {
        return this.reservation.coupon_code;
      },
      set(value) {
        this.setReservation({ coupon_code: value });
      },
    },
  },

  methods: {
    ...mapMutations({ setReservation: "reservations/setReservation" }),
    ...mapActions({ GET_COUPON: "reservations/GET_COUPON" }),
    getValidation(value) {
      this.validation = value;
    },

    checkCoupon() {
      if (this.coupon_code.trim(' ') != "") {
        this.GET_COUPON(this.coupon_code).then((res) => {
          const data = [...res.data];
          if (data.length > 0) {
            var BreakException = {};
            try {
              data.forEach((element) => {
                const exp_date = new Date(element.expiration_at);
                const now = new Date();
                if (exp_date >= now) {
                  this.setReservation({ coupon_code: element.code, discount_ammount: element.discount_ammount });
                   this.coupon_status= "İndirim kodu uygulandi." ;
                  throw BreakException;
                }
                this.setReservation({ coupon_code: "", discount_ammount: 0});
                this.coupon_status= "Süresi geçmiş kupon kodu." ;
              });
            } catch (e) {
              if (e !== BreakException) throw e;
            }
          } else {
            this.coupon_status= "Geçersiz kupon kodu" ;
            this.setReservation({ coupon_code: "", discount_ammount: 0});
          }
        });
      }
    },
  },

};
</script>

<style></style>
