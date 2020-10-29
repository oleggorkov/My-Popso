import { setCookie } from "../../scripts/helpers/cookies";

export const state = () => ({
  User: {},
  Company: {},
  UserToken: null,
  UserRoadMap: [],
  UserRoadMapTest: [ // Передаётся в масиве где step +1 номер пункта который видит пользователь
    {
      name: 'UserRegistration',
      options: {
        status: true,  // Пункт заполнен true (зелёный)
        step: 0, // step совпадает с индеком массива (у регистрации step 0)
      },
      data: {
        state: true,
      }
    },
    {
      name: 'UserProfile',
      options: {
        status: false,  // Пункт не заполнен false
        step: 1,
      },
      data: {
        phone: '9001137301',
        name: '',
        company: '1234',
        email: '123@mail.ru',
        site: 'site.ru'
      },
    },
    {
      name: 'ProductCategory',
      options: {
        status: false,
        step: 2,
      },
      data: {
        value: 'Автотовары', // Аптека / Бытовая химия и пр.
        title: 'Автотовары', // Аптека / Бытовая химия и пр.
      }
    },
    {
      name: 'Analytics',
      options: {
        status: false,
        step: 3,
      },
      data: {
        IsVerify: '' // Пустая строка или false, а если галочка поставлена то true
      }
    },

    {
      name: 'LegalStatus',
      options: {
        status: false,
        step: 4,
      },
      data: {
        inn: '',
        value: '' // ooo / self-employed / withoutBusiness
      }
    },
    {
      name: 'ElectronicManagement',
      options: {
        status: false,
        step: 5,
      },
      data: {
        value: '', // yes / no
        CompanyList: {
          value: '', //  Контур.Диадок
          title: '', //  Контур.Диадок
        }
      }
    },
    {
      name: 'ElectronicSignature',
      options: {
        status: false,
        step: 6,
      },
      data: {
        value: '', // yes / no
        ElectronicSignatureList: {
          value: '', // Тензор
          title: '', // Тензор
        }
      }
    },
    {
      name: 'MarketplaceRegistration',
      options: {
        status: false,
        step: 7,
      },
      data: {
        IsVerify: ''
      }
    },
    {
      name: 'PriceList',
      options: {
        status: false,
        step: 8,
      },
      data: {
        IsVerify: ''
      }
    },
    {
      name: 'Brand',
      options: {
        status: false,
        step: 9,
      },
      data: {
        value: '' // Введите бренд
      }
    },
    {
      name: 'Catalogue',
      options: {
        status: false,
        step: 10,
      },
      data: [    // Массив т.к. может быть несколько категорий
        {
          title: '',  //  Автотовары Аптека / Бытовая химия и пр.
          value: '',  //  Автотовары Аптека / Бытовая химия и пр.
        }
      ]
    },
    {
      name: 'Production',
      options: {
        status: false,
        step: 11,
      },
      data: {
        count: '',  // Штук
        days: '',   // Календарных дней
      }
    },
    {
      name: 'Documentation',
      options: {
        status: false,
        step: 12,
      },
      data: [    // Массив т.к. может быть несколько категорий
        {
          title: '',  //  Автотовары Аптека / Бытовая химия и пр.
          value: '',  //  Автотовары Аптека / Бытовая химия и пр.
        }
      ]
    },
    {
      name: 'Packing',
      options: {
        status: false,
        step: 13,
      },
      data: {
        pack: {  // Параметр упаковки
          length: '',
          width: '',
          height: '',
        },
        box: {   // Параметры короба
          length: '',
          width: '',
          height: '',
          piecesPack: '',
          piecesBox: '',
        },
        IsVerify: '',
      }
    },
    {
      name: 'Shipment',
      options: {
        status: false,
        step: 14,
      },
      data: {
        value: '',  // fbo / fbs
        city: '',
      }
    },
    {
      name: 'Reviews',
      options: {
        status: false,
        step: 15,
      },
      data: {
        value: ''  // Средняя розничная цена
      }
    },

    {
      name: 'Logistics',
      options: {
        status: false,
        step: 16,
      },
      data: {
        IsVerify: ''
      }
    },
    {
      name: 'Recommendations',
      options: {
        status: false,
        step: 17,
      },
      data: {
        IsVerify: ''
      }
    },
  ],
});

