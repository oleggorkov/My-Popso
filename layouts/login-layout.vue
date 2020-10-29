<template>
  <div class="login-container">

    <nuxt />

    <transition name="helper-popup">
      <div class="helper-popup" :class="HelperPopup.classes" v-if="HelperPopup.state">
        <p>{{ HelperPopup.text }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'login-layout',
    computed: {
      HelperPopup(){
        return this.$store.getters.HelperPopup;
      }
    },
  }
</script>

<style lang="scss" >
  .login-container{
    width: 100%;
    height: 100vh;

    position: relative;
  }
</style>
