export default (context) => {
  if (process.browser && window.innerWidth <= 1280){
    context.store.commit('ToggleMobileMenu', false);
  }
}
