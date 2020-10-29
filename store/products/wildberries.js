import {GetDataInLocalStorage, RemoveFromLocalstorage, SetInLocalstorage} from "../../scripts/helpers/localstorage";

const GetUserData = async (rootGetters, dispatch) => {
  const UserData = {};

  if (Object.keys(rootGetters['user/User']).length === 0){
    await dispatch('user/GetUserData', null, {root: true});

    UserData['ApiKey'] = rootGetters['user/User'].marketplaces[1].api_key;

  } else {
    UserData['ApiKey'] = rootGetters['user/User'].marketplaces[1].api_key;
  }

  return UserData;
};

export const state = () => ({
  ProductsList: [],
  products: [],
  total: null,
});

export const mutations = {
  SetProducts(state, products){
    state.products = products;
  },
  SetTotal(state, total){
    state.total = total;
  }
};

export const actions = {
  async GetProducts({commit, rootGetters, dispatch}){
    let UserData;
    const UserProducts = {};

    await GetUserData(rootGetters, dispatch).then(resolve => UserData = resolve);

    if (GetDataInLocalStorage('UserProductsWildberries').items === undefined){
      await this.$axios.get('https://suppliers-stats.wildberries.ru/api/v1/supplier/stocks', {
        params: {
          dateFrom: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
          key: UserData.ApiKey,
        }
      }).then((response) => {
        UserProducts['items'] = response.data;
        UserProducts['total'] = response.data.length;

        commit('SetProducts', response.data);
        commit('SetTotal', response.data.length);
      }).catch(() => {
        RemoveFromLocalstorage('UserProductsWildberries');

        commit('SetProducts', []);
        commit('SetTotal', null);
      });

      SetInLocalstorage('UserProductsWildberries', UserProducts);
    } else {
      commit('SetProducts', GetDataInLocalStorage('UserProductsWildberries').items);
      commit('SetTotal', GetDataInLocalStorage('UserProductsWildberries').total);
    }
  },
  async UpdateProductsData({commit, rootGetters, dispatch}){
    let UserData;
    const UserProducts = {};

    await GetUserData(rootGetters, dispatch).then(resolve => UserData = resolve);

    await this.$axios.get('https://suppliers-stats.wildberries.ru/api/v1/supplier/stocks', {
      params: {
        dateFrom: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
        key: UserData.ApiKey,
      }
    }).then((response) => {
      UserProducts['items'] = response.data;
      UserProducts['total'] = response.data.length;

      commit('SetProducts', response.data);
      commit('SetTotal', response.data.length);
    }).catch(function (error) {
      RemoveFromLocalstorage('UserProductsWildberries');

      commit('SetProducts', []);
      commit('SetTotal', null);
    });

    SetInLocalstorage('UserProductsWildberries', UserProducts);
  },
};

export const getters = {
  Products: state => state.products,
  Total: state => state.total,
};
