import { message } from 'antd';
import { INoticeItem } from './notice';
//引入 Effect,Subscription,Reducer
import { Effect, Subscription, connect } from 'dva';
import { Reducer } from 'redux';
//引入SignalR
import * as signalR from '@aspnet/signalr';

//定义signalR链接,链接地址与后端一致
const connection = new signalR.HubConnectionBuilder().withUrl('/notice').build();

//定义消息通知
export interface INoticeItem {
  userName: string;
  message: string;
}

//定义Dva model中的state具备的属性
export interface INoticeModelState {
  notices: INoticeItem[];
  serverTimes: string[];
  loading: boolean;
}

//定义 NoticeModel
export interface INoticeModel {
  namespace: 'notice';
  state: INoticeModelState;
  effects: {
    send: Effect;
  };
  reducers: {
    saveNotices: Reducer<INoticeModelState>;
    saveServerTimes: Reducer<any>;
  };
  subscriptions: {
    setup: Subscription;
  };
}
const NoticeModel: INoticeModel = {
  namespace: 'notice',
  state: {
    notices: [],
    loading: false,
    serverTimes: [],
  },
  effects: {
    *send({ payload }, { call, put, select }) {
      const { userName, message } = payload;
      yield connection.send('NewMessage', userName, message);
    },
  },
  reducers: {
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: [...state.notices, payload],
      };
    },
    saveServerTimes(state, { payload }) {
      return {
        ...state,
        serverTimes: [...state.serverTimes, payload.time],
      };
    },
  },
  subscriptions: {
    setup({ dispatch }, done) {
      //判断链接
      if (connection.state === signalR.HubConnectionState.Disconnected) {
        connection.start().catch(err => {
          done(err);
        });
      }
      //监听消息
      connection.on('MessageReceive', (userName, message) => {
        dispatch({
          type: 'saveNotices',
          payload: {
            userName,
            message,
          },
        });
      });
      // 获取服务后台定时发过来的消息
      connection.on('ShowTime', time => {
        dispatch({
          type: 'saveServerTimes',
          payload: {
            time,
          },
        });
      });
    },
  },
};

export default NoticeModel;
