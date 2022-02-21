<template>
  <header>
    <div class="logo">
      <h1>OTEL</h1>
      <p>Rezervasyon Sistemi</p>
    </div>
    <div class="rezervation-button">
      <button @click="newReservation">Yeni Rezervasyon Yap</button>
    </div>
  </header>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations({ clearReservation: "reservations/clearReservation" }),
    newReservation() {
      if (localStorage.getItem('reservation')) {
        this.$swal({
          title: "Kaydedilmiş veriler sıfırlanacak !",
          text: "İşlemi onaylıyor musunuz? ",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#ff6464",
          confirmButtonText: "Onaylıyorum !",
          cancelButtonText: "Vazgeç",
        }).then((result) => {
          if (result.value) {
            localStorage.removeItem("reservation");
            this.clearReservation();
            this.$router.push("/");
          }
        });
      }
      else{
        this.clearReservation();
         
      }
    },
  },
};
</script>

<style></style>
