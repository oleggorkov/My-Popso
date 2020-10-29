import { getCookie } from "../scripts/helpers/cookies";

export default async (ctx) => {
  if (process.browser){
    if (getCookie('token') === null || getCookie('token') === 'null' || getCookie('token') === undefined || getCookie('token') === 'undefined') {
      ctx.redirect('/login');
    }
  }
};
