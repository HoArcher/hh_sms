import { queryBookList, postBook, putBook, getBookDetail, queryDesByBookType } from '../services';

export default {
  namespace: 'bookManage',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    bookDetail: {
      description: null,
      bookType: null,
      callNo: 0,
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
      if (response.status === 'ok' && response.result) {
        yield put({
          type: 'queryBookDetail',
          payload: {
            callNo:{value:response.result.callNo},
            description:{value:response.result.description}
          },
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
    *saveFormfields({ payload, callback }, { call, put }) {
      let { description } = payload;
      if (payload.bookType.value) {
        const response = yield call(queryDesByBookType, { bookType: payload.bookType.value });
        if (response.status === 'ok') {
          description = {value:response.result.description}
        }
      }
      yield put({
        type: 'storageFormfields',
        payload: { ...payload, description },
      });
    },
    *clearBookDetail({ payload, callback }, { call, put }) {
      yield put({
        type: 'storageFormfields',
        payload: {
         
            description: null,
            bookType: null,
            callNo: 0,
          
        },
      });
    }


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
    storageFormfields(state, { payload }) {
      return {
        ...state,
        bookDetail: payload,
      };
    },

  },
};
