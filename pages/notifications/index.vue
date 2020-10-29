<template>
  <div class="container">
    <div class="container__head">
      <h1>Оповещения</h1>
    </div>
    <div class="notifications" v-if="this.NotificationsList.length > 0">
      <div class="notifications__item" v-for="notification in NotificationsList" :key="notification.id">
        <div class="notifications__item-block">
          <div class="notifications__item-block-number">{{ notification.title }}</div>
          <div class="notifications__item-block-text">{{ notification.text }}</div>
        </div>

        <nuxt-link
          type="button"
          class="btn-main btn--green notifications__item-add"
          v-if="notification.type === 'create-product'"
          :to='`/products/${notification.options.id}`'
        >
          Страница товара
        </nuxt-link>

        <button type="button" class="notifications__item-del" @click="RemoveNotification(notification.id)"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'notifications',
    layout: 'default',
    async mounted() {
      if (this.NotificationsList.length === 0){
        await this.GetNotificationsList();
      }
    },
    methods: {
      ...mapActions({
        CreateNotification: 'notifications/CreateNotification',
        GetNotificationsList: 'notifications/GetNotificationsList',
        RemoveNotification: 'notifications/RemoveNotification',
      }),
    },
    computed: {
      ...mapGetters({
        NotificationsList: 'notifications/NotificationsList'
      })
    }
  }
</script>

<style lang="scss">

.notifications {
  width: 100%;
  height: auto;
  background: #FFFFFF;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2.2rem 3.9rem 1.6rem 5.3rem;

  @include mobile {
    padding: 2.2rem 1.3rem 1.6rem 1.3rem;
  }

  &__item {
    width: 100%;
    min-height: 6.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include mobile {
      flex-wrap: wrap;
    }

    &-add {
      width: 20rem;
      margin-right: 2rem;
      margin-left: 2rem;

      @include mobile {
        order: 1;
        width: 20rem;
        margin-top: 1.6rem;
        margin-right: 0;
        margin-left: 0;
        align-self: center;
      }
    }

    &-del {
      width: 1.9rem;
      height: 1.9rem;
      position: relative;
      background: #FFFFFF;
      align-self: center;

      @include mobile {
        align-self: flex-start;
      }

      &:before {
        content: "";
        position: absolute;
        transform: rotate(135deg);
        background: $color-main--lightgray;
        width: 0.3rem;
        height: 2.2rem;
        top: -0.2rem;
        left: 0.8rem;
        transition: all 0.25s ease;

        &:hover {
          background: $color-main--darkgray;
        }
      }

      &:after {
        content: "";
        position: absolute;
        transform: rotate(45deg);
        background: $color-main--lightgray;
        width: 0.3rem;
        height: 2.2rem;
        top: -0.2rem;
        left: 0.8rem;

        &:hover {
          background: $color-main--darkgray;
        }
      }
    }

    &-block {
      display: flex;
      flex-direction: column;
      width: 79.5%;
      height: auto;

      @include tablet {
        width: 60%;
      }

      @include mobile {
        width: 90%;
      }

      &-number {
        font-family: Montserrat, sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 2rem;
        color: $color-main--black;
        margin-bottom: 0.6rem;
      }

      &-text {
        font-family: Montserrat, sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 2rem;
        color: $color-main--darkgray;
        width: 100%;
      }
    }

    &:nth-of-type(n+2) {
      border-top: 0.1rem solid $color-main--lightgray;
      margin-top: 1.6rem;
      padding-top: 1.6rem;
    }
  }
}

</style>
