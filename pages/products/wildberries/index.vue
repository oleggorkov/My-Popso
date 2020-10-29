<template>
  <div class="lk-products">
    <div class="lk-products__head">
      <h1>Wildberries</h1>
      <button type="button" class="lk-products__refresh" @click="$store.dispatch('products/wildberries/UpdateProductsData')">Обновить данные</button>
    </div>
    <div class="lk-products__wrapper">
      <div class="lk-products__inner">
        <!--
        <div class="lk-products__container">
          <ul class="lk-products__list" v-if="products.length > 0">
            <li class="lk-products__item" v-for="(item, index) in products" :key="`wildberries-item-${index}`">
              <div class="lk-products__item-wrapper">

                <span>Название: <strong>{{item.subject}}</strong></span>
                <span>Артикул: {{item.supplierArticle}}</span>
                <span>Штрихкод: {{item.barcode}}</span>
                <span>Категория: {{item.category}}</span>
                <span>Количество(доступно для продажи): {{item.quantity}}</span>
                <span>Количество(доступно(числится на складе и при этом не в заказе)): {{item.quantityNotInOrders}}</span>
                <span>Цена: {{item.Price}}</span>
                <span>Скидка: {{item.Discount}}</span>

                <span>Бренд: {{item.brand}}</span>
                <span>Дней на сайте: {{item.daysOnSite}}</span>
                <span>В пути от клиента: {{item.inWayFromClient}}</span>
                <span>В пути к клиенту: {{item.inWayToClient}}</span>
                <span>Договор реализации: {{item.isRealization}}</span>
                <span>Договор поставки: {{item.isSupply}}</span>
                <span>Дата последнего изменения: {{item.lastChangeDate}}</span>
                <span>Код WB: {{item.nmId}}</span>
                <span>Количество(полное): {{item.quantityFull}}</span>
                <span>Ваш артикул: {{item.supplierArticle}}</span>
                <span>Размер: {{item.techSize}}</span>
                <span>Название склада: {{item.warehouseName}}</span>

              </div>
            </li>
          </ul>
        </div>
         -->
        <vue-custom-scrollbar class="lk-products__container" :tagname="'div'">
          <table v-if="products.length > 0">
            <thead>
              <tr role="row">
                <th>Название</th>
                <th>Артикул</th>
                <th>Штрихкод</th>
                <th>Категория</th>
                <th>Количество <br> (доступно для продажи)</th>
                <th>Количество <br> (доступно, на складе, не в заказе)</th>
                <th>Цена</th>
                <th>Скидка</th>
                <th>Бренд</th>
                <th>Дней на сайте</th>
                <th>В пути от клиента</th>
                <th>В пути к клиенту</th>
                <th>Договор реализации</th>
                <th>Договор поставки</th>
                <th>Дата последнего изменения</th>
                <th>Код WB</th>
                <th>Количество <br> (полное)</th>
                <th>Размер</th>
                <th>Название склада</th>
              </tr>
            </thead>
            <tbody>
              <tr role="row" v-for="(item, index) in products" :key="`wildberries-item-${index}`">
                <td>{{item.subject}}</td>
                <td>{{item.supplierArticle}}</td>
                <td>{{item.barcode}}</td>
                <td>{{item.category}}</td>
                <td>{{item.quantity}}</td>
                <td> {{item.quantityNotInOrders}}</td>
                <td>{{item.Price}}</td>
                <td>{{item.Discount}}</td>
                <td>{{item.brand}}</td>
                <td>{{item.daysOnSite}}</td>
                <td>{{item.inWayFromClient}}</td>
                <td>{{item.inWayToClient}}</td>
                <td>{{item.isRealization}}</td>
                <td>{{item.isSupply}}</td>
                <td>{{item.lastChangeDate}}</td>
                <td>{{item.nmId}}</td>
                <td>{{item.quantityFull}}</td>
                <td>{{item.techSize}}</td>
                <td>{{item.warehouseName}}</td>
              </tr>
            </tbody>
          </table>
          <div class="lk-products__helper-text" v-else>
            <p>Проверьте корректность введённых данных в <nuxt-link to="/">Профиле</nuxt-link></p>
          </div>
        </vue-custom-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import vueCustomScrollbar from 'vue-custom-scrollbar';

  export default {
    name: "products-wildberries",
    components:{
      vueCustomScrollbar
    },
    mounted(){
      if (this.products.length === 0){
        this.GetProducts();
      }
    },
    computed:{
      ...mapGetters({
        products: 'products/wildberries/Products',
      }),
    },
    methods:{
      ...mapActions({
        GetProducts: 'products/wildberries/GetProducts'
      })
    }
  }
</script>

