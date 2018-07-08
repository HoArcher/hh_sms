import { queryBookList } from '../services';

export default {
  namespace: 'booklist',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryBookList, payload);
      if (response.status === 'ok') {
        yield put({
          type: 'queryList',
          payload: response.result,
        });
      }

    },

  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },

  },
};
