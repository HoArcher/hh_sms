export default [
  {
    path: '/userManage',
    name: '用户管理',
    icon: 'user',
    authority: ['51'],
    component: './AdminPages/UserManage',
  },
  {
    path: '/menuManage',
    name: '菜单管理',
    icon: 'bars',
    authority: ['51'],
    component: './AdminPages/MenuManage',
  },
  {
    path: '/contentManage',
    name: '内容管理',
    icon: 'file',
    authority: ['51'],
    component: './AdminPages/ContentManage',
  },
  {
    path: '/dicClassifi',
    name: '字典分类',
    icon: 'book',
    authority: ['51'],
    component: './AdminPages/DicClassifi',
  },
  {
    path: '/smsTemplateManage',
    name: '短信模板管理',
    icon: 'mobile',
    authority: ['51'],
    component: './AdminPages/SmsTemplateManage',
  },
  {
    path: '/smsLog',
    name: '短信发送记录',
    icon: 'message',
    authority: ['51'],
    component: './AdminPages/SMSLog',
  },
];



