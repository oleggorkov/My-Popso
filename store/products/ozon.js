import Vue from 'vue';
import {GetDataInLocalStorage, SetInLocalstorage, RemoveFromLocalstorage} from "../../scripts/helpers/localstorage";

const GetUserData = async (rootGetters, dispatch) => {
  const UserData = {};

  if (Object.keys(rootGetters['user/User']).length === 0){
    await dispatch('user/GetUserData', null, {root: true});

    UserData['ClientID'] =  rootGetters['user/User'].marketplaces[2].client_id;
    UserData['ApiKey'] =  rootGetters['user/User'].marketplaces[2].api_key;

  } else {
    UserData['ClientID'] =  rootGetters['user/User'].marketplaces[2].client_id;
    UserData['ApiKey'] =  rootGetters['user/User'].marketplaces[2].api_key;
  }

  return UserData;
};

export const state = () => ({
  ProductsList: [],
  products: {},
  total: null,
  state: false
});

export const mutations = {
  SetProducts(state, data){
    Vue.set(state.products, data.index, data.items);
  },
  SetProductsList(state, ProductsList){
    state.ProductsList = ProductsList;
  },
  UpdateProducts(state, product){
    state.products.push(product);
  },
  SetTotal(state, total){
    state.total = total;
  },
  LoadingState(state, value){
    state.state = value;
  }
};

export const actions = {
  async GetProducts({commit, getters, rootGetters, dispatch}, index){
    if (GetDataInLocalStorage('UserProductsOzon').items === undefined || GetDataInLocalStorage('UserProductsOzon').items[index] === undefined){
      commit('LoadingState', true);

      let UserData = {};
      let ProductsList = [];
      let UserProducts = {};

      if (Object.keys(GetDataInLocalStorage('UserProductsOzon')).length > 0){
        UserProducts = GetDataInLocalStorage('UserProductsOzon');

        if (GetDataInLocalStorage('UserProductsOzon').items === undefined){
          UserProducts['items'] = {};
        }
      } else {
        UserProducts['items'] = {};
      }

      if (getters['ProductsList'].length === 0) {
        await dispatch('GetProductsList');
        ProductsList = getters['ProductsList'];
      } else {
        ProductsList = getters['ProductsList'];
      }

      await GetUserData(rootGetters, dispatch).then(resolve => UserData = resolve);

      async function processArray(array, context) {
        const items = [];

        for (const item of array) {
          await context.$axios.post('https://api-seller.ozon.ru/v2/product/info',{
            'product_id': item.product_id,
          },{
            headers: {
              'Client-Id': UserData.ClientID,
              'Api-Key': UserData.ApiKey,
            }
          }).then(response => {
            items.push(response.data.result);
          }).catch(error => {
            console.log(error);
          });
        }

        commit('SetProducts', {items: items, index: index});
        UserProducts.items[index] = items;
      }

      await processArray(ProductsList.slice((index * 10), ((index * 10) + 10)), this);

      SetInLocalstorage('UserProductsOzon', UserProducts);
      commit('LoadingState', false);
    } else {
      commit('SetProducts', {items: GetDataInLocalStorage('UserProductsOzon').items[index], index: index});
    }
  },
  async UpdateProductsData({commit, getters, rootGetters, dispatch}, index){
    commit('LoadingState', true);

    let UserData = {};
    let ProductsList = [];
    let UserProducts = {};

    await GetUserData(rootGetters, dispatch).then(resolve => UserData = resolve);

    if (Object.keys(GetDataInLocalStorage('UserProductsOzon')).length > 0){
      RemoveFromLocalstorage('UserProductsOzon');
      UserProducts['items'] = {};
    }

    if (getters['ProductsList'].length === 0) {
      await dispatch('GetProductsList');
      ProductsList = getters['ProductsList'];
    } else {
      ProductsList = getters['ProductsList'];
    }

    async function processArray(array, context) {
      const items = [];

      for (const item of array) {
        await context.$axios.post('https://api-seller.ozon.ru/v2/product/info',{
          'product_id': item.product_id,
        },{
          headers: {
            'Client-Id': UserData.ClientID,
            'Api-Key': UserData.ApiKey,
          }
        }).then(response => {
          items.push(response.data.result);
        }).catch(error => {
          console.log(error);
        });
      }

      commit('SetProducts', {items: items, index: index});
      UserProducts.items[index] = items;
    }

    await processArray(ProductsList.slice((index * 10), ((index * 10) + 10)), this);

    SetInLocalstorage('UserProductsOzon', UserProducts);
    commit('LoadingState', false);
  },

  async GetProductsList({commit, rootGetters, dispatch}){
    let UserData;

    await GetUserData(rootGetters, dispatch).then(resolve => UserData = resolve);

    if (GetDataInLocalStorage('UserProductsOzon').list === undefined){
      await this.$axios.post('https://api-seller.ozon.ru/v1/product/info/stocks',{
        'page_size': 1000,
      },{
        headers: {
          'Client-Id': UserData.ClientID,
          'Api-Key': UserData.ApiKey,
        }
      }).then(response => {
        let data = GetDataInLocalStorage('UserProductsOzon');

        if (!data){
          data = {};
        }

        data['list'] = response.data.result.items;
        data['total'] = response.data.result.items.length;

        commit('SetProductsList', response.data.result.items);
        commit('SetTotal', response.data.result.items.length);

        SetInLocalstorage('UserProductsOzon', data);
      }).catch(() => {
        RemoveFromLocalstorage('UserProductsOzon');

        commit('SetProducts', []);
        commit('SetTotal', null);

        return false;
      })
    } else {
      commit('SetProductsList', GetDataInLocalStorage('UserProductsOzon').list);
      commit('SetTotal', GetDataInLocalStorage('UserProductsOzon').total);
    }
  },
};

export const getters = {
  ProductsList: state => state.ProductsList,
  Products: state => state.products,
  Total: state => state.total,
  LoadingState: state => state.state,
};
