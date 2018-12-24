export default [
  // user
  {
    path: '/login',
    component: './login',
  },
  // app
  {
    path: '/',
    component: '../layouts/index',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis' },
      {
        path: '/dashboard',
        name: '总览',
        icon: 'dashboard',
      },
      // forms
      {
        path: '/incoming',
        icon: 'form',
        name: '进件管理',
        // redirect: '/incoming/tablelist',
        // component:'./Incoming/Index',
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/incoming',
            name: '进件管理',
            component: './Incoming/Index',
            // hideChildrenInMenu: true,
          },
          {
                path: '/incoming/purchase',
                name: 'stepform',
                component: './Incoming/purchase',
                hideChildrenInMenu: true,
                routes: [
                  {
                    path: '/incoming/purchase',
                    redirect: '/incoming/purchase/info',
                  },
                  {
                    path: '/incoming/purchase/info',
                    name: 'info',
                    component: './Incoming/purchase/Step1',
                  },
                  {
                    path: '/incoming/purchase/confirm',
                    name: 'confirm',
                    component: './Incoming/purchase/Step2',
                  },
                  {
                    path: '/incoming/purchase/result',
                    name: 'result',
                    component: './Incoming/purchase/Step3',
                  },
                ],
              },

        ],
      },
      // list
      
      {
        path: '/profile',
        name: '订单管理',
        icon: 'table',
        // routes: [
        //   // profile
        //   {
        //     path: '/profile/basic',
        //     name: 'basic',
        //     component: './Profile/BasicProfile',
        //   },
        //   {
        //     path: '/profile/advanced',
        //     name: 'advanced',
        //     authority: ['admin'],
        //     component: './Profile/AdvancedProfile',
        //   },
        // ],
      },
      // {
      //   name: '权限管理',
      //   icon: 'check-circle-o',
      //   path: '/result',
      //   routes: [
      //     // result
      //     {
      //       path: '/result/success',
      //       name: 'success',
      //       component: './Result/Success',
      //     },
      //     { path: '/result/fail', name: 'fail', component: './Result/Error' },
      //   ],
      // },
      {
        name: '风控配置',
        icon: 'warning',
        path: '/exception',
        // routes: [
        //   // exception
        //   {
        //     path: '/exception/403',
        //     name: 'not-permission',
        //     component: './Exception/403',
        //   },
        //   {
        //     path: '/exception/404',
        //     name: 'not-find',
        //     component: './Exception/404',
        //   },
        //   {
        //     path: '/exception/500',
        //     name: 'server-error',
        //     component: './Exception/500',
        //   },
        //   {
        //     path: '/exception/trigger',
        //     name: 'trigger',
        //     hideInMenu: true,
        //     component: './Exception/TriggerException',
        //   },
        // ],
      },
      // {
      //   name: 'account',
      //   icon: 'user',
      //   path: '/account',
      //   routes: [
      //     {
      //       path: '/account/center',
      //       name: 'center',
      //       component: './Account/Center/Center',
      //       routes: [
      //         {
      //           path: '/account/center',
      //           redirect: '/account/center/articles',
      //         },
      //         {
      //           path: '/account/center/articles',
      //           component: './Account/Center/Articles',
      //         },
      //         {
      //           path: '/account/center/applications',
      //           component: './Account/Center/Applications',
      //         },
      //         {
      //           path: '/account/center/projects',
      //           component: './Account/Center/Projects',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/account/settings',
      //       name: 'settings',
      //       component: './Account/Settings/Info',
      //       routes: [
      //         {
      //           path: '/account/settings',
      //           redirect: '/account/settings/base',
      //         },
      //         {
      //           path: '/account/settings/base',
      //           component: './Account/Settings/BaseView',
      //         },
      //         {
      //           path: '/account/settings/security',
      //           component: './Account/Settings/SecurityView',
      //         },
      //         {
      //           path: '/account/settings/binding',
      //           component: './Account/Settings/BindingView',
      //         },
      //         {
      //           path: '/account/settings/notification',
      //           component: './Account/Settings/NotificationView',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   component: '404',
      // },
    ],
  },
];
