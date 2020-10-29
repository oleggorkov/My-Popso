<template>
	<aside class="sidebar">
    <div class="sidebar__head">
      <nuxt-link class="sidebar__head-link" to="/" >
        <div class="sidebar__head-logo">
          <svg-icon name="aside-logo--big" class="sidebar__logo--big"/>
          <svg-icon name="aside-logo--small" class="sidebar__logo--small"/>
        </div>
      </nuxt-link>
      <button type="button" class="sidebar__toggle" @click="ToggleSidebar(!SidebarState)">
        <svg-icon name="arrow-small" />
      </button>
    </div>
    <div class="sidebar__content">
      <aside-navigation />
    </div>

    <aside-footer />
  </aside>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import AsideNavigation from "./aside-navigation";
  import AsideFooter from "./aside-footer";

  export default {
    name: "aside-component",
    components: {AsideFooter, AsideNavigation},
    methods: {
      ...mapMutations({
        ToggleSidebar: 'ToggleSidebar'
      }),
    },
    computed: {
      ...mapGetters({
        SidebarState: 'SidebarState',
      }),
    }
  }
</script>

<style lang="scss">
  .sidebar{
    width: 32rem;
    height: auto;

    min-height: 100vh;

    padding-left: 5.6rem;
    padding-bottom: 4rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    position: fixed;
    left: 0;
    top: 0;

    z-index: 1002;

    background-color: $color-main--white;

    transition: width ease 0.35s, padding-left ease 0.35s, padding-right ease 0.35s;

    @include laptop {
      width: 25.6rem;
    }

    @include tablet {
      transform: translateX(-100%);
      transition: transform ease 0.35s;
    }

    &__head{
      width: 100%;
      height: 6.4rem;

      //min-width: 12rem;

      padding-left: calc(2rem + 0.8rem);

      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-shrink: 0;

      position: relative;

      @media (max-height: 540px) {
        height: 3.2rem;
      }

      @include tablet {
        padding-left: 9.6rem;
      }

      @include mobile {
        padding-left: 8rem;
      }
    }

    &__head-link{
      overflow: hidden;
    }

    &__head-logo{
      width: 100%;
      height: auto;

      display: flex;
      justify-content: flex-start;
      align-items: center;

      overflow: hidden;
    }

    &__logo{
      &--big{
        width: 12.8rem;
        height: 3.2rem;

        min-width: 12.8rem;
        min-height: 3.2rem;

        display: block;

        @include laptop {
          width: 8rem;
          height: 2rem;

          min-width: 8rem;
          min-height: 2rem;
        }
      }
      &--small{
        width: 2.4rem;
        height: 3.2rem;

        min-width: 2.4rem;
        min-height: 3.2rem;

        display: none;

        @include laptop {
          width: 1.5rem;
          height: 2rem;

          min-width: 1.5rem;
          min-height: 2rem;
        }
      }
    }

    &__toggle{
      width: 4rem;
      height: 4rem;

      display: flex;
      justify-content: center;
      align-items: center;

      position: absolute;
      right: -2rem;
      top: calc(50% - 2rem);

      background-color: $color-main--white;
      box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.15);

      outline: none;
      border: none;
      border-radius: 50%;

      z-index: 2;

      svg{
        width: 1.8rem;
        height: 1.2rem;

        fill: $color-main--green;

        transition: transform ease 0.35s;

        @include tablet {
          display: none;
        }
      }

      span{
        display: none;

        @include tablet {
          display: block;
          width: 3.2rem;
          height: 0.2rem;
          background-color: $color-main--red;

          position: absolute;
          left: 50%;
          top: 50%;

          &:nth-of-type(1){
            transform: translateX(-50%) translateY(calc(-50% - 0.3rem));
          }

          &:nth-of-type(2){
            transform: translateX(-50%) translateY(calc(-50% + 0.3rem));
          }
        }
      }

      @include tablet {
        top: auto;
        right: auto;
        left: 1.6rem;

        width: 3.2rem;
        height: 3.2rem;

        background-color: transparent;
        border: none;
        border-radius: 0;
        outline: none;
        box-shadow: none;
        cursor: default;
      }
    }

    &__content{
      width: 100%;
      height: 100%;

      margin-top: 1.6rem;
      margin-bottom: 3.2rem;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      flex-grow: 1;

      overflow: hidden;

      @media (max-height: 600px) {
        margin-top: 0;
        margin-bottom: 0;
      }
    }
  }
</style>
