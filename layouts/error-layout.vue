<template>
  <transition name="ease-opacity" mode="out-in">
    <div class="default-layout" :class="SidebarState ? 'is-sidebar-opened' : 'is-sidebar-closed'">

      <header-component />

      <aside-component v-if="WindowWidth >= 1279"/>
      <mobile-menu v-else/>

      <nuxt />

      <transition name="helper-popup">
        <div class="helper-popup" :class="HelperPopup.classes" v-if="HelperPopup.state">
          <p>{{ HelperPopup.text }}</p>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import AsideComponent from "../components/aside/aside-component";
  import HeaderComponent from "../components/header-component";
  import MobileMenu from "../components/mobile-menu";
  import vueCustomScrollbar from 'vue-custom-scrollbar';
  import { WindowWidth } from "../scripts/mixins/window-width";

  export default {
    name: "default-layout",
    components: { MobileMenu, HeaderComponent, AsideComponent, vueCustomScrollbar },
    middleware: ['auth','mobile-menu-toggle'],
    mixins: [ WindowWidth ],
    computed: {
      ...mapGetters({
        User: 'user/User',
        HelperPopup: 'HelperPopup',
        SidebarState: 'SidebarState'
      }),
    },
    methods: {
      ...mapActions({
        GetUserData: 'user/GetUserData',
      }),
    },
  }
</script>
