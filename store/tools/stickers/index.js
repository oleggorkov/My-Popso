import {setCookie} from "../../../scripts/helpers/cookies";

export const state = () => ({
  StickersList: [],
  StickerData: {},
});

export const mutations = {
  SetStickersList(state, data){
    state.StickersList = data;
  },
  RemoveStickerInList(state, value){
    state.StickersList.forEach((el, index) => {
      if (el.helpers.id === value){
        state.StickersList.splice(index, 1);
      }
    })
  },
  UpdateStickerInfo(state, data){
    state.StickerData = data;
  },
  UpdateStickerInfoInList(state, data){
    state.StickersList.forEach(el => {
      if (el.helpers.id === data.helpers.id){
        el = data;
      }
    });
  },
};

export const actions = {
  async GetStickersList({ commit, rootGetters }){
    await this.$axios.get(`${this.$ApiPath}sticker/list.php`,{
      params: {
        authToken: rootGetters['user/UserToken']
      }
    }).then(response => {
      commit('SetStickersList', response.data);
    });
  },

  async CreateNewSticker({ commit, rootGetters }, data){
    const url = `${this.$ApiPath}sticker/create.php`;

    await this.$axios.get(url, {
      params: {
        authToken: rootGetters['user/UserToken'],
        data: data,
      }
    }).then(response => {
      console.log(response);
    });
  },

  async UpdateSticker({ commit, getters, rootGetters }, data){
    await this.$axios.get(`${this.$ApiPath}sticker/update.php`,{
      params: {
        authToken: rootGetters['user/UserToken'],
        data: data
      }
    }).then(response => {
      if (response.data.status){
        commit('UpdateStickerInfoInList', data);
        commit('UpdateStickerInfo', data);
      }
    });
  },

  async RemoveSticker({ commit, rootGetters }, StickerId){
    await this.$axios.get(`${this.$ApiPath}sticker/delete.php`,{
      params: {
        authToken: rootGetters['user/UserToken'],
        st_id: StickerId,
      }
    }).then(response => {
      if (response.data.status){
        commit('RemoveStickerInList', StickerId);
      }
    });
  },

  async GetStickerInfo({ commit, rootGetters}, StickerId){

    /*

    await this.$CreateRequest({
      path: 'sticker/info.php',
      RequestBody: { st_id: StickerId },
      ResponseCallback: response => {
        console.log(response.data);
        console.log(response.data.data);
        commit('UpdateStickerInfo', response.data.data);
      }
    });

    */

    await this.$axios.get(`${this.$ApiPath}sticker/info.php`,{
      params: {
        authToken: rootGetters['user/UserToken'],
        st_id: StickerId
      }
    }).then(response => {
      commit('UpdateStickerInfo', response.data.data);
    });
  }
};

export const getters = {
  StickersList: state => state.StickersList,
  StickerData: state => state.StickerData,
};

/* TODO отрефакторить запросы на сервер */
