<template>
  <div class="main-container">
    <TabPanel></TabPanel>
    <router-view />
    <Footer></Footer>

  </div>
</template>

<script>
import TabPanel from "../components/TabPanel.vue";
import Footer from '../components/RezervationFooter.vue'
export default {
  components: {
    TabPanel,
    Footer
  },
};
</script>

<style></style>
