<template>
  <transition name="ease-opacity">
    <div class="marketplace-popup" v-if="state" @click="close" ref="pop-up-connect-marketplace">
      <form class="marketplace-popup__wrapper" ref="pop-up-connect-marketplace__inner">
        <svg-icon class="marketplace-popup__close" name="plus" @click="[state = false, $emit('close')]"/>
        <h3 class="marketplace-popup__title">{{ marketplace.name }}</h3>
        <div class="marketplace-popup__in-store" v-if="marketplace.api.status">
          <div class="marketplace-popup__sub-title">Сейчас в продаже</div>
          <div class="marketplace-popup__field">
            <div class="marketplace-popup__field-name">Товары</div>
            <div class="marketplace-popup__field-count"> {{ marketplace.info.store.products }} шт.</div>
            <div class="marketplace-popup__field-description" v-if="false">Ожидается поставка шт</div>
          </div>
          <div class="marketplace-popup__field">
            <div class="marketplace-popup__field-name">На сумму</div>
            <div class="marketplace-popup__field-count">{{ marketplace.info.store.price }} ₽</div>
            <div class="marketplace-popup__field-description" v-if="false">Новая поставка на 122 500 руб.</div>
          </div>
          <div class="marketplace-popup__field">
            <div class="marketplace-popup__field-name">Артикулы</div>
            <div class="marketplace-popup__field-count">
              {{ marketplace.info.store.articul }} шт
            </div>
            <div class="marketplace-popup__field-description"></div>
          </div>
        </div>

        <div class="marketplace-popup__contract" v-if="false">
          <h4 class="marketplace-popup__sub-title">Договор</h4>
          <input-text
            :id="'contract-number'"
            :name="'contract-number'"
            :lazy="true"
            :disabled="true"
            :title="'Номер'"
            :type="'text'"
            :value="marketplace.info.contract.number"
          />
          <input-text
            :id="'contract-date'"
            :name="'contract-date'"
            :lazy="true"
            :disabled="true"
            :title="'Дата'"
            :type="'text'"
            :value="marketplace.info.contract.date"
          />
        </div>

        <div class="marketplace-popup__work-schema">
          <h4 class="marketplace-popup__sub-title">Схема работы</h4>
          <input-checkbox v-for="StoreType in marketplace.info.store.options"
            :key="`${marketplace.name}-store-type-${StoreType.type}`"
            :id="`${marketplace.name}-store-type-${StoreType.type}`"
            :name="`${marketplace.name}-store-type-${StoreType.type}`"
            :text="StoreType.text"
            :value="StoreType.status"
            :disabled="true"
            @input="UserMarketplaceStorage(marketplace, StoreType, $event)"
          />
        </div>

        <div class="marketplace-popup__connection">
          <h4 class="marketplace-popup__sub-title">API
            <span class="marketplace-popup__connection-status"
                  :class="marketplace.api.status ? 'marketplace-popup__connection-status--active' : 'marketplace-popup__connection-status--disabled'"
            >
              {{ marketplace.api.status ? 'Подключено' : 'Не подключено'}}
              <div class="marketplace-popup__circle" />
            </span>
          </h4>
          <div class="marketplace-popup__text" v-if="marketplace.api.text.length > 0" v-html="marketplace.api.text" />

          <input-text v-for="MarketplaceApiKey in marketplace.api.options"
            :key="`${marketplace.name}-${MarketplaceApiKey.id}`"
            :id="`${marketplace.name}-${MarketplaceApiKey.id}`"
            :name="`${marketplace.name}-${MarketplaceApiKey.id}`"
            :lazy="true"
            :title="MarketplaceApiKey.name"
            :type="'text'"
            :HelperText="MarketplaceApiKey.text"
            :value="MarketplaceApiKey.value"
            @input="SaveUserMarketplaceApi(marketplace, MarketplaceApiKey, $event)"
          />
        </div>
      </form>
    </div>
  </transition>
</template>

<script>
  import { mapActions } from 'vuex';
  import InputText from '../components/input-text';
  import InputCheckbox from '../components/input-checkbox';

  export default {
    name: 'connect-marketplace',
    components: { InputText, InputCheckbox},
    head: () => {
      return {
        title: 'Маркетплейсы, профиль на POPSO.ru'
      }
    },
    data: () => {
      return {
        state: false,
        marketplace: {},
      }
    },
    methods: {
      ...mapActions({
        UpdateUserMarketplaceApi: 'user/marketplaces/UpdateUserMarketplaceApi',
        UpdateUserMarketplaceStorage: 'user/marketplaces/UpdateUserMarketplaceStorage',
      }),
      open(data){
        this.$emit('open');

        this.state = true;

        this.marketplace = data;

        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
      },
      close(event){
        if (event !== undefined && event !== null){
          if (this.$refs['pop-up-connect-marketplace__inner'] && !this.$refs['pop-up-connect-marketplace__inner'].contains(event.target)){
            this.$emit('close');

            document.body.style.overflowY = 'auto';

            this.state = false;
          }
        }
      },
      SaveUserMarketplaceApi(marketplace, options, value){
        this.UpdateUserMarketplaceApi({
          id: marketplace.id,
          url: marketplace.name,
          name: marketplace.name,
          api: {
            id: options.id,
            value: value,
            name: options.name
          }
        })
      },
      UserMarketplaceStorage(marketplace, options, value){
        this.UpdateUserMarketplaceStorage({
          id: marketplace.id,
          url: marketplace.name,
          name: marketplace.name,
          store: {
            type: options.type,
            status: value
          },
        });
      }
    }
  }
