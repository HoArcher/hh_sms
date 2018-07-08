import { stringify } from 'qs';
import request from '../../../../utils/request';

export async function queryBookList(params) {
  return request(`/api/book?${stringify(params)}`);
}