<template>
  <div class="container">
    <div class="container__head profile__head">
      <h1>Мой профиль</h1>
      <div class="profile__tabs">
        <nuxt-link class="btn btn--small btn--gray-filled" to="/user" :active-class="'is-active'" exact>
          <span class="btn__desktop-text">Личные данные</span>
          <span class="btn__mobile-text">Данные</span>
        </nuxt-link>
        <nuxt-link class="btn btn--small btn--gray-filled" to="/user/marketplaces" :active-class="'is-active'">Маркетплейсы</nuxt-link>
        <nuxt-link class="btn btn--small btn--gray-filled none" to="/user/warehouses" :active-class="'is-active'">Склады</nuxt-link>
      </div>
    </div>

    <transition name="skeleton-animate" mode="out-in">
      <div class="profile-marketplaces"
           v-if="!loading"
           :key="'profile-marketplaces'"
      >
        <div class="profile-marketplaces__section" v-if="UserMarketplaces.filter(el => el.status).length > 0">
          <h2>Активные</h2>
          <ul class="profile-marketplaces__connected">
            <li class="marketplace-store marketplace-store--connected"
                v-for="(marketplace, index) in UserMarketplaces.filter(el => el.status)"
                :key="index"
            >
              <div class="marketplace-store__wrapper">
                <div class="marketplace-store__disconnect-area"
                     @click="UpdateUserMarketplaceStatus({url: marketplace.url, id: marketplace.id, status: false})"
                >
                  <svg-icon name="plus" class="marketplace-store__disconnect"/>
                </div>
                <div class="marketplace-store__head">
                  <h3 class="marketplace-store__title">{{ marketplace.name }}</h3>
                </div>

                <ul v-if="marketplace.api.status">
                  <li class="marketplace-store__characteristic">
                    <span class="marketplace-store__in-store">Сейчас в продаже</span>
                  </li>

                  <li class="marketplace-store__characteristic">
                    <span>Товары — </span>
                    <span>
                    <b>{{ marketplace.info.store.products }} шт</b>
                  </span>
                  </li>

                  <li class="marketplace-store__characteristic">
                    <span>На сумму — </span>
                    <span>
                    <b>{{ marketplace.info.store.price }} руб.</b>
                  </span>
                  </li>

                  <li class="marketplace-store__characteristic">
                    <span>Артикулы — </span>
                    <span>
                    <b>{{ marketplace.info.store.articul }}</b> шт
                  </span>
                  </li>
                </ul>

                <p class="marketplace-store__without-api" v-else>Не введён API-ключ</p>
              </div>

              <div class="marketplace-store__wrapper">
                <button type="button" class="btn btn--small btn--gray-filled marketplace-store__info-button"
                  @click="ShowPopup(marketplace)"
                >
                  Настроить
                </button>

                <a class="link link--small" target="_blank"
                   v-if="!marketplace.api.status"
                   :href="marketplace.newSeller"
                >Нет аккаунта {{marketplace.name}}?</a>
              </div>

            </li>
          </ul>
        </div>

        <div class="profile-marketplaces__section" v-if="UserMarketplaces.filter(el => !el.status).length > 0">
          <h2>Не подключены</h2>

          <ul class="profile-marketplaces__not-connected">
            <li class="marketplace-store marketplace-store--not-connected"
                v-for="marketplace in UserMarketplaces.filter(el => !el.status)"
                :key="marketplace.name"
                :class="{'marketplace-store--soon': marketplace.soon}"
            >
              <div class="marketplace-store__wrapper">
                <div class="marketplace-store__head">
                  <h3 class="marketplace-store__title">{{ marketplace.name }}</h3>
                </div>

                <ul>
                  <li class="marketplace-store__characteristic" v-if="marketplace.info.commission.length > 0">
                  <span>Комиссия —
                    <b>{{ marketplace.info.commission }}</b>
                  </span>
                  </li>

                  <li class="marketplace-store__characteristic">
                    <span>Можно продавать</span>
                    <span v-for="(item, index) in marketplace.info.store.options" :key="index">
                    <b>{{ item.text }}</b>
                  </span>
                  </li>
                </ul>
              </div>

              <div class="marketplace-store__wrapper">
                <button class="btn btn--small btn--green-invert marketplace-store__connect-button"
                  @click="UpdateUserMarketplaceStatus({url: marketplace.url, id: marketplace.id, status: true})"
                  v-if="!marketplace.soon">
                  Начать подключение
                </button>

                <span v-else class="marketplace-store__text marketplace-store__text-soon">Скоро</span>

                <a class="link link--small" target="_blank"
                   v-if="!marketplace.api.status"
                   :href="marketplace.newSeller"
                >Нет аккаунта {{marketplace.name}}?</a>
              </div>
            </li>
          </ul>
        </div>

        <div class="error" v-if="UserMarketplaces.filter(el => !el.status).length === 0">
          <div class="error__content">
            <div class="error__content-text">
              Ой... Не удалось получить список маркетплейсов. Возвращайтесь и продавайте свои товары с нами!
            </div>
            <nuxt-link class="error__btn btn-main btn--green" to="/products">Добавить новый товар</nuxt-link>
          </div>
          <div class="error__image">
            <svg-icon name="404"/>
          </div>
        </div>

        <ConnectMarketplace :ref="'connect-marketplace'" />
      </div>

      <div class="skeleton-screen" v-else :key="'skeleton-screen'">

        <div class="skeleton-screen__wrapper">
          <div class="skeleton-screen__inner">
            <span class="skeleton-screen-block__title skeleton-screen-block__title--main-title"/>
          </div>
          <div class="skeleton-screen__inner">
            <div class="skeleton-screen-block" v-for="item in 4">
              <div class="skeleton-screen-block__wrapper">
                <span class="skeleton-screen-block__title"/>
                <span class="skeleton-screen-block__text"/>
                <span class="skeleton-screen-block__text"/>
              </div>
              <span class="skeleton-screen-block__button"/>
            </div>
          </div>
        </div>

        <div class="skeleton-screen__wrapper">
          <div class="skeleton-screen__inner">
            <span class="skeleton-screen-block__title skeleton-screen-block__title--main-title"/>
          </div>
          <div class="skeleton-screen__inner">
            <div class="skeleton-screen-block" v-for="item in 2">
              <div class="skeleton-screen-block__wrapper">
                <span class="skeleton-screen-block__title"/>
                <span class="skeleton-screen-block__text"/>
                <span class="skeleton-screen-block__text"/>
              </div>
              <span class="skeleton-screen-block__button"/>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import ConnectMarketplace from '../../../components/connect-marketplace'
  import InputText from "../../../components/input-text";
  import InputCheckbox from "../../../components/input-checkbox";

  export default {
    name: 'user-marketplaces',
    head: () => {
      return {
        title: 'Маркетплейсы, профиль на POPSO.ru'
      }
    },
    components: { InputCheckbox, InputText, ConnectMarketplace },
    transition(to, from){
      if (!from){
        return;
      }

      if (from.path === '/user'){
        return 'user-profile';
      }
    },
    data: () => {
      return {
        CurrentMarketplaceData: '',
        UserMarketplacesInfo: {},

        loading: false,
      }
    },
    async mounted(){
      if (this.UserMarketplaces.length === 0){
        this.loading = true;
        await this.GetUserMarketplaces();
      }

      setTimeout(() => {
        this.loading = false;
      }, 1250);

      this.UserMarketplaces.forEach(el => {
        if (el.status){
          this.$set(this.UserMarketplacesInfo, el.name, false)
        }
      })
    },
    computed: {
      ...mapGetters({
        MarketplaceState: 'user/marketplaces/MarketplaceState',
        UserMarketplaces: 'user/marketplaces/UserMarketplaces'
      }),
    },
    methods: {
      ...mapActions({
        GetUserMarketplaces: 'user/marketplaces/GetUserMarketplaces',
        UpdateUserMarketplaceStatus: 'user/marketplaces/UpdateUserMarketplaceStatus',
      }),

      ShowPopup(marketplace) {
        this.$refs['connect-marketplace'].open(marketplace);
      },
    }
  }
