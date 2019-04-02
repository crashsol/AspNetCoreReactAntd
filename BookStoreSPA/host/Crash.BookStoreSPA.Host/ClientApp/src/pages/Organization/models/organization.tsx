import { OrganizationClient, OrganizationDto } from '@/utils/HttpClient';
import { Effect } from 'dva';
import { Reducer } from 'redux';

const organizationClient = new OrganizationClient();

const loop = (tree: OrganizationDto[], key: string, callback) => {
  tree.forEach((item, index, arr) => {
    if (item.key === key) {
      return callback(item, index, arr);
    }
    if (item.children) {
      return loop(item.children, key, callback);
    }
  });
};

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
      const { model } = payload;
      const response: OrganizationDto = yield organizationClient.create(payload.model);
      const temp: IOrganizationModelState = yield select(state => state.organization);
      if (model.parentId) {
        //  添加叶节点
        loop(
          temp.data.list,
          response.key,
          (item: OrganizationDto, index: number, arr: OrganizationDto[]) => {
            const addNodeKey = response.children.find(b => b.title === model.title);
            const result: OrganizationDto = {
              key: item.key,
              title: item.title,
              children: [...item.children, addNodeKey],
            };
            arr.splice(index, 1, result);
          }
        );
        yield put({
          type: 'save',
          payload: {
            list: temp.data.list,
          },
        });
      } else {
        // 新增根节点
        yield put({
          type: 'save',
          payload: {
            list: [...temp.data.list, response],
          },
        });
      }
    },
    *update({ payload }, { put, call, select }) {
      const { id, model } = payload;
      const response = yield organizationClient.update(id, model);
      const temp: IOrganizationModelState = yield select(state => state.organization);
      loop(
        temp.data.list,
        response.key,
        (item: OrganizationDto, index: number, arr: OrganizationDto[]) => {
          const result = { ...item, ...response };
          arr.splice(index, 1, result);
        }
      );
      yield put({
        type: 'save',
        payload: {
          list: temp.data.list,
        },
      });
    },
    *remove({ payload }, { put, call, select }) {
      const { id } = payload;
      yield organizationClient.delete(id);
      const temp: IOrganizationModelState = yield select(state => state.organization);
      loop(temp.data.list, id, (item: OrganizationDto, index: number, arr: OrganizationDto[]) => {
        arr.splice(index, 1);
      });
      yield put({
        type: 'save',
        payload: {
          list: temp.data.list,
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
