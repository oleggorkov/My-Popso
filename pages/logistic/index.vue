<template>
  <div class="logistics">
    <h1>Логистика</h1>
    <div class="logistics__content">
      <div class="uCalc_298268" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'logistic',
    head: () => {
      return {
        title: 'Калькулятор объёма поставки на маркетплейсы, инструменты от POPSO.ru'
      }
    },
    mounted() {
      const script = document.createElement("script");

      script.async = true;
      script.src = (document.location.protocol === 'https:' ? 'https:' : 'http:') + '//ucalc.pro/api/widget.js?id=298268&t=' + Math.floor(new Date() / 18e5);

      document.querySelector('head').appendChild(script)
    }
  }
</script>

<style lang="scss">
  .logistics{
    width: 100%;
    height: 100%;

    max-height: calc(100vh - 11.5rem);

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-grow: 1;

    padding: 1.6rem 1.6rem 4.8rem;

    h1{
      font-size: 4rem;
      font-weight: normal;
    }

    &__content{
      width: 100%;
      height: auto;

      margin-top: 3.2rem;
    }
  }
</style>
