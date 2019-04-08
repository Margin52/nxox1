export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      // { path: '/', redirect: '/dashboard/step-form' },
      { path: '/', redirect: '/test/text' },
      {
        path: '/test',
        icon: 'dashboard',
        name: 'test',
        routes: [
          {
            path: '/test/text',
            name: 'text',
            component: './Test/Text',
          },
        ],
      },
      {
        path: '/shop',
        name: 'shop',
        icon: 'shopping',
        routes: [
          {
            path: '/shop/step-form',
            name: 'stepform',
            component: './Shop/StepForm',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/shop/step-form',
                redirect: '/shop/step-form/info',
              },
              {
                path: '/shop/step-form/info',
                name: 'info',
                component: './Shop/StepForm/Step1',
              },
              {
                path: '/shop/step-form/confirm',
                name: 'confirm',
                component: './Shop/StepForm/Step2',
              },
              {
                path: '/shop/step-form/pay',
                name: 'pay',
                component: './Shop/StepForm/Pay',
              },
            ],
          },
        ],
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'table',
        routes: [
          //  司机列表
          {
            path: '/dashboard/driver-list',
            name: 'driverlist',
            component: './Dashboard/DriverList',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/dashboard/driver-list',
                redirect: '/dashboard/driver-list/info',
              },
              {
                path: '/dashboard/driver-list/info',
                name: 'info',
                component: './Dashboard/DriverList/Step1',
              },
              {
                path: '/dashboard/driver-list/confirm',
                name: 'confirm',
                component: './Dashboard/DriverList/Step2',
              },
              {
                path: '/dashboard/driver-list/pay',
                name: 'pay',
                component: './Dashboard/DriverList/Pay',
              },
            ],
          },

          // 车辆列表
          {
            path: '/dashboard/car-list',
            name: 'carlist',
            component: './Dashboard/CarList',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/dashboard/car-list',
                redirect: '/dashboard/car-list/info',
              },
              {
                path: '/dashboard/car-list/info',
                name: 'info',
                component: './Dashboard/CarList/Step1',
              },
              {
                path: '/dashboard/car-list/confirm',
                name: 'confirm',
                component: './Dashboard/CarList/Step2',
              },
              {
                path: '/dashboard/car-list/pay',
                name: 'pay',
                component: './Dashboard/CarList/Pay',
              },
            ],
          },

          // 订单列表
          // {
          //   path: '/dashboard/order-list',
          //   name: 'orderlist',
          //   component: './Dashboard/OrderList',
          //   hideChildrenInMenu: true,
          //   routes: [
          //     {
          //       path: '/dashboard/order-list',
          //       redirect: '/dashboard/order-list/info',
          //     },
          //     {
          //       path: '/dashboard/order-list/info',
          //       name: 'info',
          //       component: './Dashboard/OrderList/Step1',
          //     },
          //     {
          //       path: '/dashboard/order-list/confirm',
          //       name: 'confirm',
          //       component: './Dashboard/OrderList/Step2',
          //     },
          //     {
          //       path: '/dashboard/order-list/pay',
          //       name: 'pay',
          //       component: './Dashboard/OrderList/Pay',
          //     },
          //   ],
          // },

          // 广告列表
          // {
          //   path: '/dashboard/ad-list',
          //   name: 'adlist',
          //   component: './Dashboard/AdList',
          //   hideChildrenInMenu: true,
          //   routes: [
          //     {
          //       path: '/dashboard/ad-list',
          //       redirect: '/dashboard/ad-list/info',
          //     },
          //     {
          //       path: '/dashboard/ad-list/info',
          //       name: 'info',
          //       component: './Dashboard/AdList/Step1',
          //     },
          //     {
          //       path: '/dashboard/ad-list/confirm',
          //       name: 'confirm',
          //       component: './Dashboard/AdList/Step2',
          //     },
          //   ],
          // },
         
        ],
      },

      // 设置
      {
        path: '/set',
        icon: 'table',
        name: 'set',
        routes: [
          {
            path: '/set/setting',
            name: 'setting',
            component: './Set/Setting',
          },
          {
            path: '/set/recordmes',
            name: 'recordmes',
            component: './Set/Recordmes',
          }
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          // {
          //   path: '/account/center',
          //   name: 'center',
          //   component: './Account/Center/Center',
          //   routes: [
          //     {
          //       path: '/account/center',
          //       redirect: '/account/center/articles',
          //     },
          //     {
          //       path: '/account/center/articles',
          //       component: './Account/Center/Articles',
          //     },
          //     {
          //       path: '/account/center/applications',
          //       component: './Account/Center/Applications',
          //     },
          //     {
          //       path: '/account/center/projects',
          //       component: './Account/Center/Projects',
          //     },
          //   ],
          // },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