</script>

<style lang="scss">
  .profile-marketplaces {
    width: 100%;
    height: auto;

    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 4rem;

    h2 {
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 2rem;
      color: $color-main--black;

      justify-self: flex-start;
    }

    h3 {
      font-size: 1.8rem;
      line-height: 1.6rem;
    }

    &__not-connected,
    &__connected{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 4rem;
      grid-row-gap: 2.4rem;

      @include tablet {
        grid-template-columns: repeat(2, 1fr);
      }

      @include mobile {
        grid-template-columns: repeat(1, 1fr);
      }
    }

    &__section{
      display: grid;
      grid-template-columns: 1fr;
      grid-row-gap: 1rem;
    }
  }

  .marketplace-store {
    width: 100%;
    height: 21.6rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 2.4rem 4rem 2.4rem;

    background-color: $color-main--white;
    border-radius: 1rem;

    @include mobile {
      display: block;
    }

    ul {
      @include mobile {
        margin-bottom: 2.4rem;
      }
    }

    .link{
      display: block;

      margin-top: 1.2rem;
    }

    &__head{
      width: 100%;
      height: auto;

      grid-column: 1 / 3;

      display: flex;
      justify-content: space-between;
      align-items: center;

      .input-checkbox{
        min-width: 22.5rem;
      }
    }

    &__in-store{
      color: $color-main--darkgray;
    }

    &__characteristic {
      @include mobile {
        grid-template-columns: 45% 45%;
        grid-column-gap: 10%;
      }

      &:first-child{
        margin-top: 0.4rem;
      }

      &:not(:last-child) {
        margin-bottom: 0.4rem;
      }

      span {
        font-weight: 500;
        font-size: 1.2rem;
        line-height: 1.6rem;
        color: $color-main--black;

        @include mobile {
          font-size: 1.2rem;
        }
      }

      b {
        font-size: 1.2rem;
        line-height: 1.6rem;

        color: $color-main--black;

        @include mobile {
          font-size: 1.2rem;
        }
      }
    }

    &__text{
      margin-top: 1.5rem;

      font-size: 1.2rem;
      line-height: 1.6rem;

      display: block;
      min-height: 3.2rem;

      color: $color-main--middlegray;
    }

    &__info-button {
      min-width: 16rem;

      grid-column: 1 / 3;

      margin: 1.2rem auto 0 0;
    }

    &__info{
      width: 100%;
      height: auto;

      grid-column: 1 / 3;

      margin-top: 3.2rem;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      &-title{
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 2rem;
        color: $color-main--black;
      }

      &-wrapper{
        width: 100%;
        height: auto;

        margin-top: 2.4rem;

        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 3.2rem;
      }

      .input-text{
        width: 100%;
      }
    }

    &__without-api{
      color: $color-main--orange;
      font-weight: bold;
      font-size: 1.4rem;
      line-height: 1.6rem;
      height: 11rem;
      padding-top: 0.8rem;

      @include mobile {
        font-size: 1.2rem;

        height: 8.4rem;
      }
    }

    &__disconnect-area{
      padding: 0.4rem;

      position: absolute;
      top: -0.4rem;
      right: -2rem;
    }

    &__disconnect{
      width: 1.6rem;
      height: 1.6rem;



      fill: $color-main--darkgray;

      transform: rotate(45deg);

      cursor: pointer;
    }

    &__wrapper{
      min-height: 7.1rem;

      &:first-child{
        position: relative;
      }

      &:last-child{
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
      }
    }

    &--connected{
      h3 {
        color: $color-main--green;
      }


    }

    &--not-connected{
      h3 {
        color: $color-main--red;
      }

      .marketplace-store__wrapper{
        &:last-child{
          justify-content: flex-end;
        }
      }

      .marketplace-store__characteristic {
        display: flex;
        flex-direction: column;
      }
    }

    &--soon{
      h3 {
        color: $color-main--darkgray;
      }
      span {
        color: $color-main--middlegray;
        b {
          color: $color-main--middlegray;
        }
      }

      .marketplace-store__text-soon{
        color: $color-main--darkgray;
      }

      .marketplace-store__characteristic {
        display: flex;
        flex-direction: column;
      }
    }



    .btn{
      width: 20rem;

      line-height: 1.6rem;
    }
  }

  .profile{
    .custom-loading{
      .connected-marketplace,
      .not-connected-marketplace,
      .profile-marketplaces__section h2
      {
        position: relative;
        border-radius: 0.8rem;

        &:before, &:after{
          transition: opacity ease 0.35s;
        }

        &:before{
          content: '';

          width: 100%;
          height: 100%;

          display: block;

          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;

          z-index: 3;
          background-color: $color-main--middlegray;
          background-image: linear-gradient( 100deg, rgba(255, 255, 255, 0) 4%, rgba(255, 255, 255, 0.5) 50%, rgba(0, 255, 255, 0) 80% );
          background-size: 20% 100%;
          background-position: -20% 0;
          background-repeat: no-repeat;
          border-radius: 0.8rem;

          animation: loading ease 1.75s infinite;
        }

        &:after{
          content: '';

          width: 100%;
          height: 100%;

          display: block;

          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;

          border-radius: 0.8rem;

          z-index: 2;
          background-color: white;
        }
      }

      .btn{
        background-color: transparent;
        border-color: transparent;
      }

    }

    .custom-loading--removing{
      *{
        &:before, &:after{
          opacity: 0;
        }
      }
    }
  }
