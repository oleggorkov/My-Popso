<template>
  <div class="login-page">
    <div class="login-page__header">
      <svg-icon name="logo" />
      <h1 class="login-page__header-text">Маркетплейсы! Удобно! С любовью!</h1>
    </div>

    <div class="login-page__wrapper">
      <div class="login-page__content-wrapper">
        <h1 class="login-page__content-text-title">Вход на платформу</h1>

        <div class="login-page__content-inner" v-if="!CodeState">
          <p class="login-page__content-text-main">Введите номер телефона</p>
          <form action="#" class="login-page__content-form login-page__content-form--phone" @submit.prevent="CheckPhone">
            <the-mask :type="'tel'" name="phone" :placeholder="'+7 (___) ___ __ __'" v-model="phone" mask="+7 (###) ### ## ##"/>
            <button type="submit">Войти</button>
          </form>
          <div class="login-page__content-container">
            <p class="login-page__content-text-helper">Нажимая кнопку Войти, я даю своё согласие на обработку моих
              персональных данных и принимаю условия <nuxt-link to="/license" target="_blank">Пользовательского соглашения</nuxt-link></p>
            <p v-if='ShowPolicy === true' class="login-page__content-text-helper">Этот сайт использует файлы cookies для улучшения функционала.
              Пользуясь сайтом, вы соглашаетесь с этим.
              <button class="btn-main btn-main--green" @click.prevent="SetAgreeCookie(true)">Хорошо</button>
            </p>
          </div>
        </div>

        <div class="login-page__content-inner" v-else>
          <p class="login-page__content-text-main">Введите четырехзначный код из СМС</p>
          <form action="#" class="login-page__content-form login-page__content-form--code" @submit.prevent >
            <the-mask :type="'tel'" ref="code" name="code" :placeholder="'_ _ _ _'" v-model.number="code" mask="# # # #" @input="CheckCode" />
          </form>
        </div>
      </div>
    </div>

    <div class="login-page__footer">
      <svg-icon name="logo-big" class="login-page__footer-logo"/>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { setCookie, getCookie } from "../../scripts/helpers/cookies";

  export default {
    name: 'login',
    layout: 'login-layout',
    head: () => {
      return {
        title: 'Вход на платформу POPSO.ru'
      }
    },
    data: () => {
      return{
        phone: '',
        code: '',
        CodeMain: '',
        CodeState: false,
        ShowPolicy: true
      }
    },
    mounted(){
      if (getCookie('agreeWithPrivacyPolicy')){
        this.ShowPolicy = false;
      }
    },
    methods: {
      ...mapActions({
        HelperPopup: 'HelperPopupState',
        LoginUser: 'user/LoginUser',
      }),

      CheckPhone() {
        if (this.phone.length < 10){
          this.HelperPopup({
            text: 'Номер телефона введен не верно',
            classes: 'helper-popup--error',
          });

          return;
        }

        this.$axios.$post(`${this.$ApiPath}user/sms.php`, {
          phone: `7${this.phone}`
        }).then(response => {
          if (response.status){
            this.CodeState = true;
            this.CodeMain = response.data.code;

            this.$nextTick(() => {
              if (document.querySelector('[name="code"]')){
                document.querySelector('[name="code"]').focus()
              }
            })
          } else {
            this.HelperPopup({
              text: response.error.text,
              classes: 'helper-popup--error',
            });
          }
        }).catch(error =>{
          this.HelperPopup({
            text: error,
            classes: 'helper-popup--error',
          });
        });
      },

      CheckCode() {
        if (this.code.toString().length === 4){
          this.LoginUser({
            phone: this.phone,
            code: this.code
          });
        }
      },

      SetAgreeCookie() {
        setCookie('agreeWithPrivacyPolicy', `true` , {'max-age': 2592000});
        this.ShowPolicy = false;
      }
    }
  }
</script>


