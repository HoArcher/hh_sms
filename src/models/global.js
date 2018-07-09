import { routerRedux } from 'dva/router';
import router from 'umi/router';
import { login, logout } from '../services/index';

export default {
  namespace: 'global',
  state: {
    login: false,
    user: {},
    menus: [],
    routers: []
  },
  effects: {
    *login({ payload, callback }, { call, put }) {
      const response = yield call(login, payload);
      yield put({
        type: 'loginInfo',
        payload: response,
      });
      if (response.status === 'ok') {
        router.push({
          pathname: '/dashboard/bookManage',
        });
      }
      else {
        callback && callback(response.status, response.message)
      }
    },
    *logout({ payload }, { call, put }) {
      const response = yield call(logout, payload);
      if (response.status === 'ok') {
        yield put({
          type: 'signout',
          payload: response,
        });
      }

      router.push('/login/login');
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
    loginInfo(state, action) {
      if (action.payload && action.payload.status === 'ok') {
        return {
          ...state,
          user: action.payload.info,
          login: true,
          menus: action.payload.message
        };
      }
      else {
        return {
          ...state,
          user: {},
          login: false,
          message: action.payload.message
        };
      }
    },
    signout(state) {
      return {
        ...state,
        login: true,
      };
    },
  },

};
