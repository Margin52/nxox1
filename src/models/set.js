import { queryset,querysetadd,queryConfigAdd } from '@/services/api';

export default {
    namespace: 'set',
    state: {
    // 用来保存数据
        data : [],
    },
    effects: {
        *setedit({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(queryset, payload.data, query);
            !!resolve && resolve(response); // 返回数据
        },
        *setadd({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(querysetadd, payload.data, query);
            !!resolve && resolve(response); // 返回数据
        },
        *configAdd({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(queryConfigAdd, payload.data, query);
            !!resolve && resolve(response); // 返回数据
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