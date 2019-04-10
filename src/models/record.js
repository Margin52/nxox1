import { listrecord, listRecordSerch } from '@/services/api';
import {matchPath} from 'react-router';
import querystring from 'querystring';

export default {
  namespace: 'ruleabc',

  state: {
    recordList :{},
    recordSerList:{},
  },

  effects: {
    //收运记录列表
    *record({ payload, query }, { call, put }){
      console.log(11111111222,payload)
    //   const { resolve } = payload;
      const response = yield call(listrecord, payload, query);
    //   !!resolve && resolve(response); // 返回数据
      console.log('收运记录的数据',response)
      yield put({
        type: 'updateState',
        payload: {
            recordList : response
        },
      });
      if(payload.callback) payload.callback(response)
    },
    //收运记录统计
    *recordSer({ payload, query }, { call, put }){
      console.log(11111111222,payload)
    //   const { resolve } = payload;
      const response = yield call(listRecordSerch, payload, query);
    //   !!resolve && resolve(response); // 返回数据
      console.log('收运记录查询的数据',response)
      yield put({
        type: 'updateState',
        payload: {
          recordSerList : response
        },
      });
      if(payload.callback) payload.callback(response)
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    updateState(state, { payload }) {
        return { ...state, ...payload };
    },
  },

};
