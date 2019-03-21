import { Effect } from 'dva';
import { replace } from 'react-router-redux';
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
  totalCount: number;
  items: BookDto[];
}

// 定义bookModel
export interface IBookModel {
  namespace: 'book';
  state: IBookModelState;
  effects: {
    fetch: Effect;
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
    items: [],
    totalCount: 0,
  },
  effects: {
    *fetch({ payload }, { put, call, select }) {
      // 请求前构建后台查询
      const { pageSize, current, sorter } = payload;
      let skipCount = 0;
      let maxResultCount = 10;
      if (pageSize && current) {
        skipCount = pageSize * (current - 1);
        maxResultCount = pageSize;
      }
      const response = yield http.apiAppBookGet(sorter, skipCount, maxResultCount);
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
    *add({ payload }, { put, call, select }) {},
    *remove({ payload }, { put, call, select }) {},
    *update({ payload }, { put, call, select }) {},
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
