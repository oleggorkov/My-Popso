<template>
  <div class="container">
    <div class="container__head">
      <nuxt-link to="/products" class="container__head-breadcrumbs">
        <svg-icon name="arrow-big" />
        Ваши товары
      </nuxt-link>
      <h1>Добавление товара</h1>
    </div>
    <div class="products-adding">
      <form @submit.prevent="CreateProduct">
        <div class="products-adding__form-inputs">
          <input-text
            :class="{ 'input-text--error': $v.name.$error }"
            :helper-text="$v.name.$error ? 'Заполните обязательное поле. Минимум 4 символа' : ''"
            :id="'product-name'"
            :lazy="true"
            :name="'product-name'"
            :title="'Название товара'"
            :type="'text'"
            :required="true"
            v-model="$v.name.$model"
          />

          <input-text
            :class="{ 'input-text--error': $v.price.$error }"
            :helper-text="$v.price.$error ? 'Заполните обязательное поле. Минимум 4 символа' : ''"
            :id="'price'"
            :lazy="true"
            :name="'price'"
            :title="'Цена'"
            :type="'number'"
            :max-lengths="7"
            :required="true"
            v-model="$v.price.$model"
          />

          <input-text
            :class="{ 'input-text--error': $v.vendor_code.$error }"
            :helper-text="$v.vendor_code.$error ? 'Заполните обязательное поле. Минимум 4 символа' : ''"
            :id="'article'"
            :lazy="true"
            :name="'article'"
            :title="'Артикул'"
            :type="'text'"
            :required="true"
            v-model="$v.vendor_code.$model"
          />

          <input-text
            :id="'barcode'"
            :lazy="true"
            :name="'barcode'"
            :title="'Штрихкод / баркод EAN-13'"
            :type="'number'"
            :max-lengths="13"
            v-model="barcode"
          />

          <input-text
            :id="'stock-balance'"
            :lazy="true"
            :name="'stock-balance'"
            :title="'Остаток на складе, шт'"
            :type="'number'"
            :max-lengths="7"
            v-model="stock"
          />
        </div>

        <button class="btn-main btn--green products-adding__form-btn" type="submit">Добавить товар</button>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { minLength, required } from "vuelidate/lib/validators";
  import InputText from "../../../components/input-text";

  export default {
    name: "products-adding",
    components: {InputText},
    data:() => {
      return{
        vendor_code: '',
        name: '',
        barcode: '',
        price: '',
        stock: '',
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
      CreateProduct(){
        this.$v.$touch();

        const ProductData = {
          name: this.name,
          barcode: this.barcode,
          stock: {
            present: this.stock
          },
          vendor_code: this.vendor_code,
          price: {
            current: this.price
          },
        };

        if (!this.$v.$invalid){
          this.CreateNewProduct(ProductData);
        }
      }
    },
    validations: {
      name: {
        required,
        minLength: minLength(4)
      },
      price: {
        required,
        minLength: minLength(1)
      },
      vendor_code: {
        required,
        minLength: minLength(4)
      }
    }
  }
</script>

<style lang="scss">
  .products-adding {
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
      grid-row-gap: 2.4rem;

      background-color: $color-main--white;
      border-radius: 1rem;

      padding: 2.4rem 4.8rem;

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
      margin-left: auto;
      padding: 0 2.4rem;

      @include mobile {
        width: 100%;
        margin-left: 0;
      }
    }
  }
</style>
