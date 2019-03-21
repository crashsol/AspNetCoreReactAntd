import { Effect } from 'dva';
import { Reducer } from 'redux';
import { BookDto, Client } from '../../../utils/HttpClient';

const http = new Client();

interface IPagination {
  total: number;
  pageSize: number;
  current: number;
}

// 定义BookStateModel
export interface IBookModelState {
  data: {
    list: BookDto[];
    pagination: IPagination;
  };
}

// 定义bookModel
export interface IBookModel {
  namespace: 'book';
  state: IBookModelState;
  effects: {
    fetch: Effect;
    get: Effect;
    add: Effect;
    remove: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<any>;
  };
}
// 生成BookModel
const BookModel: IBookModel = {
  namespace: 'book',
  state: {
    data: {
      list: [],
      pagination: {
        total: 0,
        pageSize: 10,
        current: 1,
      },
    },
  },
  effects: {
    *fetch({ payload }, { put, call, select }) {
      // 请求前构建后台查询
      const { pageSize, current, sorting } = payload;
      let skipCount = 0;
      let maxResultCount = 10;
      if (pageSize && current) {
        skipCount = pageSize * (current - 1);
        maxResultCount = pageSize;
      }
      const response = yield http.apiAppBookGet(sorting, skipCount, maxResultCount);
      const data = {
        list: response.items,
        pagination: {
          total: response.totalCount,
          pageSize: pageSize ? pageSize : 10,
          current: current ? current : 1,
        },
      };
      yield put({
        type: 'save',
        payload: data,
      });
    },
    *get({ payload }, {}) {
      const response = yield http.apiAppBookByIdGet(payload.id);
      return response;
    },
    *add({ payload }, { put, select }) {
      const response = yield http.apiAppBookPost(payload.model);
      const stateTemp: IBookModelState = yield select(state => state.book);
      const data = {
        list: [response, ...stateTemp.data.list.splice(0, 9)],
        pagination: {
          ...stateTemp.data.pagination,
          total: stateTemp.data.pagination.total + 1,
        },
      };
      yield put({
        type: 'save',
        payload: data,
      });
    },
    *update({ payload }, { put, call, select }) {
      const { id, model } = payload;
      const response = yield http.apiAppBookByIdPut(id, model);
      const stateTemp: IBookModelState = yield select(state => state.book);
      const data = {
        list: stateTemp.data.list.map(item => {
          if (item.id === id) {
            return response;
          } else {
            return item;
          }
        }),
        pagination: stateTemp.data.pagination,
      };
      yield put({
        type: 'save',
        payload: data,
      });
    },
    *remove({ payload }, { put, call, select }) {
      const { id } = payload;
      yield http.apiAppBookByIdDelete(id);
      const stateTemp: IBookModelState = yield select(state => state.book);
      const data = {
        list: stateTemp.data.list.filter(b => b.id !== id),
        pagination: {
          ...stateTemp.data.pagination,
          total: stateTemp.data.pagination.total - 1,
        },
      };
      yield put({
        type: 'save',
        payload: data,
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};

export default BookModel;
