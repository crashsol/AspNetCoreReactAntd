import { PermissionsClient } from '@/utils/HttpClient';
import { Effect } from 'dva';
const http = new PermissionsClient();

// 定义PermissionsModel
export interface IPermissionsModel {
  namespace: 'permissions';
  state: {};
  effects: {
    fetch: Effect;
    update: Effect;
  };
}
// 生成PermissionsModel
// tslint:disable-next-line:one-variable-per-declaration
const PermissionsModel: IPermissionsModel = {
  namespace: 'permissions',
  state: {},
  effects: {
    *fetch({ payload }, { put, call, select }) {
      const { providerName, providerKey } = payload;
      const response = yield http.get(providerName, providerKey);
      return response;
    },
    *update({ payload }, { put, call, select }) {
      const { providerName, providerKey, input } = payload;
      const response = yield http.update(providerName, providerKey, input);
      return response;
    },
  },
};
export default PermissionsModel;