</script>

<style lang="scss">
  .marketplace-popup {
    width: 100vw;
    height: 100%;
    min-height: 100%;

    background-color: rgba(0, 0, 0, 0.3);

    margin-left: 0;
    padding-bottom: 3.2rem;

    z-index: 1002;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    overflow: auto;

    display: flex;
    align-self: flex-start;
    justify-content: center;

    div, span, b{
      font-size: 1.4rem;
      line-height: 1.8rem;

      @include mobile{
        font-size: 1.2rem;
        line-height: 1.4rem;
      }
    }

    @include mobile{
      padding-left: 0.8rem;
      padding-right: 0.8rem;
    }

    &__wrapper {
      width: 72rem;
      position: relative;

      padding: 3.2rem 4rem 5.4rem;
      margin-top: 4rem;
      margin-bottom: 4rem;

      background-color: $color-main--white;
      border-radius: 1rem;

      align-self: flex-start;

      @include mobile {
        padding: 1.6rem;
      }
    }

    &__in-store{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 2.4rem;

      padding-bottom: 1.6rem;
      margin-bottom: 1.6rem;

      border-bottom: 0.1rem solid $color-main--lightgray;

      @include mobile{
        grid-template-columns: repeat(1, 1fr);
      }
    }

    &__contract {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 3rem;
      grid-row-gap: 1.6rem;

      margin-bottom: 2.4rem;

      .marketplace-popup__sub-title {
        grid-column: 1 / 3;
      }

      @include mobile{
        display: flex;
        flex-direction: column;
      }
    }

    &__contract-characteristic {
      padding-bottom: 0.7rem;

      border-bottom: 0.1rem solid $color-main--lightgray;

      span {
        display: block;

        &:nth-child(1) {
          margin-bottom: 0.9rem;

          color: $color-main--darkgray;
        }
      }
    }

    &__work-schema{
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 3.4rem;

      @include mobile {
        grid-template-columns: repeat(1, 1fr);
        grid-row-gap: 1.6rem;
      }

      .marketplace-popup__sub-title{
        margin-bottom: 1.6rem;

        grid-column: 1 / 3;

        @include mobile {
          grid-column: auto;

          margin-bottom: 0;
        }
      }
    }

    &__connection{
      display: grid;
      grid-row-gap: 1.6rem;

      margin-top: 1.6rem;

      .input-text{
        max-width: 46rem;

        &__helper-text{
          font-size: 1.2rem;
          color: $color-main--middlegray;

          word-break: break-word;
        }
      }

      .marketplace-popup__input-header {
        font-weight: bold;

        color: $color-main--darkgray;

        margin-bottom: 0.8rem;
      }
    }

    &__field{
      @include mobile {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
      }

      &-name{
        margin-bottom: 0.8rem;
      }
      &-count{
        color: $color-main--green;

        font-weight: bold;

        margin-bottom: 0.8rem;

        span {
          font-weight: normal;
        }
      }
      &-description{
        color: $color-main--orange;
      }
    }

    &__title{
      font-size: 2rem;
      font-weight: bold;

      color: $color-main--green;
    }

    &__close {
      display: block;

      width: 1.6rem;
      height: 1.6rem;

      fill: $color-main--darkgray;

      cursor: pointer;

      margin-left: auto;

      transform: rotate(45deg);
    }

    &__title{
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 2.4rem;

      padding-bottom: 2rem;
    }

    &__sub-title{
      font-weight: bold;
      font-size: 1.4rem;
      line-height: 1.6rem;

      @include mobile {
        font-size: 1.2rem;
      }
    }

    &__text{
      font-weight: normal;
      font-size: 1.4rem;
      line-height: 1.6rem;

      margin: 0.8rem 0 1.6rem;

      color: $gray-main;

      @include mobile {
        font-size: 1.2rem;
      }

      a, strong{
        font-size: inherit;
        line-height: inherit;
        color: inherit;
      }

      a{
        font-weight: 600;

        &:hover{
          text-decoration: none;
        }
      }
    }

    &__connection-status{
      position: relative;

      font-weight: normal;
      padding-left: 0.2rem;

      &--active{
        color: $color-main--green;
        .marketplace-popup__circle{
          background-color: $color-main--green;
        }
      }

      &--disabled{
        color: $color-main--orange;
        .marketplace-popup__circle{
          background-color: $color-main--orange;
        }
      }
    }

    &__circle{
      display: block;

      position: absolute;
      top: -0.4rem;
      right: -0.6rem;

      width: 0.5rem;
      height: 0.5rem;

      border-radius: 50%;
    }

    &__btn{
      width: 24rem;
      margin-left: auto;
    }

    &--none{
      display: none;
    }
  }

  .connect-marketplace-enter, .connect-marketplace-leave-to {
    background-color: rgba(0, 0, 0, 0);

    .marketplace-popup__wrapper{
      opacity: 0;
      transform: translateY(-5%);
    }
  }
</style>
