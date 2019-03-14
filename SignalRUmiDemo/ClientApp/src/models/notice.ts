import { message } from 'antd';
import { INoticeItem } from './notice';
//引入 Effect,Subscription,Reducer
import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';
//引入SignalR
import * as signalR from '@aspnet/signalr';

//定义signalR链接,链接地址与后端一致
const connection = new signalR.HubConnectionBuilder().withUrl('/notice').build();

//定义消息通知
export interface INoticeItem {
  name: string;
  message: string;
}

//定义Dva model中的state具备的属性
export interface INoticeModelState {
  notices: INoticeItem[];
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
    saveNotices: Reducer<any>;
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
  },
  effects: {
    *send({ payload }, { call, put, select }) {
      const { username, message } = payload;
      yield connection.send('NewMessage', username, message);
    },
  },
  reducers: {
    saveNotices(state, action) {
      console.log(action.payload);
      return {
        ...state,
        notices: state.notices.push(action.payload),
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
      connection.on('MessageReceive', (username, message) => {
        dispatch({
          type: 'saveNotices',
          payload: {
            username,
            message,
          },
        });
      });
    },
  },
};

export default NoticeModel;
