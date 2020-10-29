<template>
  <div class="container">
    <div class="container__head profile__head">
      <h1>Мой профиль</h1>
      <div class="profile__tabs">
        <nuxt-link class="btn btn--small btn--gray-filled" to="/user" :active-class="'is-active'" exact>
          <span class="btn__desktop-text">Личные данные</span>
          <span class="btn__mobile-text">Данные</span>
        </nuxt-link>
        <nuxt-link class="btn btn--small btn--gray-filled" to="/user/marketplaces" :active-class="'is-active'">Маркетплейсы</nuxt-link>
        <nuxt-link class="btn btn--small btn--gray-filled none" to="/user/warehouses" :active-class="'is-active'">Склады</nuxt-link>
      </div>
    </div>

    <div class="personal-info">
      <transition name="skeleton-animate" mode="out-in">
        <form action="#" method="post" ref="personalInfoForm"
          v-if="!loading"
        >
          <div class="personal-info__card">
            <input-text
              :type="'text'"
              :title="'Телефон'"
              :name="'phone'"
              :id="'phone'"
              :disabled="true"
              :required="true"
              :lazy="true"
              v-model="phone"
              v-mask="'+7 (###) ###-##-##'"
            />

            <input-text
              :type="'text'"
              :title="'Имя'"
              :name="'name'"
              :id="'name'"
              :required="true"
              :lazy="true"
              v-model="name"
            />

            <input-text
              :type="'email'"
              :title="'E-mail'"
              :name="'email'"
              :id="'email'"
              :required="true"
              :lazy="true"
              v-model="email"
            />

            <input-text
              :type="'text'"
              :title="'Компания/бренд'"
              :name="'brand'"
              :id="'brand'"
              :lazy="true"
              v-model="brand"
            />

            <input-text
              :type="'text'"
              :title="'Сайт'"
              :name="'url'"
              :id="'url'"
              :lazy="true"
              v-model="url"
            />
          </div>

          <div class="personal-info__card" v-if="false">
            <h2>Реквизиты</h2>

            <input-text
              :type="'text'"
              :title="'Название компании'"
              :name="'company-name'"
              :id="'company-name'"
              :lazy="true"
              v-model.lazy="CompanyName"
            />

            <input-text
              :type="'number'"
              :title="'ИНН'"
              :name="'inn'"
              :id="'inn'"
              :lazy="true"
              v-model.lazy="inn"
            />

            <input-text
              :type="'number'"
              :title="'ОГРН'"
              :name="'ogrn'"
              :id="'ogrn'"
              :lazy="true"
              v-model.lazy="ogrn"
            />

            <input-text
              :type="'number'"
              :title="'КПП (для ООО)'"
              :name="'kpp'"
              :id="'kpp'"
              :lazy="true"
              v-model.lazy="kpp"
            />

            <input-text
              :type="'text'"
              :title="'Юридический адрес'"
              :name="'legal-address'"
              :id="'legal-address'"
              :lazy="true"
              v-model.lazy="LegalAddress"
            />

            <input-text
              :type="'text'"
              :title="'Почтовый адрес'"
              :name="'postal-address'"
              :id="'postal-address'"
              :lazy="true"
              v-model.lazy="PostalAddress"
            />

            <input-text
              :type="'number'"
              :title="'Расчётный счёт'"
              :name="'payment-account'"
              :id="'payment-account'"
              :lazy="true"
              v-model.lazy="PaymentAccount"
            />

            <input-text
              :type="'number'"
              :title="'Корреспондентский счёт'"
              :name="'correspondent-account'"
              :id="'correspondent-account'"
              :lazy="true"
              v-model.lazy="CorrespondentAccount"
            />

            <input-text
              :type="'number'"
              :title="'БИК банка'"
              :name="'bic'"
              :id="'bic'"
              :lazy="true"
              v-model.lazy="bic"
            />
          </div>
        </form>
        <div class="skeleton-screen"
             :key="'skeleton-screen'"
          v-else>
          <div class="skeleton-screen__wrapper">
            <div class="skeleton-screen__inner">
              <div class="skeleton-screen-block" v-for="item in 5">
                <span class="skeleton-screen-block__input"/>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import InputText from "../../components/input-text";

  export default {
    name: 'user',
    head: () => {
      return {
        title: 'Личные данные, профиль на POPSO.ru'
      }
    },
    components: {
      InputText
    },
    transition(to, from){
      if (!from){
        return;
      }

      if (from.path === '/user/marketplaces'){
        return 'user-profile';
      }
    },
    data: () => {
      return {
        loading: false,
      }
    },
    async mounted() {
      if (Object.keys(this.User).length === 0) {
        this.loading = true;
        await this.GetUserData();
      }

      setTimeout(() => {
        this.loading = false;
      }, 1250);
    },
    methods: {
      ...mapActions({
        GetUserData: 'user/GetUserData',
        UpdateUserData: 'user/UpdateUserData',
        UpdateCompanyData: 'user/UpdateCompanyData',
      }),
    },
    computed: {
      ...mapGetters({
        User: 'user/User',
        company: 'user/Company',
        LoadingState: 'user/LoadingState',
      }),
      name: {
        get() {
          return this.User.name;
        },
        set(value) {
          this.UpdateUserData({
            user: {
              name: value
            }
          });
        },
      },
      brand: {
        get() {
          return this.User.brand;
        },
        set(value) {
          this.UpdateUserData({
            user: {
              brand: value
            }
          });
        },
      },
      phone: {
        get() {
          return this.User.phone;
        },
        set(value) {
          this.UpdateUserData({
            user: {
              phone: value
            }
          });
        },
      },
      url: {
        get() {
          return this.User.url;
        },
        set(value) {
          this.UpdateUserData({
            user: {
              url: value
            }
          });
        },
      },
      email: {
        get() {
          return this.User.email;
        },
        set(value) {
          this.UpdateUserData({
            user: {
              email: value
            }
          });
        },
      },

      CompanyName: {
        get() {
          return this.company.companyName;
        },
        set(value) {
          this.UpdateCompanyData({
            company: {
              CompanyName: value
            }
          });
        },
      },
      inn: {
        get() {
          return this.company.inn;
        },
        set(value) {
          this.UpdateCompanyData({
            company: {
              inn: value
            }
          });
        },
      },
      ogrn: {
        get() {
          return this.company.ogrn;
        },
        set(value) {
          this.UpdateCompanyData({
            company: {
              ogrn: value
            }
          });
        },
      },
      kpp: {
        get() {
          return this.company.kpp;
        },
        set(value) {
          this.UpdateCompanyData({
            company: {
              kpp: value
            }
          });
        },
      },
      LegalAddress: {
        get() {
          return this.company.legalAddress;
        },
        set(value) {
          this.UpdateCompanyData({
            company: {
              LegalAddress: value
            }
          });
        },
      },
      PostalAddress: {
        get() {
          return this.company.postalAddress;
        },
        set(value) {
          this.UpdateCompanyData({
            company: {
              PostalAddress: value
            }
          });
        },
      },
      PaymentAccount: {
        get() {
          return this.company.paymentAccount;
        },
        set(value) {
          this.UpdateCompanyData({
            company: {
              PaymentAccount: value
            }
          });
        },
      },
      CorrespondentAccount: {
        get() {
          return this.company.correspondentAccount;
        },
        set(value) {
          this.UpdateCompanyData({
            company: {
              CorrespondentAccount: value
            }
          });
        },
      },
      bic: {
        get() {
          return this.company.bic;
        },
        set(value) {
          this.UpdateCompanyData({
            bic: {
              CompanyName: value
            }
          });
        },
      },
    },
  }
