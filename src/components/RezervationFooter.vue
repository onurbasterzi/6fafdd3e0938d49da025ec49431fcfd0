<template>
  <div class="footer-container">
    <button v-if="isFirstTab" @click="back">Geri</button>
    <span v-else></span>
    <button v-if="isLastTab" @click="makePayment">Ödeme Yap ve Bitir</button>
    <button v-else @click="saveAndContinue">Kaydet ve Devam Et</button>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      isFirstTab: null,
      isLastTab: null,
    };
  },

  computed: {
    ...mapState({
      reservation: (state) => state.reservations.reservation,
      loader: (state) => state.reservations.showHide,
    }),
  },

  props: ["validation"],

  methods: {
    ...mapActions({ POST_RESERVATION: "reservations/POST_RESERVATION", UPDATE_RESERVATION: "reservations/UPDATE_RESERVATION" }),
    ...mapGetters({ getFormData: "reservations/getFormData" }),
    ...mapMutations({ setLoader: "reservations/setLoader" }),
    back() {
      if (this.$route.name == "Room") {
        this.$router.push("/");
      }
      if (this.$route.name == "Payment") {
        this.$router.push("/room-type");
      }
    },
    saveAndContinue() {
      this.validation.$touch();

      if (this.$route.name === "Hotel") {
        if (!this.validation.$invalid) {
          this.setLoader("show");
          localStorage.setItem("reservation", JSON.stringify(this.reservation));
          this.$router.push("/room-type");
        }
      } else if (this.$route.name === "Room") {
        if (!this.validation.$invalid) {
          this.setLoader("show");
          localStorage.setItem("reservation", JSON.stringify(this.reservation));
          this.$router.push("/payment-preview");
        }
      }
    },
    makePayment() {
      this.validation.$touch();

      if (!this.validation.$invalid) {
        const formData = this.getFormData();
        this.setLoader("show");
        if (this.reservation.action_status === "add") {
          this.POST_RESERVATION(formData)
            .then((res) => {
              localStorage.setItem("reservation", JSON.stringify(this.reservation));
              this.setLoader("hide");
              this.$router.push("/preview");
            })
            .catch((err) => {
              this.$toast.error(`Hata:${err.message}`);
              this.setLoader("hide");
            });
        } else if (this.reservation.action_status === "update") {
          this.UPDATE_RESERVATION([this.reservation.last_post_id, formData]).then((res) => {
            localStorage.setItem("reservation", JSON.stringify(this.reservation));
           
            this.setLoader("hide");
            this.$router.push("/preview").catch((err) => {
              this.$toast.error(`Hata:${err.message}`);
              this.setLoader("hide");
            });
          });
        }
      }
    },
  },

  mounted() {

    this.isFirstTab = this.$route.name === "Hotel" ? false : true;
    this.isLastTab = this.$route.name === "Payment" ? true : false;
  },
  watch: {
    $route(to) {
      this.isFirstTab = to.name === "Hotel" ? false : true;
      this.isLastTab = to.name === "Payment" ? true : false;
    },
  },
};
</script>

<style></style>
