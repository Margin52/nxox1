import { queryOrder,queryOrderDelete } from '@/services/api';

export default {
    namespace: 'order',
    state: {
    // 用来保存数据
        data : [],
    },
    effects: {
        // *fetch({ payload }, { call, put }) {
        //     console.log(payload,11111)
        //     const shops = yield call(queryOrder, payload)
        //     yield put({
        //     // 回调的方法 save
        //         type: 'save',
        //         payload: shops,
        //     });
        // },
        *fetch({ payload, query }, { call }){
            const { resolve } = payload;
            const response = yield call(queryOrder, payload.data, query);
            !!resolve && resolve(response); // 返回数据
        },
        *delete({ payload,callback }, { call, put }) {
            console.log(payload)
            const response = yield call(queryOrderDelete, payload.shopId);
            console.log(payload)
            yield put({
              type: 'save',
              payload: response,
            });
            if (callback) callback();
        },
    },
    reducers: {
        // 这块应该是回调
        save(state, action) {
            console.log(state)
            console.log(action)
            return {
                ...state,
                data: action.payload,
            };
        }

    },
};