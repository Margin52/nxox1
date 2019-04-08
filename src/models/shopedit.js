import { queryShopEdit } from '@/services/api';

export default {
    namespace: 'shopEdit',
    state: {
    // 用来保存数据
        data : [],
    },
    effects: {
        *eidtshop({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(queryShopEdit, payload.data, query);
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