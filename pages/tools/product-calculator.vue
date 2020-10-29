<template>
  <div class="container">
    <div class="container__head">
      <h1>Калькулятор прибыльности товара при продаже на маркетплейсах</h1>
    </div>
    <div class="products-calculator">
      <div class="products-calculator__wrapper">
        <div class="products-calculator-main">
          <input-text
            :id="'price-retail'"
            :lazy="false"
            :name="'price-retail'"
            :title="'Розничная цена, руб.'"
            :type="'number'"
            :min="0"
            v-model.number="PriceRetail"
          >
            <template v-slot:title>
              <tooltip :key="'price-retail--tooltip'">
                Базовая цена товара, без скидок.
              </tooltip>
            </template>
          </input-text>
          <input-text
            :id="'prime-const'"
            :lazy="false"
            :name="'prime-const'"
            :title="'Себестоимость, руб.'"
            :type="'number'"
            :min="0"
            v-model.number="PrimeCost"
          >
            <template v-slot:title>
              <tooltip :key="'prime-const--tooltip'">
                Сколько стоит производство 1 шт или закупка товара.
              </tooltip>
            </template>
          </input-text>
          <input-text
            :id="'packing-price'"
            :lazy="false"
            :name="'packing-price'"
            :title="'Упаковка, хранение, руб.'"
            :type="'number'"
            :min="0"
            v-model.number="PackingPrice"
          >
            <template v-slot:title>
              <tooltip :key="'packing-price--tooltip'">
                Товар у вас, теперь его надо понятно, красиво и удобно упаковать и где-то хранить.
              </tooltip>
            </template>
          </input-text>
          <input-number
            :id="'discount-marketplace'"
            :lazy="false"
            :name="'discount-marketplace'"
            :title="'Скидка на маркетплейсе, %'"
            :range="[0, 99]"
            v-model="DiscountMarketplace"
          >
            <template v-slot:title>
              <tooltip :key="'discount-marketplace--tooltip'">
                Покупатели любят скидки. Маркетплейсы проводят акции, для которых нужны скидки. Закладывайте
                возможность проводить акции в цену товара.
              </tooltip>
            </template>
          </input-number>
          <input-number
            :id="'commission-marketplace'"
            :lazy="false"
            :name="'commission-marketplace'"
            :title="'Комиссия маркетплейса, %'"
            :range="[0, 99]"
            v-model="CommissionMarketplace"
          >
            <template v-slot:title>
              <tooltip :key="'commission-marketplace--tooltip'">
                Средний процент — 15. У каждой площадки свои комиссии на разные категории товаров.
              </tooltip>
            </template>
          </input-number>
          <input-number
            :id="'advertising-marketplace'"
            :lazy="false"
            :name="'advertising-marketplace'"
            :title="'Реклама на маркетплейсе, %'"
            :range="[0, 99]"
            v-model="AdvertisingMarketplace"
          >
            <template v-slot:title>
              <tooltip :key="'advertising-marketplace--tooltip'">
                Для повышения продаж товары нужно рекламировать на площадке, чтобы покупатели выбирали вас среди
                множества предложений.
              </tooltip>
            </template>
          </input-number>
          <input-number
            :id="'tax-commission'"
            :lazy="false"
            :name="'tax-commission'"
            :title="'Налоги, %'"
            :range="[0, 99]"
            v-model="TaxCommission"
          >
          </input-number>

          <div class="products-calculator-main__wrapper" v-if="false">
            <p class="products-calculator-main__wrapper-title">Покатушки</p>

            <div class="products-calculator-main__inner">
              <p class="products-calculator-main__inner-title">Доставка со склада</p>
              <radiobutton
                :id="'delivery-from-warehouse'"
                :name="'delivery-from-warehouse'"
                :value="33"
                :title="'33 руб./Wildberries'"
                v-model.number="DeliveryFromWarehouse"
              />
              <radiobutton
                :id="'delivery-from-warehouse'"
                :name="'delivery-from-warehouse'"
                :value="35"
                :title="'35 руб./Ozon'"
                v-model.number="DeliveryFromWarehouse"
              />
              <radiobutton
                :id="'delivery-from-warehouse'"
                :name="'delivery-from-warehouse'"
                :value="75"
                :title="'75 руб./Ozon'"
                v-model.number="DeliveryFromWarehouse"
              />
            </div>

            <div class="products-calculator-main__inner">
              <p class="products-calculator-main__inner-title">
                1шт – продажа с 1го раза, 3шт –
                со 2го, 5шт – проблемы с товаром
              </p>
              <radiobutton
                :id="'product-problems'"
                :name="'product-problems'"
                :value="1"
                :title="'1 раз'"
                v-model.number="ProductProblems"
              />
              <radiobutton
                :id="'product-problems'"
                :name="'product-problems'"
                :value="2"
                :title="'3 раза'"
                v-model.number="ProductProblems"
              />
              <radiobutton
                :id="'product-problems'"
                :name="'product-problems'"
                :value="3"
                :title="'5 раз'"
                v-model.number="ProductProblems"
              />
            </div>
          </div>

          <div class="products-calculator-main__wrapper">
            <p class="products-calculator-main__wrapper-title">
              Ведение и поддержка от POPSO
              <tooltip :key="'popso-help--tooltip'">
                Ведение и поддержка от POPSO — Мы в POPSO.ru возьмём вас на поддержку, будем вести всю работу с маркетплейсами за % с продаж, который берётся от суммы после всех вычетов комиссий маркетплейса. Высвободите своё драгоценное время. Welcome!
              </tooltip>
            </p>

            <div class="products-calculator-main__case">
              <radiobutton
                :id="'popso-commission'"
                :name="'popso-commission'"
                :value="8"
                :title="'8% / с продаж после вычета комиссий маркетплейса'"
                v-model.number="PopsoCommission"
              />
              <radiobutton
                :id="'popso-commission'"
                :name="'popso-commission'"
                :value="0"
                :title="'0% / сами, всё сами :)'"
                v-model.number="PopsoCommission"
              />
            </div>
          </div>
        </div>
        <div class="products-calculator-sidebar"
             :class="[
                { 'products-calculator-sidebar--error': ProductPrices.NetProfit <= 0 },
                { 'products-calculator-sidebar--disabled': !MobileOpenState && WindowWidth <= 767 },
             ]"
        >
          <div class="products-calculator-sidebar__head" @click="MobileOpenState = !MobileOpenState">
            <p class="products-calculator-sidebar__title" v-if="MobileOpenState || WindowWidth >= 767">Результаты расчёта</p>
            <div class="products-calculator-sidebar__head-mobile" v-else>
              <p class="products-calculator-sidebar__text products-calculator-sidebar__text--font-bold">
                Чистыми, с одного товара
              </p>
              <p class="products-calculator-sidebar__text products-calculator-sidebar__text--font-bolder products-calculator-sidebar__text--text-big">
                {{ ProductPrices.NetProfit.toLocaleString() }} ₽
              </p>
            </div>

            <div class="products-calculator-sidebar__head-toggle-icon">
              <svg-icon name="arrow-accordion"/>
            </div>
          </div>
          <div class="products-calculator-sidebar__content">
            <div class="products-calculator-sidebar__row">
              <p class="products-calculator-sidebar__text products-calculator-sidebar__text--font-bold">
                Розничная цена
              </p>
              <p class="products-calculator-sidebar__text products-calculator-sidebar__text--font-bolder">
                {{ PriceRetail.toLocaleString() }} ₽
              </p>
            </div>

            <div class="products-calculator-sidebar__row">
              <p class="products-calculator-sidebar__text products-calculator-sidebar__text--text-small">
                Скидка
              </p>
              <p class="products-calculator-sidebar__text products-calculator-sidebar__text--text-small">
                − {{ ProductPrices.DiscountMarketplace.toLocaleString() }} ₽
              </p>
            </div>

            <div class="products-calculator-sidebar__row">
              <p class="products-calculator-sidebar__text products-calculator-sidebar__text--font-bold">
                Цена продажи
              </p>
              <p class="products-calculator-sidebar__text products-calculator-sidebar__text--font-bolder">
                {{ ProductPrices.PriceForSellOnMarketplace.toLocaleString() }} ₽
              </p>
            </div>

            <div class="products-calculator-sidebar__row">
              <p class="products-calculator-sidebar__text products-calculator-sidebar__text--font-bold">
                Комиссии маркетплейса
              </p>
              <p class="products-calculator-sidebar__text products-calculator-sidebar__text--font-bolder">
                {{ ProductPrices.SumMarketplaceCommission.toLocaleString() }} ₽
              </p>
            </div>

            <div class="products-calculator-sidebar__inner">
              <div class="products-calculator-sidebar__row">
                <p class="products-calculator-sidebar__text products-calculator-sidebar__text--text-small">
                  Реклама
                </p>
                <p class="products-calculator-sidebar__text products-calculator-sidebar__text--text-small">
                  {{ ProductPrices.AdvertisingCommission.toLocaleString() }} ₽
                </p>
              </div>
              <div class="products-calculator-sidebar__row">
                <p class="products-calculator-sidebar__text products-calculator-sidebar__text--text-small">
                  Товар
                </p>
                <p class="products-calculator-sidebar__text products-calculator-sidebar__text--text-small">
                  {{ ProductPrices.MarketplaceCommission.toLocaleString() }} ₽
                </p>
              </div>
              <div class="products-calculator-sidebar__row">
                <p class="products-calculator-sidebar__text products-calculator-sidebar__text--text-small">
                  Логистика
                </p>
                <p class="products-calculator-sidebar__text products-calculator-sidebar__text--text-small">
                  {{ ProductPrices.LogisticCommission.toLocaleString() }} ₽
                </p>
              </div>
            </div>

            <div class="products-calculator-sidebar__row">
              <p class="products-calculator-sidebar__text products-calculator-sidebar__text--font-bold">
                Перечисление на ваш счёт
              </p>
              <p class="products-calculator-sidebar__text products-calculator-sidebar__text--font-bolder">
                {{ ProductPrices.TransferToTheAccount.toLocaleString() }} ₽
              </p>
            </div>

            <div class="products-calculator-sidebar__row">
              <p class="products-calculator-sidebar__text products-calculator-sidebar__text--font-bold">
                Налоги и комиссия POPSO
              </p>
              <p class="products-calculator-sidebar__text products-calculator-sidebar__text--font-bolder">
                {{ ProductPrices.TaxAndPopsoCommission.toLocaleString() }} ₽
              </p>
            </div>

            <div class="products-calculator-sidebar__inner">
              <div class="products-calculator-sidebar__row">
                <p class="products-calculator-sidebar__text products-calculator-sidebar__text--text-small">
                  Налоги
                </p>
                <p class="products-calculator-sidebar__text products-calculator-sidebar__text--text-small">
                  {{ ProductPrices.TaxCommission.toLocaleString() }} ₽
                </p>
              </div>
              <div class="products-calculator-sidebar__row">
                <p class="products-calculator-sidebar__text products-calculator-sidebar__text--text-small">
                  Спасибо popso.ru
                </p>
                <p class="products-calculator-sidebar__text products-calculator-sidebar__text--text-small">
                  {{ ProductPrices.PopsoCommissions.toLocaleString() }} ₽
                </p>
              </div>
            </div>

            <div class="products-calculator-sidebar__row">
              <p class="products-calculator-sidebar__text products-calculator-sidebar__text--font-bolder">
                Вы заработаете
              </p>
            </div>

            <div class="products-calculator-sidebar__row">
              <p class="products-calculator-sidebar__text products-calculator-sidebar__text--font-bold">
                С одной продажи
              </p>
              <p class="products-calculator-sidebar__text products-calculator-sidebar__text--font-bolder">
                {{ ProductPrices.ProfitFromSale.toLocaleString() }} ₽
              </p>
            </div>

            <div class="products-calculator-sidebar__row">
              <p class="products-calculator-sidebar__text products-calculator-sidebar__text--text-small">
                Себестоимость
              </p>
              <p class="products-calculator-sidebar__text products-calculator-sidebar__text--text-small">
                − {{ ProductPrices.PrimeCost.toLocaleString() }} ₽
              </p>
            </div>

            <div class="products-calculator-sidebar__row">
              <p class="products-calculator-sidebar__text products-calculator-sidebar__text--text-small">
                Упаковка, хранение
              </p>
              <p class="products-calculator-sidebar__text products-calculator-sidebar__text--text-small">
                − {{ ProductPrices.PackingPrice.toLocaleString() }} ₽
              </p>
            </div>

            <div class="products-calculator-sidebar__row">
              <p class="products-calculator-sidebar__text products-calculator-sidebar__text--font-bold">
                Чистыми, с одного товара
              </p>
              <p class="products-calculator-sidebar__text products-calculator-sidebar__text--font-bolder products-calculator-sidebar__text--text-big">
                {{ ProductPrices.NetProfit.toLocaleString() }} ₽
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import InputText from '../../components/input-text';
  import radiobutton from '../../components/radiobutton';
  import InputNumber from '../../components/input-number';
  import Tooltip from "../../components/tooltip";

  import { WindowWidth } from '../../scripts/mixins/window-width';

  export default {
    name: 'product-calculator',
    components: { Tooltip, InputNumber, InputText, radiobutton },
    mixins: [WindowWidth],
    head: () => {
      return {
        title: 'Калькулятор прибыльности товаров при продаже на маркетплейсах, инструменты от POPSO.ru'
      }
    },
    data: () => {
      return {
        PriceRetail: 2500,
        PrimeCost: 600,
        PackingPrice: 100,
        DiscountMarketplace: 20,
        CommissionMarketplace: 15,
        AdvertisingMarketplace: 5,
        PopsoCommission: 8,
        TaxCommission: 6,

        DeliveryFromWarehouse: 0,
        ProductProblems: 0,

        MobileOpenState: WindowWidth <= 767,
      }
    },
    computed: {
      ProductPrices(){
        const values = {};

        const PrimeCost = Math.round(this.PrimeCost);
        const PackingPrice = Math.round(this.PackingPrice);

        //TODO сделать минимальную коммисию в 100 рублей

        const DiscountMarketplace = (this.PriceRetail * this.DiscountMarketplace) / 100;
        const PriceForSellOnMarketplace = (this.PriceRetail * (100 - this.DiscountMarketplace)) / 100;

        const MarketplaceCommission = PriceForSellOnMarketplace * (this.CommissionMarketplace / 100) < 100 ? 100 : PriceForSellOnMarketplace * (this.CommissionMarketplace / 100);
        const LogisticCommission = 75;
        const AdvertisingCommission = (PriceForSellOnMarketplace * this.AdvertisingMarketplace) / 100;

        const SumMarketplaceCommission = MarketplaceCommission + LogisticCommission + AdvertisingCommission;

        const TransferToTheAccount = PriceForSellOnMarketplace - SumMarketplaceCommission;

        const PopsoCommissions = TransferToTheAccount * this.PopsoCommission / 100;
        const TaxCommission = TransferToTheAccount * this.TaxCommission / 100;
        const TaxAndPopsoCommission = PopsoCommissions + TaxCommission;

        const ProfitFromSale = TransferToTheAccount - TaxAndPopsoCommission;
        const NetProfit = ProfitFromSale - PrimeCost - this.PackingPrice;

        values['PrimeCost'] = PrimeCost;
        values['PackingPrice'] = PackingPrice;
        values['DiscountMarketplace'] = Math.round(DiscountMarketplace);
        values['MarketplaceCommission'] = Math.round(MarketplaceCommission);
        values['LogisticCommission'] = Math.round(LogisticCommission);
        values['AdvertisingCommission'] = Math.round(AdvertisingCommission);

        values['SumMarketplaceCommission'] = Math.round(SumMarketplaceCommission);

        values['PriceForSellOnMarketplace'] = Math.round(PriceForSellOnMarketplace);
        values['TransferToTheAccount'] = Math.round(TransferToTheAccount);

        values['PopsoCommissions'] = Math.round(PopsoCommissions);
        values['TaxCommission'] = Math.round(TaxCommission);
        values['TaxAndPopsoCommission'] = Math.round(TaxAndPopsoCommission);

        values['ProfitFromSale'] = Math.round(ProfitFromSale);
        values['NetProfit'] = Math.round(NetProfit) === 0 ? 0 : Math.round(NetProfit);

        return values;
      }
    }
  }
