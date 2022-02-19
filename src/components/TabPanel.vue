<template>
  <div class="tab-container">
    <div class="tab-item">
      <!-- <router-link to="/"> -->
        <span :class="selected == '' ? 'selected' : ''">
          <box-icon :size="iconSize" :color="iconColor" name="calendar"></box-icon>
        </span>
      <!-- </router-link> -->
      <p>Otel ve Tarih Seçimi</p>
    </div>
    <div class="tab-item">
      <!-- <router-link to="/room-type"> -->
        <span :class="selected == 'room-type' ? 'selected' : ''">
          <box-icon :size="iconSize" :color="iconColor" name="hotel"></box-icon>
        </span>
      <!-- </router-link> -->
      <p>Oda Tipi ve Manzara Seçimi</p>
    </div>
    <div class="tab-item">
      <!-- <router-link to="/payment-preview"> -->
        <span :class="selected == 'payment-preview' ? 'selected' : ''">
          <box-icon :size="iconSize" :color="iconColor" name="credit-card"></box-icon>
        </span>
      <!-- </router-link> -->
      <p>Önizleme ve Ödeme İşlemleri</p>
    </div>
  </div>
</template>

<script>
import "boxicons";
export default {
  data() {
    return {
      iconSize: "sm",
      iconColor: "white",
      selected: "",
    };
  },

  created(){
      this.selected=this.$route.path.replace('/','');
  },

  watch: {
    $route(to, from) {
      this.selected=to.path.replace('/','');
    },
  },
};
</script>

<style></style>
