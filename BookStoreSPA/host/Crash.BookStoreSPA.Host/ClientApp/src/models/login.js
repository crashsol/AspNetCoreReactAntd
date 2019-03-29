import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { AccountClient, AbpApplicationConfigurationClient } from '@/utils/HttpClient';

const accountClient = new AccountClient();
const configurationClient = new AbpApplicationConfigurationClient();

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const { userName, password, type } = payload;
      const loginViewModel = {
        userNameOrEmailAddress: userName,
        password: password,
        rememberMe: true,
        tenanId: '',
      };
      // 用户登录
      const response = yield accountClient.login(loginViewModel);

      let currentAuthority;
      if (response.result === 1) {
        const config = yield configurationClient.get();
        currentAuthority = Object.keys(config.auth.grantedPolicies);
        console.log(currentAuthority);
      }

      //构建登录结果
      const result = {
        status: response.result === 1 ? 'ok' : 'error',
        type: type,
        currentAuthority: currentAuthority,
      };
      console.log(result);

      yield put({
        type: 'changeLoginStatus',
        payload: result,
      });

      // status: 'ok',
      //type,
      //currentAuthority: 'admin',
      // Login successfully
      if (result.status === 'ok') {
        // 成功登录
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
