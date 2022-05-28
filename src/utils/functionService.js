import tokenService from './tokenService';

const BASE_URL = '/api/functions/';

export default {
  index,
  create,
  explain,
  getTimeComplexity
};

function index() {
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  };
  return fetch(BASE_URL, options).then(res => res.json());
}

function explain(code) {
  let sanitized = code.replace(/[\n\r]/g, '');
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
      'Code': sanitized
    },

  };
  return fetch(BASE_URL + "explain", options).then(res =>
    res.json()
  );
}

function getTimeComplexity(code) {
  let sanitized = code.replace(/[\n\r]/g, '');
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken(),
      'Code': sanitized
    },

  };
  return fetch(BASE_URL + "timeComplexity", options).then(res =>
    res.json()
  );
}

function create(score) {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      // Add this header - don't forget the space after Bearer
      'Authorization': 'Bearer ' + tokenService.getToken()
    },
    body: JSON.stringify(score)
  };
  return fetch(BASE_URL, options).then(res => res.json());
}

