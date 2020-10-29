<template>
  <div class="container">
    <div class="container__head">
      <nuxt-link to="/products" class="container__head-breadcrumbs">
        <svg-icon name="arrow-big" />
        Ваши товары
      </nuxt-link>
      <h1>Добавление товара (подробно)</h1>
    </div>

    <div class="products-adding-extended">
      <form @submit.prevent="CreateProduct">
        <div class="products-adding-extended__form-inputs products-adding-extended__form-inputs--way-to-add ">
          <div class="products-adding-extended__item">
            <p class="products-adding-extended__item-title">Выберите спобоб добавления</p>
            <div class="products-adding-extended__item-case">
              <div class="products-adding-extended__item-inner products-adding-extended__item-inner--way-to-add" v-if="wayToAdd.type === 'wayToAdd'">
                <radiobutton
                  :name="'way'"
                  :value="'manually'"
                  :title="'Добавить вручную'"
                  v-model="wayToAdd.way.value"
                />
                <radiobutton
                  :name="'way'"
                  :value="'xls'"
                  :title="'Из XLS - таблицыю'"
                  v-model="wayToAdd.way.value"
                />
                <radiobutton
                  :name="'way'"
                  :value="'yml-xml'"
                  :title="'Из XLS - таблицыю'"
                  v-model="wayToAdd.way.value"
                />
                <radiobutton
                  :name="'way'"
                  :value="'api'"
                  :title="'API'"
                  v-model="wayToAdd.way.value"
                />
              </div>
            </div>
          </div>
          <div class="products-adding-extended__item">
            <p class="products-adding-extended__item-title">Выберите Маркетплейс</p>
            <div class="products-adding-extended__item-case">
              <div class="products-adding-extended__item-inner products-adding-extended__item-inner--way-to-add" v-if="marketplace.type === 'marketplace'">
                <radiobutton
                  :name="'market'"
                  :value="'Ozon'"
                  :title="'Ozon'"
                  v-model="marketplace.market.value"
                />
                <radiobutton
                  :name="'market'"
                  :value="'Wildberries'"
                  :title="'Wildberries'"
                  v-model="marketplace.market.value"
                />
                <radiobutton
                  :name="'market'"
                  :value="'Goods'"
                  :title="'Goods'"
                  v-model="marketplace.market.value"
                />
                <radiobutton
                  :name="'market'"
                  :value="'Beru'"
                  :title="'Beru'"
                  v-model="marketplace.market.value"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="products-adding-extended__form-inputs products-adding-extended__form-inputs--about-product wait-loading">
          <div class="input-text" :class="{ 'input-text--error': $v.name.$error }">
            <label>
              <span>Название товара <span>*</span></span>
              <input type="text" name="product-name" id="product-name" v-model="$v.name.$model">
            </label>
          </div>

          <div class="input-text" :class="{ 'input-text--error': $v.brand.$error }">
            <label>
              <span>Бренд <span>*</span></span>
              <input type="text" name="brand" id="brand" v-model="$v.brand.$model">
            </label>
          </div>

          <div class="input-text" :class="{ 'input-text--error': $v.barcode.$error }">
            <label>
              <span>Штрихкод <span>*</span></span>
              <input type="text" name="vendor-code" id="vendor-code" v-model="$v.barcode.$model">
            </label>
          </div>

          <div class="input-text" :class="{ 'input-text--error': $v.categories.$error }">
            <label>
              <span>Категория <span>*</span></span>
              <input type="text" name="categories" id="categories" v-model="$v.categories.$model">
            </label>
          </div>

          <div class="input-text" :class="{ 'input-text--error': $v.vendor_code.$error }">
            <label>
              <span>Артикул <span>*</span></span>
              <input type="text" name="cat" id="cat" v-model="$v.vendor_code.$model">
            </label>
          </div>

          <div class="products-adding-extended__inputs-area">
            <div class="input-text input-text--small" :class="{ 'input-text--error': $v.weight.$error }">
              <label>
                <span>Вес <span>*</span></span>
                <input type="text" name="weight" id="weight" v-model="$v.weight.$model">
              </label>
            </div>
            <div class="input-text input-text--small" :class="{ 'input-text--error': $v.weight.$error }">
              <label>
                <span>Длина <span>*</span></span>
                <input type="text" name="length" id="length" v-model="$v.length.$model">
              </label>
            </div>
            <div class="input-text input-text--small" :class="{ 'input-text--error': $v.weight.$error }">
              <label>
                <span>Высота <span>*</span></span>
                <input type="text" name="height" id="height" v-model="$v.height.$model">
              </label>
            </div>
            <div class="input-text input-text--small" :class="{ 'input-text--error': $v.weight.$error }">
              <label>
                <span>Ширина <span>*</span></span>
                <input type="text" name="width" id="width" v-model="$v.width.$model">
              </label>
            </div>
          </div>

          <div class="input-text input-text--product-description">
            <label>
              <span>Описание товара</span>
              <input type="text" name="description" id="description" v-model="description"></input>
            </label>
          </div>

          <div class="products-adding-extended__inputs-area">
            <div class="input-text input-text--small" :class="{ 'input-text--error': $v.weight.$error }">
              <label>
                <span>Цена <span>*</span></span>
                <input type="text" name="price" id="price" v-model="$v.price.$model">
              </label>
            </div>
            <div class="input-text input-text--small">
              <label>
                <span>До скидки</span>
                <input type="text" name="beforeDiscount" id="beforeDiscount" v-model="beforeDiscount">
              </label>
            </div>
            <div class="input-text input-text--small">
              <label>
                <span>Premium</span>
                <input type="text" name="premium" id="premium" v-model="premium">
              </label>
            </div>
          </div>
          <div class="products-adding-extended__item">
            <p class="products-adding-extended__item-title products-adding-extended__item-title--font-weight-normal">НДС (налог на добавочную стоимость) <span>*</span></p>
            <div class="products-adding-extended__item-case">
              <div class="products-adding-extended__item-inner products-adding-extended__item-inner--way-to-add" v-if="nds.type === 'nds'">
                <div class="input-radio">
                  <label>
                    <input type="radio" name="size" value="10%" v-model="nds.ndsSize.value">
                    <span class="input-radio__wrapper">
                      <span class="input-radio__new" />
                      <span class="input-radio__text">10%</span>
                    </span>
                  </label>
                </div>
                <div class="input-radio">
                  <label>
                    <input type="radio" name="size" value="20%" v-model="nds.ndsSize.value">
                    <span class="input-radio__wrapper">
                            <span class="input-radio__new" />
                            <span class="input-radio__text">20%</span>
                          </span>
                  </label>
                </div>
                <div class="input-radio">
                  <label>
                    <input type="radio" name="size" value="not-tax" v-model="nds.ndsSize.value">
                    <span class="input-radio__wrapper">
                      <span class="input-radio__new" />
                      <span class="input-radio__text input-radio__text--white-space-pre">Не облагается</span>
                    </span>
                  </label>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="products-adding-extended__form-inputs products-adding-extended__form-inputs--type wait-loading">
          <div class="input-text" :class="{ 'input-text--error': $v.productType.$error }">
            <label>
              <span>Тип <span>*</span></span>
              <input type="text" name="productType" id="productType" v-model="$v.productType.$model">
            </label>
          </div>

          <div class="input-text">
            <label>
              <span>Страна изготовитель</span>
              <input type="text" name="manufacturer" id="manufacturer" v-model="manufacturer">
            </label>
          </div>

          <div class="input-text">
            <label>
              <span>Год выпуска</span>
              <input type="text" name="year" id="year" v-model="year">
            </label>
          </div>

          <div class="products-adding-extended__inputs-area">
            <div class="input-text input-text--small">
              <label>
                <span>Мин. диагональ</span>
                <input type="text" name="diagonal-min" id="diagonal-min" v-model="diagonal.min">
              </label>
            </div>

            <div class="input-text input-text--small">
              <label>
                <span>Макс. диагональ</span>
                <input type="text" name="diagonal-max" id="diagonal-max" v-model="diagonal.max">
              </label>
            </div>
          </div>


          <div class="input-text">
            <label>
              <span>Партномер</span>
              <input type="text" name="partNumber" id="partNumber" v-model="partNumber">
            </label>
          </div>

          <div class="input-text">
            <label>
              <span>Материал</span>
              <input type="text" name="material" id="material" v-model="material">
            </label>
          </div>

          <div class="input-text">
            <label>
              <span>Комплектация</span>
              <input type="text" name="equipment" id="equipment" v-model="equipment">
            </label>
          </div>

          <div class="input-text">
            <label>
              <span>Особенности</span>
              <input type="text" name="features" id="features" v-model="features">
            </label>
          </div>

          <div class="input-text">
            <label>
              <span>Гарантия</span>
              <input type="text" name="guarantee" id="guarantee" v-model="guarantee">
            </label>
          </div>

          <div class="input-text">
            <label>
              <span>Цвет</span>
              <input type="text" name="color" id="color" v-model="color">
            </label>
          </div>

          <div class="input-text">
            <label>
              <span>Номер модели</span>
              <input type="text" name="modelNumber" id="modelNumber" v-model="modelNumber">
            </label>
          </div>

          <div class="input-text">
            <label>
              <span>Изображения для аннотации</span>
              <input type="text" name="img" id="img" v-model="img">
            </label>
          </div>

          <div class="input-text">
            <label>
              <span>Объеденить на одной карточке</span>
              <input type="text" name="combineInOneCard" id="combineInOneCard" v-model="combineInOneCard">
            </label>
          </div>

          <div class="input-checkbox">
            <input type="checkbox" name="used-good" id="used-good" v-model='usedGoods'>
            <label for="used-good" class="input-checkbox__wrapper">
              <span class="input-checkbox__new">
                <svg-icon name="check"/>
              </span>
              <span class="input-checkbox__text">Товар бывший в употреблении</span>
            </label>
          </div>


        </div>
        <div class="products-adding-extended__form-inputs products-adding-extended__form-inputs--photo-video-area">
          <div class="input-file input-text" :class="{ 'input-text--error': $v.productPhotoValid.$error }">
            <p class="input-file__item-title">Фото товара <span>*</span></p>
            <input type="text" v-model="$v.productPhotoValid.$model">
            <div class="input-file__file-wrapper">
              <label :class="{ 'input-file--error': $v.productPhotoValid.$error }">
                <div class="input-file__plus-ico"></div>
                <input class="input-text__border-none input-file__photo" type="file" name="productPhoto" id="productPhoto1" ref="productPhoto1"
                  v-on:change="handleFileUpload(1)">
                <div class="input-file__add-photo-ico"><svg-icon name="check"/></div>
              </label>
              <label>
                <div class="input-file__plus-ico"></div>
                <input class="input-text__border-none input-file__photo" type="file" name="productPhoto" id="productPhoto2" ref="productPhoto2"
                  v-on:change="handleFileUpload(2)">
                <div class="input-file__add-photo-ico"><svg-icon name="check"/></div>
              </label>
              <label>
                <div class="input-file__plus-ico"></div>
                <input class="input-text__border-none input-file__photo" type="file" name="productPhoto" id="productPhoto3" ref="productPhoto3"
                  v-on:change="handleFileUpload(3)">
                <div class="input-file__add-photo-ico"><svg-icon name="check"/></div>
              </label>
            </div>
            <div class="input-file__file-wrapper">
              <label>
                <div class="input-file__plus-ico"></div>
                <input class="input-text__border-none" type="file" name="productPhoto" id="productPhoto4" ref="productPhoto4"
                  v-on:change="handleFileUpload(4)">
                <div class="input-file__add-photo-ico"><svg-icon name="check"/></div>
              </label>
              <label>
                <div class="input-file__plus-ico"></div>
                <input class="input-text__border-none" type="file" name="productPhoto" id="productPhoto5" ref="productPhoto5"
                  v-on:change="handleFileUpload(5)">
                <div class="input-file__add-photo-ico"><svg-icon name="check"/></div>
              </label>
              <label>
                <div class="input-file__plus-ico"></div>
                <input class="input-text__border-none" type="file" name="productPhoto" id="productPhoto6" ref="productPhoto6"
                  v-on:change.prevent="handleFileUpload(6)">
                <div class="input-file__add-photo-ico"><svg-icon name="check"/></div>
              </label>
            </div>
          </div>

          <div class="products-adding-extended__info-text-area">
            <p class="products-adding-extended__info-text">Формат JPEG или PNG</p>
            <p class="products-adding-extended__info-text">Разрешение от 70 до 1600рх</p>
            <p class="products-adding-extended__info-text">Фон белый- белые поля не более 2 пикселей от границы товара</p>
            <br>
            <p class="products-adding-extended__info-text">Запрещены: логотипы, вводные знаки, цены, надписи, алкогольная
              тематика и эскизы товара (например 3д модель)</p>
          </div>

          <div class="input-text">
            <label>
              <span>Название видеоролика</span>
              <input type="text" name="videoName" id="videoName" v-model="videoName">
            </label>
          </div>

          <div class="input-text">
            <label>
              <span>Код ролика на YouTube</span>
              <input type="text" name="videoCode" id="videoCode" v-model="videoCode">
            </label>
          </div>

        </div>
        <div class="products-adding-extended__btn-submit-wrapper">
