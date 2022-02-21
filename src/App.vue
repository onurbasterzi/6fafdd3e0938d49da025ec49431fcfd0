<template>
  <div>
    <Loading></Loading>
    <div id="app">
      <Header></Header>

      <router-view />
    </div>
  </div>
</template>
<script>
import Header from "./components/Header.vue";
import Loading from "./components/Loading.vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  components: {
    Header,
    Loading,
  },
  computed: {
    ...mapState({
      reservation: (state) => state.reservations.reservation,
      hotels: (state) => state.hotels,
    }),
  },
  methods: {
    ...mapActions({ GET_HOTELS: "hotels/GET_HOTELS", GET_HOTEL_DETAILS: "hotels/GET_HOTEL_DETAILS" }),
    ...mapMutations({ setReservation: "reservations/setReservation",setLoader:"reservations/setLoader" }),
  },
  created() {
    this.setLoader('show')
    if (this.hotels.hotelsdata.length == 0) {
      
      if (localStorage.getItem("reservation")) {
        const savedData = JSON.parse(localStorage.getItem("reservation"));
        this.setReservation(savedData);
        this.GET_HOTEL_DETAILS(savedData.hotel_id).then().catch(err=>{ this.$toast.error(`Hata:${err.message}`);});
      }
      this.GET_HOTELS().then(() => {this.setLoader('hide')}).catch(this.setLoader('hide'));
    } else {
      this.setLoader('hide')
    }
  },
};
</script>
<style lang="scss">
@import "./css/main.scss";
</style>
