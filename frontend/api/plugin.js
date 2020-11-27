import { Api } from './api';

export default function ({ $axios, error }, inject) {
  $axios.onResponse(response => {
    return {
      ...response,
      data: response.data,
    };
  });

  $axios.onError(async errorObject => {
    const code = parseInt(errorObject.response && errorObject.response.status);
    let message = '';
    if (code === 404) {
      message = 'Страница не найдена';
    }
    if (code === 400) {
      message = 'Ошибка';
    }
    if (code === 500) {
      message = 'Внутреняя ошибка сервера';
    }
    if (code === 403) {
      message = 'Пожалуйста, авторизируйтесь для выполнения данной операции';
    }
    if (code === 422) {
      return Promise.reject({
        error: errorObject,
        data: errorObject.response.data,
      });
    }
    if (code === 401) {
      return Promise.reject(errorObject);
    }

    error({ statusCode: code, message });

    return Promise.reject({
      error: errorObject,
      data: errorObject.data,
    });
  });

  const api = new Api($axios);
  inject('api', api);
}
