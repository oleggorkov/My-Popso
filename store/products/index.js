export const state = () => ({
  ProductsList: [],
});

export const mutations = {
  SetProductsList(state, products){
    state.ProductsList = products;
  },
  AddItemInProductsLust(state, item){
    state.ProductsList.push(item);
  },
  RemoveItemInProductsLust(state, id){
    state.ProductsList.forEach((el, index) => {
      if (el.id === id){
        state.ProductsList.splice(index, 1);
      }
    })
  },
};

export const actions = {
  async GetProductsList({ commit }){
    await this.$CreateRequest({
      path: 'products/list.php',
      ResponseCallback: response => {
        commit('SetProductsList', response.data.data.sort((a, b) => b.stock.present - a.stock.present));
      },
    });
  },
  async CreateProduct({ dispatch, commit }, data){
    await this.$CreateRequest({
      path: 'products/create.php',
      RequestBody: {
        data: data
      },
      ResponseCallback: response => {
        commit('AddItemInProductsLust', Object.assign(data, {
          id: response.data.options.id
        }));

        dispatch('notifications/CreateNotification',{
          type: 'create-product',
          title: `Создание товара`,
          text: `Товар '${data.name}' успешно создан!`,
          options: {
            id: response.data.options.id
          }
        }, {
          root: true
        });

        dispatch('HelperPopupState',{
          text: `Товар '${data.name}' успешно сохранен!`,
          classes: 'helper-popup--success',
          time: 3500
        }, {
          root: true
        });

        this.$router.push('/products');
      }
    });
  },
  async RemoveProduct({ dispatch, commit }, data){
    await this.$CreateRequest({
      path: 'products/delete.php',
      RequestBody: {
        data: {
          id: data.id,
        }
      },
      ResponseCallback: () => {
        commit('RemoveItemInProductsLust', data.id);

        dispatch('notifications/CreateNotification',{
          type: 'text',
          title: `Удаление товара`,
          text: `Товар '${data.name}' успешно удален!`,
        }, {
          root: true
        });

        dispatch('HelperPopupState',{
          text: `Товар '${data.name}' успешно удален!`,
          classes: 'helper-popup--success',
          time: 3500
        }, {
          root: true
        });

        this.$router.push('/products');
      }
    });
  },
  async LoadProductsOzon({ dispatch, commit, rootGetters }){
    if (rootGetters['user/marketplaces/UserMarketplaces'].length === 0){
      await dispatch('user/marketplaces/GetUserMarketplaces', {}, {
        root: true,
      });
    }

    const ClientId = rootGetters['user/marketplaces/UserMarketplaces'].find(el => el.name === 'Ozon').api.options.find(el => el.id === 'client_id').value;
    const ApiKey = rootGetters['user/marketplaces/UserMarketplaces'].find(el => el.name === 'Ozon').api.options.find(el => el.id === 'api_key').value;

    if (!ClientId || !ApiKey){
      dispatch('HelperPopupState',{
        text: `Невозможно загрузить список товаров, вы не подключены к API Ozon`,
        classes: 'helper-popup--error',
        time: 3500
      }, {
        root: true
      });

      return;
    }

    let list = [];

    await this.$axios.post('https://api-seller.ozon.ru/v1/product/info/stocks',{
      'page_size': 1000,
    },{
      headers: {
        'Client-Id': ClientId,
        'Api-Key': ApiKey,
      }
    }).then(response => {
      list = response.data.result.items;
    }).catch(error => {
      dispatch('HelperPopupState',{
        text: `Не удалось загрузить список товаров, попоробуйте позже!`,
        classes: 'helper-popup--error',
        time: 3500
      }, {
        root: true
      });
    });

    if (list.length > 0){
      const LoadProducts = async (products) => {
        for (const product in products){
          await this.$axios.post('https://api-seller.ozon.ru/v2/product/info',{
            'product_id': products[product].product_id,
          },{
            headers: {
              'Client-Id': ClientId,
              'Api-Key': ApiKey,
            }
          }).then(async response => {
            await setTimeout(() => {
              const data = response.data.result;

              dispatch('CreateProduct', {
                name: data.name,
                barcode: data.barcode,
                stock: {
                  present: data.stocks.present
                },
                vendor_code: data.offer_id,
                price: {
                  current: data.price
                },
              });
            },1000);
          }).catch(error => {
            console.log(error);
          });
        }
      };

      await LoadProducts(list);
    }
  }
};

export const getters = {
  ProductsList: state => state.ProductsList,
};
