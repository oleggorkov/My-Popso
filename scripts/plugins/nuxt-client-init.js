import { getCookie } from "../helpers/cookies";

export default async (ctx) => {
  if (getCookie('token') === null || getCookie('token') === 'null' || getCookie('token') === undefined || getCookie('token') === 'undefined'){
    ctx.redirect('/login');
  } else {
    await ctx.app.$CreateRequest({
      path: 'user/info.php',
      token: getCookie('token'),
      ResponseCallback: response => {
        ctx.store.commit('user/SetUserData', response.data.data.userInfo);
        ctx.store.commit('user/SetCompanyData', response.data.data.companyInfo);
        ctx.store.commit('user/SetUserToken', getCookie('token'));
      },
      ErrorCallback: () => {
        ctx.redirect('/login');
      }
    });
  }
}
