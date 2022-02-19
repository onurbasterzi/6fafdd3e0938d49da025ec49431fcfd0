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
import { mapState } from "vuex";

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
  created() {
    if (this.hotels.hotelsdata.length == 0) {
      if (localStorage.getItem("reservation")) {
        const savedData = JSON.parse(localStorage.getItem("reservation"));
          this.$store.commit("reservations/setReservation", savedData);
          this.$store.dispatch("hotels/getDetails", savedData.hotel_id);
      }
      this.$store.dispatch("hotels/get").then((res) => {
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
<style lang="scss">
@import "./css/main.scss";
</style>
