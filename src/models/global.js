import { routerRedux } from 'dva/router';
import router from 'umi/router';
import { login, logout } from '../services/index';

export default {
  namespace: 'global',
  state: {
    message: '',
    login: false,
    user: {},
    routers:[]
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      yield put({
        type: 'userInfo',
        payload: response,
      });
      if (response.status === 'ok') {
        router.push({
          pathname: '/dashboard/bookManage',
          state: response.result.role
        });

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
    userInfo(state, action) {
      if (action.payload && action.payload.status === 'ok') {
        return {
          ...state,
          user: action.payload.result,
          login: true,
          message: action.payload.message
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
