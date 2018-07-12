import router from 'umi/router';
import { login, logout, checkLogin } from '../services/index';

export default {
  namespace: 'global',
  state: {
    login: false,
    user: {},
    menus: [],
    allowedRouters: [],
    allRouters: []
  },
  effects: {
    *login({ payload, callback }, { call, put }) {
      const response = yield call(login, payload);
      yield put({
        type: 'loginInfo',
        payload: response,
      });
      if (response.status === 'ok') {
        payload.remember ? localStorage.setItem('sms_uuid', response.uuid) : sessionStorage.setItem('sms_uuid', response.uuid);

        const nextPage = response.info.role === 'user' ? '/list/bookList' : '/dashboard/bookManage';
        router.push({
          pathname: nextPage,
        });
      }
      else {
        callback && callback(response.status, response.message)
      }
    },
    *checkLogin({ payload, callback }, { call, put }) {
      const response = yield call(checkLogin, payload);
      yield put({
        type: 'loginInfo',
        payload: response,
      });
      if (response.status === 'ok') {

      }
      else {
        callback && callback(response.status, response.message)
      }
    },
    *logout({ payload }, { call, put }) {
      const response = yield call(logout, payload);
      if (response.status === 'ok') {
        localStorage.removeItem('sms_uuid');
        sessionStorage.removeItem('sms_uuid');
        yield put({
          type: 'signout',
        });
      }

      router.replace('/');
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
          menus: action.payload.menus,
          allowedRouters: action.payload.allowedRouters,
          allRouters: action.payload.allRouters,
        };
      }
      else {
        return {
          ...state,
          user: {},
          login: false,
          menus: [],
          allowedRouters: [],
          allRouters: []
        };
      }
    },
    signout(state) {
      return {
        login: false,
        user: {},
        menus: [],
        routers: []
      };
    },
  },

};
