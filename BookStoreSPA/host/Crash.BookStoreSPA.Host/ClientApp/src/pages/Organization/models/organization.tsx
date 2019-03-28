import { OrganizationClient, OrganizationDto } from '@/utils/HttpClient';
import { Effect } from 'dva';
import { Reducer } from 'redux';

const organizationClient = new OrganizationClient();

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
      const response = yield organizationClient.getList();
      yield put({
        type: 'save',
        payload: {
          list: response,
        },
      });
    },
    *add({ payload }, { put, select }) {
      const response: OrganizationDto = yield organizationClient.create(payload.model);
      yield put({
        type: 'save',
        payload: {
          list: response,
        },
      });
    },
    *update({ payload }, { put, call, select }) {
      const { id, model } = payload;
      const response = yield organizationClient.update(id, model);
      yield put({
        type: 'save',
        payload: {
          list: response,
        },
      });
    },
    *remove({ payload }, { put, call, select }) {
      const { id } = payload;
      const response = yield organizationClient.delete(id);
      yield put({
        type: 'save',
        payload: {
          list: response,
        },
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
