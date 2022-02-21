<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <Header></Header>

    <router-view />
  </div>
</template>
<script>
import Header from "./components/Header.vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  components: {
    Header,
  },
  computed: {
    ...mapState({
      reservation: (state) => state.reservations.reservation,
      hotels: (state) => state.hotels,
    }),

  },
  methods:{
    ...mapActions({GET_HOTELS:'hotels/GET_HOTELS',GET_HOTEL_DETAILS:'hotels/GET_HOTEL_DETAILS'}),
    ...mapMutations({setReservation:'reservations/setReservation'}),
  },
  created() {

      


    if (this.hotels.hotelsdata.length == 0) {
      if (localStorage.getItem("reservation")) {
        const savedData = JSON.parse(localStorage.getItem("reservation"));
          this.setReservation(savedData);
          this.GET_HOTEL_DETAILS(savedData.hotel_id);
      }
      this.GET_HOTELS().then((res) => {
      });
    } else {
      console.log("state");

    }
  
  },
};
</script>
<style lang="scss">
@import "./css/main.scss";
</style>
