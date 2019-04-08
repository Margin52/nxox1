import { queryTest,collection } from '@/services/api';

export default {
    namespace: 'test',
    state: {
    // 用来保存数据
        data : [],
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            // const response = yield call(queryTest, payload);
            const collections = yield call(collection, payload)
            // yield put({
            // // 回调的方法 save
            //     type: 'save',
            //     payload: response,
            // });
            yield put({
            // 回调的方法 save
                type: 'save',
                payload: collections,
            });
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