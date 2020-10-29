<template>
  <div class="container">
    <div class="container__head">
      <h1>Дорожная карта от POPSO.ru для старта продаж на маркетплейсах</h1>
    </div>
    <div class="street-map">
      <transition name="street-map-navigation">
        <RoadMapNavigation
          v-if="NavigationState && RoadMapState.ListProgress < this.UserRoadMapData.length"

          @CloseRoadMapNavigation="NavigationState = false"

          @SetFieldState="SetFieldState(RoadMapState.ListProgress)"
          @ShowAllFields="ShowAllFields"
          @OpenAllFields="OpenAllFields"
          @HideAllFields="HideAllFields"
        />
        <!-- TODO remove after debugging-->
      </transition>

      <transition name="ease-opacity">
        <div class="street-map-mobile-menu-btn"
             @click="NavigationState = !NavigationState"
             v-if="!NavigationState && WindowWidth <= 1280"
        >
          <div class="street-map-mobile-menu-btn__line" />
          <div class="street-map-mobile-menu-btn__line" />
          <div class="street-map-mobile-menu-btn__line" />
        </div>
      </transition>

      <!--
      <div class="street-map-state-test" v-if="RoadMapState.ListProgress < this.UserRoadMapData.length">
        TODO remove after debugging
        <div class="street-map-state__wrapper test-options">
        <button class="btn-main btn--green" @click="SetFieldState(RoadMapState.ListProgress)">
          сделать пункт {{ RoadMapState.ListProgress + 1 }} выполненым
        </button>
        <button class="btn-main btn--green" @click="ShowAllFields">
          Показать все пункты
        </button>
        <button class="btn-main btn--green" @click="OpenAllFields">
          Открыть все пункты
        </button>
        <button class="btn-main btn--green" @click="HideAllFields">
          Закрыть все пункты
        </button>
      </div>
      </div>
      -->

      <!--
      <transition name="street-map-complete" mode="out-in">

      </transition>
      -->

      <form class="street-map-form"
            :class="{
        'custom-loading': loading.state,
        'custom-loading--removing': loading.removing
      }"
            v-if="RoadMapState.ListProgress < this.UserRoadMapData.length"
      >
        <div class="street-map-container street-map-container--confirm">
          <div class="street-map-container__head street-map-container__head--cursor-default">
            <div class="street-map-container__head-icon">
              <svg-icon name="check"/>
            </div>
            <div class="street-map-container__head-title-wrapper">
              <p class="street-map-container__head-title">
                1. Регистрация в системе
                <span class="street-map-container__head-line"/>
              </p>
            </div>
          </div>
        </div>

        <div class="street-map-container"
             :class="{
          'street-map-container--open': ContainerState.UserProfile,
          'street-map-container--current' : RoadMapState.ListProgress === 1,
          'street-map-container--confirm' : RoadMapState.ListProgress > 1,
        }"
        >
          <div class="street-map-container__head" v-on:click="ContainerState.UserProfile = !ContainerState.UserProfile">
            <div class="street-map-container__head-icon">
              <svg-icon name="check"/>
            </div>
            <div class="street-map-container__head-title-wrapper">
              <p class="street-map-container__head-title">
                2. Заполнение профиля
                <span class="street-map-container__head-line"/>
              </p>
            </div>
            <div class="street-map-container__head-accordion-toggle">
              <svg-icon name="arrow-accordion"/>
            </div>
          </div>
          <div class="street-map-container__wrapper street-map-profile" v-if="ContainerState.UserProfile">
            <input-text
              :disabled="true"
              :id="'phone'"
              :lazy="true"
              :name="'phone'"
              :required="true"
              :title="'Телефон'"
              v-model="UserPhone"
              v-mask="'+7 (###) ###-##-##'"
            />
            <input-suggestion
              :id="'suggestion-name'"
              :options="suggestions.NamesList"
              :title="'Имя'"
              :required="true"
              :ref="'suggestion-name'"
              :inputClass="'input-text--required'"
              v-model="UserName"
              @input="ChangeName($event)"
            />
            <input-text
              :id="'email'"
              :lazy="true"
              :name="'email'"
              :required="true"
              :title="'Email'"
              :type="'text'"
              v-model="UserEmail"
            />
            <input-text
              :id="'company'"
              :lazy="true"
              :name="'company'"
              :title="'Компания/бренд'"
              :type="'text'"
              :inputClass="'input-text--required'"
              v-model="UserBrand"
            />
            <input-text
              :id="'url'"
              :lazy="true"
              :name="'url'"
              :title="'Сайт'"
              :type="'text'"
              v-model="UserUrl"
            />
          </div>
        </div>
        <div class="hidden">/* 2. Заполнение профиля */</div>

        <div class="street-map-container"
             :class="{
          'street-map-container--open': ContainerState.ProductCategory,
          'street-map-container--current' : RoadMapState.ListProgress === 2,
          'street-map-container--confirm' : RoadMapState.ListProgress > 2,
        }"
        >
          <div class="street-map-container__head" v-on:click="ContainerState.ProductCategory = !ContainerState.ProductCategory">
            <div class="street-map-container__head-icon">
              <svg-icon name="check"/>
            </div>
            <div class="street-map-container__head-title-wrapper">
              <p class="street-map-container__head-title">
                3. Выбор категории товаров
                <span class="street-map-container__head-line"/>
              </p>
            </div>
            <div class="street-map-container__head-accordion-toggle">
              <svg-icon name="arrow-accordion"/>
            </div>
          </div>
          <div class="street-map-container__wrapper" v-if="ContainerState.ProductCategory">
            <input-select
              :id="'Category'"
              :name="'Category'"
              :options="ProductsCategoriesList"
              :placeholder="'Выберите категорию'"
              v-model="ProductsCategoriesValue"
            />
          </div>
        </div>
        <div class="hidden">/* 3. Выбор категории товаров */</div>

        <div class="street-map-container"
             :class="{
          'street-map-container--open': ContainerState.Analytics,
          'street-map-container--current' : RoadMapState.ListProgress === 3,
          'street-map-container--confirm' : RoadMapState.ListProgress > 3,
        }"
        >
          <div @click="ContainerState.Analytics = !ContainerState.Analytics" class="street-map-container__head">
            <div class="street-map-container__head-icon">
              <svg-icon name="check"/>
            </div>
            <div class="street-map-container__head-title-wrapper">
              <p class="street-map-container__head-title">
                4. Предварительная аналитика
                <span class="street-map-container__head-line"/>
              </p>
            </div>
            <div class="street-map-container__head-accordion-toggle">
              <svg-icon name="arrow-accordion"/>
            </div>
          </div>

          <div class="street-map-container__wrapper street-map-analytics" v-if="ContainerState.Analytics">
            <nuxt-link class="btn-main btn--green" target="_blank" to="/tools/product-calculator">
              Калькулятор прибыли
            </nuxt-link>
            <input-checkbox
              :id="'analytics-check'"
              :name="'analytics-check'"
              :text="'Готово'"
              v-model="UserAnalytics"
            />
          </div>
        </div>
        <div class="hidden">/* 4. Предварительная аналитика */</div>

        <div class="street-map-container"
             :class="{
          'street-map-container--open': ContainerState.LegalStatus,
          'street-map-container--current' : RoadMapState.ListProgress === 4,
          'street-map-container--confirm' : RoadMapState.ListProgress > 4,
        }"
        >
          <div @click="ContainerState.LegalStatus = !ContainerState.LegalStatus" class="street-map-container__head">
            <div class="street-map-container__head-icon">
              <svg-icon name="check"/>
            </div>
            <div class="street-map-container__head-title-wrapper">
              <p class="street-map-container__head-title">
                5. Наличие ООО/ИП, самозанятости
                <span class="street-map-container__head-line"/>
              </p>
            </div>
            <div class="street-map-container__head-accordion-toggle">
              <svg-icon name="arrow-accordion"/>
            </div>
          </div>

          <div class="street-map-container__wrapper street-map-legal-status" v-if="ContainerState.LegalStatus">
            <div class="street-map-legal-status__wrapper">
              <radiobutton
                :id="'LegalStatus'"
                :name="'LegalStatus'"
                :value="'company'"
                :title="'Есть ООО/ИП'"
                v-model="LegalStatus"
              />
              <transition name="input-inn-animate">
                <input-suggestion
                  v-mask="'############'"
                  :id="'suggestion-legal-status'"
                  :name="'legal-status'"
                  :options="suggestions.LegalStatus"
                  :title="'Введите ИНН'"
                  :type="'text'"
                  @input="ChangeLegalStatus($event)"
                  v-model="LegalStatusInn"
                  v-if="LegalStatus === 'company'"
                />
              </transition>
            </div>
            <radiobutton
              :id="'LegalStatus'"
              :name="'LegalStatus'"
              :value="'self'"
              :title="'Я самозанятый'"
              v-model="LegalStatus"
            />
            <radiobutton
              :id="'LegalStatus'"
              :name="'LegalStatus'"
              :value="'start'"
              :title="'Только планирую начать бизнес'"
              v-model="LegalStatus"
            />
          </div>
        </div>
        <div class="hidden">/* 5. Наличие ООО/ИП, самозанятости */</div>

        <div class="street-map-container"
             :class="{
          'street-map-container--open': ContainerState.ElectronicManagement,
          'street-map-container--current' : RoadMapState.ListProgress === 5,
          'street-map-container--confirm' : RoadMapState.ListProgress > 5,
        }"
        >
          <div @click="ContainerState.ElectronicManagement = !ContainerState.ElectronicManagement" class="street-map-container__head">
            <div class="street-map-container__head-icon">
              <svg-icon name="check"/>
            </div>
            <div class="street-map-container__head-title-wrapper">
              <p class="street-map-container__head-title">
                6. Наличие ЭДО
                <span class="street-map-container__head-line"/>
              </p>
            </div>
            <div class="street-map-container__head-accordion-toggle">
              <svg-icon name="arrow-accordion"/>
            </div>
          </div>

          <div class="street-map-container__wrapper street-map-electronic-management"
            v-if="ContainerState.ElectronicManagement">
            <radiobutton
              :id="'IsElectronicManagement'"
              :name="'IsElectronicManagement'"
              :value="'yes'"
              :title="'Да'"
              v-model="IsElectronicManagementRadioValue"
            />
            <input-select
              :id="'CompanyList'"
              :name="'CompanyList'"
              :options="IsElectronicManagementList"
              :placeholder="'Выберите компанию из списка'"
              v-model="IsElectronicManagementListValue"
            />
            <radiobutton
              :id="'IsElectronicManagement'"
              :name="'IsElectronicManagement'"
              :value="'no'"
              :title="'Нет'"
              v-model="IsElectronicManagementRadioValue"
            />
            <div class="street-map-container__inner">
              <p class="street-map-container__title">
                Совет: выбирайте Диадок (им пользуется большинство, он прост в использовании,
                как обычная электронная почта). Промо тариф 900 руб. (его хватит надолго).
              </p>

              <div class="street-map-electronic-management__link-area">
                <transition name="ease-opacity">
                <a class="link link--green" target="_blank"
                   v-if="IsElectronicManagementList.find(el => el.value === IsElectronicManagementListValue)"
                   :href="IsElectronicManagementList.find(el => el.value === IsElectronicManagementListValue).url"
                >
                  Оформить ЭДО
                </a>
                </transition>
              </div>

            </div>
          </div>
        </div>
        <div class="hidden">/* 6. Наличие ЭДО */</div>

        <div class="street-map-container"
             :class="{
          'street-map-container--open': ContainerState.ElectronicSignature,
          'street-map-container--current' : RoadMapState.ListProgress === 6,
          'street-map-container--confirm' : RoadMapState.ListProgress > 6,
        }"
             v-if="RoadMapState.ListProgress > 2"
        >
          <div @click="ContainerState.ElectronicSignature = !ContainerState.ElectronicSignature" class="street-map-container__head">
            <div class="street-map-container__head-icon">
              <svg-icon name="check"/>
            </div>
            <div class="street-map-container__head-title-wrapper">
              <p class="street-map-container__head-title">
                7. Цифровая подпись (ЭЦП)
                <span class="street-map-container__head-line"/>
              </p>
            </div>
            <div class="street-map-container__head-accordion-toggle">
              <svg-icon name="arrow-accordion"/>
            </div>
          </div>

          <div class="street-map-container__wrapper street-map-electronic-signature"
               v-if="ContainerState.ElectronicSignature"
          >
            <radiobutton
              :id="'IsElectronicSignature'"
              :name="'IsElectronicSignature'"
              :value="'yes'"
              :title="'Есть'"
              v-model="IsElectronicSignatureRadioValue"
            />
            <input-select
              :id="'electronic-signature-list'"
              :name="'electronic-signature-list'"
              :options="IsElectronicSignatureList"
              :placeholder="'Выберите компанию из списка'"
              v-model="IsElectronicSignatureListValue"
            />
            <radiobutton
              class="input-radio--width100"
              :id="'IsElectronicSignature'"
              :name="'IsElectronicSignature'"
              :value="'no'"
              :title="'Нет ЭЦП'"
              v-model="IsElectronicSignatureRadioValue"
            >
              <div class="street-map-electronic-management__link-area">
                <transition name="ease-opacity">
                  <a class="link link--green" target="_blank"
                     v-if="IsElectronicSignatureList.find(el => el.value === IsElectronicSignatureListValue)"
                     :href="IsElectronicSignatureList.find(el => el.value === IsElectronicSignatureListValue).url"
                  >
                    Оформить ЭЦП
                  </a>
                </transition>
              </div>
            </radiobutton>
          </div>
        </div>
        <div class="hidden">/* 7. Цифровая подпись (ЭЦП) */</div>

        <div class="street-map-container"
             :class="{
          'street-map-container--open': ContainerState.MarketplaceRegistration,
          'street-map-container--current' : RoadMapState.ListProgress === 7,
          'street-map-container--confirm' : RoadMapState.ListProgress > 7,
        }"
             v-if="RoadMapState.ListProgress > 3"
        >
          <div @click="ContainerState.MarketplaceRegistration = !ContainerState.MarketplaceRegistration" class="street-map-container__head">
            <div class="street-map-container__head-icon">
              <svg-icon name="check"/>
            </div>
            <div class="street-map-container__head-title-wrapper">
              <p class="street-map-container__head-title">
                8. Регистрация на маркетплейсе и подписание договора
                <span class="street-map-container__head-line"/>
              </p>
            </div>
            <div class="street-map-container__head-accordion-toggle">
              <svg-icon name="arrow-accordion"/>
            </div>
          </div>

          <div class="street-map-container__wrapper street-map-marketplace-registration"
               v-if="ContainerState.MarketplaceRegistration">
            <p class="street-map-container__title">Зарегистрируйтесь на маркетплейсах</p>
            <div class="street-map-container__inner">
              <div class="street-map-marketplace-registration__inner">
                <a class="link link--blue" href="https://seller.ozon.ru" target="_blank">OZON</a>
                <a class="link link--purpure" href="https://partners.wb.ru" target="_blank">Wildberries</a>
              </div>

              <input-checkbox
                :id="'marketplace-registration-check'"
                :name="'marketplace-registration-check'"
                :text="'Готово'"
                v-model="MarketplaceRegistrationCheck"
              />
            </div>
          </div>
        </div>
        <div class="hidden">/* 8. Регистрация на маркетплейсе и подписание договора */</div>

        <div class="street-map-container"
             :class="{
          'street-map-container--open': ContainerState.PriceList,
          'street-map-container--current' : RoadMapState.ListProgress === 8,
          'street-map-container--confirm' : RoadMapState.ListProgress > 8,
        }"
             v-if="RoadMapState.ListProgress > 4"
        >
          <div @click="ContainerState.PriceList = !ContainerState.PriceList" class="street-map-container__head">
            <div class="street-map-container__head-icon">
              <svg-icon name="check"/>
            </div>
            <div class="street-map-container__head-title-wrapper">
              <p class="street-map-container__head-title">
                9. Прайс-лист и параметры товаров
                <span class="street-map-container__head-line"/>
              </p>
            </div>
            <div class="street-map-container__head-accordion-toggle">
              <svg-icon name="arrow-accordion"/>
            </div>
          </div>
          <div class="street-map-container__wrapper street-map-price-list" v-if="ContainerState.PriceList">
            <p class="street-map-container__title">Давайте загрузим товары в нашу систему</p>
            <div class="street-map-container__inner">
              <nuxt-link class="btn-main btn--green" to="/products/adding">Вручную/поштучно</nuxt-link>
              <nuxt-link class="btn-main btn--green" to="/user/marketplaces">По API</nuxt-link>
            </div>
            <input-checkbox
              :id="'price-list-check'"
              :name="'price-list-check'"
              :text="'Готово'"
              v-model="PriceListCheck"
            />
          </div>
        </div>
        <div class="hidden">/* 9. Прайс-лист и параметры товаров */</div>

        <!--
        <div class="street-map-container"
             :class="{
          'street-map-container--open': ContainerState.Brand,
          'street-map-container--current' : RoadMapState.ListProgress === 9,
          'street-map-container--confirm' : RoadMapState.ListProgress > 9,
        }"
             v-if="RoadMapState.ListProgress > 5"
        >
          <div @click="ContainerState.Brand = !ContainerState.Brand" class="street-map-container__head">
            <div class="street-map-container__head-icon">
              <svg-icon name="check"/>
            </div>
            <div class="street-map-container__head-title-wrapper">
              <p class="street-map-container__head-title">
                10. Заведение бренда на маркетплейс
                <span class="street-map-container__head-line"/>
              </p>
            </div>

            <div class="street-map-container__head-accordion-toggle">
              <svg-icon name="arrow-accordion"/>
            </div>
          </div>

          <div class="street-map-container__wrapper street-map-brand" v-if="ContainerState.Brand">
            <p class="street-map-container__title street-map-container__title--italic">Для привязки товаров к бренду
              его
              необходимо добавить в личном
              кабинете маркетплейса или выбрать уже имеющийся</p>
            <input-text
              :id="'brand'"
              :name="'brand'"
              :placeholder="'Введите название бренда'"
              :title="'Мой бренд'"
              v-model="UserMarketplacesBrand"
            />
          </div>
        </div>
        <div class="hidden">/* 10. Заведение бренда на маркетплейс */</div>


                  <div class="street-map-container"
             :class="{
          'street-map-container--open': ContainerState.Catalogue,
          'street-map-container--current' : RoadMapState.ListProgress === 10,
          'street-map-container--confirm' : RoadMapState.ListProgress > 10,
        }"
             v-if="RoadMapState.ListProgress > 6"
        >
          <div @click="ContainerState.Catalogue = !ContainerState.Catalogue" class="street-map-container__head">
            <div class="street-map-container__head-icon">
              <svg-icon name="check"/>
            </div>
            <div class="street-map-container__head-title-wrapper">
              <p class="street-map-container__head-title">
                11. Заведение каталога на маркетплейс
                <span class="street-map-container__head-line"/>
              </p>
            </div>
            <div class="street-map-container__head-accordion-toggle">
              <svg-icon name="arrow-accordion"/>
            </div>
          </div>

          <div class="street-map-container__wrapper street-map-catalogue" v-if="ContainerState.Catalogue">
            <p class="street-map-container__title street-map-container__title--italic">Быстрее всего загрузить товары
              с
              помощью таблиц спецификаций по товарам.
              Они похожи у разных площадок, но имею свой набор колонок таблицы для заполнения и отличаются для разных
              категорий</p>
            <p class="street-map-container__sub-title">
              Ранее была выбрана категория
              <span v-if="false">{{ categories.value.title }}</span>
            </p>

            <input-select
              :id="`CatalogueCategory-${index + 1}`"
              :key="`CatalogueCategory-${index + 1}`"
              :name="`CatalogueFirstCategory-${index + 1}`"
              :options="categories.values.filter(i => catalogue.map(el => el.value).indexOf(i.value) === -1)"
              :placeholder="'Выберите категорию'"
              :title="`Категория ${index + 1}`"
              v-for="(item, index) in catalogue"
            />

            <input-select
              :id="`CatalogueCategory-${1}`"
              :key="`CatalogueCategory-${1}`"
              :name="`CatalogueFirstCategory-${1}`"
              :options="[]"
              :placeholder="'Выберите категорию'"
              :title="`Категория ${1}`"
            />

            <button @click.prevent="AddInputField('catalogue')" class="btn-main btn--transparent">
              <svg-icon name="plus"/>
              Добавить категорию
            </button>
          </div>
        </div>
        <div class="hidden">/* 11. Заведение каталога на маркетплейс */</div>

        <div class="street-map-container"
             :class="{
          'street-map-container--open': ContainerState.Production,
          'street-map-container--current' : RoadMapState.ListProgress === 11,
          'street-map-container--confirm' : RoadMapState.ListProgress > 11,
        }"
             v-if="RoadMapState.ListProgress > 7"
        >
          <div @click="ContainerState.Production = !ContainerState.Production" class="street-map-container__head">
            <div class="street-map-container__head-icon">
              <svg-icon name="check"/>
            </div>
            <div class="street-map-container__head-title-wrapper">
              <p class="street-map-container__head-title">
                12. Закупка или производство товаров
                <span class="street-map-container__head-line"/>
              </p>
            </div>
            <div class="street-map-container__head-accordion-toggle">
              <svg-icon name="arrow-accordion"/>
            </div>
          </div>

          <div class="street-map-container__wrapper street-map-productions" v-if="ContainerState.Production">
            <p class="street-map-container__title">Укажите среднее время производства или поставки партии продукции
              (это нужно для своевременного оповещения о неоходимости произвести и поставить товар, чтобы продажи
              не останавливались)</p>
            <input-text
              v-mask="'######'"
              :id="'pieces'"
              :lazy="true"
              :name="'pieces'"
              :title="'Штук'"
              :type="'text'"
            />
            <input-text
              v-mask="'######'"
              :id="'CalendarDays'"
              :lazy="true"
              :name="'CalendarDays'"
              :title="'Календарных дней'"
              :type="'text'"
            />
          </div>
        </div>
        <div class="hidden">/* 12. Закупка или производство товаров */</div>

        <div class="street-map-container"
             :class="{
          'street-map-container--open': ContainerState.Documentation,
          'street-map-container--current' : RoadMapState.ListProgress === 12,
          'street-map-container--confirm' : RoadMapState.ListProgress > 12,
        }"
             v-if="RoadMapState.ListProgress > 8"
        >
          <div @click="ContainerState.Documentation = !ContainerState.Documentation" class="street-map-container__head">
            <div class="street-map-container__head-icon">
              <svg-icon name="check"/>
            </div>
            <div class="street-map-container__head-title-wrapper">
              <p class="street-map-container__head-title">
                13. Документация на товар
                <span class="street-map-container__head-line"/>
              </p>
            </div>

            <div class="street-map-container__head-accordion-toggle">
              <svg-icon name="arrow-accordion"/>
            </div>
          </div>

          <div class="street-map-container__wrapper street-map-documentations" v-if="ContainerState.Documentation">
            <input-select
              :id="`documentation-${index + 1}`"
              :key="`documentation-${index + 1}`"
              :name="`documentation-${index + 1}`"
              :options="categories.values.filter(i => documentation.map(el => el.value).indexOf(i.value) === -1)"
              :placeholder="'Выберите категорию'"
              :title="'Категория товара'"
              v-for="(item, index) in documentation"
              :value="{ value: UserRoadMapData[12].data[index].value, title: UserRoadMapData[12].data[index].title }"
              @input="UpdateRoadMap({
                step: 12, data: {
                  index: { value: $event.value, title: $event.title }
                }
              })"
            />

            <input-select
              :id="`documentation-${1}`"
              :key="`documentation-${1}`"
              :name="`documentation-${1}`"
              :placeholder="'Выберите категорию'"
              :title="'Категория товара'"
            />

            <div class="street-map-container__inner">
              <p
                class="street-map-container__title street-map-container__title--black street-map-container__title--italic">
                Документы: отказное письмо</p>
              <a class="link link--green" href="#" target="_blank">Сделать документы</a>
            </div>
            <button @click.prevent="AddInputField('documentation')" class="btn-main btn--transparent">
              <svg-icon name="plus"/>
              Добавить категорию
            </button>
          </div>
        </div>
        <div class="hidden">/* 13. Документация на товар */</div>

        <div class="street-map-container"
             :class="{
          'street-map-container--open': ContainerState.Packing,
          'street-map-container--current' : RoadMapState.ListProgress === 13,
          'street-map-container--confirm' : RoadMapState.ListProgress > 13,
        }"
             v-if="RoadMapState.ListProgress > 9"
        >
          <div @click="ContainerState.Packing = !ContainerState.Packing" class="street-map-container__head">
            <div class="street-map-container__head-icon">
              <svg-icon name="check"/>
            </div>
            <div class="street-map-container__head-title-wrapper">
              <p class="street-map-container__head-title">
                14. Упаковка товара
                <span class="street-map-container__head-line"/>
              </p>
            </div>
            <div class="street-map-container__head-accordion-toggle">
              <svg-icon name="arrow-accordion"/>
            </div>
          </div>

          <div class="street-map-container__wrapper street-map-packing" v-if="ContainerState.Packing">
            <p class="street-map-container__title">На упаковке должна быть русская этикетка (в случае иностранного
              производителя)</p>
            <div class="street-map-container__inner">
              <p class="street-map-container__title street-map-packing__inputs-title">Укажите параметры упаковки,
                мм</p>
              <div class="street-map-packing__input-area">
                <input-text
                  v-mask="'######'"
                  :id="'packingPackLength'"
                  :lazy="true"
                  :name="'packingPackLength'"
                  :title="'Длина'"
                  :type="'text'"
                />
                <input-text
                  v-mask="'######'"
                  :id="'packingPackWidth'"
                  :lazy="true"
                  :name="'packingPackWidth'"
                  :title="'Ширина'"
                  :type="'text'"
                />
                <input-text
                  v-mask="'######'"
                  :id="'packingPackHeight'"
                  :lazy="true"
                  :name="'packingPackHeight'"
                  :title="'Высота'"
                  :type="'text'"
                />
              </div>
            </div>
            <div class="street-map-container__inner">
              <p class="street-map-container__title street-map-packing__inputs-title">Параметры короба, мм</p>
              <div class="street-map-packing__input-area">
                <input-text
                  v-mask="'######'"
                  :id="'packingBoxLength'"
                  :lazy="true"
                  :name="'packingBoxLength'"
                  :title="'Длина'"
                  :type="'text'"
                />
                <input-text
                  v-mask="'######'"
                  :id="'packingBoxWidth'"
                  :lazy="true"
                  :name="'packingBoxWidth'"
                  :title="'Ширина'"
                  :type="'text'"
                />
                <input-text
                  v-mask="'######'"
                  :id="'packingBoxHeight'"
                  :lazy="true"
                  :name="'packingBoxHeight'"
                  :title="'Высота'"
                  :type="'text'"
                />
              </div>
              <div class="street-map-packing__input-area">
                <input-text
                  v-mask="'######'"
                  :id="'packingBoxPiecesPack'"
                  :lazy="true"
                  :name="'packingBoxPiecesPack'"
                  :title="'Количество штук в упаковке'"
                  :type="'text'"
                />
                <input-text
                  v-mask="'######'"
                  :id="'packingBoxPiecesBox'"
                  :lazy="true"
                  :name="'packingBoxPiecesBox'"
                  :title="'Количество штук в заводском коробе'"
                  :type="'text'"
                />
              </div>
              <input-checkbox
                :id="'packing-check'"
                :name="'packing-check'"
                :text="'Готово'"
              />
            </div>
          </div>
        </div>
        <div class="hidden">/* 14. Упаковка товара */</div>

        <div class="street-map-container"
             :class="{
          'street-map-container--open': ContainerState.Shipment,
          'street-map-container--current' : RoadMapState.ListProgress === 14,
          'street-map-container--confirm' : RoadMapState.ListProgress > 14,
        }"
             v-if="RoadMapState.ListProgress > 10"
        >
          <div @click="ContainerState.Shipment = !ContainerState.Shipment" class="street-map-container__head">
            <div class="street-map-container__head-icon">
              <svg-icon name="check"/>
            </div>
            <div class="street-map-container__head-title-wrapper">
              <p class="street-map-container__head-title">
                15. Отгрузка товаров на склады маркетплейсов
                <span class="street-map-container__head-line"/>
              </p>
            </div>
            <div class="street-map-container__head-accordion-toggle">
              <svg-icon name="arrow-accordion"/>
            </div>
          </div>

          <div class="street-map-container__wrapper street-map-shipment" v-if="ContainerState.Shipment">
            <radiobutton
              :id="'WorkPlace'"
              :name="'WorkPlace'"
              :value="'fbo'"
              :title="'Работа со склада маркетплейса (FBO)'"
            />
            <p class="street-map-container__title street-map-container__title--italic">Оценены все риски, товар п
              ользуется спросом, можете себе позволить “заморозить” часть товара</p>
            <radiobutton
              :id="'WorkPlace'"
              :name="'WorkPlace'"
              :value="'fbs'"
              :title="'Работа со своего склада (FBS)'"
            />
            <p class="street-map-container__title street-map-container__title--italic">Удобно, когда нужно
              протестировать
              товар или товар с
              низко оборачиваемостью</p>

            <input-suggestion
              :id="'suggestion-city'"
              :name="'suggestion-city'"
              :options="suggestions.CitiesList"
              :title="'Ваш город'"
              @input="[ChangeName($event)]"
            />

            <p class="street-map-container__title street-map-container__title--italic">Мы определим ближайшие склады
              и
              пункты пиёма товаров популярных маркетплейсов, и вы сможете принять решение о схеме работы</p>
          </div>
        </div>
        <div class="hidden">/* 15. Отгрузка товаров на склады маркетплейсов */</div>

        <div class="street-map-container"
             :class="{
          'street-map-container--open': ContainerState.Reviews,
          'street-map-container--current' : RoadMapState.ListProgress === 15,
          'street-map-container--confirm' : RoadMapState.ListProgress > 15,
        }"
             v-if="RoadMapState.ListProgress > 11"
        >
          <div @click="ContainerState.Reviews = !ContainerState.Reviews" class="street-map-container__head">
            <div class="street-map-container__head-icon">
              <svg-icon name="check"/>
            </div>
            <div class="street-map-container__head-title-wrapper">
              <p class="street-map-container__head-title">
                16. Отзывы и продвижение на маркетплейсе
                <span class="street-map-container__head-line"/>
              </p>
            </div>
            <div class="street-map-container__head-accordion-toggle">
              <svg-icon name="arrow-accordion"/>
            </div>
          </div>

          <div class="street-map-container__wrapper street-map-reviews" v-if="ContainerState.Reviews">
            <p class="street-map-container__title">Для большей привлекательности ваших карточек товаров
              Желательно сделать 1-5 выкупов вашего товара в зависимости от стоимости.)</p>
            <div class="street-map-container__inner">
              <input-text
                v-mask="'######'"
                :helper-text="''"
                :id="'AverageBill'"
                :lazy="true"
                :name="'AverageBill'"
                :title="'Средняя розничная цена товара'"
                :type="'text'"
                class="input-text"
              />
              <span class="street-map-reviews__sign">₽</span>
            </div>

            <p class="street-map-container__title street-map-container__title--black">
              Результат: количество отзывов на карточку товара: 1-3 шт</p>
          </div>
        </div>
        <div class="hidden">/* 16. Отзывы и продвижение на маркетплейсе */</div>

        <div class="street-map-container"
             :class="{
          'street-map-container--open': ContainerState.Logistics,
          'street-map-container--current' : RoadMapState.ListProgress === 16,
          'street-map-container--confirm' : RoadMapState.ListProgress > 16,
        }"
             v-if="RoadMapState.ListProgress > 12"
        >
          <div @click="ContainerState.Logistics = !ContainerState.Logistics" class="street-map-container__head">
            <div class="street-map-container__head-icon">
              <svg-icon name="check"/>
            </div>
            <div class="street-map-container__head-title-wrapper">
              <p class="street-map-container__head-title">
                17. Продажи, контроль остатков, поставки
                <span class="street-map-container__head-line"/>
              </p>
            </div>
            <div class="street-map-container__head-accordion-toggle">
              <svg-icon name="arrow-accordion"/>
            </div>
          </div>

          <div class="street-map-container__wrapper street-map-logistics" v-if="ContainerState.Logistics">
            <p class="street-map-container__title">Получайте данные по продажам на маркетплейсах в едином
              интерфейсе.</p>
            <div class="street-map-logistics__inner">
              <button class="btn-main btn--green">Загружайте автоматически по API</button>
              <button class="btn-main btn--green">Загрузите табличные отчёты</button>
            </div>
            <input-checkbox
              :id="'logistic-check'"
              :name="'logistic-check'"
              :text="'Готово'"
            />
          </div>
        </div>
        <div class="hidden">/* 17. Продажи, контроль остатков, поставки */</div>

        <div class="street-map-container"
             :class="{
          'street-map-container--open': ContainerState.Recommendations,
          'street-map-container--current' : RoadMapState.ListProgress === 17,
          'street-map-container--confirm' : RoadMapState.ListProgress > 17,
        }"
             v-if="RoadMapState.ListProgress > 13"
        >
          <div @click="ContainerState.Recommendations = !ContainerState.Recommendations" class="street-map-container__head">
            <div class="street-map-container__head-icon">
              <svg-icon name="check"/>
            </div>
            <div class="street-map-container__head-title-wrapper">
              <p class="street-map-container__head-title">
                18. Расширение товарной матрицы
                <span class="street-map-container__head-line"/>
              </p>
            </div>
            <div class="street-map-container__head-accordion-toggle">
              <svg-icon name="arrow-accordion"/>
            </div>
          </div>

          <div class="street-map-container__wrapper street-map-recommendations"
               v-if="ContainerState.Recommendations">
            <p class="street-map-container__title">Получайте автоматические рекомендации по товарам и расширению
              ассортимента.</p>
            <div class="street-map-recommendations__inner">
              <button class="btn-main btn--green">Рекомендации</button>
              <input-checkbox
                :id="'recommendations-check'"
                :name="'recommendations-check'"
                :text="'Готово'"
              />
            </div>
          </div>
        </div>
        <div class="hidden">/* 18. Расширение товарной матрицы */</div>
        -->
      </form>

      <div class="street-map-container street-map-complete" v-else-if="false">
        <div class="street-map-complete__inner street-map-complete__text-area">
          <p class="street-map-complete__title street-map-complete__text street-map-complete__text--big">Отлично!</p>
          <p class="street-map-complete__text street-map-complete__subtitle">Поздравляем, вы заполнили весь чеклист для
            продажи на маркетплейсах!
            <br>
            Теперь остается ждать заказов! :)</p>
          <p class="street-map-complete__text street-map-complete__text--gray">Также вам может быть интересно</p>
        </div>
        <div class="street-map-complete__inner street-map-complete__btn-area">
          <button class="btn-main btn--green">Аналитика</button>
          <button class="btn-main btn--green">Конкуренты</button>
        </div>
        <img alt="street-map-logo" class="street-map-complete__logo"
             src="../assets/images/icons/street-map-logo.svg">
      </div>

      <div class="street-map-waiting" v-if="RoadMapState.ListProgress === 9">
        <div class="street-map-waiting__wrapper">
          <p class="street-map-waiting__title">Наш путь ещё не закончен.</p>
          <p class="street-map-waiting__text">Следующие шаги будут совсем скоро.
            Мы вам сообщим, когда список пополнится, следите за обновлениями.</p>
        </div>
        <svg-icon name="fast-time" class="street-map-waiting__ico"/>
      </div>

    </div>
  </div>
