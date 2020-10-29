import { context } from "../store-context";

const CreateErrorAlert = function (error) {
  context.apply(this).dispatch('HelperPopupState', {
    text: error,
    classes: 'helper-popup--error',
  });
};

const ApiErrorsChecker = function (response) {
  if (response === undefined || response === null){
    throw new Error('Неизвестная ошибка');
  }

  if (!response.hasOwnProperty('data')){
    throw new Error('Неизвестная ошибка');
  }

  if (!response.data.hasOwnProperty('status')){
    throw new Error('Неизвестная ошибка');
  }

  if (response.data.status){
    return true;
  }

  if (!response.data.hasOwnProperty('error')){
    throw new Error('Неизвестная ошибка');
  }

  if (!response.data.error.hasOwnProperty('text')){
    throw new Error('Неизвестная ошибка');
  }

  const ErrorText = response.data.error.text;

  if (response.data.error.hasOwnProperty('type')){
    const ErrorType = response.data.error.type;

    switch (ErrorType) {
      case 'authorization':
        context.apply(this).dispatch('user/LogoutUser');
        throw new Error(ErrorText);
      //default:
        //throw new Error('Неизвестная ошибка');
    }
  }

  throw new Error(ErrorText);
};

export { ApiErrorsChecker, CreateErrorAlert };
