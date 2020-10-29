<template>
  <div class="street-map-navigation" @click="CloseRoadMapNavigation($event)">
    <div class="street-map-navigation__wrapper" ref="road-map-navigation">
      <svg-icon class="street-map-navigation__close" name="plus-thin" @click="$emit('CloseRoadMapNavigation')"/>
      <div class="street-map-navigation__list-item "
        :key="`CaptionsList-item-${index}`"
        v-for="(item, index) in CaptionsList.list"
      >
        <svg-icon name="check"/>
        <p class="street-map-navigation__text">{{item}}</p>
      </div>
      <!--

      <div class="street-map-navigation__list-item" v-if="RoadMapState.ListProgress + 5 < CaptionsList.ListLength">
        <svg-icon name="check"/>
        <p class="street-map-navigation__text">...</p>
      </div>
      <div class="street-map-navigation__list-item">
        <svg-icon name="check"/>
        <p class="street-map-navigation__text">{{ CaptionsList.ListLength + 1 }}. Старт продаж</p>
      </div>

      -->
    </div>

    <!-- TODO remove after debugging -->
    <!--
    <div class="street-map-navigation__wrapper street-map-navigation__test-options">
      <button class="btn-main btn--green" @click="$emit('SetFieldState')">
        сделать пункт {{ RoadMapState.ListProgress + 1 }} выполненым
      </button>
      <button class="btn-main btn--green" @click="$emit('ShowAllFields')">
        Показать все пункты
      </button>
      <button class="btn-main btn--green" @click="$emit('OpenAllFields')">
        Открыть все пункты
      </button>
      <button class="btn-main btn--green" @click="$emit('HideAllFields')">
        Закрыть все пункты
      </button>
    </div>
    -->
  </div>
</template>

<script>
  import { RoadMapState } from "../scripts/mixins/road-map-state";

  export default {
    name: 'road-map-navigation',
    mixins: [ RoadMapState ],
    computed: {
      CaptionsList(){
        let list = [
          '1. Регистрация',
          '2. Профиль',
          '3. Категория товаров',
          '4. Аналитика',
          '5. ООО/ИП/самозанятость',
          '6. Наличие ЭДО ',
          '7. Цифровая подпись (ЭЦП)',
          '8. Регистрация на маркетплейсе и подписание договора',
          '9. Прайс-лист и параметры товаров',

          /*
          '10. Заведение бренда на маркетплейс',
          '11. Заведение каталога на маркетплейс',
          '12. Закупка или производство товаров',
          '13. Документация на товар',
          '14. Упаковка товара',
          '15. Отгрузка товаров на склады маркетплейсов',
          '16. Отзывы и продвижение на маркетплейсе',
          '17. Продажи, контроль остатков, поставки',
          '18. Расширение товарной матрицы',

          */
        ];

        const ListLength = list.length;

        if (this.RoadMapState.ListProgress < 2){
          list =  list.slice(0, 5);
        } else {
          list =  list.slice(this.RoadMapState.ListProgress - 1, this.RoadMapState.ListProgress + 4);
        }

        return { list, ListLength };
      },
    },
    methods: {
      CloseRoadMapNavigation(event){
        if (this.$refs['road-map-navigation'] && !this.$refs['road-map-navigation'].contains(event.target) && window.innerWidth <= 1280){
          this.$emit('CloseRoadMapNavigation')
        }
      }
    }
  }
</script>

<style lang="scss">
  .street-map-navigation {
    position: fixed;
    left: 80rem;
    width: auto;

    align-self: flex-start;

    @include big-laptop {
      left: 102.8rem;
    }

    @include laptop {
      left: 94.4rem;
    }

    @include tablet {
      top: 0;
      left: 0;
      right: 0;
      margin-left: 0;

      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 1001;

      background-color: rgba(0, 0, 0, 0.3);

      .street-map-navigation__wrapper{
        margin-top: 2.4rem;
      }
    }

    &--none{
      display: block;
      @include tablet {
        display: none;
      }
    }

    &__wrapper {
      position: relative;
      padding: 2.4rem 1.8rem 1.2rem;
      background-color: $color-main--white;
      border-radius: 1rem;
      width: 32.8rem;
      margin: 0 auto;

    }

    &__list-item {
      display: flex;
      margin-bottom: 1.2rem;

      svg {
        width: 1.5rem;
        min-width: 1.5rem;
        height: 1.5rem;
        margin-right: 1.7rem;
        fill: $color-main--lightgray;
      }

      p {
        color: $color-main--darkgray;
        font-size: 1.2rem;
        line-height: 1.6rem;
      }

      &--green {
        svg {
          fill: $color-main--green;
        }

        p {
          color: $color-main--green;
        }
      }

      &--bold {
        svg {
          fill: $color-main--darkgray;
        }

        p {
          font-weight: bold;
        }
      }

      &--without-svg{
        padding-left: 3.2rem;
      }

      &:nth-child(1),
      &:nth-child(2) {
        svg {
          fill: $color-main--green;
        }

        p {
          color: $color-main--green;
        }
      }

      &:nth-child(3) {
        svg {
          fill: $color-main--darkgray
        }

        p {
          font-weight: bold;
        }
      }
    }

    &__close {
      display: none;

      width: 2.4rem;
      height: 2.4rem;

      cursor: pointer;

      margin-left: auto;
      padding: 0.2rem;

      @include tablet{
        display: block;
      }
    }

    /* TODO remove after debugging */
    &__test-options{
      margin-top: 3.2rem;
      padding: 2.4rem 1.6rem;

      .btn-main{
        width: 100%;

        &:not(:last-of-type){
          margin-bottom: 2.4rem;
        }
      }
    }
  }

  .street-map-navigation-enter-active, .street-map-navigation-leave-active {
    transition: background-color ease 0.35s;

    .street-map-navigation__wrapper{
      transition: opacity ease 0.35s, transform ease 0.35s;
    }
  }

  .street-map-navigation-enter, .street-map-navigation-leave-to {
    background-color: rgba(0, 0, 0, 0);

    .street-map-navigation__wrapper{
      opacity: 0;
      transform: translateY(-7.5%);
    }
  }
</style>
