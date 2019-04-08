import { listrecord } from '@/services/api';

export default {
  namespace: 'ruleabc',

  state: {
    recordList :{},
  },

  effects: {
    *record({ payload, query }, { call, put }){
      console.log(11111111222)
    //   const { resolve } = payload;
      const response = yield call(listrecord, payload, query);
    //   !!resolve && resolve(response); // 返回数据
    console.log('123',response)
      yield put({
        type: 'updateState',
        payload: {
            recordList : response
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
