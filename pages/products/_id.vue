<template>
	<div class="container">
    <div class="container__head">
      <nuxt-link to="/products" class="container__head-breadcrumbs">
        <svg-icon name="arrow-big" />
        Ваши товары
      </nuxt-link>
    </div>
    <div class="product" v-if="!LoadingState && Object.keys(ProductData).length > 0">
      <div class="product__content">
        <div class="product-container">
          <p class="product-container__title">Название товара</p>
          <p class="product-container__text">{{ ProductData.name }}</p>
        </div>
        <div class="product-container">
          <p class="product-container__title">Цена, руб.</p>
          <p class="product-container__text">{{ ProductData.price.current }}</p>
        </div>
        <div class="product-container" v-if="ProductData.vendor_code">
          <p class="product-container__title">Артикул</p>
          <p class="product-container__text">{{ ProductData.vendor_code}}</p>
        </div>
        <div class="product-container" v-if="ProductData.barcode > 0">
          <p class="product-container__title">Штрихкод / баркод EAN-13</p>
          <p class="product-container__text">{{ ProductData.barcode }}</p>
        </div>
        <div class="product-container">
          <p class="product-container__title">Остаток на складе, шт</p>
          <p class="product-container__text">{{ ProductData.stock.present }}</p>
        </div>
      </div>
      <div class="product__options">
        <div class="product__wrapper">
          <!--
          <button type="button" class="btn-main btn--green">Отправить в УПД-2</button>
          -->
          <button type="button" class="btn-main btn--green" @click="CreateSticker">Сделать стикер</button>
        </div>
        <div class="product__wrapper">
          <!--
          <button type="button" class="product__options-btn product__options-btn--change">Редактировать</button>
          -->
          <button type="button" class="product__options-btn product__options-btn--remove" @click="DeleteProduct">Удалить</button>
        </div>
      </div>
    </div>

    <div class="error" v-else-if="!LoadingState">
      <div class="error__content">
        <div class="error__content-text">
          Ой... Кажется такого товара не существует. Возвращайтесь и продавайте свои товары с нами!
        </div>
        <nuxt-link class="error__btn btn-main btn--green" to="/products">Добавить новый товар</nuxt-link>
      </div>
      <div class="error__image">
        <svg-icon name="404"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: "product-page",
    data: () => {
      return {
        LoadingState: true,
        ProductData: {},
      }
    },
    async mounted() {
      this.LoadingState = true;

      await this.$CreateRequest({
        path: 'products/info.php',
        RequestBody: {
          data: {
            id: this.$route.params.id
          }
        },
        ResponseCallback: response => {
          this.ProductData = response.data.data;
        },
        FinallyCallback: () => {
          this.LoadingState = false;
        }
      });
    },
    methods: {
      ...mapActions({
        RemoveProduct: 'products/RemoveProduct'
      }),
      DeleteProduct(){
        this.RemoveProduct(this.ProductData);
      },
      CreateSticker(){
        this.$router.push({
          path: '/tools/stickers',
          query: Object.assign(this.ProductData, {
            CreateSticker: true
          })
        });
      }
    },
    computed: {
      ...mapGetters({
        UserToken: 'user/UserToken'
      })
    }
  }
</script>

<style lang="scss">
  .product{
    width: 100%;
    height: auto;

    padding: 2.4rem 4rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    background-color: $color-main--white;
    border-radius: 1rem;

    &__content{
      width: auto;
      height: auto;

      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 6.4rem;
      grid-row-gap: 2.4rem;
    }

    &__wrapper{
      width: auto;
      height: auto;

      display: flex;
      justify-content: flex-start;
      align-items: center;

      @include mobile{
        width: 100%;

        flex-direction: column;
        align-items: flex-start;

        &:not(:first-of-type){
          margin-top: 3.2rem;

          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
      }

      .btn-main{
        width: auto;
        min-height: 4rem;

        min-width: 20rem;

        padding: 0 2.4rem;

        font-size: 1.4rem;
        line-height: 2rem;

        @include mobile{
          width: 100%;
        }

        &:not(:last-of-type){
          margin-right: 4rem;

          @include mobile{
            margin-right: 0;
            margin-bottom: 1rem;
          }
        }
      }
    }

    &__options{
      width: 100%;
      height: auto;

      margin-top: 2.4rem;

      display: flex;
      justify-content: space-between;
      align-items: center;

      @include mobile{
        flex-direction: column;
        align-items: flex-start;
      }

      &-btn{
        width: auto;
        height: auto;

        min-width: 12rem;

        background-color: transparent;
        border: none;
        outline: none;

        font-size: 1.4rem;
        line-height: 2rem;
        font-weight: 500;

        @include mobile{
          width: 50%;
        }

        &--change{
          color: $color-main--green;
        }

        &--remove{
          color: $color-main--red;
        }

        &:not(:last-of-type){
          margin-right: 0.8rem;
          margin-left: 0.8rem;

          @include mobile{
            margin-right: 0;
            margin-left: 0;
          }
        }
      }
    }
  }

  .product-container{
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    p{
      font-size: 1.4rem;
      line-height: 2rem;
      font-weight: normal;
    }

    &__title{
      color: $color-main--darkgray;
    }

    &__text{
      margin-top: 0.8rem;
      color: $color-main--black;
    }
  }
</style>
