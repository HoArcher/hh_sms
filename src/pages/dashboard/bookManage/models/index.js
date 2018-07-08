import { queryBookList, postBook, putBook, getBookDetail } from '../services';

export default {
  namespace: 'bookManage',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    bookDetail: null,
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
    *addBook({ payload, callback }, { call, put }) {
      const response = yield call(postBook, payload);
      const { status, errorMessage } = response;
      if (response.status === 'ok') {
        yield put({
          type: 'queryList',
          payload: response.result,
        });

      }
      if (callback) callback(status, errorMessage);
    },
    *fetchBookDetail({ payload, callback }, { call, put }) {
      const response = yield call(getBookDetail, payload);
      const { status, errorMessage } = response;
      if (response.status === 'ok'&&response.result) {
        yield put({
          type: 'queryBookDetail',
          payload: response.result ,
        });

      }
      if (callback) callback(status, errorMessage);
    },

    *modifyBook({ payload, callback }, { call, put }) {
      const response = yield call(putBook, payload);
      const { status, errorMessage } = response;
      if (response.status === 'ok') {
        yield put({
          type: 'queryList',
          payload: response.result,
        });

      }
      if (callback) callback(status, errorMessage);
    },


  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    queryBookDetail(state, action) {
      return {
        ...state,
        bookDetail: action.payload,
      };
    },

  },
};