</script>

<style lang="scss">
  .products-calculator{
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    &__wrapper{
      width: 100%;
      height: auto;

      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      @include mobile{
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        margin-bottom: 6.4rem;
      }
    }
  }

  .products-calculator-main, .products-calculator-sidebar{
    height: auto;

    min-height: 48rem;
    border-radius: 1rem;
  }

  .products-calculator-main{
    width: 100%;
    height: auto;

    padding: 2.4rem 1.6rem;

    background-color: white;

    display: grid;
    align-content: flex-start;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 2.4rem;
    grid-row-gap: 3.2rem;

    @include tablet{
      grid-template-columns: repeat(1, 1fr);
    }

    &__wrapper{
      width: 100%;
      height: auto;

      display: grid;
      grid-column-start: 1;
      grid-column-end: -1;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 2.4rem;
      grid-row-gap: 1.6rem;

      @include mobile{
        grid-template-columns: repeat(1, 1fr);
      }
    }

    &__wrapper-title{
      width: auto;
      height: auto;

      display: flex;
      justify-content: flex-start;
      align-items: center;

      grid-column-start: 1;
      grid-column-end: -1;

      font-size: 1.4rem;
      line-height: 2rem;
      font-weight: 500;
      color: $color-main--darkgray;

      .tooltip{
        margin-left: 0.4rem;
      }
    }

    &__inner{
      width: 100%;
      height: auto;

      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-content: flex-start;

      .input-radio:not(:first-of-type){
        margin-top: 1.6rem;
      }
    }

    &__inner-title{
      min-height: 3.2rem;
      margin-bottom: 1rem;

      font-size: 1.2rem;
      line-height: 1.6rem;
      font-weight: 400;
      color: $color-main--middlegray;
    }

    &__case{
      width: 100%;
      height: auto;

      grid-column-start: 1;
      grid-column-end: -1;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      .input-radio:not(:first-of-type){
        margin-top: 1.6rem;
      }
    }
  }

  .products-calculator-sidebar{
    width: auto;
    height: fit-content;

    min-width: 36rem;

    padding: 2.4rem 2.4rem;

    margin-left: 4.8rem;

    background-color: $color-main--green;
    transition: background-color ease 0.35s;

    @include mobile{
      width: auto;
      min-width: auto;

      min-height: auto;

      padding: 1.2rem;
      margin-top: 2.4rem;
      margin-left: 0;

      position: fixed;
      left: 1.6rem;
      right: 1.6rem;
      bottom: 3.2rem;
    }

    &__head{
      width: 100%;
      height: auto;

      display: flex;
      justify-content: flex-start;
      align-items: center;

      @include mobile(){
        justify-content: space-between;
      }
    }

    &__head-mobile{
      width: 100%;
      height: auto;

      display: flex;
      justify-content: flex-start;
      align-items: center;

      p:not(:last-of-type){
        margin-right: 1.2rem;
      }
    }

    &__head-toggle-icon{
      width: 3.2rem;
      height: 3.2rem;

      display: none;
      justify-content: center;
      align-items: center;

      @include mobile{
        display: flex;
      }

      svg{
        width: 3.2rem;
        height: 3.2rem;

        fill: white;

        transform: rotate(0deg);
        transition: transform ease 0.35s;
      }
    }

    &__title{
      width: auto;
      height: auto;

      font-size: 2rem;
      line-height: 3.2rem;
      font-weight: 500;
      color: white;
    }

    &__content{
      width: 100%;
      height: auto;

      margin-top: 1.2rem;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      overflow: hidden;
      transition: max-height ease 0.35s, margin-top ease 0.35s;

      @include mobile{
        max-height: 37.5rem;
      }
    }

    &__inner{
      width: 100%;
      height: auto;

      padding: 0.8rem 1.6rem;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      border-radius: 1rem;
      border: 0.1rem solid rgba(255, 255, 255, 0.3);
    }

    &__row{
      width: 100%;
      height: auto;

      &:not(:first-of-type){
        margin-top: 0.8rem;
      }

      display: flex;
      justify-content: space-between;
      align-items: center;

      & + .products-calculator-sidebar__inner{
        margin-top: 0.4rem;
      }

      .products-calculator-sidebar__text:last-of-type{
        flex-shrink: 0;
      }
    }

    &__text{
      font-size: 1.4rem;
      line-height: 2rem;
      color: white;

      &--font-normal{
        font-weight: 400;
      }

      &--font-bold{
        font-weight: 500;
      }

      &--font-bolder{
        font-weight: 700;
      }

      &--text-small{
        font-size: 1.2rem;
        line-height: 1.6rem;
      }

      &--text-big{
        font-size: 2rem;
        line-height: 3.2rem;
      }
    }

    &--error{
      background-color: $color-main--red-light;
    }

    &--disabled{
      .products-calculator-sidebar__content{
        max-height: 0;
        margin-top: 0;
      }
      .products-calculator-sidebar__head-toggle-icon svg{
        transform: rotate(180deg);
      }
    }
  }
</style>
