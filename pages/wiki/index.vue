<template>
    <div class="container">
      <div class="container__head">
        <h1>База знаний по маркетплейсам</h1>
      </div>
      <div class="wiki">
        <div class="wiki__content">
          <div class="wiki__content-wrapper">
            <h2>— Электронный документооборот, бухгалтерия и маркировка</h2>
            <ul>
              <li><a href="https://kontur.ru/diadoc?p=f00876" target="_blank">ЭДО, Контур.Диадок (электронный документооорот)</a></li>
              <li><a href="https://kontur.ru/ca?p=f00876" target="_blank">ЭЦП, Контур.Удостоверяющий центр (электронно-цифровая подпись)</a></li>
              <li><a href="https://kontur.ru/elba?p=f00876" target="_blank">Контур.Эльба (онлайн-бухгалтерия для самостоятельных предпринимателей)</a></li>
              <li><a href="https://kontur.ru/bk?p=f00876" target="_blank">Контур.Бухгалтерия (для малого бизнеса, сотрудниками и бухгалтером)</a></li>
              <li><a href="https://kontur.ru/markirovka?p=f00876" target="_blank">Контур .Маркировка</a></li>
            </ul>
          </div>

          <div class="wiki__content-wrapper">
            <h2>— Регистрация на маркетплейсах в качестве поставщика/мерчанта/селлера</h2>
            <ul>
              <li>Ozon — <a href="https://seller.ozon.ru" target="_blank">https://seller.ozon.ru</a></li>
              <li>Wildberries — <a href="https://partners.wb.ru" target="_blank">https://partners.wb.ru</a></li>
              <li>Goods — <a href="https://goods.ru/partners/" target="_blank">https://goods.ru/partners/</a></li>
              <li>Маркетплейс Яндекс.Маркета — <a href="https://pokupki.market.yandex.ru/lp/start" target="_blank">https://pokupki.market.yandex.ru/lp/start</a></li>
              <li>Lamoda — <a href="https://www.lamoda.ru/landing/marketplaceforpartners/" target="_blank">https://www.lamoda.ru/landing/marketplaceforpartners/</a></li>
              <li>CDEK.Market — <a href="https://cdek.market/stat-prodavcom/" target="_blank">https://cdek.market/stat-prodavcom/</a></li>
              <li>AliExpress — <a href="https://sell.aliexpress.com" target="_blank">https://sell.aliexpress.com</a></li>
            </ul>
          </div>

          <div class="wiki__content-wrapper">
            <h2>—  Ссылка на вход в личный кабинет партнёра/поставщика/мерчанта/селлера</h2>
            <ul>
              <li>Ozon — <a href="https://seller.ozon.ru" target="_blank">https://seller.ozon.ru</a></li>
              <li>Wildberries — <a href="https://suppliers.wildberries.ru" target="_blank">https://suppliers.wildberries.ru</a></li>
              <li>Goods — <a href="https://partner.goods.ru" target="_blank">https://partner.goods.ru</a></li>
              <li>Маркетплейс Яндекс.Маркета — <a href="https://partner.market.yandex.ru" target="_blank">https://partner.market.yandex.ru</a></li>
              <li>Lamoda — <a href="https://partner.lamoda.ru" target="_blank">https://partner.lamoda.ru</a></li>
              <li>CDEK.Market — <a href="https://cdek.market/v/" target="_blank">https://cdek.market/v/</a></li>
              <li>AliExpress — <a href="https://login.aliexpress.com/seller.htm" target="_blank">https://login.aliexpress.com/seller.html</a></li>
            </ul>
          </div>
          <div class="wiki__content-wrapper">
            <h2>—  Чеклист</h2>
            <ul>
              <li>
                <a href="https://drive.google.com/file/d/1IftnHPfA0yST3y-7rH00dRYitWwQQ4dH/view?usp=sharing"
                     target="_blank">Чеклист старта продаж на маркетплейсах</a>
              </li>
              <li>
                <a href="https://drive.google.com/file/d/1Zy-Q0ltrF98IMSpV3fLw-DfCS--kPRms/view?usp=sharing"
                target="_blank">Чеклист карточки товара на маркетплейсах</a>
              </li>
              <li>
                <a href="https://drive.google.com/file/d/1CflFiXx4Z1l3MoiQGmUyCFz6UPNE4oz6/view?usp=sharing"
                target="_blank">Чеклист поставки на маркетплейсы</a>
              </li>
            </ul>
          </div>
        </div>
        <img class="wiki__banner" src="~assets/images/lk/lk-banner-1.png" alt="popso-banner-1" v-if="false">
      </div>
    </div>
</template>

<script>
    export default {
      name: "wiki",
      middleware: ['auth'],
      head: () => {
        return {
          title: 'База знаний по маркетплейсам на POPSO.ru'
        }
      },
    }
</script>

<style lang="scss">
  .wiki{
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    position: relative;

    &__content{
      width: 100%;
      height: auto;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }

    &__content-wrapper{
      width: 100%;
      height: auto;

      padding: 2.4rem 3.2rem;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      background-color: $color-main--white;
      border-radius: 1rem;

      &:not(:first-of-type){
        margin-top: 3.2rem;
      }

      h2{
        margin-bottom: 1.6rem;

        font-size: 1.6rem;
        color: $black-main;

        font-weight: 600;

        @include mobile{
          font-size: 1.4rem;
        }
      }

      ul{
        padding-left: 2.2rem;
      }

      li{
        &:not(:first-of-type){
          margin-top: 1.2rem;

          @include mobile{
            margin-top: 0.8rem;
          }
        }
      }

      a{
        &:hover{
          text-decoration: none;
        }
      }

      li, a{
        font-size: 1.4rem;
        color: $black-main;
        word-break: break-word;

        @include mobile{
          font-size: 1.2rem;
        }
      }
    }
  }
</style>
