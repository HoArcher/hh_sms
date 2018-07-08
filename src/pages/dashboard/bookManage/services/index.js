import { stringify } from 'qs';
import request from '../../../../utils/request';

export async function queryBookList(params) {
  return request(`/api/book?${stringify(params)}`);
}

export async function removeBook(params) {
  return request('/api/book', {
    method: 'DELETE',
    body: {
      ...params,
    },
  });
}
// 添加
export async function postBook(params) {
  return request('/api/book', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function getBookDetail(params) {
  return request(`/api/bookDetail?${stringify(params)}`);
}


// 修改
export async function putBook(params) {
  return request('/api/book', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}