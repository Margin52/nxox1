import { queryRule, removeRule, addRule, updateRule } from '@/services/api';

export default {
  namespace: 'rule',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    // listrecord:{},
  },

  effects: {
    // *record({ payload, callback }, { call, put }) {
    //   const response = yield call(listrecord, payload);
    //   yield put({
    //     type: 'updateState',
    //     payload: {listrecord : response},
    //   });
    //   if (callback) callback();
    // },
  //   *record({ payload, query }, { call, put }){
  //     const { resolve } = payload;
  //     const response = yield call(listrecord, payload.data, query);
  //     !!resolve && resolve(response); // 返回数据
  // },

    // *record({ payload, callback }, { call, put }) {
    //   yield put({
    //     type: 'updateState',
    //     payload: {listrecord : payload},
    //   });
    //   if (callback) callback();
    // },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
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
