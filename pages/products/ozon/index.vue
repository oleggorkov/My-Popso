<template>
  <div class="lk-products">
    <div class="lk-products__head">
      <h1>Ozon</h1>
      <button type="button" class="lk-products__refresh" @click="UpdateProducts(0)">Обновить данные</button>
    </div>
    <div class="lk-products__wrapper">
      <div class="lk-products__inner">
        <vue-custom-scrollbar class="lk-products__container" :tagname="'div'">
          <table v-if="(products['0'] !== undefined) && products['0'].length > 0">
            <thead>
            <tr role="row">
              <th>Название</th>
              <th>Артикул</th>
              <th>Айди</th>
              <th>Штрихкод</th>
              <th>Категория <br> (айди)</th>
              <th>Запасы <br> (ожидается)</th>
              <th>Запасы <br> (осталось)</th>
              <th>Запасы <br> (зарезервировано)</th>
              <th>Цена</th>
              <th>Старая цена</th>
              <th>Рекомендованная цена</th>
              <th>Минимальная цена на озоне</th>
              <th>Ссылки на фото</th>
            </tr>
            </thead>
            <tbody>
            <tr role="row" v-for="(item, index) in products['0']" :key="`wildberries-item-${index}`">
              <td>{{item.name}}</td>
              <td>{{item.offer_id}}</td>
              <td>{{item.id}}</td>
              <td>{{item.barcode}}</td>
              <td>{{item.category_id}}</td>
              <td>{{item.stocks.coming}}</td>
              <td>{{item.stocks.present}}</td>
              <td>{{item.stocks.reserved}}</td>
              <td>{{item.price.split('.')[0]}}</td>
              <td>{{item.old_price.split('.')[0]}}</td>
              <td>{{item.recommended_price.split('.')[0]}}</td>
              <td>{{item.min_ozon_price.split('.')[0]}}</td>
              <td>
                <a :href="image" target="_blank" v-for="image in item.images">{{image}}</a>
              </td>
            </tr>
            </tbody>
          </table>
          <div class="lk-products__helper-text" v-else>
            <p>Проверьте корректность введённых данных в <nuxt-link to="/">Профиле</nuxt-link></p>
          </div>
        </vue-custom-scrollbar>
      </div>
      <div class="lk-products__inner">
        <div class="lk-products__pagination">
          <div class="lk-products__pagination-wrapper">
            <nuxt-link v-for="(item, index) in Math.ceil(ProductsList.length / 10)" :to="`/products/ozon/${item}`" :key="`ozon-link-${index}`" :class="item === 1 ? 'nuxt-link-active' : ''">{{item}}</nuxt-link>
          </div>
        </div>
      </div>

      <transition name="lk-products--loading">
        <div class="lk-products--loading" v-if="LoadingState"/>
      </transition>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import vueCustomScrollbar from 'vue-custom-scrollbar';

  export default {
    name: "products-ozon",
    components: {
      vueCustomScrollbar
    },
    async mounted() {
      if ((Object.keys(this.products.length === 0) || (this.products['0'].length === 0))){
        await this.GetProducts(0);
      }

      if (this.ProductsList.length === 0){
        await this.GetProductsList();
      }
    },
    computed:{
      ...mapGetters({
        products: 'products/ozon/Products',
        ProductsList: 'products/ozon/ProductsList',
        LoadingState: 'products/ozon/LoadingState'
      }),
    },
    methods: {
      ...mapActions({
        GetProducts: 'products/ozon/GetProducts',
        GetProductsList: 'products/ozon/GetProductsList',
        UpdateProducts: 'products/ozon/UpdateProductsData'
      }),
    }
  }
</script>
