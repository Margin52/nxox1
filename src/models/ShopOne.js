import { listshop } from '@/services/api';

export default {
  namespace: 'shopabc',

  state: {
    shopList :{},
  },

  effects: {
    *shop({ payload, query }, { call, put }){
      console.log(11111111222)
    //   const { resolve } = payload;
      const response = yield call(listshop, payload, query);
    //   !!resolve && resolve(response); // 返回数据
      console.log('商家列表的数据',response)
      yield put({
        type: 'updateState',
        payload: {
            shopList : response
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
