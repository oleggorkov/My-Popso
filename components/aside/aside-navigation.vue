<template>
  <nav class="sidebar-navigation">
    <ul>
      <li class="sidebar-item">
        <div class="sidebar-item__container">
          <nuxt-link to="/" exact :active-class="'sidebar-item__link--active'" class='sidebar-item__link'>
            <svg-icon name="aside-icon--products" class="sidebar-item__main-icon"/>
            <span>Гид — {{ RoadMapState.ListProgress }} / {{ UserRoadMapData.length }}</span>
          </nuxt-link>
        </div>
      </li>

      <li class="sidebar-item">
        <div class="sidebar-item__container">
          <nuxt-link to="/products" :active-class="'sidebar-item__link--active'" class='sidebar-item__link'>
            <svg-icon name="aside-icon--products" class="sidebar-item__main-icon"/>
            <span>Мои товары</span>
          </nuxt-link>
        </div>
      </li>
      <li class="sidebar-item">
        <div class="sidebar-item__container">
          <nuxt-link to="/user/marketplaces" :active-class="'sidebar-item__link--active'" class='sidebar-item__link'>
            <svg-icon name="aside-icon--marketplaces" class="sidebar-item__main-icon"/>
            <span>Маркетплейсы</span>
          </nuxt-link>
        </div>
      </li>
      <li class="sidebar-item">
        <div class="sidebar-item__container">
          <nuxt-link to="/supplies" :active-class="'sidebar-item__link--active'" class='sidebar-item__link'>
            <svg-icon name="aside-icon--supplies" class="sidebar-item__main-icon"/>
            <span>Поставки</span>
          </nuxt-link>
        </div>
      </li>

      <li class="sidebar-item sidebar-item--active" @click="ToggleSidebarItem($event)">
        <div class="sidebar-item__container">
          <nuxt-link to="/tools" :active-class="'sidebar-item__link--active'" class='sidebar-item__link' exact>
            <svg-icon name="aside-icon--work" class="sidebar-item__main-icon"/>
            <span>Инструменты</span>
          </nuxt-link>
          <button type="button" class="sidebar-item__toggle-btn">
            <svg-icon name="arrow-small" class="sidebar-item__toggle-icon"/>
          </button>
        </div>
        <div class="sidebar-item__wrapper">
          <ul>
            <li>
              <nuxt-link to="/tools/product-calculator" :active-class="'sidebar-item__link--active'" class='sidebar-item__link'>Калькулятор прибыли</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/tools/stickers/all" :active-class="'sidebar-item__link--active'" class='sidebar-item__link'>Этикетки / стикеры</nuxt-link>
            </li>
<!--            <li>-->
<!--              <nuxt-link to="/logistic" :active-class="'sidebar-item__link&#45;&#45;active'" class='sidebar-item__link'>Объём поставки</nuxt-link>-->
<!--            </li>-->
<!--            <li>-->
<!--              <a class='sidebar-item__link sidebar-item__link&#45;&#45;disabled'>-->
<!--                Генератор TTH-->
<!--                <svg-icon name="clock" class="sidebar-item__info-icon"/>-->
<!--              </a>-->
<!--            </li>-->

          </ul>
        </div>
      </li>

      <li class="sidebar-item">
        <div class="sidebar-item__container">
          <nuxt-link to="/wiki" :active-class="'sidebar-item__link--active'" class='sidebar-item__link'>
            <svg-icon name="aside-icon--question" class="sidebar-item__main-icon"/>
            <span>База знаний</span>
          </nuxt-link>
        </div>
      </li>

      <li class="sidebar-item">
        <div class="sidebar-item__container">
          <a class='sidebar-item__link sidebar-item__link--disabled'>
            <svg-icon name="aside-icon--analytics" class="sidebar-item__main-icon"/>
            <span>Аналитика </span>
            <svg-icon name="clock" class="sidebar-item__info-icon"/>
          </a>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  import { RoadMapState } from "../../scripts/mixins/road-map-state";

  export default {
    name: 'aside-navigation',
    mixins: [ RoadMapState ],
    async mounted() {
      if (this.UserRoadMapData.length === 0) {
        await this.GetRoadMap();
        console.log('get user road map from aside: ', this.UserRoadMapData);
      }
    },
    methods: {
      ...mapActions({
        GetRoadMap: 'user/GetRoadMap',
      }),
      ToggleSidebarItem(event){
        const elem = event.target;
        const RootElem = event.currentTarget;
        const HiddenWrapper = RootElem.querySelector('.sidebar-item__wrapper');
        const HiddenWrapperContent = HiddenWrapper.querySelector('ul');
        const HiddenWrapperMarginTop = 12;

        if (elem.classList.contains('sidebar-item__toggle-btn')){
          if (RootElem.classList.contains('sidebar-item--active')){
            HiddenWrapper.style.maxHeight = `${0}px`;
            HiddenWrapper.style.marginTop = `${0}px`;
          } else {
            HiddenWrapper.style.maxHeight = `${HiddenWrapperContent.clientHeight}px`;
            HiddenWrapper.style.marginTop = `${HiddenWrapperMarginTop}px`;
          }

          RootElem.classList.toggle('sidebar-item--active');
        }
      }
    },
    computed: {
      ...mapGetters({
        SidebarState: 'SidebarState',
        UserRoadMapData: 'user/UserRoadMapData'
      }),
    }
  }
