import { queryShopAdd,querylog } from '@/services/api';

export default {
    namespace: 'shopadd',
    state: {
    // 用来保存数据
        data : [],
    },
    effects: {
        // *fetch({ payload }, { call, put }) {
        //     const shopadds = yield call(queryShopAdd, payload)
        //     yield put({
        //     // 回调的方法 save
        //         type: 'save',
        //         payload: shopadds,
        //     });
        // },
        *fetch({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(queryShopAdd, payload.data, query);
            !!resolve && resolve(response); // 返回数据
        },

        // 操作日志
        *fetchlog({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(querylog, payload.data, query);
            !!resolve && resolve(response); // 返回数据
        },
    },
    reducers: {
    // 这块应该是回调
        save(state, action) {
            return {
                ...state,
                data: action.payload,
            };
        },
    },
};