<!--          <button class="btn-main btn&#45;&#45;green-invert products-adding-extended__form-btn" type="button">Предпросмотр товара</button>-->
          <button class="btn-main btn--green products-adding-extended__form-btn" type="submit">Добавить товар</button>
        </div>

      </form>
    </div>

<!--    <div class="dataPicker dataPicker&#45;&#45;custom">-->
<!--      <date-picker class="dataPicker__item" v-model="time1" :lang="lang" format="DD-MM-YYYY" ></date-picker>-->
<!--    </div>-->
  </div>
</template>

<script>
  import Radiobutton from '../../../components/radiobutton';

  import { mapActions } from 'vuex';
  import { minLength, required } from "vuelidate/lib/validators";
  import DatePicker from 'vue2-datepicker';
  // import 'vue2-datepicker/scss/index.scss';
  import 'assets/styles/modules/vue-2-datepicker/index.scss';
  export default {
    name: "products-adding-extended",
    components: { DatePicker, Radiobutton },
    data:() => {
      return{
        wayToAdd: {
          type: 'wayToAdd',
          way: {
            value: 'manually',
          },
        },
        marketplace: {
          type: 'marketplace',
          market: {
            value: 'Ozon'
          }
        },
        name: '',
        brand: '',
        barcode: '',
        categories: '',
        vendor_code: '',
        weight: '',
        length: '',
        height: '',
        width: '',
        description: '',
        price: '',
        beforeDiscount: '',
        premium: '',
        nds: {
          type: 'nds',
          ndsSize: {
            value: '10%',
          },
        },

        productType: '',
        manufacturer: '',
        year: '',
        diagonal: {
          min: '',
          max: '',
        },
        partNumber: '',
        material: '',
        equipment: '',
        features: '',
        guarantee: '',
        color: '',
        modelNumber: '',
        img: '',
        combineInOneCard: '',
        usedGoods: false,

        productPhoto: [],
        productPhotoValid: '',
        videoName: '',
        videoCode: '',

        lang: {
          formatLocale: {
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            // MMM
            monthsShort: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            // dddd
            weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            // ddd
            weekdaysShort: ['Sun', 'Пон', 'Вт', 'Ср', 'Чт', 'Пт', 'Вс'],
            // dd
            weekdaysMin: ['Вс', 'По', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            firstDayOfWeek: 0,
            // first week contains January 1st.
            firstWeekContainsDate: 1,
            // format 'a', 'A'
          },

        },
        time1: new Date,
        time2: '',
        time3: '',
      }
    },
    head: () => {
      return {
        title: 'Добавление товара на POPSO.ru'
      }
    },
    methods: {
      ...mapActions({
        CreateNewProduct: 'products/CreateProduct'
      }),
      handleFileUpload(id){
        let files = this.$refs[`productPhoto${id}`].files;
        let input = this.$refs[`productPhoto${id}`];
        if (files.length === 0){
          if (this.productPhoto[id] !== null){
            delete this.productPhoto[id];
          }
          let rezult = this.productPhoto.filter(el => el != null);
          if (rezult.length === 0 ){
            this.productPhoto = rezult
          }
          this.$v.productPhotoValid.$model = this.productPhoto.length ? this.productPhoto.length : '';
          input.previousElementSibling.style = '';
          input.parentNode.style = '';
          // console.log(this.productPhoto)
          return;
        } else {
          this.productPhoto[id] = files[0];
          this.$v.productPhotoValid.$model = this.productPhoto.length ? this.productPhoto.length : '';
        }
        // console.log(this.productPhoto);
        input.previousElementSibling.style.display = 'none';
        var fr = new FileReader();

        // input.parentNode.style.backgroundColor = `url(${fr.result})`;
        fr.addEventListener("load", function () {
          input.parentNode.style.backgroundColor = "url(" + fr.result + ")";
        }, false);
        fr.readAsDataURL(files[0]);
      },

      CreateProduct(){
        this.$v.$touch();

        const ProductData = {
          wayToAdd: this.wayToAdd,
          marketplace: this.marketplace,

          name: this.name,
          brand: this.brand,
          barcode: this.barcode,
          categories: this.categories,
          vendor_code: this.vendor_code,
          weight: this.weight,
          length: this.length,
          height: this.height,
          width: this.width,
          description: this.description,
          price: this.price,
          beforeDiscount: this.beforeDiscount,
          premium: this.premium,

          productType: this.productType,
          manufacturer: this.manufacturer,
          year: this.year,
          diagonal: {
            min: this.diagonal.min,
            max: this.diagonal.max,
          },
          partNumber: this.partNumber,
          material: this.material,
          equipment: this.equipment,
          features: this.features,
          guarantee: this.guarantee,
          color: this.color,
          modelNumber: this.modelNumber,
          img: this.img,
          combineInOneCard: this.combineInOneCard,
          usedGoods: this.usedGoods,

          productPhoto: this.productPhoto.filter(element => element !== null),
          videoName: this.videoName,
          videoCode: this.videoCode,
        };
        if (!this.$v.$invalid){
          this.CreateNewProduct(ProductData);

          this.$router.push('/products');
        }
      }
    },
    validations: {
      name: {
        required,
        minLength: minLength(4),
      },
      brand: {
        required,
        minLength: minLength(2)
      },
      barcode: {
        required,
        minLength: minLength(3)
      },
      categories: {
        required,
        minLength: minLength(3)
      },
      vendor_code: {
        required,
        minLength: minLength(4)
      },
      weight: {
        required,
        minLength: minLength(1)
      },
      length: {
        required,
        minLength: minLength(1)
      },
      height: {
        required,
        minLength: minLength(1)
      },
      width: {
        required,
        minLength: minLength(1)
      },
      description: {
        minLength: minLength(4)
      },
      price: {
        required,
        minLength: minLength(1)
      },
      productType: {
        required,
        minLength: minLength(1)
      },

      productPhoto: {
        required,
      },
      productPhotoValid: {
        required,
        minLength: minLength(1)
      }
    }
  }
</script>

<style lang="scss">
  .products-adding-extended {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-grow: 1;

    &__form-inputs {
      width: 100%;
      height: auto;

      margin-bottom: 2.4rem;

      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 5.6rem;
      grid-row-gap: 0;

      background-color: $color-main--white;

      padding: 2.4rem 4.8rem;

      &--way-to-add{
        grid-template-columns: 1fr;
      }

      &--photo-video-area{
        grid-template-columns: 1fr 1fr;
        .input-file{
          label{
            position: relative;
            background-color: #fff;
            justify-content: center;
            align-items: center;
            display: flex;
            cursor: pointer;
            margin-bottom: 1rem;
            width: 8.7rem;
            /*width: 28.7rem;*/
            height: 8.0rem;
            /*height: 18.0rem;*/
            border: 1px solid $color-main--lightgray;

            .input-file__plus-ico{
              position: relative;
              width: 100%;
              height: 100%;
              background-color: white;
              z-index: 2;

              &:after,
              &:before{
                position: absolute;
                content: '';
                width: 0.1rem;
                height: 3.5rem;
                top: 2rem;
                left: 4.3rem;
                background-color: $color-main--darkgray;
              }

              &:before{
                transform: rotate(90deg);
              }
            }

            .input-file__add-photo-wrapper{
              position: absolute;
            }

            .input-file__add-photo-ico{
              position: absolute;
              fill: $color-main--green;

              svg{
                width: 4rem;
                height: 4rem;
              }
            }
          }

          input{
            opacity: 0;
            overflow: hidden;
            z-index: -1;
            display: none;
          }

          &__item-title{
            margin-bottom: 0.2rem;
            margin-top: 1.6rem;
            font-size: 1.6rem;
            line-height: 2.8rem;
            color: $color-main--darkgray;
            span{
              font-size: inherit;
              color: $color-main--red;
            }
          }

          &__file-wrapper{
            display: flex;


            label{
              margin-bottom: 1.6rem;

              &:not(:first-child){
                margin-left: 1.8rem;
              }
            }
          }

          .input-file--error{
            border-color: $color-main--red;
          }
        }
      }

    @include mobile {
      padding: 2.4rem 1.6rem;

      grid-template-columns: 1fr;
      grid-column-gap: 0;
    }
  }

  &__form-btn {
    width: auto;
    min-height: 4.8rem;
    font-size: 1.6rem;
    line-height: 2.4rem;
    padding: 0 2.4rem;

    &:not(:first-child){
      margin-left: 2.6rem;
    }

    @include mobile {
      width: 100%;
      margin-left: 0;
    }
  }

  &__inputs-area{
    display: flex;
    align-items: flex-end;
  }

  .input-text {
    display: block;
    margin-bottom: 0;

    &__border-none{
      border: none;
    }

    &--small{
      span{
        white-space: pre;
      }
    }

    &--small:not(:last-child){
      margin-right: 2.7rem;
    }

    &--mtopauto{
      margin-top: auto;
    }

    &--product-description{
      grid-row: 4/6;

      label{
        height: 100%;
      }
    }

    @include mobile {
      margin-bottom: 24px;
    }

    label {
      & > span {
        margin-bottom: 0.2rem;
        margin-top: 1.6rem;
        font-size: 1.4rem;
        line-height: 2.8rem;
        color: $gray-main;

        @include tablet {
          font-size: 1.2rem;
        }

        span {
          font-size: inherit;
          color: $red-main;
        }
      }
    }

    input {
      min-height: 1rem;
      padding: 0.4rem 0;
      line-height: 3.2rem;

      @include mobile {
        min-height: 1rem;
        padding: 0 0 0.8rem 0;
      }

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    &--error{
      input{
        border-bottom: 0.2rem solid $color-main--red;
      }
    }
  }

  &__info-text-area{
    margin-top: 4.5rem;
  }

  &__info-text{
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.6rem;
    color: $color-main--darkgray;
  }

  &__btn-submit-wrapper{
    display: flex;
    justify-content: flex-end;
  }

  .input-radio__text{
    white-space: pre;
  }

  &__item-case{
    width: 100%;
  }

  &__item-title{
    margin: 2rem 0 0 0;
    font-weight: bold;
    font-size: 1.4rem;
    line-height: 1.6rem;
    color: $color-main--darkgray;

    @include tablet {
      font-size: 1.2rem;
    }

    &--font-weight-normal{
      font-weight: normal;
    }

    span{
      font-size: 1.6rem;
      color: $color-main--red
    }
  }

  &__radio-btn-wrapper{

  }

  &__item-inner{

    &--way-to-add{
      width: 100%;
      height: auto;
      margin-top: 2.4rem;
      padding-left: 0;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      justify-content: stretch;
      grid-column-gap: 2rem;
      grid-row-gap: 1.6rem;

      @include mobile{
        grid-template-columns: repeat(1, 1fr);
      }
    }
  }
}

.dataPicker.dataPicker--custom{
  display: flex;
  margin: 4rem;

  .dataPicker__item{
    padding: 2rem;
  }
  .mx-calendar.mx-calendar-panel-date{
    display: none;
  }
  .mx-calendar-content {
    .cell:hover {
      color: #9c1e00;
      background-color: #0700fe;
    }

  }
  .mx-calendar-content .cell.active {
    color: #fff;
    background-color: #16e700;
  }
}
</style>
