import { queryAd,queryAdDelete,queryAdAdd,queryUpload,queryAdEdit } from '@/services/api';

export default {
    namespace: 'ad',
    state: {
    // 用来保存数据
        data : [],
    },
    effects: {
        // *fetch({ payload }, { call, put }) {
        //     console.log(payload,11111)
        //     const shops = yield call(queryAd, payload)
        //     yield put({
        //     // 回调的方法 save
        //         type: 'save',
        //         payload: shops,
        //     });
        // },
        *fetch({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(queryAd, payload.data, query);
            !!resolve && resolve(response); // 返回数据
        },
        *delete({ payload,callback }, { call, put }) {
            console.log(payload)
            const response = yield call(queryAdDelete, payload.shopId);
            console.log(payload)
            yield put({
              type: 'save',
              payload: response,
            });
            if (callback) callback();
        },
        // *adadd({ payload }, { call, put }) {
        //     console.log(payload,11111)
        //     const shops = yield call(queryAdAdd, payload)
        //     yield put({
        //     // 回调的方法 save
        //         type: 'save',
        //         payload: shops,
        //     });
        // },
        *adadd({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(queryAdAdd, payload.data, query);
            !!resolve && resolve(response); // 返回数据
        },
        
        // 编辑广告
        *adedit({ payload, query }, { call, put }){
            const { resolve } = payload;
            const response = yield call(queryAdEdit, payload.data, query);
            !!resolve && resolve(response); // 返回数据
        },

        *adupload({ payload }, { call, put }) {
            console.log(payload,11111)
            const shops = yield call(queryUpload, payload)
            yield put({
            // 回调的方法 save
                type: 'save',
                payload: shops,
            });
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