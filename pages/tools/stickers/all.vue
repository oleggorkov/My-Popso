<template>
    <div class="container">
      <div class="container__head my-stickers-head">
        <h1>Мои этикетки</h1>
        <div class="my-stickers-head__wrapper">
          <nuxt-link to="/tools/stickers" class="btn-main btn--green">
            <svg-icon name="plus" />
            Создать этикетку
          </nuxt-link>
        </div>
      </div>
      <div class="my-stickers" v-if="stickers.length > 0">

        <div class="my-stickers__content">
          <div class="my-stickers-item" v-for="item in stickers" :key="item.sticker.id">
            <div class="my-stickers-item__title">
              <p>{{ item.sticker.fields[0] }}</p>
              <p>{{ item.sticker.fields[1] }}</p>
              <p v-if="item.sticker.fields.length === 0">Стикер для баркода {{ item.sticker.barcode }}</p>
            </div>
            <div class="my-stickers-item__options">
              <button type="button" class="my-stickers-item__options--download" @click="DownloadSticker(item.helpers.id)">
                <span>{{ item.sticker.barcode }}</span>
                <div class="btn-main btn--green">
                  <svg-icon name="barcode-type-1"/>
                  <svg-icon name="download"/>
                </div>
              </button>
              <div class="my-stickers-item__options-wrapper">
                <nuxt-link type="button" class="my-stickers-item__options--edit" :to="`/tools/stickers/${item.helpers.id}`">
                  <svg-icon name="edit" />
                </nuxt-link>
                <button type="button" class="my-stickers-item__options--basket" @click="OpenAlert(item.helpers.id)">
                  <svg-icon name="basket" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="my-stickers my-stickers-empty" v-else>
        <div class="my-stickers-empty_wrapper">
          <p>Вы еще не создавали этикеток</p>
          <nuxt-link to="/tools/stickers" class="btn-main btn--green">
            <svg-icon name="plus"/>
            Создать этикетку
          </nuxt-link>
          <!--        <svg-icon name="stickers&#45;&#45;empty"/>-->
        </div>

        <img src="../../../assets/images/empty/stickers-empty-2.png" alt="stickers-empty">

      </div>

      <transition name="my-stickers-alert">
        <div class="my-stickers-alert" v-if="AlertState">
          <div class="my-stickers-alert__content">
            <p class="my-stickers-alert__title">Вы действительно хотите удалить данный стикер?</p>
            <div class="my-stickers-alert__wrapper">
              <button type="button" class="btn-main btn--green" @click="DeleteSticker">Да</button>
              <button type="button" class="btn-main btn--green" @click="CloseAlert">Нет</button>
            </div>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: "all-stickers",
    data: () => {
      return {
        AlertState: false,
        SelectedStickerId: null,
      }
    },
    head: () => {
      return {
        title: 'Мои стикеры на POPSO.ru'
      }
    },
    async mounted(){
      if (this.stickers.length === 0){
        await this.GetStickersList();
      }
    },
    computed: {
      ...mapGetters({
        user: 'user/User',
        token: 'user/UserToken',
        stickers: 'tools/stickers/StickersList'
      }),
    },
    methods: {
      ...mapActions({
        GetStickersList: 'tools/stickers/GetStickersList',
        RemoveSticker: 'tools/stickers/RemoveSticker',
      }),
      OpenAlert(id){
        this.AlertState = true;
        this.SelectedStickerId = id;
      },
      CloseAlert(){
        this.AlertState = false;
      },
      DeleteSticker(){
        this.RemoveSticker(this.SelectedStickerId);
        this.CloseAlert();
      },
      DownloadSticker(StickerId){
        this.$router.push({path: `/tools/stickers/${StickerId}`, query: { download: true }})
      },
    }
  }
</script>

