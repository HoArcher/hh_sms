import { routerRedux } from 'dva/router';

export default {
  namespace: 'global',
  state: {
    text: 'hello umi+dva',
    login: false,
  },
  effects: {
    *login(action, { call, put }) {
      yield put({
        type: 'signin',
      });
      yield put(routerRedux.push('/admin'));
    },
    *throwError() {
      throw new Error('hi error');
    },
  },
  reducers: {
    setText(state) {
      return {
        ...state,
        text: 'setted dva',
      };
    },
    signin(state) {
      return {
        ...state,
        login: true,
      };
    },
  },
};
