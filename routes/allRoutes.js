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
      { path: '/', redirect: '/dashboard/analysis' },
      {
        path: '/dashboard',
        name: '总览',
        icon: 'dashboard',
        // routes: [
        //   {
        //     path: '/dashboard/analysis',
        //     name: 'analysis',
        //     component: './Dashboard/Analysis',
        //   },
        //   {
        //     path: '/dashboard/monitor',
        //     name: 'monitor',
        //     component: './Dashboard/Monitor',
        //   },
        //   {
        //     path: '/dashboard/workplace',
        //     name: 'workplace',
        //     component: './Dashboard/Workplace',
        //   },
        // ],
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
                component: './Incoming/Purchase',
                hideChildrenInMenu: true,
                routes: [
                  {
                    path: '/incoming/purchase',
                    redirect: '/incoming/purchase/info',
                  },
                  {
                    path: '/incoming/purchase/info',
                    name: 'info',
                    component: './Incoming/Purchase/Step1',
                  },
                  {
                    path: '/incoming/purchase/confirm',
                    name: 'confirm',
                    component: './Incoming/Purchase/Step2',
                  },
                  {
                    path: '/incoming/purchase/result',
                    name: 'result',
                    component: './Incoming/Purchase/Step3',
                  },
                ],
              },
                             
        //   {
        //     path: '/form/step-form',
        //     name: 'stepform',
        //     component: './Forms/StepForm',
        //     hideChildrenInMenu: true,
        //     routes: [
        //       {
        //         path: '/form/step-form',
        //         redirect: '/form/step-form/info',
        //       },
        //       {
        //         path: '/form/step-form/info',
        //         name: 'info',
        //         component: './Forms/StepForm/Step1',
        //       },
        //       {
        //         path: '/form/step-form/confirm',
        //         name: 'confirm',
        //         component: './Forms/StepForm/Step2',
        //       },
        //       {
        //         path: '/form/step-form/result',
        //         name: 'result',
        //         component: './Forms/StepForm/Step3',
        //       },
        //     ],
        //   },
        //   {
        //     path: '/form/advanced-form',
        //     name: 'advancedform',
        //     authority: ['admin'],
        //     component: './Forms/AdvancedForm',
        //   },
        ],
      },
      // list
      {
        path: '/list',
        icon: 'table',
        name: '审批管理',
        routes: [
          {
            path: '/list/table-list',
            name: '立项审批',
            component: './List/TableList',
          },
          {
            path: '/list/basic-list',
            name: '延期提货',
            component: './List/BasicList',
          },
          {
            path: '/list/card-list',
            name: '合同审批',
            component: './List/CardList',
          },
          {
            path: '/list/SettlementApproval',
            name: '结算审批',
            component: './List/SettlementApproval',
          },
          {
            path: '/list/ApplicationOfDelivery',
            name: '提货申请',
            component: './List/ApplicationOfDelivery',
          },
          // {
          //   path: '/list/search',
          //   name: '结算审批',
          //   component: './List/List',
          //   routes: [
          //     {
          //       path: '/list/search',
          //       redirect: '/list/search/articles',
          //     },
          //     {
          //       path: '/list/search/articles',
          //       name: 'articles',
          //       component: './List/Articles',
          //     },
          //     {
          //       path: '/list/search/projects',
          //       name: 'projects',
          //       component: './List/Projects',
          //     },
          //     {
          //       path: '/list/search/applications',
          //       name: 'applications',
          //       component: './List/Applications',
          //     },
          //   ],
          // },
        ],
      },
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
      {
        name: '权限管理',
        icon: 'check-circle-o',
        path: '/result',
        routes: [
          // result
          {
            path: '/result/success',
            name: 'success',
            component: './Result/Success',
          },
          { path: '/result/fail', name: 'fail', component: './Result/Error' },
        ],
      },
      {
        name: '风控配置',
        icon: 'warning',
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
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
      {
        component: '404',
      },
    ],
  },
];
