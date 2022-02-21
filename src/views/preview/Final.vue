<template>
  <div class="main-container">
    <section class="preview-container">
      <div class="preview-actions">
        <box-icon name="calendar-check" size="75px" color="green"></box-icon>
        <p v-if="reservation.action_status==='add'">Rezervasyon kaydınız alınmıştır.</p>
         <p v-else>Rezervasyonunuz güncellenmiştir.</p>
        <p>Rezervasyon özetiniz aşağıdaki gibidir. Rezervasyon kaydınızda değişiklik veya yeni rezervasyon yapmak için aşağıdaki linkleri kullanabilirsiniz.</p>
        <div class="button-group">
          <button @click="newReservation">Yeni Rezervasyon Yap</button>
          <button @click="updateReservation">Rezervasyonu Güncelle</button>
          <button @click="deleteReservation">Rezervasyonu İptal Et</button>
        </div>
      </div>
      <div class="preview-info">
        <PreviewInfo></PreviewInfo>
      </div>
    </section>
  </div>
</template>

<script>
import "boxicons";
import PreviewInfo from "../../components/PreviewInfo.vue";
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  components: {
    PreviewInfo,
  },

  data() {
    return {
      isNewReservation: false,
    };
  },

  computed: {
    ...mapState({
      reservation: (state) => state.reservations.reservation,
    }),
  },

  methods: {
    ...mapMutations({ clearReservation: "reservations/clearReservation",setReservation:'reservations/setReservation' ,setLoader:"reservations/setLoader"}),
    ...mapActions({ DELETE_RESERVATION: "reservations/DELETE_RESERVATION" }),
    newReservation() {
      this.isNewReservation = true;
      localStorage.removeItem("reservation");
      this.clearReservation();
      this.$router.push("/");
    },
    updateReservation() {
      this.isNewReservation = true;
      this.setReservation({action_status:'update'})
      this.$router.push("/");
    },
    deleteReservation() {
      
      this.$swal({
        title: "Rezervasyon İptali !",
        text: "Rezervasyon kaydınızı iptal etmek istediğinize emin misiniz?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff6464",
        confirmButtonText: "Evet, Sil!",
        cancelButtonText: "Vazgeç",
      }).then((result) => {
        if (result.value) {
          this.setLoader('show');
         
          this.DELETE_RESERVATION(this.reservation.last_post_id)
            .then((res) => {
              this.isNewReservation = true;
              localStorage.removeItem("reservation");
              this.clearReservation();
              this.setLoader('hide');
              this.$router.push("/");
            })
            .catch((err) => {
              this.setLoader('hide');
              this.$toast.error(`Hata:${err.message}`);
            });
        }
      });
    },
  },


  beforeRouteLeave(to, from, next) {
    if (!this.isNewReservation) {
      this.$router.go(1);
    } else {
      return next();
    }
  },
};
</script>

<style></style>
