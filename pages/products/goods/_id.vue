<template>
  <div class="lk-products">
    <div class="lk-products__head">
      <h1>Goods</h1>
      <button type="button" class="lk-products__refresh" @click="$store.dispatch('products/goods/UpdateProductsData')">Обновить данные</button>
    </div>
    <div class="lk-products__wrapper">
      <div class="lk-products__inner">
        <div class="lk-products__container">
          <ul class="lk-products__list" v-if="products.length > 0">
            <li class="lk-products__item" v-for="(item, index) in products" :key="item.product_id">

              <div class="lk-products__item-wrapper">

              </div>
            </li>
          </ul>
          <div class="lk-products__helper-text" v-else>
            <p>Проверьте кооректность введённых данных в <nuxt-link to="/">Профиле</nuxt-link></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "products-ozon",
    async mounted() {
      if (this.$store.getters['products/goods/Products'].length === 0){
        await this.$store.dispatch('products/goods/GetProducts');
      }

      if (this.$store.getters['products/goods/ProductsList'].length === 0){
        await this.$store.dispatch('products/goods/GetProductsList');
      }
    },
    computed:{
      products(){
        return this.$store.getters['products/goods/Products'];
      },
      ProductsList(){
        return this.$store.getters['products/goods/ProductsList'];
      }
    }
  }
</script>
