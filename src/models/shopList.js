import {listshop, listshopSer } from '@/services/api';
// import {matchPath} from 'react-router';
// import querystring from 'querystring';

export default {
  namespace: 'shopabcaaa',

  state: {
    shopList :{},
    shopSerList:{},
  },

  effects: {

    //商家列表
    *shop({ payload, callback }, { call, put }){
      console.log(11111111222,payload)
    //   const { resolve } = payload;
      const response = yield call(listshop, payload);
    //   !!resolve && resolve(response); // 返回数据
      console.log('商家列表models的数据',response)
      yield put({
        type: 'updateState',
        payload: {
            shopList : response
        },
      });
      console.log(callback)
      if(callback) callback(response)
    },

    //商家记录统计
    *shopSer({ payload, callback }, { call, put }){
      console.log(11111111222,payload)
    //   const { resolve } = payload;
      const response = yield call(listshopSer, payload);
    //   !!resolve && resolve(response); // 返回数据
      console.log('商家列表查询models的数据',response)
      yield put({
        type: 'updateState',
        payload: {
            shopSerList : response
        },
      });
      if(callback) callback(response)
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
