<template>
	<header class="header">
    <div class="header__wrapper">
      <!--
      <div class="header-search">
        <label for="header-search">
          <svg-icon name="header--search"/>
          <input type="text" id="header-search" placeholder="Поиск">
        </label>
      </div>
      -->
      <div class="header-mobile-container">
        <button type="button" class="header-mobile-container__toggle" @click="ToggleMobileMenu(!MobileMenuState)">
          <span />
          <span />
        </button>
        <div class="header-mobile-container__logo">
          <svg-icon name="aside-logo--big"/>
        </div>
      </div>
      <p class="header__title">
        <span>POPSO — Маркетплейсы!
        </span><span>Удобно! </span>
        <span>С любовью!</span>
      </p>
      <div class="header-options">
        <button type="button" class="header-options__option none">
          <svg-icon name="header--question" />
        </button>
        <nuxt-link class="header-options__option header-options-notification none" to="/notifications"
                   :active-class="'header-options__link--active'"
                   ref="notifications-link" @mouseenter.native="NotificationsState = true" @mouseleave.native="NotificationsState = false">
          <div class="header-options-notification__inner">
            <svg-icon name="header--notification"/>
            <div class="header-options-notification__counter" v-if="NotificationsList.length > 0">
              {{ NotificationsCounter }}
            </div>
          </div>
          <transition name="notifications-drop">
            <notifications-drop
              ref="notifications-drop"
              :notifications-list="NotificationsList"
              v-if="NotificationsState && NotificationsList.length > 0"
            />
          </transition>
        </nuxt-link>
        <nuxt-link class="header-options__option" to="/user"
                   :active-class="'header-options__link--active'">
          <svg-icon name="header--user" />
        </nuxt-link>
        <button type="button" class="header-options__option header-options__logout" @click="LogoutUser">
          <svg-icon name="header--logout" />
        </button>
      </div>
    </div>
  </header>
</template>

<script>
  import { mapGetters , mapMutations, mapActions } from 'vuex';
  import Notifications from "../pages/notifications/index";
  import NotificationsDrop from "./notifications-drop";

  export default {
    name: "header-component",
    components: { NotificationsDrop, Notifications },
    async mounted() {
      if (this.NotificationsList.length === 0){
        await this.GetNotificationsList();
      }
    },
    data: () => {
      return {
        NotificationsState: false,
      }
    },
    methods: {
      ...mapMutations({
        ToggleSidebar: 'ToggleSidebar',
        ToggleMobileMenu: 'ToggleMobileMenu',
      }),
      ...mapActions({
        LogoutUser: 'user/LogoutUser',
        GetNotificationsList: 'notifications/GetNotificationsList',
      }),
    },
    computed: {
      ...mapGetters({
        SidebarState: 'SidebarState',
        MobileMenuState: 'MobileMenuState',
        NotificationsList: 'notifications/NotificationsList'
      }),
      NotificationsCounter(){
        return this.NotificationsList.length > 99 ? 99 : this.NotificationsList.length
      }
    }
  }
</script>

<style lang="scss">
  .header{
    height: 6.4rem;
    width: calc(100vw - 32rem);

    padding-left: 4.8rem;
    padding-right: 36.4rem;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    position: fixed;
    top: 0;
    right: 0;
    left: 32rem;

    z-index: 1001;

    background-color: $color-main--lightgray;

    transition: left ease 0.35s, width ease 0.35s;

    @include laptop {
      width: calc(100vw - 25.6rem);

      left: 25.6rem;
      padding-right: 4.8rem;
    }

    @include tablet {
      width: auto;

      padding-left: 1.6rem;
      padding-right: 1.6rem;

      left: 0;

      background-color: $color-main--white;
    }

    &__wrapper{
      width: 100%;
      height: 6.4rem;

      display: flex;
      justify-content: space-between;
      align-items: center;

      padding: 2rem 0;

      @include tablet {
        justify-content: space-between;
      }
    }

    &__title {
      @include mobile {
        padding: 0 1.6rem;
        display: flex;
        flex-direction: column;
      }

      span {
        font-size: 1.4rem;
        font-weight: bold;

        color: $color-main--red;

        @include mobile {
          font-size: 1.0rem;

        }
      }
    }
  }

  .header-search{
    width: 100%;
    height: auto;

    max-width: 72.5rem;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    input{
      width: 100%;
      height: 2.4rem;

      background-color: transparent;
      border: none;

      font-size: 1.4rem;
      line-height: 2rem;
      font-weight: 500;
      color: $color-main--black;

      &::placeholder{
        font-size: 1.4rem;
        line-height: 2rem;
        font-weight: 500;
        color: $color-main--darkgray;
      }
    }

    label{
      width: 100%;
      height: auto;

      display: flex;
      justify-content: flex-start;
      align-items: center;

      border-bottom: 0.1rem solid $color-main--darkgray;

      svg{
        width: 1.6rem;
        height: 1.6rem;

        margin-right: 0.8rem;

        fill: $color-main--darkgray;
      }
    }
  }

  .header-options{
    width: auto;
    height: auto;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    &__option{
      width: auto;
      height: auto;

      display: flex;
      justify-content: center;
      align-items: center;

      background-color: transparent;
      border: none;
      text-decoration: none;
      outline: none;

      &:nth-child(1), &:nth-child(2){
        margin-right: 4.2rem;

        @include mobile {
          margin-right: 1.6rem;
        }
      }

      svg{
        width: 2.4rem;
        height: 2.4rem;

        fill: $color-main--black;

        transition: fill ease 0.25s;

        &:hover {
          fill: $color-main--red;
        }
      }
    }

    &__logout{
      margin-left: 4.8rem;

      svg{
        fill: $color-main--darkgray;
      }

      @include mobile {
        display: none;
      }
    }

    &__link--active{
      svg{
        fill: $color-main--red;
      }
    }
  }

  .header-options-notification{
    width: auto;
    height: auto;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    &__inner{
      width: auto;
      height: auto;

      display: flex;
      justify-content: center;
      align-items: center;

      position: relative;
    }

    &__counter{
      width: 2rem;
      height: 2rem;

      display: flex;
      justify-content: center;
      align-items: center;

      position: absolute;

      top: 0;
      right: 0;

      background-color: $color-main--red;
      border-radius: 50%;
      transform: translateX(25%) translateY(-25%);

      font-size: 1rem;
      line-height: 1.6rem;
      font-weight: 500;
      color: $color-main--white;
    }
  }

  .header-mobile-container{
    width: auto;
    height: auto;

    display: none;
    justify-content: flex-start;
    align-items: center;

    &__toggle{
      width: 3.2rem;
      height: 3.2rem;

      background-color: transparent;
      border: none;
      outline: none;
      cursor: default;

      position: relative;

      span{
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

    &__logo{
      width: auto;
      height: auto;

      display: flex;
      justify-content: center;
      align-items: center;

      margin-left: 4.8rem;

      svg{
        width: 8rem;
        height: 2rem;
      }

      @include mobile {
        margin-left: 3.2rem;
      }
    }

    @include tablet {
      display: flex;
    }
  }
</style>
