import {GetDataInLocalStorage, SetInLocalstorage, RemoveFromLocalstorage} from "../../scripts/helpers/localstorage";

const GetUserData = async (rootGetters, dispatch) => {
  const UserData = {};

  if (Object.keys(rootGetters['user/User']).length === 0){
    await dispatch('user/GetUserData', null, {root: true});

    UserData['ClientID'] =  rootGetters['user/User'].marketplaces[3].client_id;
    UserData['ApiKey'] =  rootGetters['user/User'].marketplaces[3].api_key;

  } else {
    UserData['ClientID'] =  rootGetters['user/User'].marketplaces[3].client_id;
    UserData['ApiKey'] =  rootGetters['user/User'].marketplaces[3].api_key;
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
  SetProductsList(state, ProductsList){
    state.ProductsList = ProductsList;
  },
  UpdateProducts(state, product){
    state.products.push(product);
  },
  SetTotal(state, total){
    state.total = total;
  }
};

export const actions = {
  async GetProducts({commit, rootGetters, dispatch}){
    if ((GetDataInLocalStorage('UserProductsGoods').items === undefined) || (GetDataInLocalStorage('UserProductsGoods').items === null)){
      let UserData = {};
      const UserProducts = {};

      await GetUserData(rootGetters, dispatch).then(resolve => UserData = resolve);


      //Запрос на получение товаров

    } else {
      commit('SetProducts', GetDataInLocalStorage('UserProductsGoods').items);
      commit('SetTotal', GetDataInLocalStorage('UserProductsGoods').total);
    }
  },
  async UpdateProductsData({commit, rootGetters, dispatch}){
    let UserData = {};
    const UserProducts = {};

    await GetUserData(rootGetters, dispatch).then(resolve => UserData = resolve);

    //Запрос на получение товаров
  },

  async GetProductsList({commit, rootGetters, dispatch}){
    let UserData;

    await GetUserData(rootGetters, dispatch).then(resolve => UserData = resolve);

    if (!GetDataInLocalStorage('UserProductsGoods')){
      //Запрос на получение товаров
      console.log('Получение списка товаров!');
      //16A3184D-257D-405D-9838-87D75DE05D27 - токен


      this.$axios.post('https://test-partner.goods.ru/api/market/v2/orderService/order/search',{
        token: '16A3184D-257D-405D-9838-87D75DE05D27',
        dateFrom:  `2015-1-13`,
        dateTo:  `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
        statuses: [
          "NEW",
          "CONFIRMED",
          "PACKED",
          "PACKING_EXPIRED",
          "SHIPPED",
          "DELIVERED",
          "MERCHANT_CANCELED",
          "CUSTOMER_CANCELED"
        ],
        count: "100"
      }).then(response => {
        console.log(response);
      })
    } else {

    }
  },
  async GetProduct({commit, rootGetters, dispatch}, index){

  }
};

export const getters = {
  ProductsList: state => state.ProductsList,
  Products: state => state.products,
  Total: state => state.total,
};
