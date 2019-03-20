import { Effect } from 'dva';
import { Reducer } from 'redux';
import { BookDto, BookDtoType, CreateUpdateBookDto, Client } from '../../../utils/HttpClient';

const http = new Client();

//定义BookStateModel
export interface IBookModelState {
  totalCount: number;
  items: BookDto[];
}

//定义bookModel
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
//生成BookModel
const BookModel: IBookModel = {
  namespace: 'book',
  state: {
    items: [],
    totalCount: 0,
  },
  effects: {
    *fetch({ payload }, { put, call, select }) {
      const { sorting, skipCount, maxResultCount } = payload;
      const response = yield call(http.apiAppBookGet(sorting, skipCount, maxResultCount));
      yield put({
        type: 'save',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *add({ payload }, { put, call, select }) {},
    *remove({ payload }, { put, call, select }) {},
    *update({ payload }, { put, call, select }) {},
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default BookModel;
