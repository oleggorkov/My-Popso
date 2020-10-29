<template>
  <div class="container">
    <div class="container__head">
      <h1>Заказы</h1>
    </div>
    <div class="buyer-orders">
      <div class="buyer-orders__table-wrapper" v-if="Orders.length > 0">
        <div class="buyer-orders__table">
          <div class="buyer-orders__table-thead-wrapper">
            <div class="buyer-orders__table-thead">
              <div class="buyer-orders__table-cell buyer-orders__table-cell--head buyer-orders__table-cell--darkgray
            buyer-orders__table-cell--order-number">Номер заказа</div>
              <div class="buyer-orders__table-cell buyer-orders__table-cell--head buyer-orders__table-cell--darkgray
            buyer-orders__table-cell--date">Дата</div>
              <div class="buyer-orders__table-cell buyer-orders__table-cell--head buyer-orders__table-cell--darkgray
             buyer-orders__table-cell--sum">Сумма</div>
              <div class="buyer-orders__table-cell buyer-orders__table-cell--head buyer-orders__table-cell--darkgray
            buyer-orders__table-cell--state">Статус</div>
              <div class="buyer-orders__table-cell buyer-orders__table-cell--head buyer-orders__table-cell--darkgray
             buyer-orders__table-cell--confirmation-time">Срок подтверждения</div>
              <div class="buyer-orders__table-cell buyer-orders__table-cell--head buyer-orders__table-cell--darkgray
            buyer-orders__table-cell--marketplace">Маркетплейс</div>
            </div>
          </div>
          <div v-for="(item) in Orders" :key="`orderId-${item.id}`" class="buyer-orders__table-row-wrapper"
               @click="OpenOrderPage(item)">
            <div class="buyer-orders__table-row">
              <div class="buyer-orders__table-cell buyer-orders__table-cell--black buyer-orders__table-cell--order-number">{{ item.orderNumber }}</div>
              <div class="buyer-orders__table-cell buyer-orders__table-cell--darkgray buyer-orders__table-cell--date">{{ item.date }}</div>
              <div class="buyer-orders__table-cell buyer-orders__table-cell--black buyer-orders__table-cell--sum">{{ item.sum }} &#8381</div>
              <div class="buyer-orders__table-cell buyer-orders__table-cell--state" v-bind:class="`buyer-orders__table-cell--${item.stateColor}`">{{ item.stateText }}</div>
              <div class="buyer-orders__table-cell buyer-orders__table-cell--darkgray buyer-orders__table-cell--confirmation-time">{{ item.confirmationTime }}</div>
              <div class="buyer-orders__table-cell buyer-orders__table-cell--black buyer-orders__table-cell--marketplace">{{ item.marketPlace }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="buyer-orders-empty" v-else>
        <p class="buyer-orders-empty__text">У вас еще не было заказов</p>
        <img src="../../assets/images/empty/orders-empty-2.png" alt="orders-empty">
<!--        <svg-icon name="orders-empty-2"/>-->
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters} from 'vuex';

  export default {
    name: "orders",
    // async mounted(){
    //   console.log(this.Orders);
    //   await this.Orders();
    //
    // },
    computed: {
      ...mapGetters({
        Orders: 'orders/Orders',
      })
    },
    methods: {
      OpenOrderPage(item){
        this.$router.push({
          path: `/orders/${item.id}`,
          params: {id: item.id, orderNumber: item.orderNumber},
        });
      }
    }
  }

</script>

<style lang="scss">
  .buyer-orders{
    /*min-width: 52rem;*/
    margin-bottom: 4rem;

    border-radius: 1rem;

    &__table-wrapper{
      background-color: white;
      width: 100%;
      padding: 0 1.8rem 2.8rem;
    }

    &__table{
      border-collapse: collapse;
      width: 100%;
    }

    &__table-thead-wrapper{
      padding: 0 2rem;
    }

    &__table-thead{
      display: flex;
      align-items: center;
    }

    &__table-row-wrapper{
      padding: 0 2rem;

      transition: box-shadow ease 0.35s;

      &:hover{
        box-shadow: 0 0 0.5rem rgba(23, 61, 194, 0.15);
        background-color: white;
        border-radius: 1rem;
        .buyer-orders__table-cell{
          border-bottom: 0.1rem solid transparent;
        }
      }
    }

    &__table-row{
      cursor: pointer;
      display: flex;
      align-items: center;

      &--cursor-default{
        cursor: default;
      }

      &-empty{
        cursor: default;
        height: 2.9rem;
      }


    }

    &__table-cell{
      /*min-width: 12rem;*/
      /*width: 12.5rem;*/
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 2.0rem;
      text-align: left;
      padding: 2rem 1rem 1.4rem 0;
      border-bottom: 0.1rem solid $color-main--lightgray;
      width: 12rem;

      /*&:first-child{*/
      /*  padding: 0 2rem 0 0;*/
      /*  border-bottom: none;*/
      /*}*/

      /*&:last-child{*/
      /*  padding: 0 2rem 0 0;*/
      /*  border-bottom: none;*/
      /*}*/

      &--head{
        padding-top: 2.2rem;
        padding-bottom: 2.2rem;
      }

      // width
      &--order-number{
        /*width: 16rem;*/
        /*background-color: greenyellow;*/
      }

      &--date{
        /*width: 12rem;*/
        /*background-color: #BD0D22;*/
      }

      &--sum{
        /*width: 12rem;*/
        /*background-color: #6F849C;*/
      }

      &--state{
        width: 16rem;
        /*background-color: #398FF3;*/
      }

      &--confirmation-time{
        width: 20rem;
        /*background-color: orangered;*/
      }

      &--marketplace{
        /*width: 12rem;*/
        /*background-color: lemonchiffon;*/
      }

      &--product{
        width: 32rem;
      }

      &--count{
        width: 12rem;
      }

      //colors
      &--darkgray{
        color: $color-main--darkgray;
      }

      &--black{
        color: $color-main--black;
      }

      &--orange{
        color: $color-main--orange;
      }

      &--green{
        color: $color-main--green;
      }
    }

    &__btn-confirm{
      width: 26.1rem;
      height: 4.4rem;
      margin-left: 66rem;
    }
  }

  .buyer-orders-empty{
    width: 100%;
    margin: 1.6rem auto 0 auto;
    padding: 3.2rem 6.4rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: #FFFFFF;
    border-radius: 1rem;

    @include mobile {
      flex-direction: column;
    }

    &__text{
      font-weight: 500;
      font-size: 2rem;
      line-height: 3.2rem;
      color: $color-main--black;
    }
  }

</style>
