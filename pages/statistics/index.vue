<template>
	<div class="container">
    <div class="analytics-head">
      <label for="date-CurrentDay" class="btn-main btn--gray analytics-head__input-radio">
        <input type="radio" id="date-CurrentDay"
               :value='Dates.day' v-model="date">
        <span>За сегодня</span>
      </label>
      <label for="data-week" class="btn-main btn--gray analytics-head__input-radio">
        <input type="radio" id="data-week"
               :value="Dates.week" v-model="date">
        <span>Неделя</span>
      </label>
      <label for="data-month" class="btn-main btn--gray analytics-head__input-radio">
        <input type="radio" id="data-month"
               :value="Dates.month" v-model="date">
        <span>Месяц</span>
      </label>
      <label for="data-period" class="btn-main btn--gray analytics-head__input-radio">
        <input type="radio" id="data-period" :value='SelectedData' v-model="date">
        <span v-if="SelectedData.length > 0">{{ `${SelectedData[0]} - ${SelectedData[1]}`}}</span>
        <span v-else>Период</span>
        <date-picker class="dataPicker__item" v-model="SelectedData" range :lang="lang" :valueType="'format'"
                     :format="'DD.MM.YYYY'" ref="datePicker"/>
      </label>
    </div>
    <div class="analytics">
      <div class="statistics custom-loading">
        <div class="statistics-head">
          <p class="statistics-head__title">Статистика</p>
          <div class="statistics-head__content">
            <div class="statistics-head__input-radio">
              <input type="radio" id="ozon" value="ozon" v-model="statistics.value">
              <label for="ozon">
                OZON
              </label>
            </div>
            <div class="statistics-head__input-radio">
              <input type="radio" id="wildberries" value="wildberries" v-model="statistics.value">
              <label for="wildberries">
                Wildberries
              </label>
            </div>
          </div>
        </div>
        <div class="statistics-content">
          <div class="statistics-content__head">
            <div class="statistics-content__head-text">
              <p>Продано на сумму</p>
              <p>1 230 000 ₽</p>
            </div>
            <div class="statistics-content__head-text">
              <p>К перечислению</p>
              <p>1 230 00 ₽</p>
            </div>
          </div>
          <div class="statistics-content__wrapper">
            <bar-chart />
          </div>
        </div>
      </div>

      <div class="orders custom-loading">
        <div class="orders-head">
          <div class="orders-head__wrapper">
            <p class="orders-head__title">Заказы</p>
          </div>
          <div class="orders-head__options" :class="OrdersTypeClass">
            <button type="button" class="orders-head__option" @click="OrdersType = 'items'">Штук</button>
            <button type="button" class="orders-head__option" @click="OrdersType = 'sum'">На сумму</button>
          </div>
        </div>
        <div class="orders-content">
          <line-chart :HelperText="OrdersHelperText" :date="date"/>
          <div class="orders-content__footer">
            <a>Подробнее</a>
          </div>
        </div>
      </div>

      <div class="categories custom-loading">
        <div class="categories-head">
          <div class="categories-head__wrapper">
            <p class="categories-head__title">Категории товаров</p>
          </div>
          <div class="categories-head__options" :class="CategoriesTypeClass">
            <button type="button" class="categories-head__option" @click="CategoriesType = 'percentage'">Проценты</button>
            <button type="button" class="categories-head__option" @click="CategoriesType = 'items'">Штук</button>
            <button type="button" class="categories-head__option" @click="CategoriesType = 'sum'">На сумму</button>
          </div>
        </div>
        <div class="categories-content">
          <pie-chart :categories="PieChartData" :HelperText="CategoriesHelperText"/>
        </div>
      </div>

      <div class="shipments custom-loading">
        <div class="shipments-head">
          <p class="shipments-head__title">Поставки</p>
        </div>
        <div class="shipments-content">
          <div class="shipments-content__wrapper">
            <p class="shipments-content__title">OZON</p>
            <div class="shipments-content__sub-title">
              <p>Рекомендация по поставке</p>
              <p>30.07.20</p>
            </div>
            <div class="shipments-content__sub-title">
              <p>Остатки товаров</p>
            </div>
            <ul>
              <li>
                <p>Электроника</p>
                <p>17</p>
              </li>
              <li>
                <p>Игрушки</p>
                <p>75</p>
              </li>
              <li>
                <p>Ремонт</p>
                <p>125</p>
              </li>
            </ul>
          </div>
          <div class="shipments-content__wrapper">
            <p class="shipments-content__title">Wildberries</p>
            <div class="shipments-content__sub-title">
              <p>Рекомендация по поставке</p>
              <p>30.07.20</p>
            </div>
            <div class="shipments-content__sub-title">
              <p>Остатки товаров </p>
            </div>
            <ul>
              <li>
                <p>Электроника</p>
                <p>17</p>
              </li>
              <li>
                <p>Игрушки</p>
                <p>75</p>
              </li>
              <li>
                <p>Ремонт</p>
                <p>125</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="map custom-loading">
        <div class="map-head">
          <p class="map-head__title">Карта заказов</p>
        </div>
        <div class="map-content">
          <statistics-map />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LineChart from '../../components/statistics/charts/line-chart';
  import BarChart from '../../components/statistics/charts/bar-chart';
  import PieChart from '../../components/statistics/charts/pie-chart';
  import StatisticsMap from "../../components/statistics/statistics-map";
  import DatePicker from 'vue2-datepicker';
  import 'assets/styles/modules/vue-2-datepicker/index.scss';

  export default {
    name: "statistics",
    components: {StatisticsMap, PieChart, BarChart, LineChart, DatePicker },
    data: () => {
      return {
        OrdersType: 'items',
        CategoriesType: 'percentage',
        CategoriesHelperText: '',
        statistics: {
          value: 'ozon',
        },
        date: [],
        SelectedData: [],
        lang: {
          formatLocale: {
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            // MMM
            monthsShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            // dddd
            weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            // ddd
            weekdaysShort: ['Вс', 'По', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            // dd
            weekdaysMin: ['Вс', 'По', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            firstDayOfWeek: 0,
            // first week contains January 1st.
            firstWeekContainsDate: 1,
            // format 'a', 'A'
          },
        },
      }
    },
    mounted() {
      setTimeout(() => {
        document.querySelectorAll('.custom-loading').forEach(el => {
          el.classList.add('custom-loading--removing');
        });

        setTimeout(() => {
          document.querySelectorAll('.custom-loading').forEach(el => {
            el.classList.remove('custom-loading');
            el.classList.remove('custom-loading--removing');
          });
        },350)
      }, 1500);

      this.date = this.Dates.month;
    },
    computed: {
      LineChartData(){
        let data = [];

        switch (this.OrdersType) {
          case "items":
            data = [25,22,28,32,35,30,28,35,38,42,35,27,24,25,22,28,32,35,30,28,35,38,42,35,27,24];
            break;
          case 'sum':
            data =  [3250, 2500, 3500, 7500, 6260, 5265, 8000, 9200, 7200, 6425, 7500, 4250, 11500, 8000, 11500, 8000,
              9200, 7200, 7200, 6425, 7500, 4250, 11500, 8000, 11500, 8000, 9200, 7200, 11500, 8000, 9200, 7200];
            break;
        }

        return data;
      },
      OrdersHelperText(){
        return this.OrdersType ? 'шт' : '₽';
      },
      OrdersTypeClass(){
        let ClassName = '';

        switch (this.OrdersType) {
          case "items":
            ClassName = 'orders-head__options--first-option';
            break;
          case 'sum':
            ClassName = 'orders-head__options--second-option';
            break;
        }

        return ClassName;
      },
      CategoriesTypeClass(){
        let ClassName = '';

        switch (this.CategoriesType) {
          case "percentage":
            ClassName = 'categories-head__options--first-option';
            break;
          case "items":
            ClassName = 'categories-head__options--second-option';
            break;
          case 'sum':
            ClassName = 'categories-head__options--third-option';
            break;
        }

        return ClassName;
      },
      PieChartData(){
        let arr = [];

        switch (this.CategoriesType) {
          case "percentage":
            arr = [
              {
                title: 'Электроника',
                value: 33.3,
              },
              {
                title: 'Игрушки',
                value: 43.3,
              },
              {
                title: 'Ремонт',
                value: 23.3,
              },
            ];
            this.CategoriesHelperText = '%';
            break;
          case "items":
            arr = [
              {
                title: 'Электроника',
                value: 735,
              },
              {
                title: 'Игрушки',
                value: 635,
              },
              {
                title: 'Ремонт',
                value: 835,
              },
            ];
            this.CategoriesHelperText = 'шт';
            break;
          case "sum":
            arr = [
              {
                title: 'Электроника',
                value: 5000,
              },
              {
                title: 'Игрушки',
                value: 6000,
              },
              {
                title: 'Ремонт',
                value: 4000,
              },
            ];
            this.CategoriesHelperText = '₽';
            break;
        }

        return arr;
      },
      Dates(){
        const NewWeek = new Date();
        const NewMonth = new Date();

        NewWeek.setDate(NewWeek.getDate() + 7);
        NewMonth.setMonth(NewMonth.getMonth() + 1);

        return {
          day: [new Date().toLocaleDateString(), new Date().toLocaleDateString()],
          week: [new Date().toLocaleDateString(), NewWeek.toLocaleDateString()],
          month: [new Date().toLocaleDateString(), NewMonth.toLocaleDateString()],
        }
      },
    },
    watch: {
      SelectedData(){
        this.date = this.SelectedData;
      }
    }
  }
</script>

<style lang="scss">
  .analytics-head{
    width: 100%;
    height: auto;

    margin-top: 0.8rem;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    &__input-radio{
      width: auto;
      height: 2.4rem;

      min-height: auto;

      border: none;

      position: relative;
      cursor: pointer;

      input{
        display: none;

        &:checked + span{
          color: $color-main--white;
          background-color: $color-main--darkgray;
        }
      }

      span{
        width: 100%;
        height: 100%;

        padding: 0 1rem;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 1.4rem;
        line-height: 2rem;
        font-weight: 500;
        color: $color-main--darkgray;

        border-radius: 1.2rem;

        background: transparent;
        transition: background ease 0.35s, color ease 0.35s;
      }

      &--active{
        background: $color-main--darkgray;
        color: $color-main--white;
      }

      &:not(:first-of-type){
        margin-left: 2.4rem;
      }
    }
  }

  .analytics{
    width: 100%;
    height: auto;

    margin-top: 2rem;

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .statistics{
    width: 28.125%;
    height: 36rem;

    min-width: 32rem;
    margin-right: 4rem;
    margin-bottom: 4rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-shrink: 0;
    flex-grow: 1;

    padding: 2.4rem 4rem;

    background-color: white;
    border-radius: 1rem;
  }

  .statistics-head{
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    &__title{
      width: auto;
      height: auto;
      margin-right: 1.6rem;

      font-size: 1.4rem;
      line-height: 1.6rem;
      font-weight: 600;
      color: $color-main--black;
    }

    &__content{
      width: auto;
      height: auto;

      margin-top: 1.6rem;

      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
    }

    &__input-radio{
      input{
        display: none;

        &:checked + label{
          color: $color-main--darkgray;
        }
      }

      label{
        width: auto;
        height: auto;

        font-size: 1.2rem;
        line-height: 1.6rem;
        font-weight: bold;
        color: $color-main--lightgray;

        cursor: pointer;
        transition: color ease 0.35s;
      }

      &:not(:first-of-type){
        margin-left: 3.2rem;
      }
    }
  }

  .statistics-content{
    width: 100%;
    height: auto;

    margin-top: 1.6rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    flex-shrink: 0;

    &__head{
      width: 100%;
      height: auto;

      flex-grow: 1;
    }

    &__head-text{
      width: 24rem;
      height: auto;

      display: flex;
      justify-content: space-between;
      align-items: center;

      p{
        font-size: 1.2rem;
        line-height: 1.6rem;


        &:nth-of-type(1){
          font-weight: 500;
          color: $color-main--darkgray;
        }

        &:nth-of-type(2){
          min-width: 8rem;

          text-align: left;
          font-weight: bold;
          color: $color-main--black;
        }
      }

      &:not(:last-of-type){
        margin-bottom: 1.6rem;
      }
    }

    &__wrapper{
      width: 100%;
      height: 100%;

      margin-top: 1.6rem;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
    }
  }

  .orders{
    width: 40.625%;
    height: 36rem;

    min-width: 52rem;
    margin-bottom: 4rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-shrink: 0;
    flex-grow: 1;

    padding: 2.4rem 4rem;

    background-color: white;
    border-radius: 1rem;

    &__content{
      width: 100%;
      height: auto;
    }
  }

  .orders-head{
    width: 100%;
    height: auto;

    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 1.6rem;

    &__title{
      width: auto;
      height: auto;
      margin-right: 1.6rem;

      font-size: 1.4rem;
      line-height: 1.6rem;
      font-weight: 600;
      color: $color-main--black;
    }

    &__options{
      width: 14rem;
      height: auto;

      display: flex;
      justify-content: center;
      align-items: center;


      border-radius: 0.1rem;
      position: relative;

      &:before{
        content: '';

        width: 50%;
        height: 0.2rem;

        display: block;

        border-radius: 0.1rem;
        background-color: $color-main--orange;

        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 2;

        transition: left ease 0.35s;
      }

      &--first-option{
        .orders-head__option{
          &:nth-of-type(1){
            color: $color-main--orange;
          }
        }

        &:before{
          left: 0;
        }
      }

      &--second-option{
        .orders-head__option:nth-of-type(2){
          color: $color-main--orange;
        }

        &:before{
          left: 50%;
        }
      }
    }

    &__option{
      width: 50%;
      height: auto;

      padding-bottom: 0.8rem;

      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;

      font-size: 1.2rem;
      line-height: 1.6rem;
      font-weight: 500;
      color: $color-main--darkgray;
      border-bottom: 0.2rem solid $color-main--lightgray;

      position: relative;

      transition: color ease 0.35s;
    }

    &__wrapper{
      width: auto;
      height: auto;

      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }

  .orders-content{
    width: 100%;
    height: auto;

    margin-top: 1.6rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-grow: 1;
    flex-shrink: 0;

    &__footer{
      width: 100%;
      height: auto;

      margin-top: 2.4rem;

      display: flex;
      justify-content: flex-end;
      align-items: center;

      a{
        font-size: 1.2rem;
        line-height: 1.6rem;
        font-weight: 500;
        color: $color-main--black;
        text-decoration: none;
        cursor: pointer;

        &:hover{
          text-decoration: underline
        }
      }
    }
  }

  .categories{
    width: 40.625%;
    height: 42.5rem;

    min-width: 52rem;
    margin-right: 4rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-shrink: 0;
    flex-grow: 1;

    padding: 2.4rem 4rem;

    background-color: white;
    border-radius: 1rem;
  }

  .categories-head{
    width: 100%;
    height: auto;

    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 1.6rem;

    &__title{
      width: auto;
      height: auto;
      margin-right: 1.6rem;

      font-size: 1.4rem;
      line-height: 1.6rem;
      font-weight: 600;
      color: $color-main--black;
    }

    &__options{
      width: 20rem;
      height: auto;

      display: flex;
      justify-content: center;
      align-items: center;

      border-radius: 0.1rem;
      position: relative;

      &:before{
        content: '';

        width: 33%;
        height: 0.2rem;

        display: block;

        border-radius: 0.1rem;
        background-color: $color-main--orange;

        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 2;

        transition: left ease 0.35s;
      }

      &--first-option{
        .orders-head__option:nth-of-type(1){
          color: $color-main--orange;
        }

        &:before{
          left: 0;
        }
      }

      &--second-option{
        .orders-head__option:nth-of-type(2){
          color: $color-main--orange;
        }

        &:before{
          left: 33%;
        }
      }

      &--third-option{
        .orders-head__option:nth-of-type(2){
          color: $color-main--orange;
        }

        &:before{
          left: 66%;
        }
      }
    }

    &__option{
      width: 50%;
      height: auto;

      padding-bottom: 0.8rem;

      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;

      font-size: 1.2rem;
      line-height: 1.6rem;
      font-weight: 500;
      color: $color-main--darkgray;
      border-bottom: 0.2rem solid $color-main--lightgray;

      position: relative;

      transition: color ease 0.35s;
    }

    &__wrapper{
      width: auto;
      height: auto;

      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }

  .categories-content{
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .shipments{
    width: 28.125%;
    height: 42.5rem;

    min-width: 32rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-shrink: 0;
    flex-grow: 1;

    padding: 2.4rem 4rem;

    background-color: white;
    border-radius: 1rem;
  }

  .shipments-head{
    width: 100%;
    height: auto;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    &__title{
      width: auto;
      height: auto;
      margin-right: 1.6rem;

      font-size: 1.4rem;
      line-height: 1.6rem;
      font-weight: 600;
      color: $color-main--black;
    }
  }

  .shipments-content{
    width: 100%;
    height: auto;

    margin-top: 2.4rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    &__wrapper{
      width: 100%;
      height: auto;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      &:not(:first-of-type){
        margin-top: 2.4rem;
      }

      &:nth-of-type(1){
        .shipments-content__title{
          color: $color-main--blue;
        }
      }

      &:nth-of-type(2){
        .shipments-content__title{
          color: $color-main--purple;
        }
      }
    }

    &__title{
      width: 100%;
      height: auto;

      font-size: 1.2rem;
      line-height: 1.6rem;
      font-weight: bold;
      color: $color-main--orange;
    }

    &__sub-title{
      width: 100%;
      height: auto;

      margin-top: 1.6rem;

      display: flex;
      justify-content: space-between;
      align-items: center;

      p{
        font-size: 1.2rem;
        line-height: 1.6rem;

        &:nth-of-type(1){
          font-weight: 500;
          color: $color-main--black;
        }

        &:nth-of-type(2){
          font-weight: bold;
          color: $color-main--green;
        }
      }
    }

    ul{
      width: 100%;
      height: auto;

      margin-top: 0.8rem;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      li{
        width: 100%;
        height: auto;

        display: flex;
        justify-content: space-between;
        align-items: center;

        &:not(:first-of-type){
          margin-top: 0.8rem;
        }

        p{
          font-size: 1.2rem;
          line-height: 1.6rem;
          font-weight: 500;

          &:nth-of-type(1){
            color: $color-main--darkgray;
          }

          &:nth-of-type(2){
            color: $color-main--black;
          }
        }
      }
    }
  }

  .map{
    width: 100%;
    height: calc(42.5rem * 1.5);

    margin-top: 4rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex-grow: 1;
    flex-shrink: 0;

    background-color: white;
    border-radius: 1rem;

    padding: 2.4rem 4rem;
  }

  .map-head{
    width: 100%;
    height: auto;

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    &__title{
      font-size: 1.4rem;
      line-height: 1.6rem;
      font-weight: 600;
      color: $color-main--black;
    }
  }

  .map-content{
    width: 100%;
    height: auto;

    margin-top: 1.6rem;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;

    border-radius: 1rem;
    overflow: hidden;
  }

  .custom-loading{
    .statistics-head p,
    .statistics-head__content,
    .orders-head p,
    .categories-head p,
    .shipments-head p,
    .shipments-content__wrapper p,
    .statistics-content__head-text p,
    .pie-chart-description p,
    .bar-chart,
    .orders-head__options,
    .pie-chart-description-item__line,
    .pie-chart__content,
    .line-chart,
    .pie-chart-text,
    .map-head__title,
    .statistics-map,
    .orders-content__footer > a,
    .categories-head__options{
      position: relative;

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

    .statistics-head,
    .orders-head,
    .categories-head,
    .map-head__title,
    .shipments-head{
      p{
        &:before{
          background-color: $color-main--darkgray;
        }
      }
    }

    .pie-chart__content{
      &:before{
        background: radial-gradient(transparent 66%, $color-main--lightgray 66%, $color-main--lightgray 69%, transparent 69%);

        border-radius: 50%;
        width: 25rem;
        height: 25rem;
        margin: auto;
      }

      &:after{
        background-color: transparent;
      }
    }

    .pie-chart-text{
      position: absolute;
    }
    .statistics-map{
      &:before{
        z-index: 1001;
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
