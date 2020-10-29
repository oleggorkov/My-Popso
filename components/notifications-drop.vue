<template>
  <div class="notifications-drop">
    <nuxt-link
      class="notifications-drop__item"
      v-for="notification in notificationsList.slice(0, 5)"
      :to="notification.type === 'create-product' ? `/products/${notification.options.id}` : '/notifications'"
      :key="notification.id"
    >
      <div class="notifications-drop__item-block">
        <div class="notifications-drop__item-block-number">{{ notification.title }}</div>
        <div class="notifications-drop__item-block-text">{{ notification.text }}</div>
      </div>
      <button type="button" class="notifications-drop__item-del" @click="RemoveNotification(notification.id)" />
    </nuxt-link>
    <button type="button" class="notifications-drop-all">Посмотреть все</button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'notifications-drop',
    props: ['notifications-list'],
    methods: {
      ...mapActions({
        RemoveNotification: 'notifications/RemoveNotification',
      }),
    },
  }
</script>

<style lang="scss">
  .notifications-drop {
    width: 32rem;
    height: auto;

    display: flex;
    flex-direction: column;
    align-items: center;

    position: absolute;
    top: 0;

    transform: translateY(4rem);

    background: #FFFFFF;
    border-radius: 1rem;
    box-shadow: 0 0.1rem 0.4rem rgba(0, 0, 0, 0.15);
    padding: 1.6rem 2rem 1.8rem 2rem;

    &:before {
      content: "";
      display: block;
      position: absolute;
      background: #FFFFFF;
      width: 1.6rem;
      height: 1.6rem;
      transform: rotate(45deg) translateX(-50%);
      top: 0;
      left: 50%;

      @include mobile {
        left: 23rem;
      }
    }

    &:after{
      content: '';

      width: 100%;
      height: 2rem;

      display: block;

      position: absolute;

      top: 0;
      left: 0;
      right: 0;

      transform: translateY(-100%);

      background-color: transparent;
    }

    @include mobile {
      padding: 1.6rem 1.3rem 1.8rem 1.3rem;
      margin-top: 2rem;
      width: 29rem;
    }

    &__item {
      width: 100%;
      display: flex;
      padding: 0.8rem 1.1rem 0 1.1rem;
      justify-content: space-between;
      transition: box-shadow 0.35s ease;
      text-decoration: none;

      &:nth-of-type(n+2) {
        margin-top: 0.8rem;
      }

      &-block {
        display: flex;
        flex-direction: column;
        width: 90%;
        padding-bottom: 0.8rem;
        border-bottom: 0.1rem solid $color-main--lightgray;

        &-number {
          font-family: Montserrat, sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 1.4rem;
          line-height: 2rem;
          color: $color-main--black;
        }

        &-text {
          font-family: Montserrat, sans-serif;
          font-style: normal;
          font-weight: normal;
          font-size: 1.2rem;
          line-height: 1.6rem;
          color: $color-main--darkgray;
          margin-top: 0.8rem;
        }
      }

      &-del {
        display: flex;
        width: 1.4rem;
        height: 1.4rem;
        position: relative;
        background: #FFFFFF;
        align-self: flex-start;
        margin-top: 0.5rem;

        opacity: 0;

        transition: opacity ease 0.35s;

        &:before {
          content: "";
          position: absolute;
          transform: rotate(135deg);
          background: $color-main--darkgray;
          width: 0.1rem;
          height: 1.5rem;
          top: -0.2rem;
          left: 0.8rem;
        }

        &:after {
          content: "";
          position: absolute;
          transform: rotate(45deg);
          background: $color-main--darkgray;
          width: 0.1rem;
          height: 1.5rem;
          top: -0.2rem;
          left: 0.8rem;

          &:hover {
            background: $color-main--darkgray;
          }
        }
      }

      &:hover {
        box-shadow: 0 0 0.5rem rgba(23, 61, 194, 0.15);
        border-radius: 1rem;

        & .notifications-drop__item-del {
          opacity: 1;
        }

        & .notifications-drop__item-block {
          border-bottom: 0.1rem solid transparent;
        }
      }
    }

    &-all {
      font-family: Montserrat, sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 1.2rem;
      line-height: 1.6rem;
      text-align: center;
      color: $color-main--red;
      border: none;
      background: #FFFFFF;
      margin-top: 1.3rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>

<style lang="scss">
  .notifications-drop-enter-active, .notifications-drop-leave-active {
    transition: opacity .35s, transform ease 0.35s;
  }
  .notifications-drop-enter, .notifications-drop-leave-active {
    opacity: 0;
    transform: translateY(4.8rem)!important;
  }
</style>
