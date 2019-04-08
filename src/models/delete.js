import { queryDelete } from '@/services/api';

export default {
    namespace: 'delete',
    state: {
    // 用来保存数据
        data : [],
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            // const response = yield call(queryTest, payload);
            const deletes = yield call(queryDelete, payload)
            // yield put({
            // // 回调的方法 save
            //     type: 'save',
            //     payload: response,
            // });
            yield put({
            // 回调的方法 save
                type: 'save',
                payload: deletes,
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