<template>
    <div class="container">
      <div class="container__head">
        <h1>Генератор этикеток для поставки</h1>
        <nuxt-link to="/tools/stickers/all" class="container__head-breadcrumbs">
          <svg-icon name="arrow-big" />
          Ваши этикетки
        </nuxt-link>
      </div>
      <div class="stickers">
        <div class="stickers-content">
          <form class="stickers-list">
            <div class="stickers-list__item">
              <p class="stickers-list__item-title">Размер этикеток для печати</p>
              <div class="stickers-list__item-case">
                <div class="input-radio">
                  <label>
                    <input type="radio" name="size-type" value="sticker" v-model="printer.type">
                    <span class="input-radio__wrapper">
                      <span class="input-radio__new" />
                      <span class="input-radio__text">Принтер этикеток</span>
                    </span>
                  </label>
                </div>
                <div class="stickers-list__item-inner" v-if="printer.type === 'sticker'">
                  <div class="input-radio">
                    <label>
                      <input type="radio" name="size" value="43x25" v-model="printer.StickersPrinter.value">
                      <span class="input-radio__wrapper">
                        <span class="input-radio__new" />
                        <span class="input-radio__text">43х25 мм</span>
                      </span>
                    </label>
                  </div>
                  <div class="input-radio">
                    <label>
                      <input type="radio" name="size" value="58x40" v-model="printer.StickersPrinter.value">
                      <span class="input-radio__wrapper">
                        <span class="input-radio__new" />
                        <span class="input-radio__text">58х40 мм</span>
                      </span>
                    </label>
                  </div>
                  <div class="input-radio">
                    <label>
                      <input type="radio" name="size" value="58x60" v-model="printer.StickersPrinter.value">
                      <span class="input-radio__wrapper">
                        <span class="input-radio__new" />
                        <span class="input-radio__text">58х60 мм</span>
                      </span>
                    </label>
                  </div>
                  <div class="input-radio">
                    <label>
                      <input type="radio" name="size" value="120x75" v-model="printer.StickersPrinter.value">
                      <span class="input-radio__wrapper">
                        <span class="input-radio__new" />
                        <span class="input-radio__text">120х75 мм</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="stickers-list__item-case">
                <div class="input-radio">
                  <label>
                    <input type="radio" name="size-type" value="a4" v-model="printer.type">
                    <span class="input-radio__wrapper">
                      <span class="input-radio__new" />
                      <span class="input-radio__text">Обычный принтер (А4), стикерная бумага</span>
                    </span>
                  </label>
                </div>
                <div class="stickers-list__item-inner" v-if="printer.type === 'a4'">
                  <div class="stickers-list__item-input-case">
                    <p class="stickers-list__item-sub-title">По горизонтали</p>
                    <input-select
                      :options="printer.DefaultPrinter.horizontal.values"
                      v-model="printer.DefaultPrinter.horizontal.SelectedValue.value"
                      alignTextCenter= "true"/>
                  </div>
                  <div class="stickers-list__item-input-case">
                    <p class="stickers-list__item-sub-title">По вертикали</p>
                    <input-select
                      :options="DefaultPrinterRows"
                      v-model="printer.DefaultPrinter.vertical.SelectedValue.value"
                      alignTextCenter= "true"/>
                  </div>
                </div>
              </div>
            </div>
            <div class="stickers-list__item">
              <p class="stickers-list__item-title">Расположение данных на стикере</p>
              <div class="stickers-list__item-wrapper">
                <div class="input-radio">
                  <label>
                    <input type="radio" name="direction" value="horizontal" v-model="printer.orientation">
                    <span class="input-radio__wrapper">
                      <span class="input-radio__new" />
                      <span class="input-radio__text">горизонтально</span>
                    </span>
                  </label>
                </div>
                <div class="input-radio">
                  <label>
                    <input type="radio" name="direction" value="vertical" v-model="printer.orientation">
                    <span class="input-radio__wrapper">
                      <span class="input-radio__new" />
                      <span class="input-radio__text">вертикально</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div class="stickers-list__item">
              <p class="stickers-list__item-title">Данные для этикетки</p>
              <p class="stickers-list__item-sub-title">Для выбранного размера</p>
              <p class="stickers-list__item-sub-title">доступно <b>полей — {{PrintOptions.Values.MaxTextFields}}</b></p>
              <p class="stickers-list__item-sub-title">допустимо не более <b>{{PrintOptions.Values.MaxLengths}} символов</b> в одном текстовом поле</p>
              <div class="stickers-list__item-wrapper">
                <div class="input-text input-text--required" :class="{'input-text--error': sticker.barcode.length < 1 || !BarcodeValid}">
                  <label for="barcode">
                    <span>
                      <span class="input-text__title">Штрихкод/баркод (EAN 13)</span>
                    </span>
                    <div class="input-text__wrapper">
                      <input type="text" name="barcode" id="barcode" placeholder="4606499001007" v-model="sticker.barcode" @input="CreateBarcode">
                      <span class="input-text__line"/>
                    </div>
                    <span class="input-text__footer" :class="{'input-text__footer--active': sticker.barcode.length < 1 || !BarcodeValid}">
                      <span class="input-text__helper-text">Введитк верный штрихкод</span>
                    </span>
                  </label>
                </div>
                <input-text v-for="(value, index) in sticker.fields"
                  :key="`input-text-${index}`"
                  :index="index"
                  :InputsArr="sticker.fields"
                  :type="'text'"
                  :name="`input-text-${index}`"
                  :id="`input-text-${index}`"
                  :placeholder="'Заголовок: значение'"
                  :MaxLengths="PrintOptions.Values.MaxLengths"
                  :HelperText="(index + 1) > PrintOptions.Values.MaxTextFields ? 'Для выбранного размера доступно ограниченное количество полей' : ''"
                  :class="{'input-text--error': (index + 1) > PrintOptions.Values.MaxTextFields}"
                  class="has-delete-button"
                  v-model="sticker.fields[index]"
                >
                  <template v-slot:DeleteButton>
                    <button type="button" class="btn--close" helper-title="Удалить поле" @click="sticker.fields.splice(index, 1)">
                      <span />
                      <span />
                    </button>
                  </template>
                </input-text>
                <button type="button" class="btn-main btn--green" v-if="Object.keys(this.sticker.fields).length < this.PrintOptions.Values.MaxTextFields"  @click="CreateTextField">
                  <svg-icon name="plus" />
                  Добавить еще поле
                </button>
                <div class="input-radio-case">
                  <p class="input-radio-case-title">Знак EAC</p>
                  <div class="input-radio">
                    <label>
                      <input type="radio" name="eac" value="hide" v-model="sticker.eac">
                      <span class="input-radio__wrapper">
                          <span class="input-radio__new" />
                          <span class="input-radio__text">Не показывать</span>
                        </span>
                    </label>
                  </div>
                  <div class="input-radio">
                    <label>
                      <input type="radio" name="eac" value="show-black" v-model="sticker.eac">
                      <span class="input-radio__wrapper">
                          <span class="input-radio__new" />
                          <span class="input-radio__text">На чёрном фоне</span>
                        </span>
                    </label>
                  </div>
                  <div class="input-radio">
                    <label>
                      <input type="radio" name="eac" value="show-white" v-model="sticker.eac">
                      <span class="input-radio__wrapper">
                          <span class="input-radio__new" />
                          <span class="input-radio__text">На белом фоне</span>
                        </span>
                    </label>
                  </div>
                </div>
                <input-checkbox
                  :name="'shelf-life'"
                  :id="'shelf-life'"
                  :text="'Срок годности неограничен'"
                  v-model="sticker.expiration"
                />
              </div>
            </div>
          </form>
        </div>
        <div class="stickers-stage">
          <div class="stickers__container">
            <div class="sticker"
                ref="sticker-container"
                :style="PrintOptions.StylesObject.Container">
              <div class="sticker__text" :style="PrintOptions.StylesObject.TextContainer">
                <p v-for="(item, index) in sticker.fields"
                   :key="`text-on-sticker-${index}`"
                   :style="PrintOptions.StylesObject.MainText"
                   v-if="(index + 1) <= PrintOptions.Values.MaxTextFields"
                >{{ item }}</p>
              </div>
              <div class="sticker__footer" :style="PrintOptions.StylesObject.footer">
                <div class="sticker__footer--eac" v-if="sticker.eac !== 'hide'" ref="eac">
                  <svg width="200" height="183" viewBox="0 0 200 183" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="sticker.eac === 'show-white'">
                    <g clip-path="url(#clip0)">
                      <path d="M199.905 -0.5896H-1.1792V185.555H199.905V-0.5896Z" fill="white"/>
                      <path d="M50 13H10V168H50V148H30V98H50V83H30V33H50V13Z" fill="#303136"/>
                      <path d="M90 98V168H70V13H130V168H110V98H90Z" fill="#303136"/>
                      <path d="M90 83H110V28H90V83Z" fill="white"/>
                      <path d="M190 13H150V168H190V148H170V33H190V13Z" fill="#303136"/>
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="200" height="183" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                  <svg width="200" height="183" viewBox="0 0 200 183" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="sticker.eac === 'show-black'">
                    <g clip-path="url(#clip0)">
                      <path d="M199.905 -0.5896H-1.1792V185.555H199.905V-0.5896Z" fill="#303136"/>
                      <path d="M50 13H10V168H50V148H30V98H50V83H30V33H50V13Z" fill="white"/>
                      <path d="M90 98V168H70V13H130V168H110V98H90Z" fill="white"/>
                      <path d="M90 83H110V28H90V83Z" fill="#303136"/>
                      <path d="M190 13H150V168H190V148H170V33H190V13Z" fill="white"/>
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="200" height="183" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <p class="sticker__footer--text" v-if="sticker.expiration" :style="PrintOptions.StylesObject.FooterText">Срок годности неограничен</p>
                <svg class="sticker__footer--barcode" ref="barcode" :style="PrintOptions.StylesObject.barcode"/>
              </div>
            </div>
          </div>
          <p class="stickers-stage__scale">Масшаб 1 : {{PrintOptions.Values.StyleScale}}</p>
          <div class="stickers-stage__submit-row">
            <button type="button" class="btn-main btn--green" @click="CreatePDF('open')">Скачать PDF</button>
            <button type="button" class="btn-main btn--green" @click="SaveSticker()">Сохранить</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { StickersCore } from "../../../scripts/mixins/stickers";

  import InputSelect from "../../../components/input-select";
  import InputText from "../../../components/input-text";
  import InputCheckbox from "../../../components/input-checkbox";

  export default {
    name: "stickers",
    components: {InputText, InputSelect, InputCheckbox},
    mixins: [ StickersCore ],
    head: () => {
      return {
        title: 'Добавление стикера на POPSO.ru'
      }
    },
    methods: {
      ...mapActions({
        CreateNewSticker: 'tools/stickers/CreateNewSticker',
      }),
      RemoveInput (arr, index){
        arr.splice(index, 1);
      },
    },
    mounted() {
      if (this.$route.query.CreateSticker){
        this.sticker.fields = [this.$route.query.name];

        this.sticker.barcode = this.$route.query.barcode;
      }

      this.CreateBarcode();
    },
  }
