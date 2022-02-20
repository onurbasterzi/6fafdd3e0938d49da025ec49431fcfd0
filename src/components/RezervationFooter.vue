<template>
  <div class="footer-container">
    <button v-if="isFirstTab" @click="back">Geri</button>
    <span v-else></span>
    <button v-if="isLastTab" @click="makePayment">Ödeme Yap ve Bitir</button>
    <button v-else @click="saveAndContinue">Kaydet ve Devam Et</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFirstTab: null,
      isLastTab: null,
    };
  },

  methods: {
    back() {
      if (this.$route.name == "Room") {
        this.$router.push("/");
      }
      if (this.$route.name == "Payment") {
        this.$router.push("/room-type");
      }
    },
    saveAndContinue() {
      const reservation = this.$store.state.reservations.reservation;
      localStorage.setItem("reservation", JSON.stringify(reservation));
      if (this.$route.name === "Hotel") {
        this.$router.push("/room-type");
      } else if (this.$route.name === "Room") {
        this.$router.push("/payment-preview");
      }
    },
    makePayment() {
      const reservation = this.$store.state.reservations.reservation;
      localStorage.setItem("reservation", JSON.stringify(reservation));
      console.log(reservation);
      this.$router.push("/preview");
    },
  },

  mounted() {
    console.log(this.$router.name);
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