</script>

<style lang="scss">
  .sidebar-navigation{
    width: 100%;
    height: auto;

    ul{
      width: 100%;
      height: auto;
    }
  }

  .sidebar-item{
    width: 100%;
    min-height: 2.4rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    position: relative;
    transition: height ease 0s 0.35s;

    span{
      font-size: inherit;
      line-height: inherit;
      font-weight: inherit;
      color: inherit;

      @media (max-height: 420px) {
        font-size: 1.2rem;
      }
    }

    &:not(:first-of-type){
      margin-top: 2.4rem;

      @media (max-height: 540px) {
        margin-top: 1.2rem;
      }

      @media (max-height: 420px) {
        margin-top: 0.4rem;
      }

    }

    &__link{
      width: auto;
      height: inherit;

      display: flex;
      justify-content: flex-start;
      align-items: center;

      font-size: 1.6rem;
      line-height: 2.4rem;
      font-weight: 500;
      color: $color-main--darkgray;
      text-decoration: none;
      white-space: nowrap;

      transition: color ease 0.35s;

      @include laptop {
        font-size: 1.4rem;
        line-height: 2rem;
      }

      svg{
        width: 1.6rem;
        height: 1.6rem;

        fill: $color-main--middlegray;
      }

      span{
        padding-top: 0.3rem;
      }

      &:hover{
        color: $color-main--black;

        .sidebar-item__main-icon{
          fill: $color-main--black;
        }
      }

      &:after{
        content: '';

        width: 0.6rem;
        height: 2.4rem;

        display: block;

        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;

        z-index: 2;

        border-radius: 4px 0 0 4px;
        background-color: $color-main--red;

        opacity: 0;

        transition: opacity ease 0.35s;
      }

      &--active{
        color: $color-main--red!important;
        transition: color ease 0.35s;

        .sidebar-item__main-icon{
          fill: $color-main--red!important;
        }

        &:hover{
          svg{
            fill: $color-main--red;
          }
          a{
            color: $black-main;
          }
        }

        &:after{
          opacity: 1!important;
        }

      }

      &--disabled{
        cursor: default;

        &:hover{
          color: $color-main--darkgray;

          .sidebar-item__main-icon{
            fill: $color-main--middlegray;
          }
        }
      }
    }

    &__container{
      width: 100%;
      min-height: inherit;

      padding-right: 4.8rem;

      display: flex;
      justify-content: flex-start;
      align-items: center;

      position: relative;
    }

    &__main-icon{
      width: 2.4rem;
      height: 2.4rem;

      min-width: 2.4rem;
      min-height: 2.4rem;

      fill: $color-main--darkgray;

      margin-right: 0.8rem;

      transition: fill ease 0.35s;

      @include laptop {
        width: 2rem;
        height: 2rem;

        min-width: 2rem;
        min-height: 2rem;
      }
    }

    &__info-icon{
      margin-left: 1.2rem;
    }

    &__toggle-btn{
      width: 2.4rem;
      height: 2.4rem;

      margin-left: 1rem;

      display: flex;
      justify-content: center;
      align-items: center;

      background-color: transparent;
      border: none;
      outline: none;
      z-index: 3;

      &:hover{
        .sidebar-item__toggle-icon{
          fill: $color-main--red;
        }
      }
    }

    &__toggle-icon{
      width: 1.2rem;
      height: 0.75rem;

      fill: $color-main--darkgray;

      transform: rotate(-90deg);

      pointer-events: none;

      transition: transform ease 0.35s, fill ease 0.35s;
    }

    &__wrapper{
      width: 100%;
      height: auto;

      max-height: 0;

      display: flex;
      justify-content: flex-end;
      align-items: center;

      overflow: hidden;

      position: relative;

      transition: max-height ease 0.35s, margin-top ease 0.35s;

      ul{
        width: 100%;
        height: auto;

        padding-left: calc(2.4rem + 0.8rem);

        @include laptop {
          padding-left: calc(2rem + 0.8rem);
        }
      }

      li{
        width: 100%;
        height: auto;

        position: relative;

        &:not(:first-of-type){
          margin-top: 0.8rem;
        }
      }

      a{
        font-size: 1.4rem;
        line-height: 2rem;
        font-weight: 500;
        color: $color-main--darkgray;

        @include laptop {
          font-size: 1.2rem;
          line-height: 2.4rem;
        }
      }
    }

    &--active{
      .sidebar-item__toggle-icon{
        transform: rotate(90deg);
      }

      .sidebar-item__wrapper{
        max-height: 120px;
        margin-top: 12px;
      }
    }
  }
</style>
