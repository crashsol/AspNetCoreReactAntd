import { IPagination } from '@/utils/AbpUtils';
import { BookClient, BookDto } from '@/utils/HttpClient';
import { Effect } from 'dva';
import { Reducer } from 'redux';

const http = new BookClient();

// 定义BookStateModel
export interface IBookModelState {
  data: {
    list: BookDto[];
    pagination: IPagination;
  };
}

// 定义BookModel
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
// tslint:disable-next-line:one-variable-per-declaration
const BookModel: IBookModel = {
  namespace: 'book',
  state: {
    data: {
      list: [],
      pagination: {
        total: 0,
        pageSize: 10,
        current: 1,
        showTotal: (total, range) => `第 ${range[0]} 至 ${range[1]} 项, 共 ${total} 数据`,
      },
    },
  },
  effects: {
    *fetch({ payload }, { put, call, select }) {
      // 请求前构建后台查询
      const { name, type, pageSize, current, sorting } = payload;
      let skipCount = 0;
      let maxResultCount = 10;
      if (pageSize && current) {
        skipCount = pageSize * (current - 1);
        maxResultCount = pageSize;
      }
      const response = yield http.getList(name ? name : '', type ? type : [], sorting, skipCount, maxResultCount);
      const stateTemp: IBookModelState = yield select(state => state.book);
      const data = {
        list: response.items,
        pagination: {
          ...stateTemp.data.pagination,
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
      const response = yield http.get(payload.id);
      return response;
    },
    *add({ payload }, { put, select }) {
      const response = yield http.create(payload.model);
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
      const response = yield http.update(id, model);
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
      yield http.delete(id);
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
