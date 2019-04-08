import { queryDrvier,querydriverDelete,queryDriverAdd,queryDriverEdit } from '@/services/api';

export default {
    namespace: 'driver',
    state: {
    // 用来保存数据
        data : [],
    },
    effects: {
        // *fetchdrvier({ payload }, { call, put }) {
        //     const shops = yield call(queryDrvier, payload)
        //     yield put({
        //     // 回调的方法 save
        //         type: 'save',
        //         payload: shops,
        //     });
        // },
        *fetchdrvier({ payload, query }, { call }){
            const { resolve } = payload;
            const response = yield call(queryDrvier, payload.data, query);
            !!resolve && resolve(response); // 返回数据
        },
        // *deletedriver({ payload,callback }, { call, put }) {
        //     const response = yield call(querydriverDelete, payload.shopId);
        //     yield put({
        //       type: 'save',
        //       payload: response,
        //     });
        //     if (callback) callback();
        // },
        *deletedriver({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(querydriverDelete, payload.data, query);
            !!resolve && resolve(response); // 返回数据
        },
        // *driveradd({ payload,callback }, { call, put }) {
        //     const response = yield call(queryDriverAdd, payload);
        //     yield put({
        //       type: 'save',
        //       payload: response,
        //     });
        //     if (callback) callback();
        // },
        *driveradd({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(queryDriverAdd, payload.data, query);
            !!resolve && resolve(response); // 返回数据
        },
        *driveredit({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(queryDriverEdit, payload.data, query);
            !!resolve && resolve(response); // 返回数据
        },
        // *driveredit({ payload,callback }, { call, put }) {
        //     const response = yield call(queryDriverEdit, payload);
        //     yield put({
        //       type: 'save',
        //       payload: response,
        //     });
        //     if (callback) callback();
        // },
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