<template>
  <div class="container">
    <div class="container__head">
      <h1>Поставки</h1>
    </div>
    <div class="supplies">
      <div class="supplies__wrapper">
        <p class="supplies__title">Чеклист поставок</p>
        <p class="supplies__sub-title">Вы можете скачать чеклист для поставок на маркетплейсы</p>
        <a class="btn-main btn--green" target="_blank"
          href="https://drive.google.com/file/d/1CflFiXx4Z1l3MoiQGmUyCFz6UPNE4oz6/view">
          Скачать чеклист
        </a>
        <div class="supplies__soon">
          <p class="supplies__sub-title supplies__sub-title--gray">Скоро</p>
          <p class="supplies__sub-title">Создание новой поставки для Ozon и Wildberries по списку артикулов.
            Экспорт поставки в XLS-файл по шаблонам маркетплейсов.</p>
        </div>
      </div>
<!--      <svg-icon name="supplies-checklist"/>-->
      <img src="../../assets/images/empty/supplies-checklist.png" alt="asd">

    </div>
  </div>
</template>

<script>
  export default {
    name: "supplies",
    head: () => {
      return {
        title: 'Поставки POPSO.ru'
      }
    },
  }
</script>

<style lang="scss">
  .supplies{
    background-color: $color-main--white;

    padding: 4.8rem;

    display: flex;
    justify-content: space-between;

    width: 100%;
    min-height: 30rem;

    @include mobile{
      flex-direction: column;
    }

    &__title{
      font-size: 2rem;
      line-height: 3.2rem;
      font-weight: 500;

      color: $color-main--black;
    }

    &__sub-title{
      font-size: 1.4rem;
      line-height: 2rem;
      font-weight: 500;

      color: $color-main--black;

      width: 26rem;
      margin-top: 1.6rem;
      margin-bottom: 2.4rem;

      &--gray{
        color: $color-main--middlegray;
      }
    }

    &__soon{
      margin-top: 3.6rem;
      padding: 2.4rem;

      border: 0.1rem solid $color-main--lightgray;
      box-sizing: border-box;
      border-radius: 1rem;

      .supplies__sub-title{
        margin: 0 0 0.8rem 0;
      }
    }

    .btn-main{
      width: 21.7rem;
    }



  }
</style>
