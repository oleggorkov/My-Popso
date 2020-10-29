<template>
  <div class="container">
    <div class="error">
      <div class="error__content">
        <div class="error__content-text">Ой... Кажется такой страницы не существует. Возвращайтесь и продавайте свои товары
          с нами!</div>
        <nuxt-link class="error__btn btn-main btn--green" to="/products">Добавить новый товар</nuxt-link>
      </div>
      <div class="error__image">
        <svg-icon name="404"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'error',
    layout: 'error-layout',
    head: () => {
      return {
        title: 'Страница не найдена на POPSO.ru'
      }
    },
  }
</script>

<style lang="scss">
  .error {
    width: 100%;
    display: flex;
    padding: 4.3rem 4rem 5.3rem 4rem;
    background: #FFFFFF;
    border-radius: 1rem;
    text-align: left;
    margin-top: 2.4rem;

    @include mobile {
      flex-direction: column;
      padding: 2.4rem 1.3rem 3.6rem 1.3rem;
    }

    &__content {
      width: 100%;
      height: auto;

      display: flex;
      flex-direction: column;
      justify-content: center;

      &-text {
        width: 100%;
        height: auto;

        max-width: 41.5rem;

        font-family: Montserrat, sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 2rem;
        line-height: 3.2rem;
        color: $color-main--black;
        margin-bottom: 3.2rem;

        @include tablet {
          width: 70%;
        }

        @include mobile {
          width: 100%;
          text-align: center;
        }
      }
    }

    &__image{
      width: 47rem;
      height: 26.5rem;

      flex-shrink: 0;

      @include mobile {
        width: 32rem;
        height: 18rem;
      }

      @include mobile {
        order: -1;
        margin-bottom: 4rem;
      }

      svg{
        width: 100%;
        height: 100%;
      }
    }

    .error__btn{
      width: fit-content;
      min-height: 4.8rem;

      padding: 0 2.4rem;
      align-self: flex-start;

      @include mobile {
        align-self: center;
      }
    }
  }
</style>
