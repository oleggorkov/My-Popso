export const state = () => ({
  MarketplaceState: {
    'Wildberries': {
      ApiKey: 'Api-W',
      Token: 'Tok-W',
      Commission: '3-35%',
      Store: 'Маркетплейс /Свой',
      data: null,
    },
    'Goods': {
      ApiKey: 'Api-G',
      Token: 'Tok-G',
      Commission: '3-35%',
      Store: 'Маркетплейс /Свой',
      data: null,
    },
    'Beru': {
      ApiKey: 'Api-B',
      Token: 'Tok-B',
      Commission: '3-35%',
      Store: 'Маркетплейс /Свой',
      data: {},
    },
    'Lamoda': {
      ApiKey: 'Api-L',
      Token: 'Tok-L',
      Commission: '3-35%',
      Store: 'Маркетплейс /Свой',
      data: null,
    },
    'Aliexpress': {
      ApiKey: 'Api-A',
      Token: 'Tok-A',
      Commission: '3-35%',
      Store: 'Маркетплейс /Свой',
      data: null,
    },
    'OZON': {
      ApiKey: 'Api-A',
      Token: 'Tok-A',
      Commission: '3-35%',
      Store: 'Маркетплейс /Свой',
      data: {
        ArticleInStore: 87,
        ProductInStore: 234,
        Price: '123 456',
        SchemeWork: 'Со склада маркетплейса (FBO)',
        ContractNumber: 'ИР-xxxxx/20',
        ContractDate: 'xx.xx.xxxx',
      },
    },
  },
  UserMarketplaces: [],
});

export const mutations = {
  SetMarketplaceState(state, data){
    Object.assign(state.MarketplaceState[data.name], data);
  },
  SetUserMarketplaces(state, data){
    state.UserMarketplaces = data;
  },
  SetUserMarketplaceApi(state, data){
    state.UserMarketplaces.filter(el => el.name === data.url)[0].api.options.filter(el => el.id === data.api.id)[0].value = data.api.value;
  },
  SetUserMarketplaceStatus(state, data){
    state.UserMarketplaces.filter(el => el.url === data.url)[0].status = data.status;
  },
  SetUserMarketplaceStorage(state, data){
    state.UserMarketplaces.filter(el => el.url === data.url)[0].info.store.options.filter(el => el.type === data.store.type)[0].status = data.store.status;
  },
};

export const actions = {
  async GetUserMarketplaces({ commit }){
    await this.$CreateRequest({
      path: 'user/marketplaces/list.php',
      ResponseCallback: response => {
        commit('SetUserMarketplaces', response.data.data);
      }
    });
  },
  async UpdateUserMarketplaceApi({ commit, dispatch }, data){
    await this.$CreateRequest({
      path: 'user/marketplaces/update-info.php',
      RequestBody: { data },
      ResponseCallback: response => {
        commit('SetUserMarketplaceApi', data);

        dispatch('HelperPopupState',{
          text: `Данные маркетплейса '${data.name}' изменены.    Поле '${data.api.name}' успешно измнено!`,
          classes: 'helper-popup--success',
          time: 5000
        }, {
          root: true
        });
      }
    });
  },
  async UpdateUserMarketplaceStatus({ commit, dispatch }, data){
    await this.$CreateRequest({
      path: 'user/marketplaces/update-status.php',
      RequestBody: { data },
      ResponseCallback: response => {
        commit('SetUserMarketplaceStatus', data);

        dispatch('HelperPopupState',{
          text: response.data.text,
          classes: 'helper-popup--success',
          time: 3500
        }, {
          root: true
        });
      }
    });
  },
  async UpdateUserMarketplaceStorage({ commit }, data){
    await this.$CreateRequest({
      path: 'user/marketplaces/update-storage.php',
      RequestBody: { data },
      ResponseCallback: response => {
        commit('SetUserMarketplaceStorage', data);
      }
    });
  }
};

export const getters = {
  MarketplaceState: state => state.MarketplaceState,
  /* TODO remove .data after debugging */
  //UserMarketplaces: state => state.UserMarketplaces.data,
  UserMarketplaces: state => state.UserMarketplaces,
};
