import { ApiErrorsChecker, CreateErrorAlert } from "../helpers/api/api-errors-checker";
import { CreateRequest } from '../helpers/api/request-module';

export default (context, inject) => {
  const globalValues = {
    ApiPath: 'https://devapp.popso.ru/api/',
    ApiErrorsChecker: ApiErrorsChecker,
    CreateErrorAlert: CreateErrorAlert,
    CreateRequest: CreateRequest
  };

  for (let value in globalValues) {
    inject(value, globalValues[value]);
  }
}
