<template>
  <div class="container">
    <div class="container__head products-head">
      <h1>Товары <span v-if="ProductsList.length > 0">/ {{ ProductsList.length }} арт.</span></h1>
      <div class="products-head__wrapper">
        <nuxt-link class="btn-main btn--green" to="/products/adding" v-if="ProductsList.length > 0">
          <svg-icon name="plus"/>
          Добавить новый товар
        </nuxt-link>
        <button type="button" class="btn-main btn--green" v-if="ProductsList.length > 0" @click="LoadProductsOzon">
          <svg-icon name="plus"/>
          Загрузить список товаров из Ozon
        </button>
        <!--
        <nuxt-link class="btn-main btn--green" to="/products/adding-extended" v-if="ProductsList.length > 0">
          <svg-icon name="plus"/>
          Добавить новый товар (подробно)
        </nuxt-link>
        -->
      </div>
    </div>

    <transition name="skeleton-animate" mode="out-in">
      <div class="products" v-if="!loading" :key="'products-container'">
        <div class="products-content"  v-if="ProductsList.length > 0">
          <div class="products-content__head ">
            <p>Товар</p>
            <p>Цена</p>
            <p>Склад</p>
            <p>Маркетплейсы</p>
          </div>
          <div class="products-content__wrapper">
            <div class="product-item" v-for="(item, index) in ProductsList" :key="`product-${index}`" @click="OpenProductPage($event, item)">
              <div class="product-item__text">
                <p>{{ item.name }}</p>
                <p>
                  Артикул: {{ item.vendor_code }} |
                  <span class="product-item__text-helper"
                        v-if="item.barcode > 0"
                        @click="CreateSticker(item)"
                  >
                    Баркод: {{ item.barcode }}
                  </span>
                </p>
              </div>
              <div class="product-item__price">
                <p class="product-item__mobile-title">Цена</p>
                <p>{{ item.price.current.toLocaleString('ru-RU') }} ₽</p>
              </div>
              <div class="product-item__store">
                <p class="product-item__mobile-title" v-if="item.stock.present > 0">Склад</p>
                <p v-if="item.stock.present > 0">
                  {{ item.stock.present.toLocaleString('ru-RU') }} шт /
                  <span>{{(item.stock.present * item.price.current).toLocaleString('ru-RU') }} ₽</span>
                </p>
              </div>
              <div class="product-item__marketplaces">
                <p class="product-item__mobile-title">Маркетплейсы</p>
                <div class="product-item__marketplaces-list">
                  <p>Ozon</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="products-empty" v-else>

          <div class="products-empty__wrapper">
            <p>Вы ещё не добавляли товаров</p>
            <nuxt-link class="btn-main btn--green" to="/products/adding">
              <svg-icon name="plus"/>
              Добавить товар
            </nuxt-link>
          </div>
          <img src="../../assets/images/empty/products-empty-2.png" alt="products-empty2">

<!--          <button type="button" class="btn-main btn&#45;&#45;green" @click="LoadProductsOzon">-->
<!--            <svg-icon name="plus"/>-->
<!--            Загрузить список товаров из Ozon-->
<!--          </button>-->
        </div>
      </div>

      <div class="products skeleton-screen" v-else :key="'products-container--skeleton-screen'">
        <div class="skeleton-screen-products__wrapper">
          <div class="skeleton-screen-products__inner">
            <div class="skeleton-screen-block skeleton-screen-block--header">
              <span class="skeleton-screen-block__input"/>
            </div>
            <div class="skeleton-screen-block" v-for="item in 6">
              <div class="skeleton-screen-block__wrapper">
                <span class="skeleton-screen-block__text"/>
                <span class="skeleton-screen-block__desc"/>
              </div>
              <div class="skeleton-screen-block__wrapper" v-for="item in 3">
                <span class="skeleton-screen-block__price"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'products',
    head: () => {
      return {
        title: 'Мои товары на POPSO.ru',
      }
    },
    data: () => {
      return {
        loading: false,
      }
    },
    async mounted(){
      if (this.ProductsList.length === 0){
        this.loading = true;

        await this.GetProductsList();

        /* TODO remove after debugging */
        setTimeout(() => {
          this.loading = false;
        }, 1250);
      }
    },
    methods: {
      ...mapActions({
        GetProductsList: 'products/GetProductsList',
        LoadProductsOzon: 'products/LoadProductsOzon'
      }),
      OpenProductPage(event, data){
        if (!event.target.classList.contains('product-item__text-helper')){
          this.$router.push({
            path: `/products/${data.id}`,
          })
        }
      },
      CreateSticker(data){
        this.$router.push({
          path: '/tools/stickers',
          query: Object.assign(data, {
            CreateSticker: true,
          })
        });
      },
    },
    computed: {
      ...mapGetters({
        ProductsList: 'products/ProductsList',
        UserMarketplaces: 'user/marketplaces/UserMarketplaces'
      }),
    },
  }