</style>

<style lang="scss">
  .skeleton-screen{
    width: 100%;
    height: auto;

    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 4rem;

    &__wrapper{
      width: 100%;
      height: auto;

      display: grid;
      grid-template-columns: 1fr;
      grid-row-gap: 1rem;
    }

    &__inner{
      width: 100%;
      height: auto;

      display: grid;
      grid-template-columns: repeat(3, 1fr);

      grid-column-gap: 4rem;
      grid-row-gap: 2.4rem;

      @include tablet {
        grid-template-columns: repeat(2, 1fr);
      }

      @include mobile {
        grid-template-columns: repeat(1, 1fr);
      }
    }
  }

  .skeleton-screen-block{
    width: 100%;
    height: 26.5rem;

    padding: 2.4rem 4rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    border-radius: 1rem;
    background-color: white;

    &__wrapper{
      width: 100%;
      height: auto;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }

    &__title{
      width: 50%;
      height: 1.6rem;

      margin-bottom: 2.4rem;

      &--main-title{
        margin-top: 0.2rem;
        margin-bottom: 0;

        &:before{
          background-color: $color-main--darkgray;
        }
      }
    }

    &__text{
      width: 100%;
      height: 4rem;

      &:not(:last-of-type){
        margin-bottom: 1.6rem;
      }
    }

    &__button{
      width: 62.5%;
      height: 3.2rem;

      margin-top: 3.2rem;
    }

    &__title, &__text, &__button {
      @extend %skeleton-animate;
    }
  }
</style>
