export const state = () => ({
  HelperPopup: {
    AnimationState: true,
    state: false,
    text: '',
    classes: 'helper-popup--success',
  },
  SidebarState: window.innerWidth >= 1280,
  MobileMenuState: false
});

export const mutations = {
  HelperPopupState(state, data){
    state.HelperPopup['AnimationState'] = data.AnimationState;
    state.HelperPopup['state'] = data.state;
    state.HelperPopup['text'] = data.text;
    state.HelperPopup['classes'] = data.classes;
  },
  ToggleSidebar(state, value){
    state.SidebarState = value;
  },
  ToggleMobileMenu(state, value){
    state.MobileMenuState = value;
  }
};

export const actions = {
  async HelperPopupState({commit, state}, data){
    if (state.HelperPopup.AnimationState){
      await commit('HelperPopupState',{
        AnimationState: false,
        state: true,
        text: data.text,
        classes: data.classes
      });

      await setTimeout(() => {
        commit('HelperPopupState',{
          AnimationState: false,
          state: false,
          text: '',
          classes: '',
        });
      },((data.time !== null) && data.time !== undefined) ? data.time : 2150);

      await setTimeout(() => {
        commit('HelperPopupState',{
          AnimationState: true,
        });
      },((data.time !== null) && data.time !== undefined) ? data.time + 3750 : 3750);
    }
  }
};

export const getters = {
  HelperPopup: state => state.HelperPopup,
  SidebarState: state => state.SidebarState,
  MobileMenuState: state => state.MobileMenuState
};
