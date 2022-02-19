<template>
   <div class="card-info-container">
      <div class="credit-card">
        <div class="front" :style="cvv?'transform:perspective(1000px) rotateY(180deg);':'transform:perspective(1000px) rotateY(0);'">
          <div class="logo">
            <!-- <img src="../../assets/chip.png" alt=""> -->
            <p>KREDI KARTI</p>
            <img src="../../assets/master.png" alt="" />
          </div>
          <div class="card-number">
            <img src="../../assets/chip.png" alt="" />
            <span>{{ numara }}</span>
          </div>
          <div class="card-info">
            <div class="item">
              <label>Kart Sahibi</label>
              <div class="card-holder">{{ isim }}</div>
            </div>
            <div class="item">
              <label>Son Kullanma Tarihi</label>
              <span>mm/</span>
              <span>yy</span>
            </div>
          </div>
        </div>
        <div class="back" :style="!cvv?'transform:perspective(1000px) rotateY(-180deg);':'transform:perspective(1000px) rotateY(0);'">
          <div class="stripe"></div>
          <div class="item">
            <span>CVV</span>
            <div class="cvv-box"></div>
            <img src="../../assets/master.png" alt="" />
          </div>
        </div>
      </div>
      <div class="card-item">
        <label>Kart Üzerindeki İsim</label>
        <input type="text" class="input" v-model="isim" />
      </div>
      <div class="card-item">
        <label>Kart Numarası</label>
        <input type="text" class="card-number input" v-model="numara" />
      </div>
      <div class="card-item-flex">
        <div class="flex-item">
          <label>Son Kullanma Tarihi</label>
          <select name="" id="" class="card-month input">
            <option value="Ay" selected disabled>Ay</option>
            <option v-for="item in 12" :key="item" :value="item.toString().length == 1 ? '0' + item : item">{{ item.toString().length == 1 ? "0" + item : item }}</option>
          </select>
        </div>
        <div class="flex-item year">
          <select name="" id="" class="card-year input">
            <option value="Yıl" selected disabled>Yıl</option>
            <option v-for="item in 2030 - 2021" :key="item" :value="item + 2021">{{ item + 2021 }}</option>
          </select>
        </div>
        <div class="flex-item">
          <label>CVV</label>
          <input type="text" class="card-cvv input" @focus="cvv=true" @blur="cvv=false" />
        </div>
      </div>
    </div>
</template>

<script>
export default {
 data() {
    return {
      isim: "Ad Soyad",
      numara: "################",
      cvv:false
    };
  },
}
</script>

<style>

</style>