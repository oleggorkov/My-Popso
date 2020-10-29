<template>
	<div class="container">
    <DocumentationHeader title="Элементы управления"/>

    <div class="components-page" id="input-text">
      <div class="components-page__head">
        <h2>Пример работы с компонетом input-text</h2>
      </div>
      <div class="components-page__wrapper inputs-container">
        <div class="inputs-container__wrapper">
          <p class="inputs-container__title">Текстовый инпут</p>
          <p class="inputs-container__sub-title">Пример текстового инпута в состонии предупреждения</p>
          <input-text
            class="input-text--warning"
            :helper-text="'Введите имя'"
            :id="'some-input-text-warning'"
            :lazy="false"
            :name="'some-input-text-warning'"
            :title="'Тестовый текстовый инпут'"
            :type="'text'"
            v-model="inputs.InputTextWarning"
          />
          <p class="inputs-container__description">Введенные данные: {{ inputs.InputTextWarning }}</p>
        </div>
        <div class="inputs-container__wrapper">
          <p class="inputs-container__title">Текстовый инпут</p>
          <p class="inputs-container__sub-title">Пример текстового инпута в состонии ошибки</p>
          <input-text
            class="input-text--error"
            :helper-text="'Введите имя'"
            :id="'some-input-text-error'"
            :lazy="false"
            :name="'some-input-text-error'"
            :title="'Тестовый текстовый инпут'"
            :type="'text'"
            v-model="inputs.InputTextError"
          />
          <p class="inputs-container__description">Введенные данные: {{ inputs.InputTextError }}</p>
        </div>
        <div class="inputs-container__wrapper">
          <p class="inputs-container__title">Текстовый инпут</p>
          <p class="inputs-container__sub-title">Пример текстового инпута в состонии успеха</p>
          <input-text
            class="input-text--successes"
            :helper-text="'Введите имя'"
            :id="'some-input-text-successes'"
            :lazy="false"
            :name="'some-input-text-successes'"
            :title="'Тестовый текстовый инпут'"
            :type="'text'"
            v-model="inputs.InputTexSuccesses"
          />
          <p class="inputs-container__description">Введенные данные: {{ inputs.InputTexSuccesses }}</p>
        </div>
        <div class="inputs-container__wrapper">
          <p class="inputs-container__title">Текстовый инпут</p>
          <p class="inputs-container__sub-title">Пример текстового инпута в состонии "обязателен к заполнению"</p>
          <input-text
            class="input-text--required"
            :id="'some-input-text-required'"
            :lazy="false"
            :name="'some-input-text-required'"
            :title="'Тестовый текстовый инпут'"
            :type="'text'"
            v-model="inputs.InputTextRequired"
          />
          <p class="inputs-container__description">Введенные данные: {{ inputs.InputTextRequired }}</p>
        </div>
        <div class="inputs-container__wrapper">
          <p class="inputs-container__title">Текстовый инпут</p>
          <p class="inputs-container__sub-title">Выключен параметр false, данные будут обновляться сразу</p>
          <input-text
            :id="'some-input-text'"
            :lazy="false"
            :name="'some-input-text'"
            :title="'Тестовый текстовый инпут'"
            :type="'text'"
            v-model="inputs.InputTextLazyFalse"
          />
          <p class="inputs-container__description">Введенные данные: {{ inputs.InputTextLazyFalse }}</p>
        </div>
        <div class="inputs-container__wrapper">
          <p class="inputs-container__title">Текстовый инпут</p>
          <p class="inputs-container__sub-title">Включен параметр lazy, данные будут обновленые только при сбросе фокуса с инпута</p>
          <input-text
            :id="'some-input-text-lazy'"
            :lazy="true"
            :name="'some-input-text-lazy'"
            :title="'Тестовый текстовый инпут'"
            :type="'text'"
            v-model="inputs.InputTextLazy"
          />
          <p class="inputs-container__description">Введенные данные: {{ inputs.InputTextLazy }}</p>
        </div>
        <div class="inputs-container__wrapper">
          <p class="inputs-container__title">Текстовый инпут</p>
          <p class="inputs-container__sub-title">Пример инпута с маской телефона</p>
          <input-text
            :id="'some-input-text-mask-phone'"
            :lazy="false"
            :name="'some-input-text-mask-phone'"
            :title="'Тестовый текстовый инпут'"
            :type="'text'"
            v-model="inputs.InputTextMaskPhone"
            v-mask="'+7 (###) ### ## ##'"
          />
          <p class="inputs-container__description">Введенные данные: {{ inputs.InputTextMaskPhone }}</p>
        </div>
      </div>
    </div>

    <div class="components-page" id="input-suggestion">
      <div class="components-page__head">
        <h2>Пример работы с компонетом input-suggestion</h2>
      </div>
      <div class="components-page__wrapper inputs-container">
        <div class="inputs-container__wrapper">
          <p class="inputs-container__title">Текстовый инпут</p>
          <p class="inputs-container__sub-title">Пример инпута c подсказкой имени с помощью dadata</p>
          <input-suggestion
            :id="'suggestion-name'"
            :options="suggestions.NamesList"
            :title="'Имя'"
            :ref="'suggestion-name'"
            :inputClass="'input-text--required'"
            @input="ChangeSuggestionValue($event, 'NamesList')"
            v-model="suggestions.Name"
          />
          <p class="inputs-container__description">Введенные данные: {{ suggestions.Name }}</p>
        </div>
        <div class="inputs-container__wrapper">
          <p class="inputs-container__title">Текстовый инпут</p>
          <p class="inputs-container__sub-title">Пример инпута c подсказкой имени с помощью dadata в состоянии ошибки</p>
          <input-suggestion
            class="input-suggestion--error"
            :id="'suggestion-name--error'"
            :options="suggestions.NamesListError"
            :title="'Имя'"
            :ref="'suggestion-name'"
            :inputClass="'input-text--required'"
            :helper-text="'Подсказка'"
            @input="ChangeSuggestionValue($event, 'NamesListError')"
            v-model="suggestions.NameError"
          />
          <p class="inputs-container__description">Введенные данные: {{ suggestions.NameError }}</p>
        </div>
        <div class="inputs-container__wrapper">
          <p class="inputs-container__title">Текстовый инпут</p>
          <p class="inputs-container__sub-title">Пример инпута c подсказкой имени с помощью dadata в состоянии успеха</p>
          <input-suggestion
            class="input-suggestion--success"
            :id="'suggestion-name--success'"
            :options="suggestions.NamesListSuccess"
            :title="'Имя'"
            :ref="'suggestion-name'"
            :inputClass="'input-text--required'"
            :helper-text="'Подсказка'"
            @input="ChangeSuggestionValue($event, 'NamesListSuccess')"
            v-model="suggestions.NameSuccess"
          />
          <p class="inputs-container__description">Введенные данные: {{ suggestions.NameSuccess }}</p>
        </div>

      </div>
    </div>

    <div class="components-page" id="input-checkbox">
      <div class="components-page__head">
        <h2>Пример работы с компонетом input-checkbox</h2>
      </div>
      <div class="components-page__wrapper inputs-container">
        <div class="inputs-container__wrapper">
          <p class="inputs-container__title">Checkbox</p>
          <p class="inputs-container__sub-title">Пример input-checkbox</p>
          <input-checkbox
            :id="'some-input-checkbox'"
            :name="'some-input-checkbox'"
            :text="'Тестовый чекбокс'"
            :value="true"
            :className="'test-class-name'"
            v-model="checkbox.Check"
          />
          <p class="inputs-container__description">Введенные данные: {{ checkbox.Check }}</p>
        </div>
        <div class="inputs-container__wrapper">
          <p class="inputs-container__title">Checkbox</p>
          <p class="inputs-container__sub-title">Пример input-checkbox в состоянии disabled с поставленной галочкой</p>
          <input-checkbox
            :id="'some-input-checkbox-disabled'"
            :name="'some-input-checkbox-disabled'"
            :text="'Тестовый чекбокс'"
            :disabled="true"
            :className="'test-class-name'"
            v-model="checkbox.CheckDisabledTrue"
          />
          <p class="inputs-container__description">Введенные данные: {{ checkbox.CheckDisabledTrue }}</p>
        </div>
        <div class="inputs-container__wrapper">
          <p class="inputs-container__title">Checkbox</p>
          <p class="inputs-container__sub-title">Пример input-checkbox в состоянии disabled без поставленной галочкой</p>
          <input-checkbox
            :id="'some-input-checkbox-disabled'"
            :name="'some-input-checkbox-disabled'"
            :text="'Тестовый чекбокс'"
            :disabled="true"
            :className="'test-class-name'"
            v-model="checkbox.CheckDisabledFalse"
          />
          <p class="inputs-container__description">Введенные данные: {{ checkbox.CheckDisabledFalse }}</p>
        </div>
      </div>
    </div>

    <div class="components-page" id="radiobutton">
      <div class="components-page__head">
        <h2>Пример работы с компонетом Radiobutton</h2>
      </div>
      <div class="components-page__wrapper inputs-container">
        <div class="inputs-container__wrapper">
          <p class="inputs-container__title">Radiobutton</p>
          <p class="inputs-container__sub-title">Пример radiobutton</p>
          <radiobutton
            :id="'radiobutton'"
            :name="'radiobutton'"
            :value="'first'"
            :title="'Первый radiobutton'"
            v-model="RadiobuttonValue"
          />
          <radiobutton
            :id="'radiobutton'"
            :name="'radiobutton'"
            :value="'second'"
            :title="'Второй radiobutton'"
            v-model="RadiobuttonValue"
          />
          <p class="inputs-container__description">Введенные данные: {{ RadiobuttonValue }}</p>
        </div>

        <div class="inputs-container__wrapper">
          <p class="inputs-container__title">Radiobutton</p>
          <p class="inputs-container__sub-title">Пример radiobutton d состоянии checked</p>
          <radiobutton
            :id="'radiobutton-checked'"
            :name="'radiobutton-checked'"
            :value="'first'"
            :title="'Первый radiobutton'"
            v-model="RadiobuttonValueChecked"

          />
          <radiobutton
            :id="'radiobutton-checked'"
            :name="'radiobutton-checked'"
            :value="'second'"
            :title="'Второй radiobutton'"
            v-model="RadiobuttonValueChecked"
          />
          <p class="inputs-container__description">Введенные данные: {{ RadiobuttonValueChecked }}</p>
        </div>

        <div class="inputs-container__wrapper">
          <p class="inputs-container__title">Radiobutton</p>
          <p class="inputs-container__sub-title">Пример radiobutton в состоянии disabled</p>
          <radiobutton
            :id="'radiobutton-disabled'"
            :name="'radiobutton-disabled'"
            :value="'first-value-disabled'"
            :title="'Первый radiobutton'"
            :disabled="true"
            v-model="RadiobuttonValueDisabled"
          />
          <radiobutton
            :id="'radiobutton-disabled'"
            :name="'radiobutton-disabled'"
            :value="'second-value-disabled'"
            :title="'Второй radiobutton'"
            :disabled="true"
            v-model="RadiobuttonValueDisabled"
          />
          <p class="inputs-container__description">Введенные данные: {{ RadiobuttonValueDisabled }}</p>
        </div>
      </div>
    </div>

    <div class="components-page" id="input-select">
      <div class="components-page__head" >
        <h2>Пример работы с компонетом input-select</h2>
      </div>
      <div class="components-page__wrapper inputs-container">
        <div class="inputs-container__wrapper">
          <p class="inputs-container__title">Input-select</p>
          <p class="inputs-container__sub-title">Пример работы input-select</p>
          <input-select
            :id="'Category'"
            :name="'Category'"
            :options="InputSelect.values"
            :placeholder="'Выберите категорию'"
            v-model="InputSelect.valueSelected.value"
          />
          <p class="inputs-container__description">Введенные данные: {{ InputSelect.valueSelected.value }}</p>
        </div>
      </div>
    </div>

    <div class="components-page" id="button">
      <div class="components-page__head">
        <h2>Пример работы с компонетом button</h2>
      </div>
      <div class="components-page__wrapper buttons-container">
        <button type="button" class="btn-main btn--green">Тестовая кнопка</button>
        <button type="button" class="btn-main btn--green-invert">Тестовая кнопка</button>
        <button type="button" class="btn-main btn--gray-filled">Тестовая кнопка</button>
        <button type="button" class="btn-main btn--transparent">Тестовая кнопка</button>
      </div>
    </div>

    <div class="components-page" id="link">
      <div class="components-page__head">
        <h2>Пример работы с компонетом link</h2>
      </div>
      <div class="components-page__wrapper buttons-container">
        <a href="#" class="link link--green">Тестовая ссылка</a>
        <a href="#" class="link link--black">Тестовая ссылка</a>
        <a href="#" class="link link--blue">Тестовая ссылка</a>
        <a href="#" class="link link--purpure">Тестовая ссылка</a>
      </div>
    </div>

    <div class="components-page">
      <div class="components-page__head">
        <h2>Пример работы с компонетом Гида</h2>
      </div>
      <div class="components-page__wrapper gid-container">
        <p class="inputs-container__sub-title">Пример не заполненного блока Гида</p>
        <div class="street-map-container"
             :class="{
            'street-map-container--open': Gid.Confirm.Open,
            'street-map-container--current' : Gid.Confirm.Current,
            'street-map-container--confirm' : Gid.Confirm.Confirm,
          }"
        >
          <div @click="Gid.Confirm.Open = !Gid.Confirm.Open" class="street-map-container__head">
            <div class="street-map-container__head-icon">
              <svg-icon name="check"/>
            </div>
            <div class="street-map-container__head-title-wrapper">
              <p class="gid-container__title">
                1. Тестовый блок (При клике открывается / закрывается)
              </p>
            </div>
            <div class="street-map-container__head-accordion-toggle">
              <svg-icon name="arrow-accordion"/>
            </div>
          </div>

          <div class="street-map-container__wrapper" v-if="Gid.Confirm.Open">
            <p class="gid-container__sub-title">Тестовый текст внутри </p>
          </div>
        </div>
      </div>
      <div class="components-page__wrapper gid-container">
        <p class="inputs-container__sub-title">Пример активного / заполняемого блока Гида</p>
        <div class="street-map-container"
             :class="{
            'street-map-container--open': Gid.Current.Open,
            'street-map-container--current' : Gid.Current.Current,
            'street-map-container--confirm' : Gid.Current.Confirm,
          }"
        >
          <div @click="Gid.Current.Open = !Gid.Current.Open" class="street-map-container__head">
            <div class="street-map-container__head-icon">
              <svg-icon name="check"/>
            </div>
            <div class="street-map-container__head-title-wrapper">
              <p class="gid-container__title">
                2. Тестовый блок (При клике открывается / закрывается)
              </p>
            </div>
            <div class="street-map-container__head-accordion-toggle">
              <svg-icon name="arrow-accordion"/>
            </div>
          </div>

          <div class="street-map-container__wrapper" v-if="Gid.Current.Open">
            <p class="gid-container__sub-title">Тестовый текст внутри </p>
          </div>
        </div>
      </div>
      <div class="components-page__wrapper gid-container">
        <p class="inputs-container__sub-title">Пример заполненного блока Гида</p>
        <div class="street-map-container"
             :class="{
            'street-map-container--open': Gid.Previous.Open,
            'street-map-container--current' : Gid.Previous.Previous,
            'street-map-container--confirm' : Gid.Previous.Confirm,
          }"
        >
          <div @click="Gid.Previous.Open = !Gid.Previous.Open" class="street-map-container__head">
            <div class="street-map-container__head-icon">
              <svg-icon name="check"/>
            </div>
            <div class="street-map-container__head-title-wrapper">
              <p class="gid-container__title">
                3. Тестовый блок (При клике открывается / закрывается)
              </p>
            </div>
            <div class="street-map-container__head-accordion-toggle">
              <svg-icon name="arrow-accordion"/>
            </div>
          </div>

          <div class="street-map-container__wrapper" v-if="Gid.Previous.Open">
            <p class="gid-container__sub-title">Тестовый текст внутри </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import InputCheckbox from "../../../components/input-checkbox";
  import InputSelect from "../../../components/input-select";
  import InputText from "../../../components/input-text";
  import InputSuggestion from "../../../components/input-suggestion";
  import Radiobutton from "../../../components/radiobutton";
  import DocumentationHeader from "../../../components/documentation-header"


  import { mask } from 'vue-the-mask';

  export default {
    name: 'control-elements',
    components: {Radiobutton, InputCheckbox, InputSelect, InputText, InputSuggestion, DocumentationHeader },
    directives: {
      mask
    },
    data(){
      return{
        inputs: {
          InputTextLazyFalse: 'Очень интересный текст',
          InputTextLazy: 'Очень интересный текст',
          InputTextError: 'Очень интересный текст',
          InputTextWarning: 'Очень интересный текст',
          InputTextRequired: 'Очень интересный текст',
          InputTexSuccesses: 'Очень интересный текст',
          InputTextMaskPhone: '9001557302',
        },
        checkbox: {
          Check: true,
          CheckDisabledTrue: true,
          CheckDisabledFalse: false,
        },
        RadiobuttonValue: '',
        RadiobuttonValueChecked: 'second',
        RadiobuttonValueDisabled: 'first-value-disabled',
        InputSelect: {
          valueSelected: {title: '', value: ''},
          values: [
            {title: 'Первая опция', value: 'Первая опция'},
            {title: 'Вторая опция', value: 'Вторая опция'},
            {title: 'Третья опция', value: 'Третья опция'},
            {title: 'Четвёртая опция', value: 'Четвёртая опция'},
          ]
        },
        suggestions: {
          NamesList: [], // Сюда вставляется массим имён приходящих в качестве подскажи с сервера dadata
          NamesListError: [],
          NamesListSuccess: [],
          Name: '',
          NameError: '',
          NameSuccess: '',
        },
        Gid: {
          Previous: {
            Open: true,
            Current: false,
            Confirm: false,
          },
          Current: {
            Open: true,
            Current: true,
            Confirm: false,
          },
          Confirm: {
            Open: true,
            Current: false,
            Confirm: true,
          },
        }
      }
    },

    methods: {

      /* Функция для компонента input-suggestion
      *  Используется для запроса на сервер dadata и возвращения массива Имён / Городов / ИНН
      * */
      ChangeSuggestionValue(value, name) {
        let url = '';
        switch (name) {
          case 'NamesList':
            url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio";
            break;
          case 'NamesListError':
            url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio";
            break;
          case 'NamesListSuccess':
            url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio";
            break;
          case 'CitiesList':
            url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
            break;
          case 'LegalStatus':
            url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
            break
        }

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
          switch (name) {
            case 'NamesList':
              this.suggestions.NamesList = response.data.suggestions.map(el => el.data.name).filter(el => el !== null);
              break;
            case 'NamesListError':
              this.suggestions.NamesListError = response.data.suggestions.map(el => el.data.name).filter(el => el !== null);
              break;
            case 'NamesListSuccess':
              this.suggestions.NamesListSuccess = response.data.suggestions.map(el => el.data.name).filter(el => el !== null);
              break;
            case 'CitiesList':
              this.suggestions.CitiesList = response.data.suggestions.map(el => el.data.city).filter(el => el !== null).filter((a, b, arr) => arr.indexOf(a) === b);
              break;
            case 'LegalStatus':
              this.suggestions.LegalStatus = response.data.suggestions.map(el => el.data.inn).filter(el => el !== null).filter(this.OnlyUnique);
              break
          }
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .components-page{
   width: 100%;
   height: 100%;

   padding: 1.6rem 1.6rem 3.2rem 1.6rem;

   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;

   background-color: white;
   border-radius: 1rem;

   &__head{
     width: 100%;
     height: auto;

     padding: 1.6rem 0 0.8rem 0;

     display: flex;
     justify-content: flex-start;
     align-items: center;

     border-bottom: 0.2rem solid $color-main--lightgray;

     h2{
       font-size: 1.8rem;
       line-height: 2.4rem;
       font-weight: 600;
       color: #303136;
     }
   }

   &__wrapper{
     width: 100%;
     height: auto;

     margin-top: 3.2rem;
   }

   &:not(:last-of-type){
     margin-bottom: 4.8rem;
   }
  }

  .inputs-container{
   width: 100%;
   height: auto;

   display: grid;
   grid-template-columns: repeat(4, 1fr);
   grid-column-gap: 2.4rem;
   grid-row-gap: 4.8rem;

   &__title{
     font-size: 1.6rem;
     font-weight: 500;
     color: $color-main--black;
   }

   &__sub-title{
     font-size: 1.4rem;
     font-weight: normal;
     color: $color-main--black;
   }

   &__description{
     font-size: 1.2rem;
     font-weight: normal;
     color: $color-main--darkgray;
   }

   &__wrapper{
     width: 100%;
     height: auto;

     display: grid;
     grid-template-columns: 1fr;
     grid-template-rows: 2.4rem 6.4rem 8rem 2.4rem;
     grid-row-gap: 2.4rem;
   }
  }

  .buttons-container{
    width: 100%;
    height: auto;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 2.4rem;
    grid-row-gap: 4.8rem;
  }

  .gid-container{
    &__title{
      font-size: 1.6rem;
      font-weight: 500;
      color: $color-main--black;
    }

    &__sub-title{
      font-size: 1.4rem;
      font-weight: normal;
      color: $color-main--black;
    }
  }
</style>
