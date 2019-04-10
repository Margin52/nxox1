import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

// 收运列表
export async function listrecord(params) {
  // ?uaid=2&udid=0&act=list${params.name ? `&name=${params.name}` : ''}${params.status ? `&status=${params.status}` : ''}${params.create_date ? `&create_date=${params.create_date}` : ''}
  return request(`/server/api/addon/collection/user/order`,{
  // return request('/addon/collection/user/order',{
      method: 'POST',
      body: params,
    });
}

// 收运列表统计
export async function listRecordSerch(params) {
  return request(`/server/api/addon/collection/user/order`,{
  // return request('/addon/collection/user/order',{
      method: 'POST',
      body: params,
    });
}


// 车辆列表
export async function listcar(params) {
  console.log('aaaa')
  return request('/server/api/addon/collection/user/car',{
  // return request('/addon/collection/user/car',{
      method: 'POST',
      body: params,
    });
}

// 车辆列表统计
export async function listcarSer(params) {
  console.log('aaaa')
  return request('/server/api/addon/collection/user/car',{
  // return request('/addon/collection/user/car',{
      method: 'POST',
      body: params,
    });
}


// 车辆小程序码
export async function listcarCode(params) {
  console.log('aaaa')
  // return request('/server/api/addon/collection/user/qrcode?uaid=2&mpid=6&page=pages/main/bind&key=06017',{
    return request('/server/api/addon/collection/user/qrcode',{
  // return request('/addon/collection/user/qrcode',{
      method: 'POST',
      body: params,
    });
}

// 商家列表
export async function listshop(params) {
  return request('/server/api/addon/collection/user/shop',{
  // return request('/addon/collection/user/shop?uaid=2&udid=0&act=list',{
      method: 'POST',
      body: params,
    });
}

