import request from '../utils/request';

export async function login(params) {
  return request('/api/login', {
    method: 'POST',
    body: params,
  });
}

export async function checkLogin(params) {
  return request('/api/checkLogin', {
    method: 'POST',
    body: params,
  });
}

export async function logout(params) {
  return request('/api/logout', {
    method: 'POST',
    body: params,
  });
}