</script>

<style lang="scss">
  .products{
    width: 100%;
    height: 100%;

    position: relative;

    margin-top: 3.2rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-grow: 1;
  }

  .products-head{
    padding-bottom: 0;

    .btn-main{
      width: max-content;

      margin-top: 2.4rem;
      margin-bottom: 2rem;

      padding: 0 2.4rem;

      @include mobile {
        width: 100%;

        justify-content: flex-start;

        margin-top: 1.6rem;
        margin-bottom: 0;
      }
    }

    @include mobile {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }

    &__wrapper{
      width: auto;
      height: auto;

      display: grid;
      grid-column-gap: 3.2rem;
      grid-template-columns: repeat(2, auto);

      @include mobile {
        display: flex;
        flex-direction: column;
      }
    }
  }

  .products-content{
    width: 100%;
    height: auto;

    padding: 0 2.4rem 2.4rem 2.4rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    border-radius: 1rem;

    background-color: $color-main--white;

    &__head{
      width: 100%;
      height: auto;

      padding: 2.4rem 3.2rem;

      display: grid;
      grid-template-columns: 3fr 1fr 1fr 1fr;
      grid-column-gap: 4rem;

      p{
        font-size: 1.4rem;
        font-weight: 500;
        color: $gray-main;
      }

      @include tablet {
        grid-template-columns: calc(47.5% - 3.2rem) calc(17.5% - 3.2rem) calc(17.5% - 3.2rem) 17.5%;
        grid-column-gap: 3.2rem;
      }

      @include mobile {
        display: none;
      }
    }

    &__wrapper{
      width: 100%;
      height: auto;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }

    @include mobile {
      padding: 0 1.6rem 2.4rem 1.6rem;
    }
  }

  .products-empty{
    width: 100%;

    margin: 1.6rem auto 0 auto;

    padding: 3.2rem 6.4rem;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    background-color: $color-main--white;
    border-radius: 1rem;

    @include tablet{
      p{
        font-size: 1.6rem;
      }
      img{
        width: 40rem;
      }
    }

    @include mobile{
      flex-direction: column;
    }

    p{
      font-weight: 500;
      font-size: 2.0rem;
      line-height: 3.2rem;
      color: $color-main--black;

      margin-bottom: 2.4rem;
    }

    & > svg{
      width: 17.5rem;
      height: 14.5rem;

      margin-top: 2.4rem;
      margin-bottom: 1.6rem;
    }

    @include mobile{
      width: 100%;
    }

    .btn-main{
      width: 100%;
      min-height: 4.8rem;

      @include mobile{
        padding: 0 1.6rem;
      }

      &:not(:last-child){
        margin-bottom: 2.4rem;
      }
    }
  }

  .product-item{
    position: relative;
    width: 100%;
    height: auto;

    padding: 1.6rem 3.2rem;

    background-color: $white;
    border-top: 0.1rem solid transparent;
    border-left: 0.1rem solid transparent;
    border-right: 0.1rem solid transparent;
    border-radius: 10px;
    cursor: pointer;

    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr;
    grid-column-gap: 4rem;

    transition: box-shadow ease 0.25s;

    @include tablet {
      grid-template-columns: calc(47.5% - 3.2rem) calc(17.5% - 3.2rem) calc(17.5% - 3.2rem) 17.5%;
      grid-column-gap: 3.2rem;
    }

    @include mobile {
      padding: 1.6rem 0;

      grid-template-columns: 1fr;
      grid-column-gap: 0;
    }

    &:hover {
      box-shadow: 0 0 5px rgba(23, 61, 194, 0.15);
      z-index: 10;

      @include mobile {
        box-shadow: none;
        z-index: auto;
      }

      &::before {
        background-color: transparent;

        @include mobile {
          background-color: $gray-light;
        }
      }

      & + .product-item{
        &::before {
          background-color: transparent;

          @include mobile {
            background-color: $gray-light;
          }
        }
      }
    }

    p{
      font-size: 1.4rem;
      line-height: 2rem;
      font-weight: 500;
    }

    &::before {
      content: "";
      position: absolute;
      top: -0.2rem;
      left: 3.2rem;
      width: calc(100% - 6.4rem);
      height: 1px;
      background-color: $gray-light;

      @include tablet {
        left: 1.3rem;
        width: calc(100% - 2.6rem);
      }

      @include mobile {
        left: 0;
        width: 100%;
      }
    }

    &:last-of-type{
      border-bottom: 0.1rem solid transparent;

      &::after {
        content: "";
        position: absolute;
        left: 3.2rem;
        bottom: -0.2rem;
        width: calc(100% - 6.4rem);
        height: 1px;
        background-color: $gray-light;

        @include tablet {
          left: 1.3rem;
          width: calc(100% - 2.6rem);
        }

        @include mobile {
          left: 0;
          width: 100%;
        }
      }

      &:hover {
        &::after {
          background-color: transparent;

          @include mobile {
            background-color: $gray-light;
          }
        }
      }
    }

    &__text, &__price, &__store, &__marketplaces{
      width: 100%;
      height: auto;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }

    &__text{
      max-width: 34rem;

      margin-bottom: 0;

      p{
        width: 100%;
        height: auto;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &:nth-of-type(1){
          margin-bottom: 0.4rem;
          color: $black-main;

          @include mobile {
            margin-bottom: 0.8rem;
          }
        }

        &:nth-of-type(2){
          color: $gray-main;
        }

        @include mobile {
          white-space: initial;
        }
      }

      &-helper{
        z-index: 10;

        font-size: inherit;
        font-weight: inherit;
        color: inherit;
        line-height: inherit;

        &:hover{
          text-decoration: underline;
        }
      }

      @include mobile {
        max-width: none;
      }
    }

    &__price{
      flex-direction: column;
      justify-content: flex-start;
      margin-bottom: 0;

      p{
        color: $black-main;
      }

      @include mobile {
        margin-top: 1.6rem;

        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }

    &__store{
      flex-direction: column;
      justify-content: flex-start;
      margin-bottom: 0;

      p{
        color: $black-main;
      }

      span{
        display: inline;

        margin-left: 0.5rem;

        font-size: inherit;
        font-weight: inherit;
        line-height: inherit;

        color: $gray-main;
      }

      @include mobile {
        margin-top: 0.8rem;

        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }

    &__marketplaces{
      flex-direction: column;
      justify-content: flex-start;

      p{
        color: $gray-main;
        text-align: left;

        @include mobile {
          text-align: right;
        }
      }

      @include mobile {
        margin-top: 0.8rem;

        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
      }
    }

    .product-item__mobile-title {
      display: none;

      @include mobile {
        display: block;
        color: $gray-main;
      }
    }
  }

  .products.skeleton-screen{
    width: 100%;
    height: auto;

    .skeleton-screen-products__wrapper{
      width: 100%;
      height: auto;

      display: grid;
      grid-template-columns: 1fr;
      grid-row-gap: 1rem;

    }

    .skeleton-screen-products__inner{
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      grid-row-gap: 1rem;
      margin-bottom: 1.6rem;
      padding: 2.4rem 4rem;
      background-color: #FFFFFF;
      border-radius: 10px;

      @include mobile{
        padding: 0 1.6rem 2.4rem 1.6rem;
      }
    }
  }

  .products {
    width: 100%;
    .skeleton-screen-block {
      width: 100%;
      height: 7.1rem;
      padding: 0;

      display: grid;
      grid-template-columns: 3fr 1fr 1fr 1fr;
      grid-column-gap: 4rem;

      border-radius: 0;
      background-color: white;

      border-bottom: 0.1rem solid $color-main--lightgray;

      @include tablet {
        grid-template-columns: calc(47.5% - 3.2rem) calc(17.5% - 3.2rem) calc(17.5% - 3.2rem) 17.5%;
        grid-column-gap: 3.2rem;
      }

      @include mobile {
        height: 15.4rem;

        padding: 1.6rem 0;

        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 0;
      }

      &__wrapper{
        &:nth-child(2n){
          align-items: flex-end;
        }
      }



      &--header{
        display: flex;
        width: 100%;
        border-bottom: none;

        @include mobile{
          display: none;
        }
      }

      &__input {
        width: 100%;
        height: 100%;
      }

      &__text {
        width: 30%;
        height: 2rem;
        &:not(:last-of-type) {
          margin-bottom: 0;
        }
      }

      &__desc{
        width: 70%;
        height: 2rem;

        margin-top: 1.6rem;
      }

      &__price{
        width: 10rem;
        height: 2rem;

        @include mobile{
          margin-top: 1.6rem;
        }
      }

      &__title, &__text, &__input, &__price, &__desc {
        display: block;
        @extend %skeleton-animate;
      }
    }
  }
</style>