// 商家列表统计
export async function listshopSer(params) {
  return request('/server/api/addon/collection/user/shop',{
  // return request('/addon/collection/user/shop?uaid=2&udid=0&act=list',{
      method: 'POST',
      body: params,
    });
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

// export async function menuList(){
//   return request(`/admin/get_menu`)
// }



export async function queryTest() {
  return request('/nxos/admin/get_menu');
}

export async function collection() {
  return request('/nxos/admin/get_menu/key/collection');
}

// 商铺列表
// export async function queryShop(pages) {
//   return request(`/server/api/addon/collection/user/shop?page=${pages}&limit=10&uaid=2`);
// }
export async function queryShop(params) {
  return request(`/server/api/addon/collection/user/shop?limit=8&uaid=2`,{
  // return request(`/addon/collection/user/shop?limit=8&uaid=2`,{
    method: 'POST',
    body: params
  });
}

export async function queryShopTotal() {
  return request(`/server/api/addon/collection/user/shop?uaid=2&limit=500`);
  // return request(`/addon/collection/user/shop?uaid=2&limit=500`);
}

// 搜索商家
export async function queryShopSearch(params) {
  return request(`/server/api/addon/collection/user/shop?uaid=2&limit=10`,{
  // return request(`/addon/collection/user/shop?uaid=2&limit=10`,{
    method: 'POST',
    body: params
  });
}

// 删除商铺
export async function queryDelete(shopId) {
  return request(`/server/api/addon/collection/user/shop?id=${shopId}&uaid=2&act=delete`);
  // return request(`/addon/collection/user/shop?id=${shopId}&uaid=2&act=delete`);
}

// 添加商铺
export async function queryShopAdd(params) {
  return request('/server/api/addon/collection/user/shop?uaid=2&act=form', {
  // return request('/addon/collection/user/shop?uaid=2&act=form', {
    method: 'POST',
    body: params,
  });
}

// 编辑商铺
export async function queryShopEdit(shopId) {
  return request(`/server/api/addon/collection/user/shop?id=${shopId}&uaid=2&act=form`);
  // return request(`/addon/collection/user/shop?id=${shopId}&uaid=2&act=form`);
}

// 司机列表
export async function queryDrvier(parmas) {
  return request('/server/api/addon/collection/user/driver?uaid=2',{
  // return request('/addon/collection/user/driver?uaid=2',{
    method:'POST',
    body:parmas
  });
}

// 增加司机
export async function queryDriverAdd(params) {
  return request('/server/api/addon/collection/user/driver?uaid=2&act=form',{
  // return request('/addon/collection/user/driver?uaid=2&act=form',{
    method:'POST',
    body:params
  });
}

// 编辑司机
export async function queryDriverEdit(shopId) {
  return request(`/server/api/addon/collection/user/driver?id=${shopId}&uaid=2&act=form`);
  // return request(`/addon/collection/user/driver?id=${shopId}&uaid=2&act=form`);
}

// 删除司机
export async function querydriverDelete(shopId) {
  return request(`/server/api/addon/collection/user/driver?id=${shopId}&uaid=2&act=delete`);
  // return request(`/addon/collection/user/driver?id=${shopId}&uaid=2&act=delete`);
}

// 汽车列表
export async function queryCar(pages) {
  return request(`/server/api/addon/collection/user/car?page=${pages}&limit=10&uaid=2`);
  // return request(`/addon/collection/user/car?page=${pages}&limit=10&uaid=2`);
}

// 增加汽车
export async function queryCarAdd(params) {
  return request('/server/api/addon/collection/user/car?uaid=2&act=form',{
  // return request('/addon/collection/user/car?uaid=2&act=form',{
    method:'POST',
    body:params
  });
}

// 编辑汽车
export async function queryCarEdit(shopId) {
  return request(`/server/api/addon/collection/user/car?id=${shopId}&uaid=2&act=form`);
  // return request(`/addon/collection/user/car?id=${shopId}&uaid=2&act=form`);
}

// 删除汽车
export async function queryCarDelete(shopId) {
  return request(`/server/api/addon/collection/user/car?id=${shopId}&uaid=2&act=delete`);
  // return request(`/addon/collection/user/car?id=${shopId}&uaid=2&act=delete`);
}

// 订单列表
export async function queryOrder(pages) {
  return request(`/server/api/addon/collection/index/order_data?page=${pages}&limit=10&uaid=2`);
  // return request(`/addon/collection/index/order_data?page=${pages}&limit=10&uaid=2`);
}

// 删除订单
export async function queryOrderDelete(shopId) {
  return request(`/server/api/addon/collection/index/del_order?order_id=${shopId}&uaid=2`);
  // return request(`/addon/collection/index/del_order?order_id=${shopId}&uaid=2`);
}

// 广告列表
export async function queryAd(pages) {
  return request(`/server/api/addon/collection/index/ad_data?page=${pages}&limit=10&uaid=2`);
  // return request(`/addon/collection/index/ad_data?page=${pages}&limit=10&uaid=2`);
}

// 添加广告
export async function queryAdAdd(params) {
  return request('/server/api/addon/collection/index/ad_add_edit?uaid=2',{
  // return request('/addon/collection/index/ad_add_edit?uaid=2',{
    method:'POST',
    body:params
  });
}

// 编辑广告
export async function queryAdEdit(shopId) {
  return request(`/server/api/addon/collection/index/ad_add_edit?ad_id=${shopId}&uaid=2`);
  // return request(`/addon/collection/index/ad_add_edit?ad_id=${shopId}&uaid=2`);
}

// 上传图片
export async function queryUpload(params) {
  return request('/files/api/upload?uaid=2',{
    method:'POST',
    body:params
  });
}

// 删除广告
export async function queryAdDelete(shopId) {
  return request(`/server/api/addon/collection/index/del_ad?ad_id=${shopId}&uaid=2`);
  // return request(`/addon/collection/index/del_ad?ad_id=${shopId}&uaid=2`);
}

// 系统设置的编辑
export async function queryset() {
  return request(`/server/api/addon/collection/index/system_add_edit?uaid=2`);
  // return request(`/addon/collection/index/system_add_edit?uaid=2`);
}

// 系统设置的添加
export async function querysetadd(params) {
  return request(`/server/api/addon/collection/index/system_add_edit?uaid=2`,{
  // return request(`/addon/collection/index/system_add_edit?uaid=2`,{
    method:'POST',
    body:params
  });
}

// 店铺操作日志
export async function querylog(logid) {
  return request(`/server/api/addon/collection/index/system_add_edit?uaid=2&id=${logid}`);
  // return request(`/addon/collection/index/system_add_edit?uaid=2&id=${logid}`);
}

// 退出登录
export async function queryLoginOut(parmas) {
  return request(`/user/api/logout`,{
    method:'POST',
    body: parmas
  })
}

// 应用配置
export async function queryConfig(keyid) {
  return request(`/server/api/app/user/config?key=${keyid}&uaid=2&udid=0`)
  // return request(`/app/user/config?key=${keyid}&uaid=2&udid=0`)
}

// 新增应用配置
export async function queryConfigAdd(parmas) {
  return request(`/server/api/app/user/config`,{
  // return request(`/app/user/config`,{
    method:'POST',
    body: parmas
  })
}

// 编辑短信设置的应用配置
export async function queryConfigEdit(parmas) {
  return request(`/server/api/app/user/config?key=blts&uaid=2&udid=0`,{
  // return request(`/app/user/config?key=blts&uaid=2&udid=0`,{
    method:'POST',
    body: parmas
  })
}

// 编辑收运设置的应用配置
export async function queryConfigEditCollection(parmas) {
  return request(`/server/api/app/user/config?key=bltsec&uaid=2&udid=0`,{
  // return request(`/app/user/config?key=bltsec&uaid=2&udid=0`,{
    method:'POST',
    body: parmas
  })
}

// 基本设置的编辑应用配置
export async function queryConfigEditBasic(parmas) {
  return request(`/server/api/app/user/config?key=bltbasic&uaid=2&udid=0`,{
  // return request(`/app/user/config?key=bltbasic&uaid=2&udid=0`,{
    method:'POST',
    body: parmas
  })
}

// 小程序二维码
export async function queryErweima(carid) {
  return request(`/server/api/wechat/api/qrcode?key=${carid}&mpid=6&page=pages/binding/binding`)
  // return request(`/wechat/api/qrcode?key=${carid}&mpid=6&page=pages/binding/binding`)
}

// 获取商家地图标记
export async function queryMap() {
  return request(`/server/api/addon/collection/user/shop?uaid=2&act=map&limit=500`)
  // return request(`/addon/collection/user/shop?uaid=2&act=map&limit=500`)
}

// 删选商机按是否在线获取商家地图标记
export async function queryMapOnline(onlineid) {
  return request(`/server/api/addon/collection/user/shop?online=${onlineid}&uaid=2&act=map&limit=500`)
  // return request(`/addon/collection/user/shop?online=${onlineid}&uaid=2&act=map&limit=500`)
}

// 汽车地图标记
export async function queryCarbox(clientIds) {
  return request(`/server/api/addon/collection/user/car?client_id=${clientIds}&uaid=2&act=map`)
  // return request(`/addon/collection/user/car?client_id=${clientIds}&uaid=2&act=map`)
}
