import request from '@/utils/request';

export async function listrecord() {
  return request('addon/collection/user/order?uaid=2&udid=0');
}