</script>

<style lang="scss">
  .personal-info {
    width: 100%;

    &__card {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 8rem;
      grid-row-gap: 1rem;
      margin-bottom: 1.6rem;
      padding: 2.4rem 4rem;
      background-color: $color-main--white;
      border-radius: 10px;

      @include mobile {
        grid-template-columns: 1fr;
        grid-row-gap: 0.5rem;
        padding: 2.4rem 1.3rem 0.7rem;
      }

      h2 {
        grid-column: 1 / 3;
        margin-bottom: 1.4rem;

        font-weight: 700;
        font-size: 1.4rem;
        line-height: 2rem;
        color: $color-main--darkgray;

        @include mobile {
          grid-column: auto;
          margin-bottom: 1.9rem;
        }
      }
    }

    &__form-button {
      min-width: 19.8rem;
      min-height: 4.4rem;
      margin-top: 2.5rem;
      margin-left: auto;

      font-size: 1.4rem;
      line-height: 2rem;

      @include mobile {
        width: 100%;
        margin-left: 0;
      }
    }

    .input-text input:disabled{
      color: $color-main--darkgray;
    }

    .skeleton-screen{
      width: 100%;
      height: auto;

      display: grid;

      &__wrapper{
        width: 100%;
        height: auto;

        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: 1rem;
      }

      &__inner{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 8rem;
        grid-row-gap: 1rem;
        margin-bottom: 1.6rem;
        padding: 2.4rem 4rem;
        background-color: #FFFFFF;
        border-radius: 10px;

        @include mobile {
          grid-template-columns: repeat(1, 1fr);
        }
      }
    }

    .skeleton-screen-block{
      width: 100%;
      height: 7.1rem;
      padding: 0;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;

      border-radius: 1rem;
      background-color: white;

      &__input{
        width: 100%;
        height: 100%;
      }


      &__title, &__text, &__input {
        @extend %skeleton-animate;
      }
    }
  }
</style>
