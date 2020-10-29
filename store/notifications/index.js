export const state = () => ({
  NotificationsList: []
});

export const mutations = {
  SetNotificationsList(state, data){
    state.NotificationsList = data;
  },
  CreateNotificationFromList(state, data){
    state.NotificationsList.push(data);
  },
  RemoveNotificationFromList(state, id) {
    state.NotificationsList.forEach((el, index) => {
      if (el.id === id){
        state.NotificationsList.splice(index, 1);
      }
    })
  },
};

export const actions = {
  async GetNotificationsList({ commit, rootGetters, dispatch }){
    await this.$axios.post(`${this.$ApiPath}notifications/list.php`,{
      authToken: rootGetters['user/UserToken'],
    }).then(response => {
      if (this.$ApiErrorsChecker(response)){
        commit('SetNotificationsList', response.data.data);
      }
    }).catch(error => {
      this.$CreateErrorAlert(error);
    })
  },
  async CreateNotification({ commit, rootGetters, dispatch }, data){
    const params = {
      authToken: rootGetters['user/UserToken'],
      data: {
        type: data.type,
        title: data.title,
        text: data.text,
      }
    };

    if (data.options){
      params.data['options'] = data.options;
    }

    await this.$axios.post(`${this.$ApiPath}notifications/create.php`, params).then(response => {
      if (this.$ApiErrorsChecker(response)){
        commit('CreateNotificationFromList', response.data.data);
      }
    }).catch(error => {
      this.$CreateErrorAlert(error);
    })
  },
  async RemoveNotification({ commit, rootGetters, dispatch }, NotificationId){
    await this.$axios.post(`${this.$ApiPath}notifications/delete.php`,{
      authToken: rootGetters['user/UserToken'],
      data: {
        id: NotificationId
      }
    }).then(response => {
      if (this.$ApiErrorsChecker(response)){
        commit('RemoveNotificationFromList', NotificationId);
      }
    }).catch(error => {
      this.$CreateErrorAlert(error);
    })
  },
};

export const getters = {
  NotificationsList: state => state.NotificationsList,
};