<style lang="scss" >
  .login-page{
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
    position: relative;

    padding-top: 7rem;

    @include laptop {
      padding-top: 5rem;
    }

    @include tablet {
      padding-top: 3rem;
    }

    &__header{
      width: auto;
      height: auto;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      svg{
        width: 100%;
        height: 4rem;
      }

      &-text{
        margin-top: 3.2rem;

        text-align: center;
        font-weight: 600;
        font-size: 1.4rem;

        color: $red-main;

        @include laptop {
          margin-top: 2rem;
        }

        @include tablet {
          margin-top: 1rem;
          font-size: 1.2rem;
        }
      }
    }

    &__content{
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-grow: 1;

      &-wrapper{
        width: auto;
        height: auto;
        padding: 0 2rem;
        min-height: 34.5rem;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        @include tablet {
          min-height: 31.9rem;
        }
      }

      &-inner{
        width: auto;
        height: auto;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        margin-top: 2.4rem;

        @include laptop {
          margin-top: 1.4rem;
        }

        @include tablet {
          margin-top: 0.2rem;
        }
      }

      &-container{
        width: auto;
        height: auto;

        max-width: 36rem;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        margin-top: 1.6rem;

        text-align: left;

        .login-page__content-text-helper{
          &:not(:last-of-type){
            margin-bottom: 2rem;
          }
        }
      }

      &-text{
        &-title{
          font-size: 4rem;
          line-height: 4.8rem;

          font-weight: bold;
          color: $black-main;

          @include laptop {
            font-size: 3rem;
            line-height: 3.8rem;
          }

          @include tablet {
            font-size: 2rem;
            line-height: 2.8rem;
          }
        }

        &-main{
          font-size: 2rem;
          line-height: 2.8rem;
          font-weight: normal;
          color: $black-main;

          @include laptop {
            font-size: 1.8rem;
          }

          @include tablet {
            font-size: 1.6rem;
          }
        }

        &-helper{
          font-size: 1.6rem;
          line-height: 2rem;

          font-weight: normal;
          color: $gray-main;

          @include laptop {
            font-size: 1.4rem;
            line-height: 1.8rem;
          }

          @include tablet {
            font-size: 1.2rem;
            line-height: 1.5rem;
          }

          a{
            font-size: inherit;
            line-height: inherit;
            font-weight: inherit;
            color: inherit;

            &:hover{
              text-decoration: none;
            }
          }
        }
      }

      &-form{
        width: auto;
        max-width: 37.5rem;
        height: 4.6rem;
        display: flex;
        justify-content: center;
        align-items: center;

        @include mobile {
          width: auto;
          height: auto;
          display: block;
          justify-content: flex-start;
          align-items: stretch;
        }

        &--phone{
          margin-top: 2.4rem;

          @include laptop {
            margin-top: 1.4rem;
          }

          @include tablet {
            margin-top: 0.8rem;
          }

          input[type='tel']{
            width: 100%;
            height: calc(4.8rem - (0.1rem * 2));
            padding-left: 2rem;
            text-align: left;
            appearance: none;

            border: 0.1rem solid $gray-main;
            border-radius: 1rem;
            border-right: none;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;

            font-size: 2rem;
            color: $black-main;

            @include mobile {
              padding-left: 0;
              text-align: center;
              border-right: 0.1rem solid $gray-main;
              border-top-right-radius: 1rem;
              border-bottom-right-radius: 1rem;
            }

            &::placeholder{
              color: $gray-main;
              font-size: 2rem;
            }
          }

          button[type='submit']{
            width: auto;
            border-radius: 1rem;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            height: 100%;

            min-width: 15rem;
            min-height: 4.6rem;

            background-color: $red-main;

            color: white;
            font-size: 1.6rem;
            font-weight: 500;

            @include mobile {
              width: 100%;
              margin-top: 2rem;
              border-top-left-radius: 1rem;
              border-bottom-left-radius: 1rem;
            }
          }
        }

        &--code{
          margin-top: 3.2rem;

          input[type='tel']{
            width: 14rem;
            height: auto;

            border: none;
            outline: none;

            font-size: 4rem;

            color: $black-main;

            &::placeholder{
              color: $gray-main;
              font-size: 4rem;
            }
          }
        }
      }
    }

    &__footer{
      width: calc(100vw - 16rem);
      height: auto;

      padding-left: 2rem;
      padding-right: 2rem;

      @include laptop {
        width: calc(100vw - 8rem);
      }

      @include mobile {
        width: 90%;

        padding-left: 0;
        padding-right: 0;
      }

      &-logo{
        width: 100%;
        height: fit-content;

        @include laptop {
          height: 7rem;
        }

        @include mobile {
          height: 4.75rem;
        }
      }
    }

    .btn-main{
      background-color: $red-main;

      border-radius: 2rem;

      padding: 0 3.2rem;
      margin-top: 0.8rem;
      margin-left: auto;
      margin-right: auto;

      color: $color-main--lightgray;


      @include mobile{
        border-radius: 1.6rem;
      }
    }
  }
</style>