export const mutations = {
  SetUserToken(state, token){
    state.UserToken = token;

    setCookie('token', token, {'max-age': 2592000});
  },

  ClearUserToken(state){
    state.UserToken = null;

    setCookie('token', null);
  },

  SetUserData(state, user){
    state.User = user;
  },

  ClearUserData(state){
    state.User = {};
  },

  SetCompanyData(state, company){
    state.Company = company;
  },

  ClearCompanyData(state){
    state.Company = {};
  },

  SetUserRoadMap(state, data){
    state.UserRoadMap = data;
  },
  SetUserRoadMapItem(state, body){
    if (body.hasOwnProperty('status')){
      if (body.step < state.UserRoadMap.length){
        state.UserRoadMap[body.step].options.status = body.status;
      }
    }

    if (body.hasOwnProperty('data')){
      if (body.data.hasOwnProperty('value')){
        state.UserRoadMap[body.step].data.value = body.data.value;
      }

      if (body.data.hasOwnProperty('RadioValue')){
        state.UserRoadMap[body.step].data.RadioValue = body.data.RadioValue;
      }

      if (body.data.hasOwnProperty('InnValue')){
        state.UserRoadMap[body.step].data.InnValue = body.data.InnValue;
      }

      if (body.data.hasOwnProperty('SelectValue')){
        state.UserRoadMap[body.step].data.SelectValue = body.data.SelectValue;
      }
    }
  }
};

export const actions = {
  async GetUserData({ commit }){
    await this.$CreateRequest({
      path: 'user/info.php',
      ResponseCallback: response => {
        commit('SetUserData', response.data.data.userInfo);
        commit('SetCompanyData', response.data.data.companyInfo);
      }
    });
  },
  async UpdateUserData({commit, dispatch }, data){
    await this.$CreateRequest({
      path: 'user/update.php',
      RequestBody: { data },
      ResponseCallback: response => {
        commit('SetUserData', response.data.data.userInfo);

        dispatch('HelperPopupState', {
          text: 'Сохранено',
          classes: 'helper-popup--success',
        }, {
          root: true
        });
      }
    });
  },
  async UpdateCompanyData({commit, dispatch }, data){
    await this.$CreateRequest({
      path: 'user/update.php',
      RequestBody: { data },
      ResponseCallback: response => {
        commit('SetCompanyData', response.data.data.companyInfo);

        dispatch('HelperPopupState', {
          text: 'Сохранено',
          classes: 'helper-popup--success',
        }, {
          root: true
        });
      }
    });
  },

  async LoginUser({commit, dispatch, state}, data){
    await this.$CreateRequest({
      path: 'user/login.php',
      RequestBody: {
        data: {
          phone: `7${data.phone}`,
          code: data.code,
        }
      },
      ResponseCallback: response => {
        commit('SetUserToken', response.data.data.authToken);

        this.$router.push('/');
      },
      ErrorCallback: error => {
        dispatch('HelperPopupState', {
          text: error,
          classes: 'helper-popup--error',
        }, {
          root: true
        });
      }
    });
  },
  async LogoutUser({ commit }){
    await this.$CreateRequest({
      path: 'user/logout.php',
      FinallyCallback: () => {
        commit('ClearUserToken');
        commit('ClearUserData');
        commit('ClearCompanyData');
        setCookie('token', null);
        this.$router.push('/login');
      }
    });
  },

  async GetRoadMap({ commit }){
    await this.$CreateRequest({
      path: 'user/road-map/start.php',
    });

    await this.$CreateRequest({
      path: 'user/road-map/list.php',
      ResponseCallback: response => {
        commit('SetUserRoadMap', response.data.data);
      }
    });
  },
  async UpdateRoadMap({ commit, state }, data){
    const CurrentStep = state.UserRoadMap.find(el => parseInt(el.options.step) === parseInt(data.step));

    await this.$CreateRequest({
      path: 'user/road-map/update.php',
      RequestBody: {
        data: data.data,
        options: {
          url: CurrentStep.options.url,
          id: CurrentStep.options.id
        }
      },
      ResponseCallback: response => {
        commit('SetUserRoadMapItem', {
          step: data.step,
          status: response.data.data.options.status,
        });
      }
    });
  }
};

export const getters = {
  User: state => state.User,
  Company: state => state.Company,
  UserToken: state => state.UserToken,
  LoadingState: state => state.LoadingState,
  UserRoadMapData: state => state.UserRoadMap
};
