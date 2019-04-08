import { queryShop,queryDelete,queryShopTotal,queryShopSearch,queryMap,queryMapOnline,queryCarbox } from '@/services/api';

export default {
    namespace: 'shop',
    state: {
    // 用来保存数据
        data : [],
    },
    effects: {
        *fetch({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(queryShop, payload.data, query);
            !!resolve && resolve(response); // 返回数据
        },
        *delete({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(queryDelete, payload.data, query);
            !!resolve && resolve(response); // 返回数据
        },
        
        *fetchTotal({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(queryShopTotal, payload.data, query);
            !!resolve && resolve(response); // 返回数据
        },

        // 搜索商家
        *fetchSearch({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(queryShopSearch, payload.data, query);
            !!resolve && resolve(response); // 返回数据
        },

        // 获取商家标记地图
        *fetchMap({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(queryMap, payload.data, query);
            !!resolve && resolve(response); // 返回数据
        },

        // 筛选商家是否在线
        *fetchMapOnline({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(queryMapOnline, payload.data, query);
            !!resolve && resolve(response); // 返回数据
        },
        
        // 汽车的位置
        *fetchCar({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(queryCarbox, payload.data, query);
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