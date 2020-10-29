<template>
  <div class="container">
    <div class="container__head">
      <nuxt-link to="/orders" class="container__head-breadcrumbs">
        <svg-icon name="arrow-big" />
        Мои заказы
      </nuxt-link>
      <h1>Заказ {{orderNumber}}</h1>
    </div>
    <div class="buyer-orders">
      <div class="buyer-orders__table-wrapper">
        <div class="buyer-orders__table">
          <div class="buyer-orders__table-thead-wrapper">
            <div class="buyer-orders__table-thead">
              <div class="buyer-orders__table-cell buyer-orders__table-cell--head buyer-orders__table-cell--darkgray buyer-orders__table-cell--product">Товар</div>
              <div class="buyer-orders__table-cell buyer-orders__table-cell--head buyer-orders__table-cell--darkgray buyer-orders__table-cell--count">Количество</div>
              <div class="buyer-orders__table-cell buyer-orders__table-cell--head buyer-orders__table-cell--darkgray buyer-orders__table-cell--in-store">На складе</div>
              <div class="buyer-orders__table-cell buyer-orders__table-cell--head buyer-orders__table-cell--darkgray buyer-orders__table-cell--price">Цена</div>
              <div class="buyer-orders__table-cell buyer-orders__table-cell--head buyer-orders__table-cell--darkgray buyer-orders__table-cell--sum">Сумма</div>
            </div>
          </div>
          <div v-for="item in Order[$route.params.id]" :key="item.id"
              class="buyer-orders__table-row-wrapper buyer-orders__table-row--cursor-default">
            <div class="buyer-orders__table-row">
              <div class="buyer-orders__table-cell buyer-orders__table-cell--black buyer-orders__table-cell--product">{{ item.product }}</div>
              <div class="buyer-orders__table-cell buyer-orders__table-cell--black buyer-orders__table-cell--count">{{ item.count }} шт</div>
              <div class="buyer-orders__table-cell buyer-orders__table-cell--black buyer-orders__table-cell--in-store">{{ item.inStore }} шт</div>
              <div class="buyer-orders__table-cell buyer-orders__table-cell--black buyer-orders__table-cell--price">{{ item.price }}</div>
              <div class="buyer-orders__table-cell buyer-orders__table-cell--black buyer-orders__table-cell--sum">{{ item.sum }}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <button type="button" class="btn-main btn--green buyer-orders__btn-confirm" @click="ConfirmOrder">Подтвердить заказ</button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: "order",
    data: () => {
      return {
      }
    },
    async mounted() {
    },
    methods: {
      ConfirmOrder(){
        this.$router.push({
          path: `/orders`,
        });
      }
    },
    computed: {
      ...mapGetters({
        Orders: 'orders/Orders',
        Order: 'orders/Order',
      }),
      orderNumber(){
        return this.Orders.filter(item => item.id == this.$route.params.id)[0].orderNumber
      }
    },
  }
</script>

<style lang="scss">
  .buyer-order{
  }


</style>