</script>

<style lang="scss">
  .custom-loading{
    .stickers{
      .input-radio,
      .input-text,
      .input-checkbox,
      .sticker,
      .stickers-stage__scale,
      .sticker__footer--barcode,
      .stickers-list__item > .input-radio,
      .stickers-list__item > .input-text,
      .stickers-list__item p,
      .my-stickers-item__options,
      .my-stickers__head .btn-main,
      .my-stickers-item__title p{
        position: relative;
        pointer-events: none;

        &:before, &:after{
          transition: opacity ease 0.35s;
        }

        &:before{
          content: '';

          width: 100%;
          height: 100%;

          display: block;

          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;

          z-index: 3;
          background-color: $color-main--lightgray;
          background-image: linear-gradient( 100deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 80% );
          background-size: 25% 100%;
          background-position: -100% 0;
          background-repeat: no-repeat;
          border-radius: 0.8rem;

          animation: loading ease 1.75s infinite;
        }

        &:after{
          content: '';

          width: 100%;
          height: 100%;

          display: block;

          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;

          z-index: 2;
          background-color: white;
        }
      }
      .stickers-stage__submit-row .btn-main,
      .stickers-list__item-wrapper .btn-main,
      .my-stickers__head .btn-main{
        background-color: transparent;
        border-color: transparent;
      }
      .stickers-stage__scale{
        position: sticky;
      }
    }
  }

  .custom-loading--removing{
    *{
      &:before, &:after{
        opacity: 0;
      }
    }
  }
</style>
