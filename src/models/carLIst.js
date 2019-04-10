import { listcar, listcarSer, listcarCode } from '@/services/api';

export default {
  namespace: 'carabc',

  state: {
    carList :{},
    carListSer:{},
    carListCode:{},
  },

  effects: {
    *car({ payload, query }, { call, put }){
    //   const { resolve } = payload;
      const response = yield call(listcar, payload, query);
    //   !!resolve && resolve(response); // 返回数据
    console.log('车辆列表的数据',response)
      yield put({
        type: 'updateState',
        payload: {
            carList : response
        },
      });
      if(payload.callback) payload.callback(response)
    },

    *carSer({ payload, query }, { call, put }){
      //   const { resolve } = payload;
        const response = yield call(listcarSer, payload, query);
      //   !!resolve && resolve(response); // 返回数据
      console.log('车辆列表查询的数据',response)
        yield put({
          type: 'updateState',
          payload: {
              carListSer : response
          },
        });
        if(payload.callback) payload.callback(response)
      },


      *carSerCode({ payload, query }, { call, put }){
        //   const { resolve } = payload;
          const response = yield call(listcarCode, payload, query);
        //   !!resolve && resolve(response); // 返回数据
        console.log('车辆码的数据',response)
          yield put({
            type: 'updateState',
            payload: {
                carListCode : response
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