<style lang="scss">
  .my-stickers{
    width: 100%;
    height: auto;

    padding: 3.2rem 4rem;
    margin-top: 3.2rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    background-color: $color-main--white;
    border-radius: 1rem;

    &__content{
      width: 100%;
      height: auto;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      border-top: 0.2rem solid $gray-light;
    }

    @include mobile {
      padding: 2.4rem 1.6rem;
    }
  }

  .my-stickers-empty{

    padding: 3.2rem 6.4rem;
    margin: 0 auto;

    align-items: center;
    flex-direction: row;
    justify-content: center;

    @include mobile{
      flex-direction: column;
    }

    p{
      font-size: 2rem;
      line-height: 3.2rem;
      color: $color-main--black;
      font-weight: 500;
    }

    a{
      width: 24rem;
      min-height: 4.8rem;

      margin-top: 1.6rem;
    }

    & > {
      svg{
        width: 19rem;
        height: 15rem;

        margin-top: 1.6rem;
      }
    }
  }

  .my-stickers-head{
    height: auto;
    padding-bottom: 0;

    svg{
      width: 1.6rem;
      height: 1.6rem;

      fill: white;

      margin-right: 0.8rem;
    }

    .btn-main{
      margin-top: 2.4rem;
      margin-bottom: 2rem;
      padding: 0 2.4rem;

      @include mobile {
        width: 100%;

        min-height: 4.8rem;

        font-size: 1.4rem;
      }
    }
  }

  .my-stickers-item{
    width: 100%;
    height: auto;

    padding-top: 1.6rem;
    padding-bottom: 2.4rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    border-bottom: 0.2rem solid $gray-light;

    &__title{
      width: 32.5%;
      height: auto;

      margin-right: 3.2rem;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      flex-shrink: 0;

      p{
        width: 100%;
        height: auto;

        font-size: 1.4rem;
        line-height: 2rem;
        font-weight: 500;
        color: $black-main;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &:nth-of-type(2){
          color: $gray-main;
          margin-top: 0.8rem;
        }
      }

      @include mobile {
        width: 100%;

        margin-right: 0;
      }
    }

    &__options{
      width: auto;
      height: auto;

      display: flex;
      justify-content: flex-start;
      align-items: center;

      &-wrapper{
        width: auto;
        height: auto;

        margin-left: 3rem;

        display: flex;
        justify-content: flex-end;
        align-items: center;
      }

      &--download{
        width: auto;
        height: auto;

        display: flex;
        justify-content: flex-start;
        align-items: center;

        background-color: transparent;
        border: none;
        outline: none;

        & > div{
          min-height: 6rem;

          padding: 0 2.4rem;

          svg{
            fill: white;

            margin-right: 0;

            &:nth-of-type(1){
              width: 4.1rem;
              height: 3.1rem;

              margin-right: 2rem;

              @include mobile {
                width: 3.2rem;
                height: 2.4rem;
              }
            }

            &:nth-of-type(2){
              width: 3rem;
              height: 3rem;

              @include mobile {
                width: 2.4rem;
                height: 2.4rem;
              }
            }
          }

          @include mobile {
            min-height: 4.8rem;
          }
        }

        span{
          font-size: 1.4rem;
          line-height: 2rem;
          font-weight: 500;
          color: $color-main--green;
          text-align: center;

          margin-right: 2.4rem;

          @include mobile {
            margin-bottom: 2.4rem;
            margin-right: 0;
          }
        }

        &:hover{
          div{
            background-color: white;
            color: $color-main--green;

            svg{
              use{
                fill: $color-main--green;
              }
            }
          }
        }

        @include mobile {
          flex-direction: column;
          align-items: flex-start;
        }
      }

      &--edit, &--basket{
        width: 3rem;
        height: 3rem;

        background-color: transparent;
        outline: none;
        border: none;

        svg{
          width: inherit;
          height: inherit;

          fill: $gray-main;

          transition: fill ease 0.35s;

          &:hover{
            fill: $black-main;
          }

          @include mobile {
            width: 2.4rem;
            height: 2.4rem;
          }
        }

        @include mobile {
          margin-bottom: calc((4.8rem / 2) - (3rem / 2));
        }
      }

      &--basket{
        margin-left: 3rem;

        @include mobile {
          margin-left: 1.6rem;
        }
      }

      @include mobile {
        width: 100%;

        justify-content: space-between;
        align-items: flex-end;

        margin-top: 0.8rem;
      }
    }

    @include mobile {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .my-stickers-alert{
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    z-index: 15;

    background-color: rgba(0, 0, 0, 0.25);

    &__content{
      width: 48rem;
      height: auto;

      padding: 2.4rem 3.2rem;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      background-color: $color-main--white;
      border-radius: 1rem;
    }

    &__title{
      font-size: 2rem;
      line-height: 2.4rem;
      font-weight: 500;
      color: $color-main--black;
    }

    &__wrapper{
      width: 100%;
      height: auto;

      margin-top: 3.2rem;

      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 2.4rem;
    }

    &-enter{
      opacity: 0;
    }

    &-enter-active{
      transition: opacity ease 0.35s;
    }

    &-leave{

    }

    &-leave-active{
      transition: opacity ease 0.35s;
      opacity: 0;
    }
  }
</style>
