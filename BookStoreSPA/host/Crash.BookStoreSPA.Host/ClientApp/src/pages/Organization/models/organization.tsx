import { Client, OrganizationDto } from '@/utils/HttpClient';
import { Effect } from 'dva';
import { Reducer } from 'redux';

const http = new Client();

// 定义OrganizationStateModel
export interface IOrganizationModelState {
  data: {
    list: OrganizationDto[];
  };
}

// 定义OrganizationModel
export interface IOrganizationModel {
  namespace: 'organization';
  state: IOrganizationModelState;
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
// 生成OrganizationModel
// tslint:disable-next-line:one-variable-per-declaration
const OrganizationModel: IOrganizationModel = {
  namespace: 'organization',
  state: {
    data: {
      list: [],
    },
  },
  effects: {
    *fetch({ payload }, { put, call, select }) {
      // 请求前构建后台查询
      const response = yield http.apiAppOrganizationGet();
      console.log(response);
      const data = {
        list: response,
      };
      yield put({
        type: 'save',
        payload: data,
      });
    },
    *add({ payload }, { put, select }) {
      const response = yield http.apiAppOrganizationPost(payload.model);
      const stateTemp: IOrganizationModelState = yield select(state => state.organization);
      const data = {
        list: [response, ...stateTemp.data.list.splice(0, 9)],
      };
      yield put({
        type: 'save',
        payload: data,
      });
    },
    *update({ payload }, { put, call, select }) {
      const { id, model } = payload;
      const response = yield http.apiAppOrganizationByIdPut(id, model);
      const stateTemp: IOrganizationModelState = yield select(state => state.organization);
      const data = {
        list: stateTemp.data.list.map(item => {
          if (item.key === id) {
            return response;
          } else {
            return item;
          }
        }),
      };
      yield put({
        type: 'save',
        payload: data,
      });
    },
    *remove({ payload }, { put, call, select }) {
      const { id } = payload;
      yield http.apiAppOrganizationByIdDelete(id);
      const stateTemp: IOrganizationModelState = yield select(state => state.organization);
      const data = {
        list: stateTemp.data.list.filter(b => b.key !== id),
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

export default OrganizationModel;
