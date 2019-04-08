import { queryConfig,queryConfigAdd,queryConfigEdit,queryConfigEditCollection,queryConfigEditBasic } from '@/services/api';

export default {
    namespace: 'configs',
    state: {
    // 用来保存数据
        data : [],
    },
    effects: {
        *congigList({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(queryConfig, payload.data, query);
            !!resolve && resolve(response); // 返回数据
        },
        *configAdd({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(queryConfigAdd, payload.data, query);
            !!resolve && resolve(response); // 返回数据
        },
        *configEdit({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(queryConfigEdit, payload.data, query);
            !!resolve && resolve(response); // 返回数据
        },
        // 收运设置的编辑
        *configEditSec({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(queryConfigEditCollection, payload.data, query);
            !!resolve && resolve(response); // 返回数据
        },

        // 基本设置的编辑
        *configEditBasic({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(queryConfigEditBasic, payload.data, query);
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
        }

    },
};