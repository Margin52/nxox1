import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

// 判断用户是否登录
export async function userSession(parmas) {
  return request(`/user/api/session`,{
    method:'POST',
    body: parmas
  });
}