</template>

<script>
  import InputText from '../components/input-text';
  import InputSuggestion from '../components/input-suggestion';
  import InputSelectText from '../components/input-select-text';
  import InputSelect from '../components/input-select';
  import InputCheckbox from '../components/input-checkbox';
  import Radiobutton from '../components/radiobutton';

  import RoadMapNavigation from '../components/road-map-navigation';

  import { scroller } from 'vue-scrollto/src/scrollTo'
  import { mask } from 'vue-the-mask';

  import { WindowWidth } from "../scripts/mixins/window-width";
  import { RoadMapState } from "../scripts/mixins/road-map-state";

  import { mapMutations, mapActions, mapGetters } from 'vuex';

  const ScrollTo = scroller();

  export default {
    name: "street-map",
    components: { InputCheckbox, InputSuggestion, InputSelect, InputText, InputSelectText, Radiobutton, RoadMapNavigation },
    directives: { mask },
    mixins: [ WindowWidth, RoadMapState ],
    head: () => {
      return {
        title: 'Гид по успешному старту работы на маркетплейсах от POPSO.ru'
      }
    },
    data: () => {
      return {
        NavigationState: window.innerWidth >= 1280,

        loading: {
          state: true,
          removing: false,
        },

        suggestions: {
          NamesList: [],
          CitiesList: [],
          LegalStatus: [],
        },

        ContainerState: {
          UserRegistration: false,        // 1.  Регистрация
          UserProfile: false,             // 2.  Заполнение профиля
          ProductCategory: false,         // 3.  Категория товара
          Analytics: false,               // 4.  Аналитика
          LegalStatus: false,             // 5.  Наличие ООО/ИП
          ElectronicManagement: false,    // 6.  Наличие ЭДО
          ElectronicSignature: false,     // 7.  Цифровая подпись (ЭЦП)
          MarketplaceRegistration: false, // 8.  Регистрация на маркетплейсе и подписание договора
          PriceList: false,               // 9.  Прайс-лист и параметры товаро
          Brand: false,                   // 10. Заведение бренда на маркетплейс
          Catalogue: false,               // 11. Заведение каталога на маркетплейс
          Production: false,              // 12. Закупка или производство товаров
          Documentation: false,           // 13. Документация на товар
          Packing: false,                 // 14. Упаковка товара
          Shipment: false,                // 15. Отгрузка
          Reviews: false,                 // 16. Отзывы и продвижение на маркетплейсе
          Logistics: false,               // 17. Продажи контроль остатков поставки
          Recommendations: false,         // 18. Расширение товарной
        },
      }
    },
    async mounted() {
      if (this.$refs['suggestion-name']){
        this.$refs['suggestion-name'].CreateDefaultFocus();
      }

      if (this.UserRoadMapData.length === 0) {
        this.loading.state = true;

        await this.GetRoadMap();
        console.log('get user road map index page: ', this.UserRoadMapData);

        setTimeout(() => {
          this.loading.removing = true;

          setTimeout(() => {
            this.loading.state = false;
            this.loading.removing = false;
          }, 350)
        }, 150); /* TODO change to 1500 after debugging */
      } else {
        this.loading.state = false;
      }

      this.OpenCurrentStep();

      //TODO Пофиксить скролл, тут есть баг, криво скроллится, дергается верстка

      /*

      setTimeout(() => {
        Object.keys(this.ContainerState).forEach((el, index) => {
          if (index === this.RoadMapState.ListProgress){
            this.ContainerState[el] = true;

            if (document.querySelectorAll('.street-map-container')[index]){
              ScrollTo(document.querySelectorAll('.street-map-container')[index],{
                duration: 1250,
                easing: 'ease',
                offset: window.innerWidth <= 1280 ? -(64 + 8) : 0
              });
            }
          }
        });
      },0);

      */
    },
    methods: {
      ...mapActions({
        GetRoadMap: 'user/GetRoadMap',
        UpdateRoadMap: 'user/UpdateRoadMap',
        UpdateUserData: 'user/UpdateUserData',
      }),

      /* TODO remove after debugging */
      ...mapMutations({
        SetUserRoadMapItem: 'user/SetUserRoadMapItem',
      }),

      ChangeCity(value) {
        const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
        const token = 'e1f82ee43480183d9bd804b2fd1c6ab1106a2316';

        this.$axios.post(url, {
          query: value
        }, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
          },
        }).then(response => {
          this.suggestions.CitiesList = response.data.suggestions.map(el => el.data.city).filter(el => el !== null).filter((a, b, arr) => arr.indexOf(a) === b);
        });
      },

      ChangeName(value) {
        const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio";
        const token = 'e1f82ee43480183d9bd804b2fd1c6ab1106a2316';

        this.$axios.post(url, {
          query: value
        }, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
          },
        }).then(response => {
          this.suggestions.NamesList = response.data.suggestions.map(el => el.data.name).filter(el => el !== null);
        });
      },

      ChangeLegalStatus(value) {
        const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
        const token = 'e1f82ee43480183d9bd804b2fd1c6ab1106a2316';

        this.$axios.post(url, {
          query: value
        }, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
          },
        }).then(response => {
          this.suggestions.LegalStatus = response.data.suggestions.map(el => el.data.inn).filter(el => el !== null).filter(this.OnlyUnique);
        });
      },

      OnlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      },

      AddInputField(fields) {
        if (this.categories.values.length > this[`${fields}`].length) {
          this[`${fields}`].push({
            title: '',
            value: '',
          })
        }
      },

      /* TODO remove after debugging */
      SetFieldState(step) {
        if (step < this.UserRoadMapData.length){
          this.SetUserRoadMapItem(
            {
              index: step,
              options: {
                status: true,
                step: step
              }
            }
          );

          console.clear();
          console.log(`close: ${Object.keys(this.ContainerState)[step]}, index: ${step}`);
          console.log(`open: ${Object.keys(this.ContainerState)[step + 1]}, index: ${step + 1}`);

          if (document.querySelectorAll('.street-map-container')[step]){
            ScrollTo(document.querySelectorAll('.street-map-container')[step],{
              duration: 2750,
              easing: 'ease',
            });
          }

          this.ContainerState[Object.keys(this.ContainerState)[step]] = false;
          this.ContainerState[Object.keys(this.ContainerState)[step + 1]] = true;
        }
      },

      /* TODO remove after debugging */
      ShowAllFields(){
        const step = this.RoadMapState.ListProgress;

        for (let i = step; i < this.UserRoadMapData.length - 1; i++){
          this.SetUserRoadMapItem(
            {
              index: i,
              options: {
                status: true,
                step: i
              }
            }
          );
        }
      },

      /* TODO remove after debugging */
      OpenAllFields(){
        for (let i = 0; i < this.UserRoadMapData.length; i++){
          this.ContainerState[Object.keys(this.ContainerState)[i]] = true;
        }
      },

      /* TODO remove after debugging */
      HideAllFields(){
        for (let i = 0; i < this.UserRoadMapData.length; i++){
          this.ContainerState[Object.keys(this.ContainerState)[i]] = false;
        }
      },

      OpenCurrentStep(){
        this.ContainerState[Object.keys(this.ContainerState)[this.RoadMapState.ListProgress]] = true;

        if (this.RoadMapState.ListProgress > 1){
          this.ContainerState[Object.keys(this.ContainerState)[this.RoadMapState.ListProgress - 1]] = false;
        }
      }
    },
    computed: {
      ...mapGetters({
        UserRoadMapData: 'user/UserRoadMapData',
        UserInfo: 'user/User',
      }),

      //TODO запросы к профилю после правок API.
      UserPhone: {
        get() {
          return this.UserRoadMapData[1].data.phone;
        },
        set(value) {
          this.UpdateRoadMap({
            step: 1,
            data: {
              user: {
                phone: value
              }
            }
          });
        },
      },
      UserName: {
        get() {
          return this.UserRoadMapData[1].data.name;
        },
        set(value) {
          this.UpdateRoadMap({
            step: 1,
            data: {
              user: {
                name: value
              }
            }
          });
        },
      },
      UserBrand: {
        get() {
          return this.UserRoadMapData[1].data.brand;
        },
        set(value) {
          this.UpdateRoadMap({
            step: 1,
            data: {
              user: {
                brand: value
              }
            }
          });
        },
      },
      UserUrl: {
        get() {
          return this.UserRoadMapData[1].data.url;
        },
        set(value) {
          this.UpdateRoadMap({
            step: 1,
            data: {
              user: {
                url: value
              }
            }
          });
        },
      },
      UserEmail: {
        get() {
          return this.UserRoadMapData[1].data.email;
        },
        set(value) {
          this.UpdateRoadMap({
            step: 1,
            data: {
              user: {
                email: value
              }
            }
          });
        },
      },

      ProductsCategoriesList: {
        get(){
          return this.UserRoadMapData[2].data.SelectList.map(el => {
            return {
              title: el.name,
              value: el.id
            }
          });
        },
      },
      ProductsCategoriesValue: {
        get(){
          return this.UserRoadMapData[2].data.SelectValue
        },
        set(value){
          this.UpdateRoadMap({
            step: 2,
            data: {
              SelectValue: value,
            }
          });

          this.SetUserRoadMapItem({
            step: 2,
            data: {
              SelectValue: value,
            }
          });
        }
      },

      UserAnalytics: {
        get(){
          return this.UserRoadMapData[3].data.value
        },
        set(value){
          this.UpdateRoadMap({
            step: 3,
            data: {
              value: value,
            }
          });

          this.SetUserRoadMapItem({
            step: 3,
            data: {
              value: value,
            }
          });
        }
      },

      LegalStatus: {
        get(){
          return this.UserRoadMapData[4].data.RadioValue
        },
        set(value){
          this.UpdateRoadMap({
            step: 4,
            data: {
              RadioValue: value,
            }
          });

          this.SetUserRoadMapItem({
            step: 4,
            data: {
              RadioValue: value,
            }
          });
        }
      },
      LegalStatusInn: {
        get(){
          return this.UserRoadMapData[4].data.InnValue
        },
        set(value){
          this.UpdateRoadMap({
            step: 4,
            data: {
              InnValue: value,
            }
          });

          this.SetUserRoadMapItem({
            step: 4,
            data: {
              InnValue: value,
            }
          });
        }
      },

      IsElectronicManagementList: {
        get(){
          return this.UserRoadMapData[5].data.SelectList.map(el => {
            return {
              title: el.name,
              value: el.id,
              url: el.url
            }
          });
        },
      },
      IsElectronicManagementListValue: {
        get(){
          return this.UserRoadMapData[5].data.SelectValue
        },
        set(value){
          this.UpdateRoadMap({
            step: 5,
            data: {
              SelectValue: value,
            }
          });

          this.SetUserRoadMapItem({
            step: 5,
            data: {
              SelectValue: value,
            }
          });
        }
      },
      IsElectronicManagementRadioValue: {
        get(){
          return this.UserRoadMapData[5].data.RadioValue
        },
        set(value){
          this.UpdateRoadMap({
            step: 5,
            data: {
              RadioValue: value,
            }
          });
        }
      },

      IsElectronicSignatureList: {
        get(){
          return this.UserRoadMapData[6].data.SelectList.map(el => {
            return {
              title: el.name,
              value: el.id,
              url: el.url
            }
          });
        },
      },
      IsElectronicSignatureListValue: {
        get(){
          return this.UserRoadMapData[6].data.SelectValue
        },
        set(value){
          this.UpdateRoadMap({
            step: 6,
            data: {
              SelectValue: value,
            }
          });

          this.SetUserRoadMapItem({
            step: 6,
            data: {
              SelectValue: value,
            }
          });
        }
      },
      IsElectronicSignatureRadioValue: {
        get(){
          return this.UserRoadMapData[6].data.RadioValue
        },
        set(value){
          this.UpdateRoadMap({
            step: 6,
            data: {
              RadioValue: value,
            }
          });
        }
      },

      MarketplaceRegistrationCheck: {
        get(){
          return this.UserRoadMapData[7].data.value
        },
        set(value){
          this.UpdateRoadMap({
            step: 7,
            data: {
              value: value,
            }
          });

          this.SetUserRoadMapItem({
            step: 7,
            data: {
              value: value,
            }
          });
        }
      },

      PriceListCheck: {
        get(){
          return this.UserRoadMapData[8].data.value
        },
        set(value){
          this.UpdateRoadMap({
            step: 8,
            data: {
              value: value,
            }
          });

          this.SetUserRoadMapItem({
            step: 8,
            data: {
              value: value,
            }
          });
        }
      },

      UserMarketplacesBrand: {
        get(){
          return this.UserRoadMapData[9].data.value
        },
        set(value){
          this.UpdateRoadMap({
            step: 9,
            data: {
              value: value,
            }
          });

          this.SetUserRoadMapItem({
            step: 9,
            data: {
              value: value,
            }
          });
        }
      }
    },
    watch: {
      WindowWidth(value){
        this.NavigationState = value > 1280;
      },
      RoadMapState(){
        this.OpenCurrentStep();
      }
    }
  }
</script>
