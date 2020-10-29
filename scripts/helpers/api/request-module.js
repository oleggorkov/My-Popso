import { CreateErrorAlert, ApiErrorsChecker } from "./api-errors-checker";
import { context } from "../store-context";

const CreateRequest  = async function (data) {
  if (data === undefined || data === null){
    return;
  }

  if (!data.hasOwnProperty('path') || context.apply(this).$ApiPath === undefined || context.apply(this).$ApiPath === null){
    return;
  }

  const token = () => {
    const token = data.hasOwnProperty('token') ? data.token : context.apply(this).getters['user/UserToken'];

    return token === null || token === undefined ? false : token;
  };

  await context.apply(this).$axios({
    method: 'post',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    url: `${context.apply(this).$ApiPath}${data.path}`,
    data: Object.assign(data.hasOwnProperty('RequestBody') ? data.RequestBody : {}, {
      authToken: token()
    })
  }).then(response => {
    ApiErrorsChecker.call(context.apply(this), response);

    if (data.hasOwnProperty('ResponseCallback')){
      data.ResponseCallback(response);
    }
  }).catch(error => {
    CreateErrorAlert.call(context.apply(this), error);

    if (data.hasOwnProperty('ErrorCallback')){
      data.ErrorCallback(error);
    }
  }).finally(() => {
    if (data.hasOwnProperty('FinallyCallback')){
      data.FinallyCallback();
    }
  })
};

export { CreateRequest };
