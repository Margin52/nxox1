import { queryCar,queryCarDelete,queryCarAdd,queryCarEdit,queryErweima } from '@/services/api';

export default {
    namespace: 'car',
    state: {
    // 用来保存数据
        data : [],
    },
    effects: {

        *fetch({ payload, query }, { call }){
            const { resolve } = payload;
            const response = yield call(queryCar, payload.data, query);
            !!resolve && resolve(response); // 返回数据
        },
        *delete({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(queryCarDelete, payload.data, query);
            !!resolve && resolve(response); // 返回数据
        },
        *caradd({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(queryCarAdd, payload.data, query);
            !!resolve && resolve(response); // 返回数据
        },
        *caredit({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(queryCarEdit, payload.data, query);
            !!resolve && resolve(response); // 返回数据
        },
        
        *carerweima({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(queryErweima, payload.data, query);
            console.log('让我看看小程序码的接口',response)
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