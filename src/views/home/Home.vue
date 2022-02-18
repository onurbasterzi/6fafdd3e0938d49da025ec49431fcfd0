<template>
  <div class="home">
    <TabPanel></TabPanel>
    <v-select :options="hotel_data" label="hotel_name" @input="(value) => readValue(value)" placeholder="Rezervasyon Yapmak İstediğiniz Oteli Seçiniz">
      <template #no-options="{}"> Eşleşen kayıt bulunamadı. </template>
    </v-select>
  </div>
</template>

<script>
import TabPanel from "../../components/TabPanel.vue";

import "vue-select/dist/vue-select.css";
export default {
  components: {
    TabPanel,
  },
  data() {
    return {
      hotel_data: [],
    };
  },

  computed: {
    hotelsData() {
      return this.$store.state.hotels.hotelsdata;
    },
  },

  methods: {
    readValue(value) {
      if (value) {
        console.log(value.id, value.hotel_name);
      }
    },
  },

  created() {
    if (this.hotelsData.length == 0) {
      this.$store.dispatch("hotels/get").then((res) => {
        this.hotel_data = this.hotelsData;
        console.log("commit");
      });
    } else {
      this.hotel_data = this.hotelsData;
      console.log("state");
    }
  },
};
</script>
